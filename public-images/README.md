# Public Images

这个目录只用于说明网站图片结构。实际生产环境建议把图片上传到 COS/OSS，并通过 `img.yourdomain.com` 访问。

建议线上结构：

```text
img.yourdomain.com/
  portraits/
    photo-001-400.webp
    photo-001-1200.webp
    photo-001-2400.webp
  city/
  projects/
```

如果你想先本地测试，可以临时把 `site.config.js` 改成：

```js
imageBaseUrl: "./public-images"
```

然后按同样路径放入图片。
