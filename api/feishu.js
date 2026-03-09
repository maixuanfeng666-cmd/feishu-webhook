// 最简单的Vercel函数 - 绝对不崩溃
   module.exports = (req, res) => {
     res.json({ message: 'Hello from Vercel', time: new Date().toISOString() });
   };
