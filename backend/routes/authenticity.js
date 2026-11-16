import { Router } from 'express'
import multer from 'multer'
import { analyzeAuthenticity } from '../services/authenticity.js'
const router=Router()
const maxMb=Number(process.env.MAX_UPLOAD_MB)||10
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:maxMb*1024*1024},fileFilter:(_req,file,cb)=>{if(/^image\/(jpeg|png|webp)$/.test(file.mimetype)) return cb(null,true); cb(new Error('Format gambar harus JPG, PNG, atau WEBP.'))}})
router.post('/authenticity',upload.single('image'),async(req,res,next)=>{
 try{
  if(!req.file)return res.status(400).json({error:'File gambar JPG, PNG, atau WEBP wajib diunggah.'})
  const result=await analyzeAuthenticity(req.file)
  res.json(result)
 }catch(e){next(e)}
})
export default router
