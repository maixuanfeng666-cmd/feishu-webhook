// 完整的飞书Webhook处理函数
   module.exports = function(req, res) {
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

     // 记录访问
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

     // 处理GET请求（健康检查）
     if (req.method === 'GET') {
       return res.json({
         status: 'ok',
         service: 'Feishu Webhook Server',
         timestamp: new Date().toISOString(),
         path: req.url,
         method: req.method
       });
     }

     // 处理POST请求（飞书Webhook）
     if (req.method === 'POST') {
       let body = '';

       // 收集请求体
       req.on('data', chunk => {
         body += chunk.toString();
       });

       req.on('end', () => {
         try {
           const data = body ? JSON.parse(body) : {};
           console.log('Received data:', JSON.stringify(data, null, 2));

           // 飞书URL验证请求
           if (data.type === 'url_verification' && data.challenge) {
             console.log('Responding to Feishu challenge:', data.challenge);
             return res.json({
               challenge: data.challenge
             });
           }

           // 其他飞书事件
           if (data.type === 'im.message.receive_v1') {
             console.log('Received message event:', data.event);
             // 这里可以处理消息
             return res.json({ ok: true });
           }

           // 默认响应
           res.json({
             status: 'received',
             message: 'Request received but not a Feishu verification',
             timestamp: new Date().toISOString(),
             receivedData: data
           });

         } catch (error) {
           console.error('Error processing request:', error);
           res.status(400).json({
             error: 'Bad Request',
             message: 'Invalid JSON format',
             timestamp: new Date().toISOString()
           });
         }
       });

       return; // 等待异步处理
     }

     // 其他HTTP方法
     res.status(405).json({
       error: 'Method Not Allowed',
       message: `Method ${req.method} not supported`,
       timestamp: new Date().toISOString()
     });
   };
