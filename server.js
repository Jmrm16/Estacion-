const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4000;

app.use(cors());

const datosRoutes = require('./routes/datos');
app.use('/', datosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
