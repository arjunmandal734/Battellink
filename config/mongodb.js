import mongoose from 'mongoose';

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB Connected');
};

export default connectMongoDB;
