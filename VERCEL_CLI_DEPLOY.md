# Vercel CLI 部署指南

## ✅ Vercel CLI 已安装

现在请按照以下步骤操作：

---

## 第一步：登录Vercel

在命令行执行：
```bash
vercel login
```

**会发生什么：**
1. 命令行会显示一个链接
2. 浏览器会自动打开（或手动复制链接到浏览器）
3. 点击 **"Confirm"** 按钮授权登录
4. 看到 "Success!" 后回到命令行

---

## 第二步：部署项目

登录成功后，执行：
```bash
cd C:\Users\13933\Desktop\sunsetbikeracing
vercel --prod
```

**会提示的问题和回答：**

```
? Set up and deploy "sunsetbikeracing"? (Y/n)
答：Y (按Enter)

? Which scope do you want to deploy to?
答：选择你的账号名（用方向键选择，Enter确认）

? Link to existing project? (Y/n)
答：Y (因为你已经有项目了)

? What's the name of your existing project?
答：sunsetbikeracing (输入项目名称)

? Inspect: https://vercel.com/xxx/sunsetbikeracing/xxx [xxxms]
✅ Production: https://sunsetbikeracing.bike [xx秒]
```

---

## 预期结果

部署成功后会显示：
```
✅ Production: https://sunsetbikeracing.bike
🔍 Inspect: https://vercel.com/xxx/sunsetbikeracing/xxx
```

**这时候网站就已经更新了最新代码！**

---

## 如果提示"No existing projects"

说明Vercel识别不到你的项目，那就创建新的：

```
? Link to existing project? (Y/n)
答：n

? What's your project's name?
答：sunsetbikeracing

? In which directory is your code located?
答：./ (按Enter)

? Want to modify these settings? (y/N)
答：n (按Enter)
```

---

## 第三步：配置域名（部署成功后）

### 在Vercel Dashboard中：

1. 进入项目 → **Settings** → **Domains**
2. 添加域名：`sunsetbikeracing.bike`
3. 添加域名：`www.sunsetbikeracing.bike`

### 在Cloudflare中确认DNS配置：

确保有这些记录：
| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|---------|
| CNAME | @ | cname.vercel-dns.com | 🟠 已代理 |
| CNAME | www | cname.vercel-dns.com | 🟠 已代理 |

---

## 立即执行

请在命令行（PowerShell或CMD）执行：

```bash
vercel login
```

然后告诉我登录是否成功！