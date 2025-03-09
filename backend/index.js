const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();

const app = express();
const PORT=process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('LocalConnect Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const businessRoutes = require('./routes/businessRoutes');
app.use('/api/businesses', businessRoutes);