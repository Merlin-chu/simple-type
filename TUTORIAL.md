# 打字练习网页代码教程

欢迎学习打字练习网页的代码！这份教程会逐行解释每个文件的功能，帮助你理解整个项目是如何工作的。

## 文件结构
我们的项目包含四个文件：
- `simple-type.html` - 网页的结构
- `simple-type.css` - 网页的样式
- `simple-type.js` - 网页的交互功能
- `assets/sounds/typewriter-sound.wav` - 打字机音效文件

---

## 1. HTML 文件: simple-type.html

HTML 文件定义了网页的基本结构，就像房子的框架。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简单打字练习</title>
    <link rel="stylesheet" href="simple-type.css">
</head>
<body>
    <div class="container">
        <h1>自定义打字练习</h1>
        
        <div class="control-panel">
            <textarea id="text-input" placeholder="在此粘贴你想练习的文本...">The quick brown fox jumps over the lazy dog. This is a typing test. You can paste your own text here.</textarea>
            <button id="load-button">加载文本开始练习</button>
        </div>
        
        <div class="stats">
            <div>速度: <span id="speed">0</span> 字符/分钟</div>
            <div>错误: <span id="errors">0</span> 次</div>
        </div>
        
        <div id="typing-area">
            <div id="input-div" class="typing-text"></div>
        </div>

        <div id="results" class="results-panel">
            <h2>练习结果</h2>
            <div class="result-item">最终速度: <span id="final-speed">0</span> 字符/分钟</div>
            <div class="result-item">错误率: <span id="error-rate">0</span>%</div>
            <div class="error-chars">
                <h3>错误字符统计:</h3>
                <ul id="error-list"></ul>
            </div>
            <div class="d-flex gap-2 mt-3">
              <button id="restart-button" class="btn btn-primary">再来一次</button>
              <button id="targeted-practice-btn" class="btn btn-warning" style="display: none;">针对性练习错误字符</button>
            </div>
        </div>
    </div>

    <script src="simple-type.js"></script>
</body>
</html>
```

### 代码解释:

1. **基本设置**:
```html
<!DOCTYPE html> <!-- 告诉浏览器这是HTML5文档 -->
<html lang="zh-CN"> <!-- HTML页面的根元素，lang属性表示页面语言是简体中文 -->
<head> <!-- 包含页面的元数据 -->
    <meta charset="UTF-8"> <!-- 设置字符编码为UTF-8，支持中文显示 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- 确保在移动设备上正确显示 -->
    <title>简单打字练习</title> <!-- 网页标题，显示在浏览器标签页上 -->
    <link rel="stylesheet" href="simple-type.css"> <!-- 引入CSS样式文件 -->
</head>
```

2. **页面内容**:
```html
<body> <!-- 网页的可见内容都在这里 -->
    <div class="container"> <!-- 容器，用于居中内容和设置最大宽度 -->
        <h1>自定义打字练习</h1> <!-- 页面标题 -->
        
        <div class="control-panel"> <!-- 控制面板区域 -->
            <!-- 文本输入框，用户可以在这里粘贴自定义文本 -->
            <textarea id="text-input" placeholder="在此粘贴你想练习的文本...">默认文本...</textarea>
            <!-- 加载按钮，点击开始练习 -->
            <button id="load-button">加载文本开始练习</button>
        </div>
        
        <div class="stats"> <!-- 统计信息区域 -->
            <div>速度: <span id="speed">0</span> 字符/分钟</div> <!-- 实时速度显示 -->
            <div>错误: <span id="errors">0</span> 次</div> <!-- 错误次数显示 -->
        </div>
        
        <div id="typing-area"> <!-- 打字练习区域 -->
            <div id="input-div" class="typing-text"></div> <!-- 这里会显示要打的文本 -->
        </div>

        <div id="results" class="results-panel"> <!-- 练习结果面板 -->
            <h2>练习结果</h2>
            <div class="result-item">最终速度: <span id="final-speed">0</span> 字符/分钟</div>
            <div class="result-item">错误率: <span id="error-rate">0</span>%</div>
            <div class="error-chars">
                <h3>错误字符统计:</h3>
                <ul id="error-list"></ul> <!-- 这里会显示错误字符列表 -->
            </div>
            <button id="restart-button">再来一次</button> <!-- 重新开始按钮 -->
        </div>
    </div>

    <script src="simple-type.js"></script> <!-- 引入JavaScript文件 -->
