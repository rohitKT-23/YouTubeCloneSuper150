import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';

const VideoPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [lastVolumeBeforeMute, setLastVolumeBeforeMute] = useState(1);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeout = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'k') {
        togglePlay();
        e.preventDefault();
      } else if (e.key === 'f') {
        toggleFullscreen();
        e.preventDefault();
      } else if (e.key === 'm') {
        toggleMute();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        seekForward();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        seekBackward();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        increaseVolume();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        decreaseVolume();
        e.preventDefault();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = lastVolumeBeforeMute;
      setVolume(lastVolumeBeforeMute);
    } else {
      setLastVolumeBeforeMute(volume);
      video.volume = 0;
      setVolume(0);
    }
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    resetControlsTimeout();
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    
    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    resetControlsTimeout();
  };

  const seekForward = () => {
    videoRef.current.currentTime += 10;
    resetControlsTimeout();
  };

  const seekBackward = () => {
    videoRef.current.currentTime -= 10;
    resetControlsTimeout();
  };

  const increaseVolume = () => {
    const newVolume = Math.min(1, volume + 0.1);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(false);
    resetControlsTimeout();
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    resetControlsTimeout();
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setIsSettingsOpen(false);
    resetControlsTimeout();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden group"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setTimeout(() => setShowControls(false), 2000)}
    >
      <video
        ref={videoRef}
        className="w-full cursor-pointer"
        src={src}
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Big play button in center */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-full p-4 text-white"
        >
          <Play size={32} fill="white" />
        </button>
      )}
      
      {/* Controls overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className="relative h-1 group mb-2 cursor-pointer">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="absolute top-0 left-0 w-full h-1 appearance-none bg-gray-600 rounded-full cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, red ${(currentTime / duration) * 100}%, transparent 0)`,
            }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button onClick={seekBackward} className="text-white hover:text-gray-300 transition-colors">
              <SkipBack size={20} />
            </button>
            
            <button onClick={seekForward} className="text-white hover:text-gray-300 transition-colors">
              <SkipForward size={20} />
            </button>
            
            <div className="flex items-center gap-2 relative group">
              <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <div className="hidden group-hover:block w-24 absolute left-7 bottom-0">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full appearance-none h-1 bg-gray-600 rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(to right, white ${volume * 100}%, transparent 0)`,
                  }}
                />
              </div>
            </div>
            
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Settings size={20} />
              </button>
              
              {isSettingsOpen && (
                <div className="absolute bottom-10 right-0 bg-black bg-opacity-90 rounded-md p-2 w-40">
                  <div className="text-white text-sm font-medium mb-2">Playback speed</div>
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-700 ${
                        playbackRate === rate ? 'text-blue-400' : 'text-white'
                      }`}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;