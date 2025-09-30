# 🌐 Cloudflare + Vercel 部署指南

## 📋 方案概述

**推荐方案：Cloudflare DNS + Vercel 托管**
- ✅ 免费CDN加速
- ✅ 自动HTTPS
- ✅ DDoS防护
- ✅ 更好的全球访问速度
- ✅ Vercel自动化部署

---

## 🚀 部署步骤

### 第一步：Vercel部署（托管平台）

#### 1.1 登录Vercel
- 访问：https://vercel.com/
- 使用GitHub账号登录

#### 1.2 导入项目
- 点击 **"Add New..."** → **"Project"**
- 选择 `lgd3206/sunsetbikeracing` 仓库
- 点击 **"Import"**

#### 1.3 配置设置
```
Framework Preset: Other
Root Directory: ./
Build Command: (留空)
Output Directory: (留空)
Install Command: (留空)
```

#### 1.4 部署
- 点击 **"Deploy"**
- 等待30-60秒完成
- 记下Vercel URL: `https://sunsetbikeracing.vercel.app`

---

### 第二步：Cloudflare配置（CDN加速）

#### 2.1 添加站点到Cloudflare

1. 登录 https://dash.cloudflare.com/
2. 点击 **"添加站点"** / **"Add a Site"**
3. 输入：`sunsetbikeracing.bike`
4. 选择 **Free** 计划（免费）
5. 点击继续

#### 2.2 更新域名的Nameservers（名称服务器）

Cloudflare会显示两个nameservers，例如：
```
amos.ns.cloudflare.com
luna.ns.cloudflare.com
```

**在域名注册商处操作：**
1. 登录域名注册商（购买 sunsetbikeracing.bike 的网站）
2. 找到域名管理 → DNS设置 → 名称服务器
3. 将nameservers更改为Cloudflare提供的两个
4. 保存（生效需要1-24小时，通常5-30分钟）

#### 2.3 配置DNS记录

等待nameservers生效后，在Cloudflare DNS管理页面添加以下记录：

**方法A：指向Vercel（推荐）**

| 类型 | 名称 | 目标/内容 | 代理状态 | TTL |
|------|------|----------|---------|-----|
| CNAME | @ | cname.vercel-dns.com | 已代理（橙色云朵） | 自动 |
| CNAME | www | cname.vercel-dns.com | 已代理（橙色云朵） | 自动 |

**注意：** 具体的CNAME值请以Vercel在 Settings → Domains 中显示的为准。

**方法B：使用Vercel的A记录**

| 类型 | 名称 | 目标/内容 | 代理状态 | TTL |
|------|------|----------|---------|-----|
| A | @ | 76.76.21.21 | 已代理（橙色云朵） | 自动 |
| CNAME | www | sunsetbikeracing.bike | 已代理（橙色云朵） | 自动 |

⚠️ **重要：** 确保代理状态是 **已代理**（橙色云朵图标），这样才能使用Cloudflare的CDN加速。

---

### 第三步：在Vercel添加自定义域名

#### 3.1 添加域名

1. 在Vercel项目中，进入 **Settings** → **Domains**
2. 输入：`sunsetbikeracing.bike`
3. 点击 **"Add"**
4. 再输入：`www.sunsetbikeracing.bike`
5. 点击 **"Add"**

#### 3.2 验证配置

Vercel会自动检测DNS配置，如果正确会显示 ✅ 图标。

如果显示错误，检查：
- Cloudflare DNS记录是否正确
- Nameservers是否已切换到Cloudflare
- 等待5-30分钟让DNS生效

---

### 第四步：Cloudflare SSL/TLS配置

#### 4.1 设置SSL模式

1. 在Cloudflare中，进入 **SSL/TLS** → **概述**
2. 将加密模式设置为：**完全(严格)** 或 **Full (Strict)**

**不要选择"灵活"模式！**

#### 4.2 启用Always Use HTTPS

1. 进入 **SSL/TLS** → **Edge Certificates**
2. 开启 **Always Use HTTPS**
3. 开启 **Automatic HTTPS Rewrites**

---

### 第五步：Cloudflare性能优化（可选）

#### 5.1 启用Brotli压缩
- **Speed** → **Optimization**
- 开启 **Brotli** 压缩

