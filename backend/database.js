
const mongoose = require('mongoose');
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://himanshidhingra3107:ZqVHPTV4NfpuSbnO@cluster0.maktora.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log('connected to db');
})
.catch((err)=>{
  console.log(err);
});


// Define the mongoose schema and model for your data
const dataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;