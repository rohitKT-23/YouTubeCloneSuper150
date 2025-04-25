import { Youtube } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1 py-2">
      <Youtube size={28} fill="#FF0000" color="#FFF" />
      <span className="font-bold text-xl tracking-tight hidden sm:block">YouTube</span>
    </div>
  );
};

export default Logo;