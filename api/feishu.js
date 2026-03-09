// 使用CommonJS格式
   module.exports = function(req, res) {
     res.json({ test: 'OK', time: new Date().toISOString() });
   };