</body>
```

---

## 2. CSS 文件: simple-type.css

CSS 文件控制网页的样式，让网页看起来更美观。

```css
/* 基础样式设置 */
.container {
    max-width: 800px; /* 最大宽度 */
    margin: 0 auto; /* 居中显示 */
    padding: 20px; /* 内边距 */
    font-family: Arial, sans-serif; /* 字体 */
}

h1 {
    text-align: center; /* 标题居中 */
    color: #333; /* 文字颜色 */
}

/* 控制面板样式 */
.control-panel {
    margin-bottom: 20px; /* 下边距 */
}

#text-input {
    width: 100%; /* 宽度100% */
    height: 100px; /* 高度 */
    padding: 10px; /* 内边距 */
    margin-bottom: 10px; /* 下边距 */
    border: 1px solid #ddd; /* 边框 */
    border-radius: 4px; /* 圆角 */
    resize: vertical; /* 允许垂直调整大小 */
    font-family: 'Courier New', Courier, monospace; /* 等宽字体 */
    font-size: 20px; /* 字体大小 */
    line-height: 1.5; /* 行高 */
}

#load-button {
    background-color: #4CAF50; /* 背景色：绿色 */
    color: white; /* 文字颜色：白色 */
    border: none; /* 无边框 */
    padding: 10px 20px; /* 内边距 */
    border-radius: 4px; /* 圆角 */
    cursor: pointer; /* 鼠标悬停时显示手型 */
    font-size: 16px; /* 字体大小 */
}

#load-button:hover {
    background-color: #45a049; /* 鼠标悬停时的背景色 */
}

/* 统计信息样式 */
.stats {
    display: flex; /* 使用Flex布局 */
    justify-content: space-between; /* 两端对齐 */
    margin-bottom: 20px; /* 下边距 */
    font-size: 18px; /* 字体大小 */
}

/* 打字区域样式 */
#typing-area {
    border: 1px solid #ddd; /* 边框 */
    padding: 20px; /* 内边距 */
    border-radius: 4px; /* 圆角 */
    min-height: 100px; /* 最小高度 */
}

.typing-text {
    font-size: 20px; /* 字体大小 */
    line-height: 1.5; /* 行高 */
    font-family: 'Courier New', Courier, monospace; /* 等宽字体 */
}

.character {
    display: inline-block; /*  inline-block 布局 */
    margin: 0; /* 外边距 */
    white-space: pre-wrap; /* 保留空白和换行 */
    position: relative; /* 相对定位 */
}

/* 待输入字符样式 - 灰色底框闪烁效果 */
.pending-char {
    background-color: #f0f0f0; /* 背景色 */
    animation: blink 1.2s step-end infinite; /* 闪烁动画 */
    padding: 0 2px; /* 内边距 */
    border-radius: 2px; /* 圆角 */
}

