# Vercel 手动部署指南

## 问题：代码推送后Vercel没有自动部署

### 快速解决方案（推荐）

#### 方法1：Vercel Dashboard手动部署
1. 访问：https://vercel.com/dashboard
2. 选择项目：`sunsetbikeracing`
3. 点击右上角 **"Deployments"**
4. 点击最新部署右侧的 **"..."** 菜单
5. 选择 **"Redeploy"**
6. 等待30-60秒完成

#### 方法2：使用Vercel CLI（推荐，最快）

```bash
# 1. 安装Vercel CLI（如果还没有）
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 进入项目目录
cd C:\Users\13933\Desktop\sunsetbikeracing

# 4. 部署到生产环境
vercel --prod

# 系统会询问：
# ? Set up and deploy "sunsetbikeracing"? [Y/n] y
# ? Which scope do you want to deploy to? [选择你的账号]
# ? Link to existing project? [Y/n] y
# ? What's the name of your existing project? sunsetbikeracing
```

---

## 检查Git集成配置

### 在Vercel Dashboard中：

1. **进入项目设置**
   ```
   Dashboard → sunsetbikeracing → Settings → Git
   ```

2. **检查以下配置**：
   - ✅ **Connected Repository**: `lgd3206/sunsetbikeracing`
   - ✅ **Production Branch**: `main`
   - ✅ **Auto-deploy**: 已启用

3. **如果没有连接**：
   - 点击 **"Connect Git Repository"**
   - 选择 **GitHub**
   - 授权访问
   - 选择 `lgd3206/sunsetbikeracing` 仓库

---

## 常见原因和解决方法

### 原因1：项目未连接到GitHub
**症状**：Vercel项目存在，但没有Git图标
**解决**：在Settings → Git中重新连接

### 原因2：分支名称不匹配
**症状**：推送到main，但Vercel监听master
**解决**：在Settings → Git → Production Branch改为`main`

### 原因3：Vercel权限不足
**症状**：GitHub App没有仓库访问权限
**解决**：
1. 访问：https://github.com/settings/installations
2. 找到 **Vercel**
3. 点击 **Configure**
4. 确保 `sunsetbikeracing` 在授权列表中

### 原因4：webhook未配置
**症状**：手动部署可以，自动部署不行
**解决**：
1. 访问：https://github.com/lgd3206/sunsetbikeracing/settings/hooks
2. 检查是否有Vercel webhook
3. 如果没有，在Vercel中重新连接Git

---

## 触发自动部署的方法

### 方法1：推送新提交
```bash
# 做一个小修改触发部署
cd C:\Users\13933\Desktop\sunsetbikeracing
echo "# Trigger deployment" >> README.md
git add README.md
git commit -m "Trigger Vercel deployment"
git push
```

### 方法2：使用Deploy Hook
1. Vercel Dashboard → Settings → Git → Deploy Hooks
2. 创建新的Deploy Hook
3. 复制URL
4. 使用curl触发：
   ```bash
   curl -X POST [你的Deploy Hook URL]
   ```

---

## 验证部署状态

### 在Vercel Dashboard
1. 进入项目
2. 查看 **Deployments** 标签
3. 应该看到：
   - ✅ **Ready** - 部署成功
   - 🔄 **Building** - 正在构建
   - ❌ **Error** - 部署失败

### 在命令行
```bash
# 使用Vercel CLI查看状态
vercel ls

# 查看最新部署
vercel inspect [deployment-url]
```

---

## 紧急修复：完全重新连接

如果以上都不行，完全重新连接：

1. **在Vercel中删除项目**（不会删除代码）
   - Dashboard → sunsetbikeracing → Settings → General
   - 滚动到底部 → Delete Project

2. **重新导入**
   - Dashboard → Add New → Project
   - Import from GitHub
   - 选择 `lgd3206/sunsetbikeracing`
   - Framework Preset: Other
   - 点击 Deploy

---

## 当前状态检查清单

请检查以下项目并告诉我结果：

- [ ] Vercel Dashboard中能看到项目吗？
- [ ] 项目是否连接到GitHub仓库？
- [ ] Production Branch是否设置为`main`？
- [ ] Deployments标签中有部署记录吗？
- [ ] 最新部署是什么时候？
- [ ] GitHub仓库有Vercel webhook吗？

---

## 立即行动

**最快的解决方案：**

1. 访问：https://vercel.com/dashboard
2. 找到 `sunsetbikeracing` 项目
3. 点击 **Deployments**
4. 点击 **"Redeploy"** 按钮

**或者使用CLI（更快）：**
```bash
npm install -g vercel
vercel login
cd C:\Users\13933\Desktop\sunsetbikeracing
vercel --prod
```

30秒内完成部署！