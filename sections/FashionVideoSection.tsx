'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper/modules'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

// Fashion Video data (unlimited items; { id, title, thumbnail, src })
// 
// To add a new fashion video:
// 1. Place video file in: public/assets/videos/fashion/[filename].mp4
// 2. Place thumbnail in: public/assets/images/videos/fashion/[filename]-cover.jpg
// 3. Add entry below with correct paths:
//    - src: '/assets/videos/fashion/[filename].mp4'
//    - thumbnail: '/assets/images/videos/fashion/[filename]-cover.jpg'
const fashionVideos = [
  {
    id: 1,
    title: 'Styling Tips - "Casual to Elegant"',
    description: 'Transform your everyday look into elegant evening wear',
    src: '/assets/videos/fashion/styling-casual-elegant.mp4',
    thumbnail: '/assets/images/videos/fashion/styling-casual-elegant-cover.jpg',
    duration: '4:55'
  },
  {
    id: 2,
    title: 'Accessorizing Guide - "Jewelry & Bags"',
    description: 'Complete guide to accessorizing with jewelry and handbags',
    src: '/assets/videos/fashion/accessorizing-guide.mp4',
    thumbnail: '/assets/images/videos/fashion/accessorizing-guide-cover.jpg',
    duration: '1:09'
  },
  {
    id: 3,
    title: 'Color Coordination - "Seasonal Palettes"',
    description: 'Mastering color coordination for different seasons',
    src: '/assets/videos/fashion/color-coordination-seasonal.mp4',
    thumbnail: '/assets/images/videos/fashion/color-coordination-seasonal-cover.jpg',
    duration: '7:05'
  },
  {
    id: 4,
    title: 'Body Type Styling - "Flattering Silhouettes"',
    description: 'Dress for your body type with confidence',
    src: '/assets/videos/fashion/body-type-styling.mp4',
    thumbnail: '/assets/images/videos/fashion/body-type-styling-cover.jpg',
    duration: '09:07'
  },
  {
    id: 5,
    title: 'Wisdom Kaye - "Fashion Ananlysis"',
    description: 'Wisdom Kaye Breaks Down The Outfits That Made Him Famous (And A Multimillionaire)',
    src: '/assets/videos/fashion/fashion-analysis.mp4',
    thumbnail: '/assets/images/videos/fashion/fashion-analysis-cover.jpg',
    duration: '8:45'
  }
]