/* 闪烁动画定义 */
@keyframes blink {
    0%, 100% { background-color: #f0f0f0; } /* 开始和结束状态 */
    50% { background-color: #cccccc; } /* 中间状态 */
}

/* 空格字符样式 */
.space-character {
    margin-right: 4px; /* 右边距 */
    color: #cccccc; /* 颜色 */
}

.space-character::after {
    content: '·'; /* 显示一个圆点表示空格 */
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 光标样式 */
.cursor {
    border-bottom: 2px solid #333; /* 底部边框作为光标 */
    animation: blink 1s step-end infinite; /* 光标闪烁动画 */
}

/* 结果面板样式 */
.results-panel {
    display: none; /* 默认隐藏 */
    margin-top: 20px; /* 上边距 */
    padding: 20px; /* 内边距 */
    border: 1px solid #ddd; /* 边框 */
    border-radius: 4px; /* 圆角 */
    background-color: #f9f9f9; /* 背景色 */
}

.results-panel h2 {
    margin-top: 0; /* 移除上边距 */
    color: #333; /* 文字颜色 */
}

.result-item {
    font-size: 18px; /* 字体大小 */
    margin-bottom: 10px; /* 下边距 */
}

.error-chars {
    margin: 20px 0; /* 上下边距 */
}

.error-chars h3 {
    margin-bottom: 10px; /* 下边距 */
    color: #666; /* 文字颜色 */
}

#error-list {
    list-style-type: none; /* 移除列表标记 */
    padding: 0; /* 移除内边距 */
    display: flex; /* 使用Flex布局 */
    flex-wrap: wrap; /* 允许换行 */
    gap: 10px; /* 项目间距 */
}

#error-list li {
    background-color: #fff3cd; /* 背景色 */
    padding: 5px 10px; /* 内边距 */
    border-radius: 4px; /* 圆角 */
    font-family: 'Courier New', Courier, monospace; /* 等宽字体 */
}

#restart-button {
    background-color: #2196F3; /* 背景色：蓝色 */
    color: white; /* 文字颜色：白色 */
    border: none; /* 无边框 */
    padding: 10px 20px; /* 内边距 */
    border-radius: 4px; /* 圆角 */
    cursor: pointer; /* 鼠标悬停时显示手型 */
    font-size: 16px; /* 字体大小 */
    margin-top: 10px; /* 上边距 */
}
#restart-button:hover {
    background-color: #0b7dda; /* 鼠标悬停时的背景色 */
}

/* 针对性练习按钮样式 - 黄色背景与再来一次按钮区分 */
.btn-warning {
    background-color: #ffc107; /* 黄色背景 */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.d-flex { display: flex; gap: 0.5rem; }
.d-flex.gap-2 { gap: 0.5rem; }

.btn-warning:hover {
    background-color: #e0a800; /* 悬停时加深颜色 */
}

/* 针对性练习按钮样式 */
.btn-warning {
    background-color: #ffc107; /* 黄色背景 */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.btn-warning:hover {
    background-color: #e0a800; /* 悬停时加深颜色 */
}/* 鼠标悬停时的背景色 */
}

/* 正确和错误字符样式 */
.correct {
    color: #008000; /* 正确字符颜色：绿色 */
}

.incorrect {
    color: #ff0000; /* 错误字符颜色：红色 */
    text-decoration: line-through; /* 错误字符添加删除线 */
}
```

### 按钮样式设计

我们为两个主要功能按钮设计了统一的基础样式和不同的颜色标识：

1. **再来一次按钮**：使用`#restart-button`选择器，蓝色背景 (`#2196F3`)
2. **按钮布局**：使用flex布局容器使按钮水平排列：
   ```html
   <div class="d-flex gap-2 mt-3">
     <button id="restart-button" class="btn btn-primary">再来一次</button>
     <button id="targeted-practice-btn" class="btn btn-warning" style="display: none;">针对性练习错误字符</button>
   </div>
   ```
3. **针对性练习按钮**：使用`.btn-warning`类选择器，黄色背景 (`#ffc107`)

这种设计确保了视觉风格的一致性，同时通过颜色差异清晰区分了不同功能。两个按钮共享相同的内边距、边框圆角和交互效果。

### 重点CSS概念解释:

1. **选择器**: CSS使用选择器来选择要样式化的HTML元素。例如：
   - `#text-input` - 选择ID为text-input的元素
   - `.container` - 选择class为container的元素
   - `h1` - 选择所有h1标题元素

2. **盒模型**: 每个HTML元素都像一个盒子，有：
   - `margin` - 外边距（盒子外部的空间）
   - `padding` - 内边距（盒子内部的空间）
   - `border` - 边框（盒子的边缘）

