# 🚀 Vercel 部署指南

## ✅ 准备工作（已完成）

- ✅ 代码已提交到本地Git仓库
- ✅ 域名已更新为 sunsetbikeracing.bike
- ✅ vercel.json 配置文件已创建
- ⏳ 等待推送到GitHub（网络连接问题，稍后重试）

## 📋 完整部署步骤

### 第一步：推送代码到GitHub（待完成）

**网络问题，请稍后手动执行：**
```bash
cd C:\Users\13933\Desktop\sunsetbikeracing
git push
```

或者检查网络代理设置后重试。

---

### 第二步：注册/登录 Vercel

1. 访问 **https://vercel.com/**
2. 点击 **"Sign Up"** 或 **"Log In"**
3. 推荐使用 **GitHub 账号登录**（这样可以直接访问仓库）

---

### 第三步：导入GitHub仓库

#### 方法A：通过Vercel Dashboard（推荐）

1. 登录后，点击 **"Add New..."** → **"Project"**
2. 选择 **"Import Git Repository"**
3. 找到 **`lgd3206/sunsetbikeracing`** 仓库
4. 点击 **"Import"**

#### 方法B：通过命令行（可选）

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd C:\Users\13933\Desktop\sunsetbikeracing
vercel --prod
```

---

### 第四步：配置项目设置

在Vercel导入项目时：

1. **Framework Preset**: 选择 **"Other"** 或 **"Static"**
2. **Root Directory**: 保持默认 `./`
3. **Build Command**: 留空（静态网站不需要构建）
4. **Output Directory**: 留空或填 `./`
5. **Install Command**: 留空

点击 **"Deploy"** 开始部署。

---

### 第五步：等待部署完成

- 部署通常需要 **30-60秒**
- Vercel会自动生成一个预览URL，格式如：
  - `https://sunsetbikeracing-xxx.vercel.app`
- 部署成功后会显示 ✅ 图标

---

### 第六步：配置自定义域名

#### 6.1 在Vercel中添加域名

1. 进入项目的 **Settings** → **Domains**
2. 输入域名：
   - `sunsetbikeracing.bike`
   - `www.sunsetbikeracing.bike`
3. 点击 **"Add"**

#### 6.2 Vercel会提供DNS配置信息

Vercel会显示需要添加的DNS记录，通常是：

**A记录（用于根域名）：**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 自动
```

**CNAME记录（用于www子域名）：**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 自动
```

#### 6.3 在域名注册商处配置DNS

1. 登录你的域名注册商（购买 sunsetbikeracing.bike 的地方）
2. 找到 **DNS设置** 或 **域名解析**
3. 添加Vercel提供的DNS记录：

**示例（根据实际Vercel提供的信息）：**

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | @ | 76.76.21.21 | 自动 |
| CNAME | www | cname.vercel-dns.com | 自动 |

4. 保存DNS设置

#### 6.4 等待DNS生效

- DNS传播通常需要 **5分钟到48小时**
- 可以用 https://dnschecker.org/ 检查DNS是否生效

---

### 第七步：验证部署

访问以下URL确认网站正常运行：

1. **Vercel预览URL**: `https://sunsetbikeracing-xxx.vercel.app`
2. **自定义域名**:
   - `https://sunsetbikeracing.bike`
   - `https://www.sunsetbikeracing.bike`

---

## 🔧 Vercel配置说明

已创建的 `vercel.json` 包含：

### ✅ 路由配置
- 静态资源路由（CSS、JS、图片）
- 单页应用路由（所有请求指向 index.html）

### ✅ 安全头
- `X-Content-Type-Options: nosniff` - 防止MIME类型嗅探
- `X-Frame-Options: SAMEORIGIN` - 防止点击劫持
- `Referrer-Policy: strict-origin-when-cross-origin` - 隐私保护

### ✅ 缓存策略
- CSS/JS/图片：1年强缓存（不可变）
- 提升加载速度和SEO评分

---

## 🌐 部署后配置

### 1. 配置HTTPS（自动）
- Vercel自动提供免费SSL证书
- 所有HTTP请求自动重定向到HTTPS

### 2. 提交到搜索引擎

#### Google Search Console
1. 访问 https://search.google.com/search-console
2. 添加属性：`sunsetbikeracing.bike`
3. 使用 **HTML标签验证** 或 **DNS验证**
4. 提交sitemap：`https://sunsetbikeracing.bike/sitemap.xml`

#### Bing Webmaster Tools
1. 访问 https://www.bing.com/webmasters
2. 添加网站
3. 提交sitemap

### 3. 配置分析工具

#### Google Analytics 4
在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📱 测试清单

部署后请测试：

- [ ] 网站可以通过Vercel URL访问
- [ ] 自定义域名可以访问
- [ ] HTTPS正常工作
- [ ] 所有图片正常加载
- [ ] 游戏iframe正常显示
- [ ] 移动端响应式正常
- [ ] SEO meta标签正确
- [ ] Sitemap可以访问
- [ ] Robots.txt可以访问

---

## 🆘 常见问题

### Q1: DNS配置后网站无法访问
**A:** DNS传播需要时间，等待5-60分钟后重试。

### Q2: 显示"Deployment Failed"
**A:** 检查vercel.json语法是否正确，确保所有文件已推送到GitHub。

### Q3: 图片无法显示
**A:** 检查图片路径是否正确，确保images目录已上传。

### Q4: 游戏无法加载
**A:** 检查iframe的src地址是否可访问，可能需要配置CSP头。

---

## 🎯 优化建议

### 1. 启用Vercel Analytics
在项目Settings中启用Analytics，监控：
- 页面访问量
- 加载性能
- Core Web Vitals

### 2. 配置环境变量（如需要）
Settings → Environment Variables

### 3. 配置GitHub集成
自动部署：每次push到main分支，Vercel自动重新部署

---

## 📞 需要帮助？

- **Vercel文档**: https://vercel.com/docs
- **Vercel支持**: https://vercel.com/support
- **社区论坛**: https://github.com/vercel/vercel/discussions

---

## ⚡ 快速命令参考

```bash
# 推送到GitHub（网络恢复后）
git push

# 查看部署状态（如果安装了Vercel CLI）
vercel ls

# 查看部署日志
vercel logs

# 重新部署
vercel --prod
```

---

**下一步：** 等待网络恢复后，执行 `git push`，然后按照上述步骤在Vercel上部署网站！🚀