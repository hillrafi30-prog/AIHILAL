const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
export async function healthCheck() {
  try { const r=await fetch(`${API}/health`); return r.ok ? await r.json() : null } catch { return null }
}
export async function analyzeAuthenticity(file) {
  const body=new FormData(); body.append('image',file)
  const r=await fetch(`${API}/analyze/authenticity`,{method:'POST',body})
  if(!r.ok) throw new Error((await r.json().catch(()=>({}))).error || 'Analisis gagal')
  return r.json()
}
