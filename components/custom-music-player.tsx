"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, ChevronRight, Play, Pause, SkipBack, SkipForward, ChevronLeft } from 'lucide-react'

const playlists = [
  { name: "Musik Pagi", image: "/placeholder.svg?height=80&width=80" },
  { name: "Musik Anu", image: "/placeholder.svg?height=80&width=80" },
  { name: "Loli Baru", image: "/placeholder.svg?height=80&width=80" },
  { name: "Anak Senja", image: "/placeholder.svg?height=80&width=80" },
]

const trendingSongs = [
  { name: "Balonku Ada 5 Meter", artist: "Hannah", duration: "3:20" },
  { name: "Kucing Kesayangan", artist: "Maimunah", duration: "3:20" },
  { name: "Balonku Ada 5 Meter", artist: "Hannah", duration: "3:20" },
]

const topArtists = [
  { name: "Mamank", followers: "1,234", plays: "1,234" },
  { name: "Maimunah", followers: "1,234", plays: "1,234" },
  { name: "Palijo", followers: "1,234", plays: "1,234" },
]

const personalPhotos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5675f4ccad53789b67a4a3ea7d1fb74-r2M0liXvmvWvRSBr5hpPGAb2WzD8m4.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3c87eb8ed0a28172e6c99a096469d0a-VIEjLBcyhRi7QCcWvyGTWXVpQreqbZ.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8aaf720c9a93906197990f0d6ccbaef-J5jvanAvgue4HB6QDfRM6wAsZDiYN3.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/111aec1b624a96af50fbc82367773d7-RlNI1s6Pnj3ZOD0TEFi6guFyAs5tr2.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/af3f7cf16322b8f55518c264182965c-3URuPRF4KnLwzJF3YHl1iAUNs7J9Es.jpg"
]

export function CustomMusicPlayerComponent() {
  const [selectedSong, setSelectedSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioSrc, setAudioSrc] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioSrc(url)
      setSelectedSong(file.name)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changePhoto = (direction: 'next' | 'prev') => {
    setCurrentPhotoIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % personalPhotos.length
      } else {
        return (prevIndex - 1 + personalPhotos.length) % personalPhotos.length
      }
    })
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc
    }
  }, [audioSrc])

  return (
    <div className="flex h-screen bg-purple-100 p-6">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 rounded-l-3xl p-6 flex flex-col text-white">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-full mr-4"></div>
          <div>
            <h2 className="font-bold">Ahmad Fauzi</h2>
            <p className="text-sm text-gray-400">Menu</p>
          </div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center"><span className="mr-4">🏠</span> Explore</li>
            <li className="flex items-center"><span className="mr-4">📊</span> Genres</li>
            <li className="flex items-center"><span className="mr-4">💿</span> Albums</li>
            <li className="flex items-center"><span className="mr-4">🎤</span> Artist</li>
          </ul>
        </nav>
        <div className="mt-auto">
          <h3 className="text-gray-400 mb-2">Library</h3>
          <ul className="space-y-2">
            <li>Favorites</li>
            <li>Popular</li>
            <li>My Music</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-r-3xl p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Home</h1>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500" />
            <Search className="text-gray-500" />
          </div>
        </header>

        {/* Personal Photos Carousel */}
        <div className="relative mb-8 h-64">
          <img 
            src={personalPhotos[currentPhotoIndex]} 
            alt="Personal photo" 
            className="w-full h-full object-cover rounded-3xl"
          />
          <button 
            onClick={() => changePhoto('prev')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
          >
            <ChevronLeft className="text-gray-800" />
          </button>
          <button 
            onClick={() => changePhoto('next')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
          >
            <ChevronRight className="text-gray-800" />
          </button>
        </div>

        {/* Audio File Input */}
        <div className="mb-8">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100"
          />
        </div>

        {/* Playlist */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Playlist</h2>
            <button className="text-purple-500 font-bold flex items-center">
              See More <ChevronRight className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {playlists.map((playlist, index) => (
              <div key={index} className="bg-purple-100 rounded-xl p-4 text-center">
                <img src={playlist.image} alt={playlist.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                <p className="font-bold">{playlist.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Trending</h2>
          <div className="space-y-4">
            {trendingSongs.map((song, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-full p-2">
                <div className="flex items-center">
                  <span className="w-8 text-center">{index + 1}</span>
                  <img src="/placeholder.svg?height=40&width=40" alt={song.name} className="w-10 h-10 rounded-full mx-4" />
                  <div>
                    <p className="font-bold">{song.name}</p>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{song.duration}</span>
                  <button 
                    className="bg-purple-500 text-white rounded-full p-2"
                    onClick={() => setSelectedSong(song.name)}
                  >
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Artists */}
        <div>
          <h2 className="text-xl font-bold mb-4">Top Artist</h2>
          <div className="space-y-4">
            {topArtists.map((artist, index) => (
              <div key={index} className="flex items-center">
                <img src="/placeholder.svg?height=50&width=50" alt={artist.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold">{artist.name}</p>
                  <p className="text-sm text-gray-500">{artist.followers} Followers • {artist.plays} Plays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Player */}
      <div className="fixed bottom-6 left-6 w-60 bg-gray-900 rounded-2xl p-4 text-white">
        <div className="flex items-center mb-4">
          <img src="/placeholder.svg?height=50&width=50" alt="Current Song" className="w-12 h-12 rounded-xl mr-4" />
          <div>
            <p className="font-bold">{selectedSong || "No song selected"}</p>
            <p className="text-sm text-gray-400">Custom Audio</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <SkipBack size={20} />
          <button onClick={togglePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <SkipForward size={20} />
        </div>
        <audio ref={audioRef} />
      </div>
    </div>
  )
}