import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from './data.js'

gsap.registerPlugin(ScrollTrigger)

function Photo({src,alt,className='',priority=false}){
  return <img className={className} src={src} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} />
}

export default function App(){
  const [entered,setEntered]=useState(false)
  const root=useRef(null)
  useEffect(()=>{document.body.style.overflow=entered?'':'hidden'; if(!entered)scrollTo(0,0); return()=>{document.body.style.overflow=''}},[entered])
  useEffect(()=>{
    if(!entered||matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const ctx=gsap.context(()=>{
      gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:34,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}))
      gsap.utils.toArray('.drift').forEach(el=>gsap.to(el,{yPercent:-5,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.7}}))
    },root)
    return()=>ctx.revert()
  },[entered])
  const p=experience.photos,s=experience.scenes
  return <main ref={root} className="site-shell">
    {!entered&&<section className="entry" aria-label="Enter Blue Hour Atlas"><div className="grid-noise"/><p>NEW DELHI · BLUE HOUR</p><h1>Blue Hour<br/>Atlas</h1><small>Mira + Arjun · 07.02.2027</small><button onClick={()=>setEntered(true)}>Open the atlas</button></section>}
    <div className={`story ${entered?'is-live':''}`} aria-hidden={!entered}>
      <section className="scene hero"><Photo src={p[0]} alt="City elopement portrait" className="hero-photo drift" priority/><div className="hero-shade"/><div className="route">28.6139° N / 77.2090° E — PRIVATE ELOPEMENT</div><div className="hero-copy reveal"><p>{s[0].label}</p><h2>{s[0].title}</h2><span>{s[0].note}</span></div></section>
      <section className="scene platform split"><div className="copy reveal"><p>{s[1].label}</p><h2>{s[1].title}</h2><span>{s[1].note}</span></div><Photo src={p[1]} alt="Couple waiting at dusk" className="portrait"/></section>
      <section className="scene dossier"><Photo src={p[2]} alt="Editorial portrait" className="dossier-photo"/><div className="dossier-card reveal"><p>{s[2].label}</p><h2>{s[2].title}</h2><span>{s[2].note}</span><b>FILE 014 / PRIVATE</b></div></section>
      <section className="scene lines"><div className="paper reveal"><p>{s[3].label}</p><h2>{s[3].title}</h2><span>{s[3].note}</span><div className="signatures">MIRA ________ &nbsp; ARJUN ________</div></div><Photo src={p[3]} alt="Wedding paperwork and portrait"/></section>
      <section className="scene crossing"><Photo src={p[4]} alt="Couple crossing the city" className="full drift"/><div className="overlay-copy reveal"><p>{s[4].label}</p><h2>{s[4].title}</h2><span>{s[4].note}</span></div></section>
      <section className="scene rooftop"><div className="rooftop-num">06</div><div className="copy reveal"><p>{s[5].label}</p><h2>{s[5].title}</h2><span>{s[5].note}</span></div><Photo src={p[5]} alt="Rooftop wedding portrait"/></section>
      <section className="scene map"><div className="map-title reveal"><p>{s[6].label}</p><h2>{s[6].title}</h2><span>{s[6].note}</span></div>{[0,1,2,3,4,5].map((n)=><Photo key={n} src={p[n%p.length]} alt={`Contact frame ${n+1}`} className="contact"/>)}</section>
      <section className="scene neon"><Photo src={p[6]} alt="Evening celebration portrait" className="full"/><div className="neon-ring"/><div className="overlay-copy center reveal"><p>{s[7].label}</p><h2>{s[7].title}</h2><span>{s[7].note}</span></div></section>
      <section className="scene index"><div className="index-copy reveal"><p>{s[8].label}</p><h2>{s[8].title}</h2><span>{s[8].note}</span></div><div className="strip">{[7,2,4].map(n=><Photo key={n} src={p[n]} alt="Elopement detail"/>)}</div></section>
      <section className="scene table"><Photo src={p[7]} alt="Late dinner after ceremony"/><div className="copy reveal"><p>{s[9].label}</p><h2>{s[9].title}</h2><span>{s[9].note}</span></div></section>
      <section className="scene last"><div className="last-clock">23:48</div><Photo src={p[1]} alt="Last city portrait" className="full drift"/><div className="overlay-copy reveal"><p>{s[10].label}</p><h2>{s[10].title}</h2><span>{s[10].note}</span></div></section>
      <section className="scene finale"><p>{s[11].label}</p><h2>{s[11].title}</h2><span>{s[11].note}</span><div className="final-meta"><b>BLUE HOUR ATLAS</b><b>NEW DELHI · 2027</b></div></section>
    </div>
  </main>
}
