// api/feishu.js
   export default async function handler(req, res) {
     // 设置超时
     res.setTimeout(30000);

     // CORS
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

     // 处理OPTIONS
     if (req.method === 'OPTIONS') {
       return res.status(200).end();
     }

     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

     try {
       // 解析JSON请求体
       let body = {};
       if (req.method === 'POST') {
         if (typeof req.body === 'string') {
           body = JSON.parse(req.body);
         } else if (req.body) {
           body = req.body;
         }
       }

       console.log('Request body:', JSON.stringify(body));

       // 飞书URL验证
       if (body.type === 'url_verification' && body.challenge) {
         console.log('Feishu challenge:', body.challenge);
         return res.status(200).json({
           challenge: body.challenge
         });
       }

       // 默认响应
       return res.status(200).json({
         status: 'ok',
         service: 'Feishu Webhook on Vercel',
         timestamp: new Date().toISOString(),
         method: req.method,
         body: body
       });

     } catch (error) {
       console.error('Error:', error);
       return res.status(500).json({
         error: 'Internal Server Error',
         message: error.message,
         stack: error.stack
       });
     }
   }
