'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const poems = {
  Love: [
    {
      id: 1,
      title: 'Femmora',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/femmora.jpg',
      lines: [
        'In the glow of rising dawn,',
'Where courage shines like fireflies,',
'They carve new paths with steady hands,',
'Building tomorrow, step by step.',
'In the silence of their power,',
'Every choice a verse of strength,',
'Every dream a radiant stanza,',
'Every trial a lesson earned.'

      ],
      theme: 'Femininism',
      mood: 'Contemplative'
    },
    {
      id: 2,
      title: 'Music',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/music.jpg',
      lines: [
        'Concrete canyons echo with life,',
        'A symphony of honking horns,',
        'Footsteps on pavement,',
        'The rhythm of the city.',
        'In this urban orchestra,',
        'Every sound has its place,',
        'Every movement its purpose,',
        'Creating harmony from chaos.'
      ],
      theme: 'Urban Life',
      mood: 'Dynamic'
    },
    {
      id: 3,
      title: 'Dream',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/dream.jpg',
      lines: [
        'Ideas flow like rivers,',
        'Carving paths through imagination,',
        'Sometimes gentle, sometimes wild,',
        'But always moving forward.',
        'In the current of creativity,',
        'We find our voice,',
        'We discover our purpose,',
        'We become who we are meant to be.'
      ],
      theme: 'Creativity',
      mood: 'Inspirational'
    },
    {
      id: 4,
      title: 'Heartstrings',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/heartstrings.jpg',
      lines: [
        'Your smile is the melody,',
        'That plays upon my heartstrings,',
        'Every note a memory,',
        'Every chord a feeling.',
        'In this symphony of love,',
        'We dance to rhythms divine,',
        'Creating harmonies eternal,',
        'That will forever shine.'
      ],
      theme: 'Love',
      mood: 'Romantic'
    },
    {
      id: 5,
      title: 'Soulful of Love',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/soulful-of-love.jpg',
      lines: [
        'Two souls entwined by fate,',
        'Bound by love\'s eternal flame,',
        'Through every storm we navigate,',
        'Our love remains the same.',
        'In this journey of the heart,',
        'We find strength in unity,',
        'Building dreams that never part,',
        'Creating our destiny.'
      ],
      theme: 'Love',
      mood: 'Passionate'
    }
  ],
  Life: [
    {
      id: 6,
      title: 'Life',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/soft-life.jpg',
      lines: [
        'Life is a canvas waiting,',
        'For the brushstrokes of our choices,',
        'Every decision a color,',
        'Every experience a voice.',
        'In this masterpiece of living,',
        'We learn to paint with purpose,',
        'Creating beauty from struggle,',
        'Finding light in darkness.'
      ],
      theme: 'Life',
      mood: 'Philosophical'
    },
    {
      id: 7,
      title: 'The Road',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/the-road.jpg',
      lines: [
        'When storms come crashing down,',
        'And winds threaten to break us,',
        'We stand firm on solid ground,',
        'Our spirit will not forsake us.',
        'In the face of adversity,',
        'We find our inner strength,',
        'Rising above the challenge,',
        'Going to any length.'
      ],
      theme: 'Life',
      mood: 'Empowering'
    },
    {
      id: 8,
      title: 'Moments of Peace',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/moments-of-peace.jpg',
      lines: [
        'Laughter echoes through the air,',
        'Like music to the soul,',
        'In these moments we share,',
        'We become truly peaceful.',
        'peace is not just an emotion,',
        'But a choice we make each day,',
        'Finding beauty in motion,',
        'In our own unique way.'
      ],
      theme: 'Life',
      mood: 'Joyful'
    },
    {
      id: 9,
      title: 'Our Story',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/story.jpg',
      lines: [
        'Each step we take is progress,',
        'Every fall a lesson learned,',
        'In this journey of success,',
        'Our wisdom is earned.',
        'The road may twist and turn,',
        'But we keep moving ahead,',
        'For in our hearts we yearn,',
        'To reach what lies ahead.'
      ],
      theme: 'Life',
      mood: 'Hopeful'
    },
    {
      id: 10,
      title: 'The Version',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/versions.jpg',
      lines: [
        'What will we leave behind,',
        'When our time here is done?',
        'Will our impact be kind,',
        'Will our work live on?',
        'In the stories we create,',
        'And the lives we touch,',
        'We build a lasting fate,',
        'That means so much.'
      ],
      theme: 'Life',
      mood: 'Reflective'
    }
  ],
  Faith: [
    {
      id: 11,
      title: 'The Universe',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/universe.jpg',
      lines: [
        'In the darkness of uncertainty,',
        'A light begins to shine,',
        'Guiding us with clarity,',
        'Making our path divine.',
        'Faith is not just believing,',
        'But trusting in the unseen,',
        'Finding strength in knowing,',
        'That we are not alone.'
      ],
      theme: 'Faith',
      mood: 'Spiritual'
    },
    {
      id: 12,
      title: 'Grace',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/grace.jpg',
      lines: [
        'Grace flows like a river,',
        'Washing away our fears,',
        'In its gentle embrace,',
        'We find peace through the years.',
        'It\'s the gift we don\'t deserve,',
        'Yet freely given to all,',
        'A love that will preserve,',
        'And catch us when we fall.'
      ],
      theme: 'Faith',
      mood: 'Grateful'
    },
    {
      id: 13,
      title: 'Guts, Grace and Grattitude',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/guts-grace-grattitude.jpg',
      lines: [
        'There\'s a purpose in our being,',
        'A reason for our breath,',
        'In this grand design we\'re seeing,',
        'Life and death.',
        'Every moment has its meaning,',
        'Every choice its consequence,',
        'In this journey we\'re gleaning,',
        'Divine intelligence.'
      ],
      theme: 'Faith',
      mood: 'Contemplative'
    },
    {
      id: 14,
      title: 'The Good',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/the-good.jpg',
      lines: [
        'When the path is unclear,',
        'And doubts cloud our mind,',
        'We learn to trust without fear,',
        'Leaving worry behind.',
        'In the arms of faith,',
        'We find our way home,',
        'Knowing that our fate,',
        'Is never alone.'
      ],
      theme: 'Faith',
      mood: 'Peaceful'
    },
    {
      id: 15,
      title: 'Eternal Hope',
      author: 'LRBA',
      image: '/assets/images/poetry-visualizer/hope.jpg',
      lines: [
        'Hope is the anchor,',
        'That keeps us steady,',
        'In life\'s great adventure,',
        'We remain ready.',
        'For tomorrow\'s promise,',
        'And dreams yet to come,',
        'In hope we find solace,',
        'And our battles won.'
      ],
      theme: 'Faith',
      mood: 'Hopeful'
    }
  ]
}

