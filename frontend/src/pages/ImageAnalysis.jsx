import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, ShieldCheck, AlertTriangle, LoaderCircle } from 'lucide-react'
import { analyzeAuthenticity } from '../services/api'
export default function ImageAnalysis(){
 const [file,setFile]=useState(null),[preview,setPreview]=useState(''),[result,setResult]=useState(null),[busy,setBusy]=useState(false),[error,setError]=useState('')
 function choose(f){if(!f)return;if(!f.type.startsWith('image/')){setError('File harus berupa gambar.');return}setFile(f);setPreview(URL.createObjectURL(f));setResult(null);setError('')}
 async function run(){if(!file)return;setBusy(true);setError('');try{setResult(await analyzeAuthenticity(file))}catch(e){setError(e.message)}finally{setBusy(false)}}
 return <motion.div className="page tool-page" initial={{opacity:0}} animate={{opacity:1}}><div className="page-title"><span className="eyebrow">IMAGE FORENSICS / MODULE 03</span><h1>AI Image Analysis</h1><p>Unggah gambar untuk memeriksa indikasi konten buatan AI.</p></div>
 <div className="auth-layout"><section className="panel upload-panel"><label className="upload-zone">{preview?<img src={preview} alt="Pratinjau gambar"/>:<><Upload size={30}/><strong>Pilih gambar untuk dianalisis</strong><span>JPG, PNG, WEBP · Maksimal 10 MB</span></>}<input type="file" accept="image/*" hidden onChange={e=>choose(e.target.files?.[0])}/></label><button className="primary-btn" disabled={!file||busy} onClick={run}>{busy?<LoaderCircle className="spin" size={17}/>:<ShieldCheck size={17}/>} {busy?'Menganalisis…':'Analisis gambar'}</button>{error&&<p className="error-note">{error}</p>}</section>
 <section className="panel authenticity-result"><span className="eyebrow">ANALYSIS REPORT</span>{result?<><div className="empty-state"><AlertTriangle size={28}/><strong>{result.status==='unavailable'?'Model belum tersedia':result.label||'Hasil analisis'}</strong><span>{result.message}</span></div></>:<div className="empty-state"><ShieldCheck size={30}/><strong>Menunggu gambar</strong><span>Hasil analisis akan ditampilkan di sini.</span></div>}<p className="disclaimer">Deteksi gambar AI membutuhkan model terlatih dan tidak dapat dipastikan hanya dari satu ciri visual. AIHILAL tidak akan mengarang skor atau menyatakan gambar asli/palsu tanpa model yang tervalidasi.</p></section></div></motion.div>
}
