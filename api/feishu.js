// api/feishu.js - 最简单版本
   export default function handler(req, res) {
     // 只处理飞书验证
     if (req.method === 'POST') {
       try {
         const body = req.body;

         // 飞书URL验证
         if (body && body.type === 'url_verification' && body.challenge) {
           return res.status(200).json({
             challenge: body.challenge
           });
         }

         // 默认响应
         return res.status(200).json({
           status: 'ok',
           timestamp: new Date().toISOString()
         });

       } catch (error) {
         return res.status(500).json({
           error: 'Server Error',
           message: error.message
         });
       }
     }

     // GET请求
     return res.status(200).json({
       status: 'ready',
       message: 'Feishu webhook endpoint',
       timestamp: new Date().toISOString()
     });
   }
