'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Shuffle, Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react'

interface AudioPlayerProps {
  onPlayStateChange: (isPlaying: boolean) => void
}

const songs = [
  {
    id: 1,
    title: 'Prmss',
    artist: 'LRBA',
    duration: '3:00',
    genre: 'AfroFusion',
    audioFile: '/assets/audio/prmss.mp3', 
    waveform: [0.3, 0.8, 0.5, 0.9, 0.4, 0.7, 0.6, 0.8, 0.5, 0.9, 0.4, 0.7],
    coverArt: '/assets/images/music/prmss-cover.jpg', 
    lyrics: `All, started with you lettin' in that nigga Reagan
Apologies, but I'm more like AMC's Negan
Dont need no beef with you, 'cuz y'know that I'm vegan
Too many niggas 'round you, proly why all of these began

Like, some aim at crushin' your party like they're Joeboy
More like Sam, Imma crack their skulls with a jawbone
They're too young, look at them go by I'm like "Hello Boy!"
"I too yearn for that girl that you love Boy!"

Still, the do nothin' 'cuz its me who got your remedy
Right in my memory files, stuck in like a melody
Ain't talkin' 'bout some comedy
I got proof, If you I could with it and show you how I'm ready in it`
  },
  {
    id: 2,
    title: 'Remedy',
    artist: 'Meliqq',
    duration: '3:07',
    genre: 'AfroArabic',
    audioFile: '/assets/audio/remedy.mp3', 
    waveform: [0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.8, 0.6, 0.9, 0.5, 0.7, 0.8],
    coverArt: '/assets/images/music/remedy-cover.jpg', 
    lyrics: `Concrete jungle, neon lights
Urban dreams in endless nights
Every corner tells a story
Of hope and dreams in all their glory

Skyscrapers reaching for the sky
As dreams and ambitions fly
In this city of endless possibility
We chase our dreams with tenacity

Urban dreams, they never sleep
In this world, we learn to leap
From the ground up to the stars
Breaking through all the bars`
  },
  {
    id: 3,
    title: 'Nesiya',
    artist: 'Meliqq',
    duration: '2:08',
    genre: 'AfroArabic',
    audioFile: '/assets/audio/nesiya.mp3', 
    waveform: [0.2, 0.6, 0.4, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.5],
    coverArt: '/assets/images/music/nesiya-cover.jpg', 
    lyrics: `In the quiet of the morning light
When the world is still and bright
I find peace within my soul
As the day begins to roll

Gentle breezes through the trees
Carrying whispers on the breeze
Nature's symphony so pure
Making my spirit soar

Serenity, oh how sweet
In your embrace, I feel complete
Let me stay here in this place
Where time and space embrace`
  },
  {
    id: 4,
    title: 'Honey Take My Hand',
    artist: 'Cody Francis',
    duration: '3:07',
    genre: 'Pop',
    audioFile: '/assets/audio/cody-francis-honey-take-my-hand.mp3',
    waveform: [0.7, 0.9, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 0.6, 0.8, 0.7, 0.9],
    coverArt: '/assets/images/music/cody-francis-honey-take-my-hand-cover.jpg',
    lyrics: `Digital waves across the screen
In this world of endless dreams
Technology and human touch
Creating something that means so much

Synthetic sounds and melodies
Dancing through digital seas
Future calling from afar
Guiding us like a shooting star

Digital horizon, bright and clear
Showing us the path to steer
Into tomorrow's endless light
Where innovation takes its flight

In this world of endless dreams
Technology and human touch
Creating something that means so much

Synthetic sounds and melodies
Dancing through digital seas
Future calling from afar
Guiding us like a shooting star

Digital horizon, bright and clear
Showing us the path to steer
Into tomorrow's endless light
Where innovation takes its flight`
  },
  {
    id: 5,
    title: 'Kids',
    artist: 'Alex Alex Sloan',
    duration: '3:07',
    genre: 'Pop',
    audioFile: '/assets/audio/sasha-alex-sloan-kids.mp3', 
    waveform: [0.7, 0.9, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 0.6, 0.8, 0.7, 0.9],
    coverArt: '/assets/images/music/sasha-alex-sloan-kids-cover.jpg', 
    lyrics: `Digital waves across the screen
In this world of endless dreams
Technology and human touch
Creating something that means so much

Synthetic sounds and melodies
Dancing through digital seas
Future calling from afar
Guiding us like a shooting star

Digital horizon, bright and clear
Showing us the path to steer
Into tomorrow's endless light
Where innovation takes its flight`
  },
  {
    id: 6,
    title: 'We Dont Need Much',
    artist: 'Birds Of Figment',
    duration: '3:02',
    genre: 'Pop',
    audioFile: '/assets/audio/bird-of-figment-we-dont-need-much.mp3', 
    waveform: [0.7, 0.9, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 0.6, 0.8, 0.7, 0.9],
    coverArt: '/assets/images/music/bird-of-figment-we-dont-need-much-cover.jpg', 
    lyrics: `Digital waves across the screen
In this world of endless dreams
Technology and human touch
Creating something that means so much

Synthetic sounds and melodies
Dancing through digital seas
Future calling from afar
Guiding us like a shooting star

Digital horizon, bright and clear
Showing us the path to steer
Into tomorrow's endless light
Where innovation takes its flight`
  }
]

