import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());
app.use('/posts', postRoutes);

app.get('/', (req, res) =>{
    res.send("Hello")
})
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser :true,
    useUnifiedTopology : true
})
.then(() => app.listen(PORT, ()=> console.log("server running")))
.catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);