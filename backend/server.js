import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import authenticityRouter from './routes/authenticity.js'

const app=express()
const port=Number(process.env.PORT)||4000
app.use(helmet())
app.use(cors({origin:(process.env.FRONTEND_ORIGIN||'http://localhost:5173').split(',').map(x=>x.trim())}))
app.use(express.json({limit:'1mb'}))
app.use('/api',rateLimit({windowMs:60_000,limit:90,standardHeaders:true,legacyHeaders:false}))
app.get('/api/health',(_req,res)=>res.json({ok:true,name:'AIHILAL API',version:'1.0.0',time:new Date().toISOString()}))
app.use('/api/analyze',authenticityRouter)
app.use((err,_req,res,_next)=>{if(err instanceof multer.MulterError || err.message?.startsWith('Format gambar'))return res.status(400).json({error:err.message});console.error(err);res.status(500).json({error:'Terjadi kesalahan pada server.'})})
app.listen(port,'0.0.0.0',()=>console.log(`AIHILAL API berjalan di http://localhost:${port}`))
