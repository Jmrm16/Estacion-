const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // Asegúrate de tener este archivo en la raíz del Backend

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