export default function FashionVideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(fashionVideos[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState<number | null>(null)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<number | null>(null)

  // Auto-hide controls after 3s while playing; reappear on mouse move
  useEffect(() => {
    if (showControls && isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => {
      if (controlsTimeoutRef.current !== null) {
        window.clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls, isPlaying])

  // Preload next video for faster switching
  useEffect(() => {
    const preloadVideo = (src: string) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = src
      video.load()
    }
    
    // Preload all videos
    fashionVideos.forEach(video => {
      preloadVideo(video.src)
    })
  }, [])

  const handleVideoSelect = (video: typeof fashionVideos[0]) => {
    setSelectedVideo(video)
    setProgress(0)
    setShowControls(true)
    setIsLoading(true)
    setVideoError(null)
    // Start playing after a brief delay to ensure video loads
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.log('Autoplay failed:', error)
          setIsPlaying(false)
        })
      }
    }, 100)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
    setIsPlaying(!isPlaying)
    setShowControls(true)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
    setShowControls(true)
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
    setShowControls(true)
  }

  const handleDuration = (duration: number) => {
    if (duration && isFinite(duration) && duration > 0) {
      setDuration(duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickPercent = clickX / width
    if (videoRef.current) {
      videoRef.current.currentTime = clickPercent * videoRef.current.duration
    }
    setShowControls(true)
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
    setShowControls(true)
  }

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds) || seconds < 0) {
      return '0:00'
    }
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
  }

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-16">
        <span className="text-primary-500">↻ ◁ |</span><span className="text-primary-950">| ▷ ↺</span>
        </h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          {/* Main Video Player */}
          <div 
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              src={selectedVideo.src}
              poster={selectedVideo.thumbnail}
              className="w-full h-full object-cover"
              autoPlay={isPlaying}
              muted={isMuted}
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current && videoRef.current.duration && isFinite(videoRef.current.duration)) {
                  handleDuration(videoRef.current.duration)
                  setIsLoading(false)
                }
              }}
              onTimeUpdate={() => {
                if (videoRef.current && videoRef.current.duration && isFinite(videoRef.current.duration)) {
                  setProgress(videoRef.current.currentTime / videoRef.current.duration)
                }
              }}
              onError={(e) => {
                console.log('Video error:', e)
                setVideoError('Failed to load video. Please try again.')
                setIsLoading(false)
              }}
              onPlay={() => setIsLoading(false)}
              onPause={() => setIsLoading(false)}
              onLoadStart={() => setIsLoading(true)}
            />

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
                         {/* Play/Pause Controls - Center Overlay */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handlePlayPause}
                 className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 pointer-events-auto"
               >
                 {isPlaying ? (
                   <Pause size={32} />
                 ) : (
                   <Play size={32} className="ml-1" />
                 )}
               </motion.button>
             </div>
            
            {/* Loading Overlay - Only show for longer loads */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-white/80 text-xs">Loading...</p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {videoError && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                <div className="text-center p-6">
                  <div className="text-red-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg mb-4">{videoError}</p>
                  <button
                    onClick={() => {
                      setVideoError(null)
                      setIsLoading(true)
                      // Force reload the video
                      const currentSrc = selectedVideo.src
                      setSelectedVideo({ ...selectedVideo, src: '' })
                      setTimeout(() => setSelectedVideo({ ...selectedVideo, src: currentSrc }), 100)
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Video Info */}
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-white text-xl font-bold mb-1">{selectedVideo.title}</h3>
              {selectedVideo.description && (
                <p className="text-white/80 text-sm">{selectedVideo.description}</p>
              )}
            </div>

            {/* Custom Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            >
              {/* Progress Bar */}
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-primary-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-primary-300 transition-colors duration-300"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                                     {/* Skip Back/Forward */}
                   <button
                     onClick={() => {
                       const currentIndex = fashionVideos.findIndex(video => video.id === selectedVideo.id)
                       const prevIndex = (currentIndex - 1 + fashionVideos.length) % fashionVideos.length
                       handleVideoSelect(fashionVideos[prevIndex])
                     }}
                     className="text-white/70 hover:text-white transition-colors duration-300"
                   >
                     <SkipBack size={20} />
                   </button>
                                       <button
                      onClick={() => {
                        const currentIndex = fashionVideos.findIndex(video => video.id === selectedVideo.id)
                        const nextIndex = (currentIndex + 1) % fashionVideos.length
                        handleVideoSelect(fashionVideos[nextIndex])
                      }}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <SkipForward size={20} />
                    </button>

                                       {/* 10 Second Skip Controls */}
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
                        }
                      }}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                        <span className="text-xs font-medium text-white/70">10</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10)
                        }
                      }}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-xs font-medium text-white/70">10</span>
                        <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                      </div>
                    </button>

                   {/* Time Display */}
                   <span className="text-white/80 text-sm">
                     {formatTime(progress * (duration || 0))} / {formatTime(duration || 0)}
                   </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleMuteToggle}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Settings */}
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <Settings size={20} />
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination, FreeMode]}
              spaceBetween={16}
              slidesPerView={2}
              freeMode={true}
              navigation={true}
              pagination={{ clickable: true }}
              /* Responsive carousel breakpoints: 2 / 3 / 4 / 5 slides */
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              className="video-swiper"
              style={{ paddingBottom: '40px' }}
            >
              {/* Unlimited videos: map works for any array length */}
              {fashionVideos.map((video) => (
                <SwiperSlide key={video.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div
                      className="relative rounded-lg overflow-hidden bg-gradient-to-br from-primary-800/50 to-accent-800/50"
                      style={{ paddingTop: '60%' }}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback Placeholder */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{display: 'none'}}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 text-primary-300">
                            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-primary-300 text-xs">{video.title}</p>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                             onClick={(e) => {
                               e.stopPropagation();
                               if (selectedVideo.id === video.id) {
                                 handlePlayPause();
                               } else {
                                 handleVideoSelect(video);
                               }
                             }}>
                          {selectedVideo.id === video.id && isPlaying ? (
                            <Pause size={20} className="text-white" />
                          ) : (
                            <Play size={20} className="text-white ml-1" />
                          )}
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}

                      {/* Active Indicator */}
                      {selectedVideo.id === video.id && (
                        <div className="absolute top-2 left-2 w-3 h-3 bg-primary-400 rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="text-white text-sm font-medium truncate">{video.title}</h4>
                      <p className="text-primary-300 text-xs truncate">{video.description}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e8dbb8;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e8dbb8;
          cursor: pointer;
          border: none;
        }

        /* Custom navigation arrows: ⟸ ⟹ */
        .video-swiper .swiper-button-next,
        .video-swiper .swiper-button-prev {
          top: -30px;
          background: transparent;
          width: auto;
          height: auto;
          border: none;
          color: #e8dbb8;
        }
        .video-swiper .swiper-button-prev:after {
          content: '⟸';
          font-weight: 700;
          font-size: 20px;
          line-height: 1;
          color: #e8dbb8;
        }
        .video-swiper .swiper-button-next:after {
          content: '⟹';
          font-weight: 700;
          font-size: 20px;
          line-height: 1;
          color: #e8dbb8;
        }

        /* Themed pagination dots (below carousel by Swiper) */
        .video-swiper .swiper-pagination-bullet {
          background: #e8dbb8;
          opacity: 0.6;
          transition: background-color 0.3s ease, opacity 0.3s ease;
        }
        .video-swiper .swiper-pagination-bullet-active {
          background: #e8dbb8;
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
