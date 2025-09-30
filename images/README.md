# 🎨 图片资源说明

## 当前状态

已创建SVG格式的占位符图标，可以直接使用，但建议替换为真实图片以获得更好的视觉效果。

## 📁 已创建的SVG图标

- ✅ `icon-512x512.svg` - PWA主图标
- ✅ `og-image.svg` - Open Graph分享图
- ✅ `apple-touch-icon.svg` - Apple设备图标
- ✅ `favicon-32x32.svg` - 32x32网站图标
- ✅ `favicon-16x16.svg` - 16x16网站图标

## 🔄 如何获取真实图片

### 方法1：从游戏平台截图
访问以下网站并截图：
- https://www.crazygames.com/game/sunset-bike-racing
- https://www.kizgame.com/en/game/sunset-bike-racing/

### 方法2：使用在线工具转换SVG为PNG/JPG

**推荐工具：**
1. **CloudConvert** - https://cloudconvert.com/svg-to-png
   - 上传SVG文件
   - 选择输出格式（PNG/JPG）
   - 设置尺寸
   - 下载转换后的文件

2. **Convertio** - https://convertio.co/svg-png/

3. **本地转换（如果安装了ImageMagick）：**
   ```bash
   # 转换为PNG
   magick images/icon-512x512.svg images/icon-512x512.png
   magick images/og-image.svg -resize 1200x630 images/og-image.jpg
   ```

### 方法3：使用AI生成工具
- **DALL-E / Midjourney**：生成摩托车竞速主题图片
- **Canva**：使用模板设计游戏封面
- **Figma**：基于SVG进一步设计

## 📋 所需图片清单

### 必需图片（优先级高）
- [ ] `og-image.jpg` (1200x630px) - 用于社交媒体分享
- [ ] `favicon.ico` - 浏览器标签图标
- [ ] `apple-touch-icon.png` (180x180px) - iOS设备

### PWA图标（优先级中）
- [ ] `icon-72x72.png`
- [ ] `icon-96x96.png`
- [ ] `icon-128x128.png`
- [ ] `icon-144x144.png`
- [ ] `icon-152x152.png`
- [ ] `icon-192x192.png`
- [ ] `icon-384x384.png`
- [ ] `icon-512x512.png`

### 可选图片
- [ ] `game-screenshot.jpg` - 游戏实际截图
- [ ] `twitter-image.jpg` (1200x675px) - Twitter专用
- [ ] `favicon-32x32.png`
- [ ] `favicon-16x16.png`

## 🎯 图片规格要求

### Open Graph图片 (og-image.jpg)
- 尺寸：1200 x 630 像素
- 格式：JPG或PNG
- 大小：< 8MB
- 纵横比：1.91:1

### Favicon
- 尺寸：32x32, 16x16
- 格式：ICO或PNG
- 透明背景（可选）

### Apple Touch Icon
- 尺寸：180 x 180 像素
- 格式：PNG
- 圆角：系统自动添加，不需要预先设置

### PWA图标
- 尺寸：多种（见上方清单）
- 格式：PNG
- 建议：透明背景或与主题色背景

## 🛠️ 在线工具推荐

### 图片编辑
- **Photopea** - https://www.photopea.com/ (免费Photoshop替代品)
- **Canva** - https://www.canva.com/ (设计模板)
- **Remove.bg** - https://www.remove.bg/ (去除背景)

### 图标生成
- **Favicon.io** - https://favicon.io/ (生成favicon)
- **RealFaviconGenerator** - https://realfavicongenerator.net/ (全套图标生成)
- **App Icon Generator** - https://appicon.co/ (生成多尺寸图标)

### 图片优化
- **TinyPNG** - https://tinypng.com/ (压缩PNG/JPG)
- **Squoosh** - https://squoosh.app/ (Google图片优化工具)
- **ImageOptim** - https://imageoptim.com/ (Mac专用)

## 💡 临时方案

当前SVG文件可以临时使用，但需要注意：
1. 某些社交平台不支持SVG，需要转换为JPG/PNG
2. Favicon.ico需要专门生成
3. 建议尽快替换为高质量的真实图片

## 🔧 快速替换步骤

1. 获取/生成图片
2. 将图片放入 `images/` 目录
3. 确保文件名匹配HTML中的引用
4. 提交到Git：
   ```bash
   git add images/
   git commit -m "Add optimized images and icons"
   git push
   ```

## 📸 游戏截图获取指南

### 推荐截图内容
- 游戏主界面
- 精彩动作瞬间（跳跃、特技）
- 日落背景场景
- 不同摩托车展示

### 截图工具
- **Windows**: Win + Shift + S
- **Mac**: Cmd + Shift + 4
- **浏览器**: F12 开发者工具 → Device Toolbar → 设置尺寸

---

**注意**：SVG格式在现代浏览器中工作良好，但为了最佳兼容性和SEO效果，建议转换为标准的PNG/JPG格式。