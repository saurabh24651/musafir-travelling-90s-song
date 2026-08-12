import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Radio } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [onlineCount, setOnlineCount] = useState(598);
  const audioRef = useRef(null);

  // Your exact AWS S3 Object URL
  const streamUrl = "https://musafir-playlist.s3.ap-southeast-2.amazonaws.com/Song.mp3";

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto bg-black text-white flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-black">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-90"
        style={{ backgroundImage: `url('/bg.png')` }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 pt-6 flex justify-between items-center gap-2">
        <div className="bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span> 
          <span className="font-medium whitespace-nowrap">{onlineCount} on the highway</span>
        </div>

        <div className="bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-medium shadow-lg">
          {currentTime}
        </div>
      </header>

      {/* Central Title and Quote Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 my-8 text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-neutral-900/90 drop-shadow-2xl select-none mb-6">
          मुसाफिर
        </h1>
        <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-amber-200 text-sm sm:text-lg font-medium shadow-xl tracking-wide max-w-md">
          सफर लम्बा है, जल्दी क्या है?
        </div>
      </main>

      {/* Bottom Audio Player Bar */}
      <footer className="relative z-20 w-full px-4 pb-6 flex justify-center">
        <div className="w-full max-w-xl bg-neutral-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl">
          <audio ref={audioRef} src={streamUrl} preload="auto" />
          
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <Radio className="text-amber-300 animate-pulse" size={22} />
            </div>
            <div className="min-w-0">
              <h4 className="m-0 text-sm font-semibold text-white truncate">Song.mp3</h4>
              <p className="m-0 text-xs text-emerald-400 truncate">● Streaming from AWS S3</p>
            </div>
          </div>

          <button 
            onClick={togglePlay} 
            className="w-12 h-12 rounded-full bg-white text-black border-none flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform shrink-0"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} fill="#000" /> : <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />}
          </button>
        </div>
      </footer>
    </div>
  );
}