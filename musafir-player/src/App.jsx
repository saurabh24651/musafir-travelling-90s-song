import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Compass, Radio } from 'lucide-react';

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
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }} />

      {/* Top Navigation Bar */}
      <div style={{ position: 'absolute', top: '24px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 8px #34d399' }}></span> 
          <span style={{ fontWeight: '500' }}>{onlineCount} on the highway</span>
        </div>

        <div style={{ width: '120px' }}></div>

        <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px', fontWeight: '500' }}>
          {currentTime}
        </div>
      </div>

      {/* Quote */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#fef08a', background: 'rgba(0,0,0,0.5)', padding: '10px 28px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', letterSpacing: '0.5px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          सफर लम्बा है, जल्दी क्या है?
        </h2>
      </div>

      {/* Bottom Player */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', width: '92%', maxWidth: '750px', background: 'rgba(20,20,20,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <audio ref={audioRef} src={streamUrl} preload="auto" />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.25)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Radio color="#fde047" size={22} className="animate-pulse" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff' }}>Song.mp3</h4>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#34d399' }}>● Streaming from AWS S3</p>
          </div>
        </div>

        <button 
          onClick={togglePlay} 
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
        >
          {isPlaying ? <Pause size={20} color="#000" fill="#000" /> : <Play size={20} color="#000" fill="#000" style={{ marginLeft: '2px' }} />}
        </button>
      </div>
    </div>
  );
}
