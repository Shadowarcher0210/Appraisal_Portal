const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/appraisalRoutes'); 
const auth = require('./routes/auth')
const empRoutes = require('./routes/dashboardRouter')
const dotenv = require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 3003;
const connectDb = require("./config/dbConnection")

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });
app.use('/auth',auth)
app.use('/form', formRoutes)
app.use('/all', empRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDb();

