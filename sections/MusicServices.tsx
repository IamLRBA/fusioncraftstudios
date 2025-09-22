'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface Service { id:number; number:string; title:string; description:string; image:string }
const services: Service[] = [
  { id:1, number:'01', title:'Music Production', description:'Professional music production services including recording, mixing, mastering, and arrangement.', image:'/assets/images/services/music/music-production.jpg' },
  { id:2, number:'02', title:'Songwriting', description:'Custom songwriting and lyric creation tailored to your vision and emotional expression.', image:'/assets/images/services/music/songwriting.jpg' },
  { id:3, number:'03', title:'Poetry Creation', description:'Original poetry in various styles and themes, from personal expression to commissioned works.', image:'/assets/images/services/music/poetry-creation.jpg' },
  { id:4, number:'04', title:'Performance', description:'Live performances, poetry readings, and musical showcases for events and special occasions.', image:'/assets/images/services/music/performance.jpg' },
  { id:5, number:'05', title:'Collaboration', description:'Creative partnerships and collaborative projects with other artists, musicians, and creators.', image:'/assets/images/services/music/collaboration.jpg' },
  { id:6, number:'06', title:'Workshops', description:'Educational workshops and mentoring sessions for aspiring musicians and poets.', image:'/assets/images/services/music/workshops.jpg' },
]

export default function MusicServices(){
  const [expandedId,setExpandedId]=useState<number|null>(null)
  const toggle=(id:number)=>setExpandedId(expandedId===id?null:id)
  return (
    <section className="py-20 px-4">
      <motion.div initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} transition={{duration:1}} viewport={{once:true}} className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">⏣ Our <span className="text-primary-400">Services</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-8">
          {services.map((s,i)=> { const isRight=i%2===1; return (
            <motion.div key={s.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.8,delay:i*0.1}} viewport={{once:true}} className={`flex flex-col ${isRight?'items-end':'items-start'}`}>
              <div className="flex flex-col space-y-6">
                <div className="bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-4">
                  <div className="bg-primary-900/20 rounded-xl w-[320px] h-[320px] flex items-center justify-center overflow-hidden">
                    <img src={s.image} alt={s.title} className="max-w-full max-h-full object-contain" onError={(e)=>{ const t=e.target as HTMLImageElement; t.style.display='none'; const f=(t.parentElement?.nextElementSibling as HTMLElement); if(f) f.style.display='flex' }}/>
                  </div>
                </div>
                <motion.div className={`flex flex-col ${isRight?'text-right items-end':'text-left items-start'}`}>
                  <div className="text-6xl font-bold text-primary-400">{s.number}</div>
                  <h3 className="text-3xl font-bold mt-2 text-white">{s.title}</h3>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>toggle(s.id)} className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 hover:text-white border border-primary-500/30 rounded-full px-6 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-500/30 hover:to-accent-500/30 mt-4">
                    <span>{expandedId===s.id?'Read Less':'Read More'}</span>
                    <AnimatePresence mode="wait">{expandedId===s.id? <motion.div key="m" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><Minus size={20}/></motion.div> : <motion.div key="p" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><Plus size={20}/></motion.div>}</AnimatePresence>
                  </motion.button>
                </motion.div>
              </div>
              <AnimatePresence>
                {expandedId===s.id && (
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.3}} className="overflow-hidden mt-4">
                    <div className="bg-primary-800/30 rounded-xl p-6 border border-primary-500/20">
                      <p className="text-primary-200 leading-relaxed mb-6 text-center">{s.description}</p>
                      
                      {/* Thumbnail Images */}
                      <div className="grid grid-cols-2 gap-4 justify-items-center">
                        {[1, 2, 3, 4].map((thumbIndex) => (
                          <div key={thumbIndex} className="bg-primary-900/20 rounded-lg h-48 w-48 flex items-center justify-center border border-primary-500/20 overflow-hidden shadow-lg hover:shadow-none transition-shadow duration-300 cursor-pointer">
                            <img 
                              src={`/assets/images/services/music/${s.title.toLowerCase().replace(/\s+/g, '-')}/thumb${thumbIndex}.jpg`}
                              alt={`${s.title} service thumbnail ${thumbIndex}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div className="hidden text-primary-400 text-sm items-center justify-center w-full h-full">
                              Thumbnail {thumbIndex}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )})}
        </div>
      </motion.div>
    </section>
  )
}


