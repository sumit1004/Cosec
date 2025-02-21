import React, { useEffect, useRef, useState } from 'react';
import { Cake, Gift, Heart, Music, PartyPopper, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Start music when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked', e));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000); // Show message after 1 second on first load

    return () => clearTimeout(timer);
  }, []);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const cards = [
    {
      icon: <Cake className="w-12 h-12 text-pink-500" />, 
      title: "Happy Birthday Cosec!",
      message: "May your day be filled with joy and laughter!",
      image: "/assets/img1.jpg"
    },
    {
      icon: <PartyPopper className="w-12 h-12 text-purple-500" />, 
      title: "Make a Wish",
      message: "May all your dreams and wishes come true!",
      image: "/assets/img2.jpg"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />, 
      title: "Sending Love",
      message: "Wishing you love, health, and happiness!",
      image: "/assets/img3.jpg"
    },
    {
      icon: <Gift className="w-12 h-12 text-blue-500" />, 
      title: "Special Day",
      message: "You deserve all the happiness in the world!",
      image: "/assets/img4.jpg"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-500" />, 
      title: "Shine Bright",
      message: "Keep spreading your light and positivity!",
      image: "/assets/img5.jpg"
    }
  ];

  const audioSources = [
    "/assets/happybirthday1.mp3",
    "/assets/happybirthday2.mp3",
    "/assets/happybirthday3.mp3",
    "/assets/happybirthday4.mp3",
    "/assets/happybirthday5.mp3"
  ];

  const handleCardClick = (index: number) => {
    if (audioRef.current) {
      audioRef.current.src = audioSources[index];
      audioRef.current.play();
    }
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isHovering) return;

    const scrollInterval = setInterval(() => {
      container.scrollLeft += 1;
      
      // Reset scroll position when reaching the end
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
        container.scrollLeft = 0;
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 overflow-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Music player */}
      <audio
        ref={audioRef}
        loop
        controls 
        className="fixed bottom-4 right-4 z-50">
        <source src="/assets/happybirthday1.mp3" type="audio/mp3" />
      </audio>

      {/* Music icon */}
      <div className="fixed top-4 right-4 z-50 animate-bounce">
        <Music className="w-8 h-8 text-white" />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center">
        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-black mb-4">Click on the images to listen to music!</p>
              <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCloseMessage}>OK</button>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold text-center text-white mb-4 absolute top-0 left-1/2 transform -translate-x-1/2">
          Happy Birthday Cosec!
        </h1>

        {/* Scroll buttons */}
        <button 
          onClick={() => scrollTo('left')}
          className="absolute left-4 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scrollTo('right')}
          className="absolute right-4 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
        >
          <ChevronRight size={24} />
        </button>

        {/* Updated scroll container */}
        <div 
          ref={scrollContainerRef}
          className="w-full py-20 flex space-x-8 overflow-x-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex space-x-8 min-w-max">
              {cards.map((card, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="w-80 h-96 flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-white/20 shadow-xl"
                  onClick={() => handleCardClick(index)}
                  style={{
                    transform: `perspective(1000px) rotateY(${Math.sin((index + setIndex * cards.length) * 0.1) * 10}deg)`
                  }}
                >
                  <div className="relative h-48">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end justify-center pb-4">
                      {card.icon}
                    </div>
                  </div>
                  <div className="h-48 flex flex-col items-center justify-center text-white text-center space-y-4 p-6">
                    <h2 className="text-2xl font-bold">{card.title}</h2>
                    <p className="text-lg opacity-80">{card.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;