import { Home, Compass, Clock, ThumbsUp, Video, History, PlaySquare, Film, Flame, ShoppingBag, Music, Radio, Gamepad2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const mainLinks = [
    { icon: <Home size={22} />, title: 'Home', path: '/' },
    { icon: <Compass size={22} />, title: 'Explore', path: '/explore' },
    { icon: <Video size={22} />, title: 'Shorts', path: '/shorts' },
    { icon: <PlaySquare size={22} />, title: 'Subscriptions', path: '/subscriptions' },
  ];
  
  const personalLinks = [
    { icon: <History size={22} />, title: 'History', path: '/history' },
    { icon: <Clock size={22} />, title: 'Watch Later', path: '/playlist?list=WL' },
    { icon: <ThumbsUp size={22} />, title: 'Liked Videos', path: '/playlist?list=LL' },
  ];
  
  const explorationLinks = [
    { icon: <Flame size={22} />, title: 'Trending', path: '/trending' },
    { icon: <ShoppingBag size={22} />, title: 'Shopping', path: '/shopping' },
    { icon: <Music size={22} />, title: 'Music', path: '/music' },
    { icon: <Film size={22} />, title: 'Movies', path: '/movies' },
    { icon: <Radio size={22} />, title: 'Live', path: '/live' },
    { icon: <Gamepad2 size={22} />, title: 'Gaming', path: '/gaming' },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white z-10 overflow-y-auto pb-20 hidden md:block">
      <div className="px-4 py-3">
        <div className="mb-6">
          {mainLinks.map((link) => (
            <div 
              key={link.path}
              className={`sidebar-item ${path === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.title}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h3 className="font-medium px-3 mb-1">You</h3>
          {personalLinks.map((link) => (
            <div 
              key={link.path}
              className={`sidebar-item ${path === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.title}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium px-3 mb-1">Explore</h3>
          {explorationLinks.map((link) => (
            <div 
              key={link.path}
              className={`sidebar-item ${path === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.title}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 px-3 text-xs text-gray-500">
          <div className="mb-4">
            <p>About Press Copyright</p>
            <p>Contact us Creators Advertise</p>
            <p>Developers</p>
          </div>
          <div>
            <p>Terms Privacy Policy & Safety</p>
            <p>How YouTube works</p>
            <p>Test new features</p>
          </div>
          <p className="mt-4">© 2024 YouTube Clone</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;