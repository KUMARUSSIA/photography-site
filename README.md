# Photography Site

面向中国大陆访问的个人摄影作品网站骨架。

## 推荐部署架构

```text
GitHub 仓库：网站代码与作品数据
国内服务器/静态托管：www.yourdomain.com
COS/OSS + CDN：img.yourdomain.com
NAS：原图、本地备份、导出 Web 图片
```

## 本地预览

这个版本是纯静态网站，可以直接双击 `index.html` 打开。也可以在项目目录运行：

```powershell
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 替换你的信息

1. 打开 `index.html`，替换网站标题、关于我、邮箱、微信和社交链接。
2. 打开 `site.config.js`，把图片 CDN 域名改成你的域名：

```js
window.PHOTO_SITE_CONFIG = {
  siteName: "Your Name Photography",
  imageBaseUrl: "https://img.yourdomain.com",
};
```

3. 打开 `script.js`，替换 `photos` 和 `albums` 里的作品标题、年份、分类和图片路径。

图片路径建议使用：

```text
/portraits/photo-001-1200.webp
/city/photo-002-1200.webp
/projects/project-a-cover-1200.webp
```

最终网站会访问：

```text
https://img.yourdomain.com/portraits/photo-001-1200.webp
```

## 图片导出建议

原图留在 NAS 私有目录，不要公开。网站只使用导出图。

```text
NAS:
  /Photos/Originals/
  /Photos/Web/
    portraits/
    city/
    projects/
```

推荐导出规格：

```text
缩略图：400px 宽，WebP，质量 70-80
列表图：1200px 宽，WebP，质量 75-85
大图：2400px 宽，WebP，质量 75-85
```

## GitHub 使用方式

```powershell
git init
git add .
git commit -m "Initial photography site"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/photography-site.git
git push -u origin main
```

不要把大量原图放进 GitHub。GitHub 只放代码、少量图标和作品数据。

## 国内部署建议

稳妥路线：

```text
腾讯云轻量服务器 + Nginx + COS + CDN
```

低运维路线：

```text
COS/OSS 静态网站托管 + CDN
```

如果使用服务器，把这个目录上传到服务器的 Nginx 网站目录即可。

## 备案

如果使用中国大陆服务器、国内 CDN 或绑定国内云服务域名，通常需要 ICP 备案。建议先买域名和轻量服务器，再跟随云服务商控制台完成备案流程。
