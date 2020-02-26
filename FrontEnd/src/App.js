import React from 'react';


import './App.css';

import logo from './assets/logo_origi.png';

import Routes from './routes';

function App() {
  

  return (
   <div className="container">
     <img src={logo} alt="AIRCnc"/>

      <div className="content">
        <Routes />
     

      </div>
   </div>
      
  );
}

export default App;
