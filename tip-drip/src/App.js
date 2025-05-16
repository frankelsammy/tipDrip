import React from 'react';
import './App.css';

function App() {
  const handleClick = async (buttonName) => {
    try {
      const res = await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `User clicked ${buttonName}` }),
      });
      const data = await res.json();
      console.log(data.status);
    } catch (error) {
      console.error('Error logging:', error);
    }
  };

  return (
    <div className='app-container'>
      <h1 className='app-heading'>User 1</h1>
      <div className="buttons-container">
      <button className='app-button' onClick={() => handleClick('Button 1')}>Button 1</button>
      <button className='app-button' onClick={() => handleClick('Button 2')}>Button 2</button>
      <button className='app-button' onClick={() => handleClick('Button 3')}>Button 3</button>
      </div>
    </div>
  );
}

export default App;
