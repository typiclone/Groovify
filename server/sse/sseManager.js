let clients = [];

function initSSE(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(c => c !== res);
  });
}

function broadcastUpdate(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(c => c.write(payload));
}

module.exports = { initSSE, broadcastUpdate };