#### 5.2 设置缓存规则
- **Caching** → **Configuration**
- Browser Cache TTL: 4 hours

#### 5.3 启用Auto Minify
- **Speed** → **Optimization**
- 勾选：HTML, CSS, JavaScript

#### 5.4 开启HTTP/3
- **Network** → 开启 **HTTP/3 (with QUIC)**

---

## 🔍 验证部署

### 检查DNS
访问：https://dnschecker.org/
输入：`sunsetbikeracing.bike`
确保全球多个地区都能解析到正确的IP

### 检查SSL
访问：https://www.ssllabs.com/ssltest/
输入：`sunsetbikeracing.bike`
应该获得 A 或 A+ 评级

### 访问网站
- https://sunsetbikeracing.bike
- https://www.sunsetbikeracing.bike
- https://sunsetbikeracing.vercel.app（Vercel直连）

---

## 📊 Cloudflare Page Rules（可选优化）

如果需要更精细的控制，可以设置Page Rules：

### 规则1：缓存静态资源
```
URL: *sunsetbikeracing.bike/images/*
设置:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 month
```

### 规则2：缓存CSS/JS
```
URL: *sunsetbikeracing.bike/css/*
URL: *sunsetbikeracing.bike/js/*
设置:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
```

---

## 🆘 故障排查

### 问题1：网站显示"DNS解析错误"
**解决：**
- 检查nameservers是否已切换到Cloudflare
- 等待DNS传播（可能需要24小时）
- 使用 `nslookup sunsetbikeracing.bike` 检查

### 问题2：显示"重定向次数过多"
**解决：**
- 将Cloudflare SSL模式改为 **完全(严格)**
- 不要使用"灵活"模式

### 问题3：Vercel显示域名配置错误
**解决：**
- 确保Cloudflare DNS记录指向正确
- 确保代理状态已开启（橙色云朵）
- 等待5-10分钟后重试

### 问题4：网站速度慢
**解决：**
- 确认Cloudflare代理已开启（橙色云朵）
- 启用Brotli压缩
- 设置缓存规则
- 开启Auto Minify

---

## 🎯 最佳实践总结

### DNS配置
✅ 使用Cloudflare Nameservers
✅ CNAME记录指向 cname.vercel-dns.com
✅ 开启橙色云朵（CDN代理）

### SSL配置
✅ 使用"完全(严格)"模式
✅ 开启 Always Use HTTPS
✅ 开启 Automatic HTTPS Rewrites

### 性能优化
✅ 启用Brotli压缩
✅ 启用Auto Minify
✅ 配置缓存规则
✅ 开启HTTP/3

### Vercel配置
✅ 添加两个域名（@ 和 www）
✅ 等待验证通过
✅ 配置GitHub自动部署

---

## 📈 监控和分析

### Cloudflare Analytics
- 查看访问量、带宽、威胁统计
- 路径：Cloudflare Dashboard → Analytics

### Vercel Analytics
- 查看Core Web Vitals
- 路径：Vercel Project → Analytics

### Google Search Console
- 提交sitemap: `https://sunsetbikeracing.bike/sitemap.xml`
- 监控SEO表现

---

## 🔄 自动化部署流程

配置完成后，开发流程：

```bash
# 1. 修改代码
# 2. 提交到GitHub
git add .
git commit -m "Update features"
git push

# 3. Vercel自动检测并部署（30-60秒）
# 4. Cloudflare自动分发到全球CDN
# 5. 网站自动更新！
```

---

## ⚡ 性能预期

配置完成后应达到：

- **加载时间**: < 2秒（全球平均）
- **Lighthouse分数**: 90+
- **SSL评级**: A+
- **CDN命中率**: 85%+
- **带宽节省**: 60%+

---

## 📞 需要帮助？

- **Cloudflare支持**: https://support.cloudflare.com/
- **Vercel文档**: https://vercel.com/docs
- **DNS检测工具**: https://dnschecker.org/
- **SSL测试**: https://www.ssllabs.com/ssltest/

---

**下一步：**
1. 在域名注册商处更新nameservers到Cloudflare
2. 在Cloudflare配置DNS记录
3. 在Vercel添加自定义域名
4. 等待DNS生效并测试！🚀