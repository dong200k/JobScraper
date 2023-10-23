import express from 'express';
import JobRouter from './routers/JobRouter';
import cors from 'cors'
import FirebaseManager from './firebase/FirebaseManager';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import AdminRouter from './routers/AdminRouter';
dotenv.config();

const app = express()
const port = 3001

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(JobRouter)
app.use('/admin', AdminRouter)

app.get("*", (req, res)=>{
  console.log(req.url)
  console.log("404 not found");
  res.status(404).send({message: "404 NOT FOUND!"});
})
  
app.listen(port, async () => {
  FirebaseManager.getManager().initializeApp()
  console.log(`Server listening on port ${port}`)
})