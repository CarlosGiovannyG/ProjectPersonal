import React from 'react';
import { Notifications } from 'react-push-notification';
import Rout from '../routes/Routes';
import './App.css';
import { ToastContainer } from 'react-toastify';



function App() {
  
  return (
    <div className="App">
      <Notifications />
      <Rout />
      <ToastContainer />
    </div>
  );
}

export default App;
