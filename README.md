# Feishu Webhook Server

飞书机器人Webhook服务器，部署在Vercel上。

## 功能
- 处理飞书URL验证请求
- 接收飞书消息事件
- 返回标准JSON响应

## 部署到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maixuanfeng666-cmd/feishu-webhook)

## 本地开发
```bash
npm install
node test-local.js
```

## API端点
- `POST /api/feishu` - 飞书Webhook入口

## 飞书配置
Webhook URL:
```
https://你的域名.vercel.app/api/feishu
```

## 技术栈
- Node.js
- Vercel Serverless Functions