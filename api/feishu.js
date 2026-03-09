// Feishu Webhook for Vercel - Simple and Correct
   module.exports = async (req, res) => {
     // Set CORS headers
     res.setHeader('Access-Control-Al low-Origin', '*');
     res.setHeader('Access-Control-Al low-Methods', 'GET,POST,OPTIONS');
     res.setHeader('Access-Control-Al low-Headers', 'Content-Type');

     // Handle OPTIONS preflight
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }

     // Handle GET request
     if (req.method === 'GET') {
       res.json({
         status: 'ok',
         service: 'Feishu Webhook',
         time: new Date().toISOString()
       });
       return;
     }

     // Handle POST request
     if (req.method === 'POST') {
       try {
         // Get request body
         const body = req.body || {};

         // Feishu URL verification
         if (body.type === 'url_verification' && body.challenge) {
           res.json({
             challenge: body.challenge
           });
           return;
         }

         // Other requests
         res.json({
           received: true,
           body: body,
           time: new Date().toISOString()
         });

       } catch (error) {
         res.status(500).json({
           error: error.message,
           time: new Date().toISOString()
         });
       }
       return;
     }

     // Other HTTP methods
     res.status(405).json({
       error: 'Method not allowed',
       time: new Date().toISOString()
     });
   };
