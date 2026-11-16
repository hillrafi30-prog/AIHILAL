import { motion } from 'framer-motion'
import { Camera, ScanSearch, Palette, ShieldCheck, Activity, ArrowUpRight } from 'lucide-react'
import SplitText from '../components/SplitText.jsx'
import AnimatedCard from '../components/AnimatedCard.jsx'
export default function Dashboard({ navigate, apiStatus }) {
  return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="page">
    <div className="hero">
      <div className="hero-copy"><div className="status-line"><i/> INTELLIGENCE SYSTEM <span>•</span> COMPUTER VISION</div>
        <h1><SplitText text="See beyond the image."/></h1>
        <p>Kenali objek, analisis gambar, dan pahami informasi visual dalam satu platform AI.</p>
        <button className="primary-btn" onClick={()=>navigate('object')}>Mulai analisis <ArrowUpRight size={17}/></button>
      </div>
      <div className="hero-visual"><div className="radar"><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-ring r3"/><div className="radar-sweep"/><div className="radar-dot d1"/><div className="radar-dot d2"/><div className="radar-core"><ScanSearch size={35}/></div></div><span className="visual-tag">AI VISION / 01</span></div>
    </div>
    <div className="section-heading"><div><span className="eyebrow">TOOLS & CAPABILITIES</span><h2>Explore AIHILAL</h2></div><span className="muted small">Pilih modul analisis</span></div>
    <div className="feature-grid">
      <AnimatedCard icon={ScanSearch} eyebrow="COMPUTER VISION" title="Object Detection" description="Deteksi dan identifikasi objek dari kamera atau gambar." onClick={()=>navigate('object')}/>
      <AnimatedCard icon={ShieldCheck} eyebrow="IMAGE FORENSICS" title="AI Image Analysis" description="Periksa indikasi gambar sintetis dan keaslian visual." accent="purple" onClick={()=>navigate('authenticity')}/>
      <AnimatedCard icon={Palette} eyebrow="COLOR INTELLIGENCE" title="Color Detection" description="Kenali warna dominan secara langsung dari kamera." accent="cyan" onClick={()=>navigate('color')}/>
    </div>
    <div className="system-strip"><div className="system-icon"><Activity size={18}/></div><div><strong>System status</strong><span>{apiStatus?'Backend API terhubung':'Backend API belum terhubung'}</span></div><span className={`status-pill ${apiStatus?'online':'offline'}`}>{apiStatus?'ONLINE':'OFFLINE'}</span></div>
  </motion.div>
}
