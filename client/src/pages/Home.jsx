import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import VideoGrid from '../components/VideoGrid';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="p-4 pt-6">
      <div className="sticky top-16 bg-white z-10 pb-4">
        <CategoryFilter onCategoryChange={setSelectedCategory} />
      </div>
      <VideoGrid category={selectedCategory} />
    </div>
  );
};

export default Home;