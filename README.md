# 嗷呜导航 (xn--nsr30bl8nb2kyt7a8vs.top) 完整备份

下载时间：2026-10-24
来源：http://xn--nsr30bl8nb2kyt7a8vs.top/

## 网站文件（本站域名下的全部文件）

```
├── index.html          主页「嗷呜的小屋」
├── styles.css          主页样式
├── script.php          主页脚本（PHP 输出的 JS，含接口/资源导航数据）
├── favicon.ico         网站图标
├── robots.txt          爬虫规则
├── sitemap.xml         站点地图（列出 / 和 /jm/ 两个页面）
├── 404.html            nginx 默认 404 页
├── assets/
│   └── logo.gif        主页 logo 动图
├── api/
│   ├── saying.php      每日语录接口（动态 JSON，已保存一次响应样本）
│   └── decode.php      加密接口解密接口（需 POST JSON {url:...}，已保存错误响应样本）
└── jm/
    ├── index.html      「加密接口解密」页面
    ├── styles.css      解密页样式
    └── script.js       解密页脚本
```

## external/ 目录（非本站文件，页面依赖的外部资源备份）

- `aowu.json` — 备用接口一的 TVBox 配置（原址 https://9763.kstore.vip/aowu.json ，15KB）
- `icon-*.png/jpg` — 「免费资源推荐」卡片使用的 6 个外部图标（必应/百度 CDN 缩略图）

说明：主页 script.php 中的图标直接引用外部 CDN 地址，离线打开主页时这些图标
不会自动加载 local 备份；如需完全离线显示，需把 script.php 中 NAV_RESOURCES
的 icon 字段改为本地路径。

## 动态接口说明

- `api/saying.php`：每次请求随机返回一条语录，保存的是抓取时的响应样本，
  PHP 源码本身无法从外部下载（服务器只返回执行结果）。
- `api/decode.php`：需要 POST 提交 `{"url": "..."}` 才工作，直接 GET 返回 500。
  同样只能拿到响应，拿不到源码。
