 // 最简化的飞书验证函数
   module.exports = async (req, res) => {
     // 只处理POST请求
     if (req.method !== 'POST') {
       return res.json({
         message: 'Send POST request with {"type":"url_verification","chal lenge":"test"}'
       });
     }

     try {
       // 获取请求体
       const body = req.body || {};

       // 飞书验证
       if (body.type === 'url_verification' && body.challenge) {
         return res.json({ challenge: body.challenge });
       }

       // 其他请求
       return res.json({
         received: true,
         body: body,
         timestamp: new Date().toISOString()
       });

     } catch (error) {
       return res.status(500).json({
         error: error.message,
         timestamp: new Date().toISOString()
       });
     }
   };
