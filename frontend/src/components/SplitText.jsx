import { motion } from 'framer-motion'

// React Bits-style source component: split a heading into animated characters.
export default function SplitText({ text, className = '' }) {
  return <span className={className} aria-label={text} style={{display:'inline-flex',flexWrap:'wrap'}}>
    {Array.from(text).map((char, i) => <motion.span key={`${char}-${i}`} aria-hidden="true"
      initial={{opacity:0,y:24,filter:'blur(8px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}}
      transition={{duration:.48,delay:i*.035,ease:[.22,1,.36,1]}}
      style={{whiteSpace:char===' '?'pre':'normal'}}>{char}</motion.span>)}
  </span>
}
