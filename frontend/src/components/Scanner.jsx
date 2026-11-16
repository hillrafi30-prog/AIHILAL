export default function Scanner({ active=false }) {
  return <div className={`scan-frame ${active?'scanning':''}`} aria-label={active?'Pemindaian berlangsung':'Pratinjau gambar'}>
    <span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/>
    {active && <div className="scan-line"/>}
    <div className="scan-center"><span className="scan-orb"/></div>
    <span className="scan-caption">{active?'ANALYZING INPUT':'READY FOR ANALYSIS'}</span>
  </div>
}
