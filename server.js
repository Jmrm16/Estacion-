// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

const datosRoutes = require('./routes/datos');
app.use('/', datosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
