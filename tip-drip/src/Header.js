import { Droplets } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md px-6 py-4">
      <div className="flex items-center space-x-2">
        <Droplets className="w-6 h-6" />
        <span className="text-xl font-semibold">Tip Drip</span>
      </div>
    </header>
  );
};

export default Header;
