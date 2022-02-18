import React from 'react';
import { Notifications } from 'react-push-notification';
import Rout from '../routes/Routes';
import './App.css';



function App() {
  
  return (
    <div className="App">
      <Notifications />
      <Rout />
    </div>
  );
}

export default App;
