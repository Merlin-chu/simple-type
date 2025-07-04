document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const loadButton = document.getElementById('load-button');
    const inputDiv = document.getElementById('input-div');
    const speedDisplay = document.getElementById('speed');
    const errorsDisplay = document.getElementById('errors');

    let currentPosition = 0;
    let startTime = null;
    let correctCharacters = 0;
    let errorCount = 0;
    let typingInterval = null;
    let textCharacters = [];
    let errorCharacters = {}; // 跟踪错误字符及其频率
    const typeSound = new Audio('assets/sounds/typewriter-sound.wav');

    // 加载用户输入的文本
    loadButton.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) return;

        // 重置状态
        resetTypingState();
        renderText(text);
        startTime = new Date();
        startSpeedCalculation();
    });

    // 渲染文本为可打字的字符元素
    function renderText(text) {
        inputDiv.innerHTML = '';
        textCharacters = [];

        for (const char of text) {
            // 标准化文本中的句号为半角
            const normalizedChar = char === '。' ? '.' : char;
            const span = document.createElement('span');
            span.className = `character ${normalizedChar === ' ' ? 'space-character' : ''}`;
            span.textContent = normalizedChar;
            inputDiv.appendChild(span);
            textCharacters.push(span);
        }

        // 设置初始光标
        if (textCharacters.length > 0) {
            textCharacters[0].classList.add('cursor', 'pending-char');
        }
    }

    // 重置打字状态
    function resetTypingState() {
        currentPosition = 0;
        correctCharacters = 0;
        errorCount = 0;
        errorCharacters = {};
        speedDisplay.textContent = '0';
        errorsDisplay.textContent = '0';
        clearInterval(typingInterval);
        // 隐藏结果面板
        document.getElementById('results').style.display = 'none';
    }

    // 开始速度计算定时器
    function startSpeedCalculation() {
        typingInterval = setInterval(() => {
            if (!startTime) return;
            const elapsedMinutes = (new Date() - startTime) / (1000 * 60);
            const speed = Math.round(correctCharacters / elapsedMinutes);
            speedDisplay.textContent = speed;
        }, 1000);
    }

    // 处理键盘输入
    // 完成打字时的处理函数
    function finishTyping() {
        clearInterval(typingInterval);
        
        // 计算最终结果
        const elapsedMinutes = (new Date() - startTime) / (1000 * 60);
        const finalSpeed = Math.round(correctCharacters / elapsedMinutes);
        const errorRate = textCharacters.length > 0 ? Math.round((errorCount / textCharacters.length) * 100) : 0;
        
        // 更新结果显示
        document.getElementById('final-speed').textContent = finalSpeed;
        document.getElementById('error-rate').textContent = errorRate;
        
        // 显示错误字符统计
        const errorList = document.getElementById('error-list');
        errorList.innerHTML = '';
        for (const char in errorCharacters) {
            const li = document.createElement('li');
            li.textContent = `字符 '${char}': ${errorCharacters[char]}次`;
            errorList.appendChild(li);
        }
        
        // 控制预定义按钮的显示状态
        const targetedPracticeBtn = document.getElementById('targeted-practice-btn');
        if (Object.keys(errorCharacters).length > 0) {
            targetedPracticeBtn.style.display = 'block';
        } else {
            targetedPracticeBtn.style.display = 'none';
        }
        
        // 显示结果面板
        const resultsPanel = document.getElementById('results');
        resultsPanel.style.display = 'block';
    }
    
    // 生成针对性练习文本
    function generateTargetedPractice() {
        if (Object.keys(errorCharacters).length === 0) {
            alert('恭喜你练习完成，这次没有出错哦。');
            return;
        }
        
        // 根据错误频率生成练习文本
        let practiceText = '';
        for (const char in errorCharacters) {
            // 每个错误字符生成重复序列，次数基于错误频率
            const repeatCount = Math.max(5, errorCharacters[char] * 2);
            practiceText += char.repeat(repeatCount) + ' ';
        }
        
        // 重置并加载针对性练习文本
        resetTypingState();
        textInput.value = practiceText.trim();
        renderText(practiceText.trim());
        startTime = new Date();
        startSpeedCalculation();
        
        // 隐藏结果面板
       document.getElementById('results').style.display = 'none';
    }
    
    // 再来一次按钮事件
    document.getElementById('restart-button').addEventListener('click', () => {
        resetTypingState();
        renderText(textInput.value.trim());
        startTime = new Date();
        startSpeedCalculation();
    });

    // 针对性练习按钮事件
    document.getElementById('targeted-practice-btn').addEventListener('click', generateTargetedPractice);

    document.addEventListener('keydown', (e) => {
        // 忽略功能键
        if (['Tab', 'Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'Enter', 'Backspace'].includes(e.key)) {
            if (e.key === 'Backspace' && currentPosition > 0) {
                e.preventDefault();
                // 移除当前光标
                textCharacters[currentPosition].classList.remove('cursor');
                // 重置上一个字符
            currentPosition--;
            const prevChar = textCharacters[currentPosition];
            // 只移除视觉状态，保留错误记录
            prevChar.classList.remove('correct', 'incorrect');
            prevChar.classList.add('cursor', 'pending-char');
            }
            return;
        }

        if (currentPosition >= textCharacters.length) return;

        e.preventDefault();
        const currentChar = textCharacters[currentPosition];
        // 标准化输入字符，将全角句号转换为半角句号
        let pressedKey = e.key === ' ' ? ' ' : e.key;
        // 处理中英文句号统一
        if (pressedKey === '。') pressedKey = '.';

        // 检查输入是否正确
        if (pressedKey === currentChar.textContent) {
            currentChar.classList.add('correct');
            typeSound.currentTime = 0;
            typeSound.play().catch(e => console.error('音效播放失败:', e));
            correctCharacters++;
        } else {
            currentChar.classList.add('incorrect');
            typeSound.currentTime = 0;
            typeSound.play();
            errorCount++;
            errorsDisplay.textContent = errorCount;
            
            // 记录错误字符（仅记录预期字符，确保退格后错误仍保留）
        const expectedChar = currentChar.textContent;
        if (!errorCharacters[expectedChar]) {
            errorCharacters[expectedChar] = 0;
        }
        errorCharacters[expectedChar]++;
        // 确保错误计数至少为1
        if (errorCharacters[expectedChar] < 1) {
            errorCharacters[expectedChar] = 1;
        }
        }

        // 移动光标
        currentChar.classList.remove('cursor', 'pending-char');
        currentPosition++;
        if (currentPosition < textCharacters.length) {
            textCharacters[currentPosition].classList.add('cursor', 'pending-char');
        } else {
            // 完成打字练习
            finishTyping();
        }
    });
});