export default function PoetryVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedGenre, setSelectedGenre] = useState<keyof typeof poems>('Love')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)
  const [selectedPoem, setSelectedPoem] = useState<typeof poems.Love[0] | null>(null)

  const currentPoems = poems[selectedGenre]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentPoems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentPoems.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % currentPoems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + currentPoems.length) % currentPoems.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const expandPoem = (poem: typeof poems.Love[0]) => {
    setSelectedPoem(poem)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Genre Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-3xl font-bold mb-8">
          <span className="text-gradient">Ⲥⲏⲟⲟ𝚜ⲉ</span> Ⲩⲟ𝚞𝚛 Ⲣⲟⲉⲙ
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(poems).map((genre) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedGenre(genre as keyof typeof poems)
                setCurrentIndex(0)
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                  : 'bg-primary-800/50 text-primary-300 hover:bg-primary-700/50'
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>

        {/* Poems Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Auto-play Toggle */}
          <div className="absolute top-4 right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-neutral-600 hover:bg-neutral-700'
              } text-white`}
              title={isAutoPlaying ? 'Pause' : 'Play'}
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800/20 to-accent-800/20 border border-primary-500/30">
            {/* Carousel Slides */}
            <div className="relative h-96 md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    {/* Poem Display */}
                    <div className="mb-6">
                      <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl border border-primary-500/50 relative overflow-hidden group cursor-pointer"
                           onClick={() => expandPoem(currentPoems[currentIndex])}>
                        <img
                          src={currentPoems[currentIndex].image || `/assets/images/poetry-visualizer/${currentPoems[currentIndex].id}.jpg`}
                          alt={currentPoems[currentIndex].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback Placeholder */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-accent-600/30 flex items-center justify-center"
                          style={{display: 'none'}}
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-primary-300">
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-primary-300 text-lg">
                              {currentPoems[currentIndex].title}
                            </p>
                            <p className="text-primary-400 text-sm">
                              by {currentPoems[currentIndex].author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Poem Info */}
                    <div className="max-w-md mx-auto">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {currentPoems[currentIndex].title}
                      </h4>
                      <p className="text-primary-200 mb-4">
                        {currentPoems[currentIndex].lines.slice(0, 2).join(' ')}...
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-2">
                        <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-sm border border-primary-500/30">
                          {currentPoems[currentIndex].theme}
                        </span>
                        <span className="bg-accent-600/20 text-accent-300 px-3 py-1 rounded-full text-sm border border-accent-500/30">
                          {currentPoems[currentIndex].mood}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
            >
              <span className="text-2xl">⟸</span>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
            >
              <span className="text-2xl">⟹</span>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {currentPoems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                    : 'bg-primary-600/50 hover:bg-primary-500/50'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Poem Modal */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPoem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-primary-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto modal-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedPoem.title}</h2>
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="text-primary-300 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-primary-300">by {selectedPoem.author}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {selectedPoem.lines.map((line, lineIndex) => (
                  <motion.p
                    key={lineIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: lineIndex * 0.1 }}
                    className="text-primary-200 text-center"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              
              <div className="flex justify-center gap-4 text-sm">
                <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full">
                  {selectedPoem.theme}
                </span>
                <span className="bg-accent-600/20 text-accent-300 px-3 py-1 rounded-full">
                  {selectedPoem.mood}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </motion.div>
    </div>
  )
} 