export default function AudioPlayer({ onPlayStateChange }: AudioPlayerProps) {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [playAll, setPlayAll] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [shuffledPlaylist, setShuffledPlaylist] = useState<number[]>([])
  const [expandedLyrics, setExpandedLyrics] = useState<number | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const controls = useAnimation()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    onPlayStateChange(isPlaying)
  }, [isPlaying, onPlayStateChange])

  // Handle audio time updates
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }
      
      const handleEnded = () => {
        setIsPlaying(false)
        if (playAll) {
          nextSong()
        }
      }
      
      const handleError = (e: Event) => {
        console.error('Audio error:', e)
        setAudioError('Failed to load audio file. Please check the file path.')
        setIsPlaying(false)
      }
      
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
      }
    }
  }, [playAll])

  // Update audio source when currentSong changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].audioFile
      audioRef.current.load()
      setCurrentTime(0)
      setAudioError(null)
    }
  }, [currentSong])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setAudioError(null)
        }).catch((error) => {
          console.error('Playback failed:', error)
          setAudioError('Failed to play audio. Please try again.')
        })
      }
    }
    
    if (!isPlaying) {
      controls.start({ scale: [1, 1.1, 1] })
    }
  }

  const nextSong = () => {
    if (shuffle && shuffledPlaylist.length > 0) {
      // Find current song in shuffled playlist
      const currentIndex = shuffledPlaylist.indexOf(currentSong)
      const nextIndex = (currentIndex + 1) % shuffledPlaylist.length
      setCurrentSong(shuffledPlaylist[nextIndex])
    } else {
      setCurrentSong((prev) => (prev + 1) % songs.length)
    }
    setCurrentTime(0)
    // Auto-play next song
    setTimeout(() => {
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error)
          setIsPlaying(false)
        })
      }
    }, 100)
  }

  const prevSong = () => {
    if (shuffle && shuffledPlaylist.length > 0) {
      // Find current song in shuffled playlist
      const currentIndex = shuffledPlaylist.indexOf(currentSong)
      const prevIndex = (currentIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
      setCurrentSong(shuffledPlaylist[prevIndex])
    } else {
      setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
    }
    setCurrentTime(0)
    // Auto-play previous song
    setTimeout(() => {
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error)
          setIsPlaying(false)
        })
      }
    }, 100)
  }

  const handleSongSelect = (index: number) => {
    setCurrentSong(index)
    setCurrentTime(0)
    // Auto-play selected song
    setTimeout(() => {
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error)
          setIsPlaying(false)
        })
      }
    }, 100)
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10)
    }
  }

  const togglePlayAll = () => {
    setPlayAll(!playAll)
    if (!playAll) {
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error)
          setIsPlaying(false)
        })
      }
    } else {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }

  const toggleShuffle = () => {
    if (!shuffle) {
      // Create shuffled playlist
      const shuffled = Array.from({ length: songs.length }, (_, i) => i).sort(() => Math.random() - 0.5)
      setShuffledPlaylist(shuffled)
    } else {
      setShuffledPlaylist([])
    }
    setShuffle(!shuffle)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Calculate grid layout for centering odd numbers
  const getGridCols = () => {
    const songCount = songs.length
    if (songCount % 2 === 0) {
      return 'md:grid-cols-2 lg:grid-cols-3'
    } else {
      return 'md:grid-cols-2 lg:grid-cols-3 md:last:col-span-2 lg:last:col-span-3 md:last:mx-auto lg:last:mx-auto md:last:max-w-md lg:last:max-w-lg'
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
      
      {/* Play All Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect p-6 rounded-2xl mb-6"
      >
        <div className="flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayAll}
            className={`btn ${playAll ? 'btn-secondary' : 'btn-primary'}`}
          >
            {playAll ? (
              <div className="flex items-center space-x-2">
                <Pause className="w-4 h-4" />
                <span>Playing All</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Play All</span>
              </div>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleShuffle}
            className={`btn ${shuffle ? 'btn-secondary' : 'btn-primary'}`}
          >
            {shuffle ? (
              <div className="flex items-center space-x-2">
                <Shuffle className="w-4 h-4" />
                <span>Shuffle On</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shuffle className="w-4 h-4" />
                <span>Shuffle</span>
              </div>
            )}
          </motion.button>
        </div>

      </motion.div>

      {/* Main Player */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect p-8 rounded-2xl mb-8"
      >
        {/* Error Message */}
        {audioError && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-center">{audioError}</p>
          </div>
        )}

        {/* Current Song Info */}
        <div className="text-center mb-8">
          {/* Cover Art */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 flex items-center justify-center">
            <img
              src={songs[currentSong].coverArt || `/assets/images/audio-player/${songs[currentSong].id}.jpg`}
              alt={songs[currentSong].title}
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
              className="w-full h-full flex items-center justify-center"
              style={{display: 'none'}}
            >
              <div className="text-6xl">
                <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-2">
            {songs[currentSong].title}
          </h3>
          <p className="text-primary-300 text-lg mb-1">
            {songs[currentSong].artist}
          </p>
          <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm">
            {songs[currentSong].genre}
          </span>
        </div>

        {/* Waveform Visualizer */}
        <div className="flex justify-center items-center space-x-1 mb-8">
          {songs[currentSong].waveform.map((height, index) => (
            <motion.div
              key={index}
              animate={{
                scaleY: isPlaying ? [height, height * 1.2, height] : height
              }}
              transition={{
                duration: 0.5,
                repeat: isPlaying ? Infinity : 0,
                delay: index * 0.1
              }}
              className="w-2 bg-gradient-to-t from-primary-400 to-accent-400 rounded-full"
              style={{ height: `${height * 60}px` }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-primary-300 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{songs[currentSong].duration}</span>
          </div>
          <input
            type="range"
            min="0"
            max={audioRef.current?.duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSong}
            className="p-2 text-primary-300 hover:text-white transition-colors duration-300"
          >
            <SkipBack size={32} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            animate={controls}
            className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-2xl hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSong}
            className="p-2 text-primary-300 hover:text-white transition-colors duration-300"
          >
            <SkipForward size={32} />
          </motion.button>
        </div>

        {/* 10 Second Skip Controls */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipBackward}
            className="p-2 text-primary-300 hover:text-white transition-colors duration-300"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
              <span className="text-sm font-medium">10</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipForward}
            className="p-2 text-primary-300 hover:text-white transition-colors duration-300"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm font-medium">10</span>
              <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
            </div>
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-4">
          <Volume2 className="w-5 h-5 text-primary-300" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32 h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-primary-300 text-sm">{Math.round(volume * 100)}%</span>
        </div>

        {/* About Song Button */}
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedLyrics(expandedLyrics === currentSong ? null : currentSong)}
            className="btn btn-outline"
          >
            {expandedLyrics === currentSong ? 'Hide Lyrics' : 'About Song'}
          </motion.button>
        </div>

        {/* Lyrics Display */}
        {expandedLyrics === currentSong && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 bg-primary-800/50 rounded-xl border border-primary-500/20"
          >
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Lyrics</h4>
            <div className="text-primary-200 text-sm leading-relaxed whitespace-pre-line text-center max-h-64 overflow-y-auto audio-scrollbar">
              {songs[currentSong].lyrics}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Playlist */}
      <div className="max-h-[800px] w-full overflow-y-auto audio-scrollbar pr-2">
        <div className={`grid gap-6 p-4 ${getGridCols()}`}>
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`glass-effect p-4 rounded-xl transition-all duration-300 ${
                currentSong === index ? 'outline-2 outline-primary-500 outline-offset-2' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Cover Art Thumbnail */}
                <div 
                  className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 flex items-center justify-center cursor-pointer"
                  onClick={() => handleSongSelect(index)}
                >
                  <img
                    src={song.coverArt || `/assets/images/audio-player/${song.id}-thumb.jpg`}
                    alt={song.title}
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
                    className="w-full h-full flex items-center justify-center"
                    style={{display: 'none'}}
                  >
                    <div className="text-2xl">
                      <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white cursor-pointer hover:text-primary-300 transition-colors duration-300" onClick={() => handleSongSelect(index)}>
                    {song.title}
                  </h4>
                  <p className="text-sm text-primary-300">{song.artist}</p>
                  <span className="text-xs text-primary-400">{song.genre}</span>
                  <div className="text-sm text-primary-300">{song.duration}</div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  {currentSong === index && isPlaying && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-primary-400 text-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {/* About Song Button for each track */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setExpandedLyrics(expandedLyrics === index ? null : index)}
                    className="px-3 py-1 text-primary-300 hover:text-white text-xs transition-all duration-300"
                  >
                    {expandedLyrics === index ? 'Hide' : 'About'}
                  </motion.button>
                </div>
              </div>
              
              {/* Expanded Lyrics for each track */}
              {expandedLyrics === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-primary-800/30 rounded-lg border border-primary-500/20"
                >
                  <h5 className="text-sm font-semibold text-white mb-2 text-center">Lyrics</h5>
                  <div className="text-primary-200 text-xs leading-relaxed whitespace-pre-line text-center max-h-32 overflow-y-auto audio-scrollbar">
                    {song.lyrics}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 