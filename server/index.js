import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

// Import routes
import dalleRoutes from './routes/dalle.routes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({liming:"50mb"}));

app.use('/api/v1/dalle',dalleRoutes)
app.use('/',(req,res)=>{

    res.status(200).json({message:"Hello form DALL.E"})

})


app.listen(8080,()=>
console.log('Server has started on port 8080')
)