import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const filters = [
  'All', 'Music', 'Gaming', 'React', 'JavaScript', 'TypeScript', 
  'Node.js', 'MongoDB', 'PostgreSQL', 'Redux', 'Vue', 'Angular', 
  'CSS', 'HTML', 'Design', 'UI/UX', 'Tailwind', 'Bootstrap'
];

const FilterButtons = ({ selected, setSelected }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show/hide left arrow based on scroll position
      setShowLeftArrow(scrollLeft > 0);
      
      // Show/hide right arrow based on whether we can scroll more to the right
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    };
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative flex items-center py-3">
      {/* Left fade and scroll button */}
      {showLeftArrow && (
        <div className="absolute left-0 z-10 flex h-full items-center">
          <div className="absolute left-0 h-full w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent"></div>
          <button 
            onClick={scrollLeft}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md z-10 ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}

      {/* Scrollable filter container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 mx-auto pb-1 md:ml-64"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              selected === f
                ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      {/* Right fade and scroll button */}
      {showRightArrow && (
        <div className="absolute right-0 z-10 flex h-full items-center">
          <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent"></div>
          <button 
            onClick={scrollRight}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md z-10 mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButtons;