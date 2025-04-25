import { useLocation, Link } from 'react-router-dom';
import { 
  Home, TrendingUp, Video, Library, Clock, History, PlaySquare, 
  ThumbsUp, Flame, Music, Film, Gamepad2, Newspaper, Award, 
  Lightbulb, Settings, Flag, HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const mainLinks = [
    { icon: <Home size={20} />, text: 'Home', path: '/' },
    { icon: <TrendingUp size={20} />, text: 'Trending', path: '/trending' },
    { icon: <Video size={20} />, text: 'Subscriptions', path: '/subscriptions' },
  ];
  
  const libraryLinks = [
    { icon: <Library size={20} />, text: 'Library', path: '/library' },
    { icon: <History size={20} />, text: 'History', path: '/history' },
    { icon: <PlaySquare size={20} />, text: 'Your videos', path: '/your-videos' },
    { icon: <Clock size={20} />, text: 'Watch later', path: '/watch-later' },
    { icon: <ThumbsUp size={20} />, text: 'Liked videos', path: '/liked-videos' },
  ];
  
  const exploreLinks = [
    { icon: <Flame size={20} />, text: 'Trending', path: '/trending' },
    { icon: <Music size={20} />, text: 'Music', path: '/music' },
    { icon: <Film size={20} />, text: 'Movies', path: '/movies' },
    { icon: <Gamepad2 size={20} />, text: 'Gaming', path: '/gaming' },
    { icon: <Newspaper size={20} />, text: 'News', path: '/news' },
    { icon: <Award size={20} />, text: 'Sports', path: '/sports' },
    { icon: <Lightbulb size={20} />, text: 'Learning', path: '/learning' },
  ];
  
  const moreLinks = [
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
    { icon: <Flag size={20} />, text: 'Report history', path: '/report' },
    { icon: <HelpCircle size={20} />, text: 'Help', path: '/help' },
  ];

  const renderLinks = (links) => {
    return links.map((link, index) => (
      <Link
        key={index}
        to={link.path}
        className={`flex items-center gap-6 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
          location.pathname === link.path ? 'font-medium bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <span className="text-gray-500 dark:text-gray-400">{link.icon}</span>
        <span className="text-sm">{link.text}</span>
      </Link>
    ));
  };

  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 overflow-y-auto hidden md:block pt-2 pb-4 px-3 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors">
      <div className="space-y-1 mb-6">
        {renderLinks(mainLinks)}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Library
        </h3>
        <div className="space-y-1">
          {renderLinks(libraryLinks)}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Explore
        </h3>
        <div className="space-y-1">
          {renderLinks(exploreLinks)}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          More from YouTube
        </h3>
        <div className="space-y-1">
          {renderLinks(moreLinks)}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 px-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          © 2024 Google LLC
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Policy & Safety</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;