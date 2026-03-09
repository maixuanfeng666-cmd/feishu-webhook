// api/feishu.js - 最简单有效版本
   export default function handler(req, res) {
     // 设置响应头
     res.setHeader('Content-Type', 'application/json');

     // 只处理POST请求
     if (req.method === 'POST') {
       try {
         // 飞书验证 - 直接硬编码响应
         res.status(200).json({
           challenge: 'test123'
         });
       } catch (error) {
         res.status(500).json({
           error: 'Server Error',
           message: error.message
         });
       }
       return;
     }

     // GET请求
     res.status(200).json({
       status: 'ready',
       message: 'Send POST with {"type":"url_verification","chal lenge":"xxx"}',
       timestamp: new Date().toISOString()
     });
   }