3. **动画**: `@keyframes` 用于定义动画，然后通过`animation`属性应用到元素上。我们用它实现了光标和待输入字符的闪烁效果。

4. **Flex布局**: `display: flex` 使元素能够灵活地排列其子元素，我们用它来布局统计信息和错误字符列表。

---

## 3. JavaScript 文件: simple-type.js

JavaScript 文件添加交互功能，让网页能够响应用户的操作。

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 获取HTML元素
    const textInput = document.getElementById('text-input');
    const loadButton = document.getElementById('load-button');
    const inputDiv = document.getElementById('input-div');
    const speedDisplay = document.getElementById('speed');
    const errorsDisplay = document.getElementById('errors');

    // 定义变量
    let currentPosition = 0; // 当前输入位置
    let startTime = null; // 开始时间
    let correctCharacters = 0; // 正确字符数
    let errorCount = 0; // 错误数
    let typingInterval = null; // 速度计算定时器
    let textCharacters = []; // 存储文本字符元素
    let errorCharacters = {}; // 跟踪错误字符及其频率

    // 加载用户输入的文本
    loadButton.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) return; // 如果文本为空，不执行

        // 重置状态
        resetTypingState();
        renderText(text); // 渲染文本
        startTime = new Date(); // 记录开始时间
        startSpeedCalculation(); // 开始计算速度
    });

    // 渲染文本为可打字的字符元素
    function renderText(text) {
        inputDiv.innerHTML = ''; // 清空打字区域
        textCharacters = []; // 清空字符数组

        // 遍历文本中的每个字符
        for (const char of text) {
            const span = document.createElement('span'); // 创建span元素
            // 设置类名，空格字符添加特殊类
            span.className = `character ${char === ' ' ? 'space-character' : ''}`;
            span.textContent = char; // 设置字符内容
            inputDiv.appendChild(span); // 添加到打字区域
            textCharacters.push(span); // 添加到字符数组
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
            // 计算已用分钟数
            const elapsedMinutes = (new Date() - startTime) / (1000 * 60);
            // 计算速度（字符/分钟）
            const speed = Math.round(correctCharacters / elapsedMinutes);
            speedDisplay.textContent = speed;
        }, 1000); // 每秒更新一次
    }

    // 完成打字时的处理函数
    function finishTyping() {
        clearInterval(typingInterval); // 停止定时器
        
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
            li.textContent = `${char}: ${errorCharacters[char]}次`;
            errorList.appendChild(li);
        }
        
        // 显示结果面板
        document.getElementById('results').style.display = 'block';
    }

    // 再来一次按钮事件
    document.getElementById('restart-button').addEventListener('click', () => {
        resetTypingState();
        renderText(textInput.value.trim());
        startTime = new Date();
        startSpeedCalculation();
    });

    // 处理键盘输入
    document.addEventListener('keydown', (e) => {
        // 忽略功能键
        if (['Tab', 'Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'Enter', 'Backspace'].includes(e.key)) {
            // 处理退格键
            if (e.key === 'Backspace' && currentPosition > 0) {
                e.preventDefault(); // 阻止默认行为
                // 移除当前光标
                textCharacters[currentPosition].classList.remove('cursor', 'pending-char');
                // 重置上一个字符
                currentPosition--;
                textCharacters[currentPosition].classList.remove('correct', 'incorrect');
                textCharacters[currentPosition].classList.add('cursor', 'pending-char');
            }
            return;
        }

        // 如果已经完成打字，不处理输入
        if (currentPosition >= textCharacters.length) return;

        e.preventDefault(); // 阻止默认行为（避免页面滚动等）
        const currentChar = textCharacters[currentPosition];
        const pressedKey = e.key === ' ' ? ' ' : e.key; // 处理空格键

        // 检查输入是否正确
        if (pressedKey === currentChar.textContent) {
            currentChar.classList.add('correct'); // 添加正确样式
            correctCharacters++; // 增加正确字符计数
            // 播放打字机音效
            typeSound.currentTime = 0; // 重置音效播放位置
            typeSound.play(); // 播放音效
        } else {
            currentChar.classList.add('incorrect'); // 添加错误样式
            errorCount++; // 增加错误计数
            errorsDisplay.textContent = errorCount;
            // 播放打字机音效
            typeSound.currentTime = 0; // 重置音效播放位置
            typeSound.play(); // 播放音效
            
            // 记录错误字符
            const expectedChar = currentChar.textContent;
            if (errorCharacters[expectedChar]) {
                errorCharacters[expectedChar]++;
            } else {
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
```

### 代码解释:

1. **等待页面加载**: 
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 所有代码都在这里
});
```
这行代码确保在网页完全加载后才执行JavaScript，避免操作尚未加载的元素。

2. **获取HTML元素**: 
```javascript
const textInput = document.getElementById('text-input');
const loadButton = document.getElementById('load-button');
// ... 其他元素
```
使用`document.getElementById`获取HTML中的元素，以便在JavaScript中操作它们。

3. **定义变量**: 
```javascript
let currentPosition = 0; // 当前输入位置
let startTime = null; // 开始时间
let correctCharacters = 0; // 正确字符数
let errorCount = 0; // 错误数
let typingInterval = null; // 速度计算定时器
let textCharacters = []; // 存储文本字符元素
let errorCharacters = {}; // 跟踪错误字符及其频率
const typeSound = new Audio('assets/sounds/typewriter-sound.wav'); // 打字机音效对象
```
这些变量用于跟踪打字练习的状态，其中`typeSound`变量用于加载和播放打字机音效。

4. **加载文本按钮点击事件**: 
```javascript
loadButton.addEventListener('click', () => {
    // 处理点击事件
});
```
当用户点击"加载文本开始练习"按钮时，这段代码会执行。它会获取用户输入的文本，重置状态，并开始练习。

5. **渲染文本函数**: 
```javascript
function renderText(text) {
    // 将文本转换为可打字的字符元素
}
```
这个函数将用户输入的文本拆分成单个字符，每个字符放在一个`<span>`元素中，这样我们可以单独设置每个字符的样式。

6. **键盘输入处理**: 
```javascript
document.addEventListener('keydown', (e) => {
    // 处理键盘输入
});
```
这是整个程序最核心的部分，它监听用户的键盘输入，并：
- 检查输入是否正确
- 更新正确/错误计数
- 移动光标到下一个字符
- 记录错误字符
- 当完成所有字符时显示结果

7. **速度计算**: 
```javascript
function startSpeedCalculation() {
    typingInterval = setInterval(() => {
        // 每秒计算一次速度
    }, 1000);
}
```
使用`setInterval`每秒计算一次打字速度，公式是：速度 = 正确字符数 / 用时（分钟）。

8. **完成打字处理**: 
```javascript
function finishTyping() {
    // 显示最终结果
}
```
当用户完成所有字符的输入后，这个函数会计算最终速度和错误率，并显示结果面板。

---

## 如何使用这个打字练习网页

1. 在文本框中输入或粘贴你想练习的文本
2. 点击"加载文本开始练习"按钮
3. 按照屏幕上的提示字符开始打字
4. 完成后，你会看到：
   - 你的打字速度（字符/分钟）
   - 错误率
   - 你经常打错的字符
5. 点击"再来一次"可以重新练习

---

## 总结

这个打字练习网页使用了HTML、CSS和JavaScript三种技术：
- **HTML** 构建了网页的结构
- **CSS** 美化了网页的外观，包括终端风格的闪烁效果
- **JavaScript** 添加了交互功能，处理用户输入并计算打字速度和错误

作为初学者，你可以尝试修改代码来添加新功能，比如：
- 更改颜色方案
- 添加不同难度级别
- 记录历史成绩
- 添加计时功能

希望这份教程能帮助你理解代码的工作原理！编程是一个不断学习的过程，多动手尝试是掌握编程的最佳方式。