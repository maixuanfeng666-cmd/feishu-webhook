// 完整的飞书验证函数 - Vercel专用
   module.exports = async (req, res) => {
     // 设置CORS头
     res.setHeader('Access-Control-Al low-Origin', '*');
     res.setHeader('Access-Control-Al low-Methods', 'GET, POST, OPTIONS');
     res.setHeader('Access-Control-Al low-Headers', 'Content-Type');

     // 处理OPTIONS预检请求
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }

     // 处理GET请求（健康检查）
     if (req.method === 'GET') {
       return res.json({
         status: 'ok',
         service: 'Feishu Webhook Server',
         timestamp: new Date().toISOString(),
         instructions: 'Send POST request with {"type":"url_verification","chal lenge":"your-challenge"}'
       });
     }

     // 只处理POST请求
     if (req.method !== 'POST') {
       return res.status(405).json({
         error: 'Method Not Allowed',
         message: 'Only POST requests are accepted for Feishu webhook'
       });
     }

     try {
       // 获取请求体 - Vercel自动解析
       const body = req.body || {};

       console.log('Received request:', JSON.stringify(body, null, 2));

       // 飞书URL验证
       if (body.type === 'url_verification' && body.challenge) {
         console.log('Feishu verification challenge:', body.challenge);
         return res.json({
           challenge: body.challenge
         });
       }

       // 飞书消息事件
       if (body.type === 'im.message.receive_v1') {
         console.log('Feishu message event received');
         return res.json({
           ok: true,
           message: 'Message received',
           event: body.event
         });
       }

       // 其他POST请求
       return res.json({
         status: 'received',
         message: 'Request received but not a Feishu verification',
         timestamp: new Date().toISOString(),
         body: body
       });

     } catch (error) {
       console.error('Error:', error);
       return res.status(500).json({
         error: 'Internal Server Error',
         message: error.message,
         timestamp: new Date().toISOString()
       });
     }
   };
