import { useState } from 'react';

import PropTypes from 'prop-types';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'news', name: 'News' },
    { id: 'movies', name: 'Movies' },
    { id: 'sports', name: 'Sports' },
    { id: 'education', name: 'Education' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'tech', name: 'Tech' },
    { id: 'travel', name: 'Travel' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'art', name: 'Art' }
  ];
  
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId === 'all' ? '' : categoryId);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryFilter;