// Vercel Serverless Function for Feishu Webhook
module.exports = async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理OPTIONS预检
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    const body = req.body || {};
    console.log('Body:', JSON.stringify(body, null, 2));
    
    // 飞书URL验证
    if (body.type === 'url_verification' && body.challenge) {
      console.log('Responding to Feishu challenge:', body.challenge);
      return res.status(200).json({
        challenge: body.challenge
      });
    }
    
    // 消息事件
    if (body.type === 'im.message.receive_v1') {
      console.log('Received message event:', body.event);
      // 这里可以处理消息
      return res.status(200).json({ ok: true });
    }
    
    // 默认响应
    return res.status(200).json({
      status: 'ok',
      service: 'Feishu Webhook on Vercel',
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};