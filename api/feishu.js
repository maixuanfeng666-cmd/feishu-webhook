// feishu-webhook.js
   module.exports = async (req, res) => {
     // 设置CORS
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

     // 处理OPTIONS预检
     if (req.method === 'OPTIONS') {
       return res.status(200).end();
     }

     console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

     try {
       const body = req.body || {};

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
         service: 'Feishu Webhook',
         timestamp: new Date().toISOString()
       });

     } catch (error) {
       console.error('Error:', error);
       return res.status(500).json({
         error: 'Internal Server Error',
         message: error.message
       });
     }
   };
