const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/appraisalRoutes'); 
const auth = require('./routes/auth')
const empRoutes = require('./routes/dashboardRouter')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express(); 
const PORT = process.env.PORT || 3003;
const connectDb = require("./config/dbConnection");
const timePeriod  = require('./routes/timePeriod');
const uploadAppraisalLetter  = require('./routes/uploadRouter');
const emailsend = require ('./routes/emailRouter');

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });
app.use('/auth',auth)
app.use('/form', formRoutes)
app.use('/all', empRoutes)
app.use('/time',timePeriod)
app.use('/letter',uploadAppraisalLetter)
app.use('/conformationEmail', emailsend)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


connectDb();

