import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const options = {
    server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
};
mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

export default mongoose;