const express = require('express');
const router = express.Router();
const { getLatest, getHistorial } = require('../controllers/datosController');

router.get('/latest', getLatest);
router.get('/historial/:parametro', getHistorial);

module.exports = router;
