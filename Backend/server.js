const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth')
const dotenv = require('dotenv').config();
const app = express(); 
const PORT = process.env.PORT || 3003;
const connectDb = require("./config/dbConnection");
const bodyParser = require('body-parser');

const formRoutes = require('./routes/appraisalRoutes'); 
const empRoutes = require('./routes/dashboardRouter')
const timePeriod  = require('./routes/timePeriod');
const uploadAppraisalLetter  = require('./routes/uploadRouter');

app.use(cors());
app.use(express.json());


app.use('/auth',auth)
app.use('/form', formRoutes)
app.use('/all', empRoutes)
app.use('/time',timePeriod)
app.use('/letter',uploadAppraisalLetter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


connectDb();

