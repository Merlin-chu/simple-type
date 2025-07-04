# 简单打字练习

一个轻量级的在线打字练习工具，支持自定义文本输入、实时速度计算、错误统计和针对性练习功能。

## 功能特点

- 自定义文本输入：粘贴任何文本进行练习
- 实时速度计算：显示当前打字速度（字符/分钟）
- 错误统计：记录并显示错误字符及其频率
- 针对性练习：可选择只练习错误字符
- 打字机音效：增强打字体验
- 响应式设计：适配不同屏幕尺寸

## 如何使用

1. 访问GitHub Pages链接（设置后可用）
2. 在文本框中粘贴或输入要练习的文本
3. 点击"加载文本开始练习"按钮
4. 开始打字，正确字符显示为绿色，错误字符显示为红色并带有删除线
5. 完成后查看结果统计，可选择"再来一次"或"针对性练习错误字符"

## 本地开发

1. 克隆本仓库
2. 直接打开simple-type.html文件即可运行

## 发布到GitHub步骤

1. 在GitHub上创建新仓库
2. 初始化本地仓库并提交文件：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```
3. 连接远程仓库并推送：
   ```bash
   git remote add origin git@github.com:Merlin-chu/simple-type.git
   git push -u origin main
   ```
4. 在GitHub仓库设置中启用GitHub Pages：
   - 进入仓库Settings > Pages
   - 选择main分支和根目录
   - 保存设置后等待几分钟，访问生成的URL

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件