 // Vercel专用的飞书Webhook处理函数
   module.exports = async (req, res) => {
     // 设置响应头
     res.setHeader('Content-Type', 'application/json');
     res.setHeader('Access-Control-Al low-Origin', '*');
     res.setHeader('Access-Control-Al low-Methods', 'GET, POST, OPTIONS');
     res.setHeader('Access-Control-Al low-Headers', 'Content-Type');

     // 处理OPTIONS预检请求
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }

     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

     // 处理GET请求
     if (req.method === 'GET') {
       return res.json({
         status: 'ok',
         service: 'Feishu Webhook Server on Vercel',
         timestamp: new Date().toISOString(),
         endpoint: '/api/feishu',
         note: 'POST JSON with {"type":"url_verification","chal lenge":"test"} for Feishu verification'
       });
     }

     // 处理POST请求
     if (req.method === 'POST') {
       try {
         // Vercel可能已经解析了body，也可能没有
         let body = req.body;

         // 如果body是字符串，尝试解析
         if (typeof body === 'string') {
           try {
             body = JSON.parse(body);
           } catch (e) {
             return res.status(400).json({
               error: 'Invalid JSON',
               message: e.message,
               timestamp: new Date().toISOString()
             });
           }
         }

         console.log('Request body:', JSON.stringify(body, null, 2));

         // 飞书URL验证
         if (body && body.type === 'url_verification' && body.challenge) {
           console.log('Responding to Feishu challenge:', body.challenge);
           return res.json({
             challenge: body.challenge
           });
         }

         // 其他请求
         return res.json({
           status: 'received',
           message: 'Request received',
           timestamp: new Date().toISOString(),
           body: body || {}
         });

       } catch (error) {
         console.error('Server error:', error);
         return res.status(500).json({
           error: 'Internal Server Error',
           message: error.message,
           timestamp: new Date().toISOString()
         });
       }
     }

     // 其他HTTP方法
     res.status(405).json({
       error: 'Method Not Allowed',
       message: `Method ${req.method} not supported`,
       timestamp: new Date().toISOString()
     });
   };
