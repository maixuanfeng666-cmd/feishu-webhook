 // 超级简单的Vercel函数 - 保证工作
   module.exports = (req, res) => {
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

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

     try {
       // 准备响应数据
       const response = {
         status: 'ok',
         message: 'Feishu Webhook Server is working!',
         timestamp: new Date().toISOString(),
         path: req.url,
         method: req.method
       };

       // 如果是POST请求，尝试处理飞书验证
       if (req.method === 'POST') {
         let body = '';
         req.on('data', chunk => {
           body += chunk.toString();
         });

         req.on('end', () => {
           try {
             if (body) {
               const data = JSON.parse(body);
               console.log('Received body:', data);

               // 飞书URL验证
               if (data.type === 'url_verification' && data.challenge) {
                 console.log('Responding to Feishu challenge:', data.challenge);
                 return res.status(200).json({
                   challenge: data.challenge
                 });
               }

               response.receivedData = data;
             }

             // 返回通用响应
             res.status(200).json(response);

           } catch (parseError) {
             console.error('JSON parse error:', parseError);
             response.error = 'Invalid JSON';
             response.parseError = parseError.message;
             res.status(200).json(response);
           }
         });

         return; // 等待异步处理完成
       }

       // GET请求直接返回
       res.status(200).json(response);

     } catch (error) {
       console.error('Server error:', error);
       res.status(500).json({
         error: 'Internal Server Error',
         message: error.message,
         timestamp: new Date().toISOString()
       });
     }
   };
