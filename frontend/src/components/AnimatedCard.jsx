import { motion } from 'framer-motion'
export default function AnimatedCard({ icon: Icon, eyebrow, title, description, onClick, accent='blue' }) {
  return <motion.button type="button" className={`feature-card ${accent}`} onClick={onClick}
    whileHover={{y:-5,scale:1.012}} whileTap={{scale:.985}} transition={{type:'spring',stiffness:280,damping:20}}>
    <span className="feature-icon"><Icon size={21}/></span><span className="eyebrow">{eyebrow}</span>
    <strong>{title}</strong><span className="feature-description">{description}</span>
    <span className="card-arrow">↗</span>
  </motion.button>
}
