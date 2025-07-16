const db = require('../firebase/firebase');

/* ────────────────────────────────
   Último registro
   ──────────────────────────────── */
exports.getLatest = async (req, res) => {
  try {
    const snapshot = await db.collection('datos_estacion')
      .orderBy('fecha', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No hay datos disponibles.' });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    const fecha = data.fecha;

    res.json({
      ...data,
      fecha_ms: fecha.toMillis(),
      fecha_iso: fecha.toDate().toISOString(),
      fecha_legible: fecha.toDate().toLocaleString('es-CO', {
        dateStyle: 'short',
        timeStyle: 'medium'
      })
    });
  } catch (err) {
    console.error("Error en getLatest:", err);
    res.status(500).json({ error: 'Error en getLatest' });
  }
};

/* ────────────────────────────────
   Historial de hoy para un parámetro
   ──────────────────────────────── */
exports.getHistorial = async (req, res) => {
  const parametro = req.params.parametro;

  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);

    const snapshot = await db.collection('datos_estacion')
      .where('fecha', '>=', hoy)
      .where('fecha', '<', mañana)
      .orderBy('fecha')
      .get();

    if (snapshot.empty) {
      return res.json([]); // ⬅️ Evita error si no hay datos hoy
    }

    const datos = [];

    snapshot.forEach(doc => {
      const d = doc.data();
      const fecha = d.fecha?.toDate?.() ?? new Date(d.fecha);

      datos.push({
        hora: fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        valor: d[parametro] ?? null,
        fecha_ms: fecha.getTime(),
        fecha_iso: fecha.toISOString(),
        fecha_legible: fecha.toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'medium' })
      });
    });

    res.json(datos);
  } catch (err) {
    console.error("Error en getHistorial:", err);
    res.status(500).json({ error: 'Error en getHistorial' });
  }
};
