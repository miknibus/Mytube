import mongoose from 'mongoose';
// import dotenv from 'dotenv';

mongoose.connect('mongodb://localhost:27017/mytube', {
	useNewUrlParser    : true,
	useFindAndModify   : false,
	useUnifiedTopology : true
});

const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB');
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.once('error', handleError);
