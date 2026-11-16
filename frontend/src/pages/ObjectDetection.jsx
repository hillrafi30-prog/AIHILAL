import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Play, Square, ScanSearch, LoaderCircle } from 'lucide-react'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'
import Scanner from '../components/Scanner.jsx'

export default function ObjectDetection() {
  const videoRef=useRef(null), canvasRef=useRef(null), streamRef=useRef(null), modelRef=useRef(null), rafRef=useRef(null), activeRef=useRef(false), imageUrlRef=useRef('')
  const [modelState,setModelState]=useState('Memuat model saat dibutuhkan')
  const [running,setRunning]=useState(false), [predictions,setPredictions]=useState([]), [error,setError]=useState('')
  const [imageUrl,setImageUrl]=useState('')
  useEffect(()=>()=>{activeRef.current=false; if(rafRef.current) cancelAnimationFrame(rafRef.current); streamRef.current?.getTracks().forEach(t=>t.stop()); if(imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current)},[])
  function stopCamera(){ activeRef.current=false; if(rafRef.current) cancelAnimationFrame(rafRef.current); streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; if(videoRef.current) videoRef.current.srcObject=null; setRunning(false) }
  async function loadModel(){ if(modelRef.current) return modelRef.current; setModelState('Memuat model COCO-SSD…'); modelRef.current=await cocoSsd.load({base:'lite_mobilenet_v2'}); setModelState('Model siap'); return modelRef.current }
  async function startCamera(){
    setError('')
    try { if(!navigator.mediaDevices?.getUserMedia) throw new Error('Kamera memerlukan HTTPS atau alamat localhost. Buka aplikasi melalui localhost di HP atau gunakan HTTPS.'); const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}); streamRef.current=stream; videoRef.current.srcObject=stream; await videoRef.current.play(); activeRef.current=true; setRunning(true); const model=await loadModel(); if(activeRef.current) detectLoop(model) }
    catch(e){setError(e.name==='NotAllowedError'?'Izin kamera ditolak. Izinkan akses kamera pada browser.':e.message||'Kamera tidak dapat dibuka.');stopCamera()}
  }
  async function detectLoop(model){
    if(!activeRef.current) return
    if(!videoRef.current || videoRef.current.readyState<2){rafRef.current=requestAnimationFrame(()=>detectLoop(model));return}
    const v=videoRef.current, c=canvasRef.current, ctx=c.getContext('2d'); c.width=v.videoWidth;c.height=v.videoHeight;ctx.drawImage(v,0,0,c.width,c.height)
    let found=[]; try { found=await model.detect(v) } catch(e) { if(activeRef.current) setError('Deteksi terhenti: '+e.message); return }
    if(!activeRef.current) return
    setPredictions(found)
    ctx.lineWidth=3;ctx.font='16px sans-serif'
    found.forEach(p=>{const [x,y,w,h]=p.bbox;ctx.strokeStyle='#50d9ff';ctx.strokeRect(x,y,w,h);ctx.fillStyle='#50d9ff';ctx.fillRect(x,Math.max(0,y-24),ctx.measureText(p.class).width+14,24);ctx.fillStyle='#06101c';ctx.fillText(p.class+' '+Math.round(p.score*100)+'%',x+6,Math.max(17,y-7))})
    if(activeRef.current) rafRef.current=requestAnimationFrame(()=>detectLoop(model))
  }
  async function analyzeFile(file){
    if(!file)return; stopCamera();setError('');setPredictions([])
    if(!file.type.startsWith('image/')){setError('Pilih file gambar yang valid.');return}
    const url=URL.createObjectURL(file);if(imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);imageUrlRef.current=url;setImageUrl(url)
    try{const model=await loadModel();const img=new Image();img.src=url;await img.decode();setPredictions(await model.detect(img))}
    catch(e){setError('Gambar tidak dapat dianalisis: '+e.message)}
  }
  return <motion.div className="page tool-page" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
    <div className="page-title"><span className="eyebrow">COMPUTER VISION / MODULE 01</span><h1>Object Detection</h1><p>Deteksi objek dari kamera HP atau unggah gambar.</p></div>
    <div className="tool-layout"><section className="panel viewer-panel"><div className="panel-top"><span><i className="live-dot"/> LIVE INPUT</span><span className="muted small">{modelState}</span></div>
      <div className="media-stage">
        <video ref={videoRef} className={running?'visible-video':'hidden-media'} playsInline muted/>
        <canvas ref={canvasRef} className={running?'overlay-canvas':'hidden-media'}/>
        {!running && imageUrl && <img className="preview-image" src={imageUrl} alt="Gambar untuk deteksi"/>}
        {!running && !imageUrl && <Scanner/>}
      </div>
      {error&&<div className="error-note">{error}</div>}
      <div className="action-row"><button className="primary-btn" onClick={running?stopCamera:startCamera}>{running?<Square size={16}/>:<Camera size={16}/>} {running?'Hentikan kamera':'Buka kamera'}</button><label className="secondary-btn"><Upload size={16}/> Unggah gambar<input type="file" accept="image/*" hidden onChange={e=>analyzeFile(e.target.files?.[0])}/></label></div>
    </section>
    <aside className="panel results-panel"><div className="panel-top"><span>DETECTION RESULTS</span><span className="count-badge">{predictions.length}</span></div>
      <div className="result-content">{predictions.length?predictions.sort((a,b)=>b.score-a.score).map((p,i)=><div className="result-item" key={i}><div><strong>{p.class}</strong><span>{Math.round(p.score*100)}% confidence</span></div><div className="confidence-track"><i style={{width:`${p.score*100}%`}}/></div></div>):<div className="empty-state"><ScanSearch size={28}/><strong>Belum ada objek</strong><span>Mulai kamera atau unggah gambar untuk melihat hasil.</span></div>}</div>
      <div className="disclaimer">Model COCO-SSD mengenali 80 kelas objek umum. Hasil bergantung pada kualitas gambar dan bukan identifikasi sempurna.</div>
    </aside></div>
  </motion.div>
}
