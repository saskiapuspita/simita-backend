const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const peminatanRoutes = require('./routes/peminatan');
const mataKuliahRoutes = require('./routes/matakuliah');
const peminatanMahasiswaRoutes = require('./routes/peminatanmahasiswa');
const nilaiMataKuliahRoutes = require('./routes/nilaimatakuliah');
const nilaiPeminatanMahasiswaRoutes = require('./routes/nilaipeminatanmahasiswa');
const middlewarePeminatanMahasiswaRoutes = require('./routes/middlewarepeminatanmahasiswa');
const middlewareNilaiPeminatanMahasiswaRoutes = require('./routes/middlewarenilaipeminatanmahasiswa');
const middlewareMataKuliahRoutes = require('./routes/middlewarematakuliah');
const rekapitulasiPeminatanRoutes = require('./routes/rekapitulasipeminatan');
const judulPenelitianMahasiswaRoutes = require('./routes/judulpenelitianmahasiswa');
const middlewarePengajuanJudulPenelitianMahawsiswa = require('./routes/middlewarepengajuanjudulpeminatanmahasiswa');
const userRoutes = require('./routes/user');
const dosenRoutes = require('./routes/dosen');
const errorController = require('./controllers/error');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/post', postsRoutes);
app.use('/peminatan', peminatanRoutes);
app.use('/matakuliah', mataKuliahRoutes);
app.use('/peminatanmahasiswa', peminatanMahasiswaRoutes);
app.use('/nilaimatakuliah', nilaiMataKuliahRoutes);
app.use('/nilaiPeminatanMahasiswa', nilaiPeminatanMahasiswaRoutes);
app.use('/middlewarepeminatanmahasiswa', middlewarePeminatanMahasiswaRoutes);
app.use('/middlewarenilaipeminatanmahasiswa', middlewareNilaiPeminatanMahasiswaRoutes);
app.use('/middlewarematakuliah', middlewareMataKuliahRoutes);
app.use('/rekapitulasipeminatan', rekapitulasiPeminatanRoutes);
app.use('/judulpenelitianmahasiswa', judulPenelitianMahasiswaRoutes);
app.use('/middlewarejudulpenelitianmahasiswa', middlewarePengajuanJudulPenelitianMahawsiswa);
app.use('/user', userRoutes);
app.use('/dosen', dosenRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

// try {
//   await db.authenticate();
//   console.log("Database connected...");
//   // await Users.sync();
// } catch (error) {
//   console.log(error);
// }

// app.use(express.json());

app.listen(4000, () => {
  console.log(`Listening on port: 4000`);
});
