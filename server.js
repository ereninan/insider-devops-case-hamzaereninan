const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Vaka çalışmasının istediği ping endpoint'i
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Prober'lar için istenen healthz endpoint'i
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Mini HTTP service working onz ${port} port!`);
});
