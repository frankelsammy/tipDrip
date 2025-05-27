import { Droplets } from 'lucide-react';
import './Header.css';
const Header = () => {
  return (
    <header>
      <div className="flex items-center space-x-2">
        <Droplets className="logo" />
        <span className="app-name">TipDrip</span>
      </div>
      <hr></hr>
    </header>
  );
};

export default Header;
