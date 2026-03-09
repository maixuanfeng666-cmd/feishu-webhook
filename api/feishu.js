// api/feishu.js
   export default function handler(req, res) {
     // 设置响应头
     res.setHeader('Content-Type', 'application/json');

     // 处理OPTIONS预检
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }

     // GET请求
     if (req.method === 'GET') {
       res.status(200).json({
         status: 'ready',
         message: 'Feishu webhook endpoint',
         timestamp: new Date().toISOString()
       });
       return;
     }

     // POST请求
     if (req.method === 'POST') {
       try {
         let body = {};

         // 手动解析JSON
         if (typeof req.body === 'string') {
           body = JSON.parse(req.body);
         } else if (req.body) {
           body = req.body;
         }

         console.log('Received body:', body);

         // 飞书URL验证
         if (body.type === 'url_verification' && body.challenge) {
           res.status(200).json({
             challenge: body.challenge
           });
           return;
         }

         // 默认响应
         res.status(200).json({
           status: 'ok',
           timestamp: new Date().toISOString(),
           received: body
         });

       } catch (error) {
         console.error('Error:', error);
         res.status(500).json({
           error: 'Invalid JSON',
           message: error.message,
           receivedBody: req.body
         });
       }
       return;
     }

     // 其他方法
     res.status(405).json({
       error: 'Method Not Allowed',
       message: `Method ${req.method} not supported`
     });
   }
