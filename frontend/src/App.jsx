import { useEffect, useState } from 'react'
import { ScanSearch, LayoutDashboard, Palette, ShieldCheck, Activity, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Dashboard from './pages/Dashboard.jsx'
import ObjectDetection from './pages/ObjectDetection.jsx'
import ColorDetection from './pages/ColorDetection.jsx'
import ImageAnalysis from './pages/ImageAnalysis.jsx'
import { healthCheck } from './services/api'
const nav=[['dashboard','Overview',LayoutDashboard],['object','Object Detection',ScanSearch],['authenticity','AI Image Analysis',ShieldCheck],['color','Color Detection',Palette]]
export default function App(){
 const [page,setPage]=useState('dashboard'),[apiStatus,setApiStatus]=useState(false),[mobileOpen,setMobileOpen]=useState(false)
 useEffect(()=>{healthCheck().then(r=>setApiStatus(!!r?.ok));const id=setInterval(()=>healthCheck().then(r=>setApiStatus(!!r?.ok)),15000);return()=>clearInterval(id)},[])
 function navigate(p){setPage(p);setMobileOpen(false)}
 const current=nav.find(n=>n[0]===page)?.[1]||'Overview'
 return <div className="app-shell"><aside className={`sidebar ${mobileOpen?'open':''}`}><div className="brand"><div className="brand-mark"><ScanSearch size={22}/></div><div><strong>AIHILAL</strong><span>VISION INTELLIGENCE</span></div><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X/></button></div><div className="nav-label">WORKSPACE</div><nav>{nav.map(([id,label,Icon])=><button key={id} className={`nav-item ${page===id?'active':''}`} onClick={()=>navigate(id)}><Icon size={18}/>{label}{page===id&&<i/>}</button>)}</nav><div className="sidebar-bottom"><div className="mini-status"><span className={apiStatus?'online-dot':'offline-dot'}/><div><strong>API CONNECTION</strong><small>{apiStatus?'Connected':'Disconnected'}</small></div></div><span className="version">AIHILAL v1.0.0 · PREVIEW</span></div></aside>
 <main className="main-area"><header className="topbar"><button className="menu-btn" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{current}</strong></div><div className="top-right"><span className="secure-label"><i/> SECURE SESSION</span><div className="avatar">H</div></div></header>
 <AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>{page==='dashboard'?<Dashboard navigate={navigate} apiStatus={apiStatus}/>:page==='object'?<ObjectDetection/>:page==='color'?<ColorDetection/>:<ImageAnalysis/>}</motion.div></AnimatePresence>
 <footer className="footer">© 2026 AIHILAL <span>BUILT FOR VISUAL INTELLIGENCE</span></footer></main></div>
}
