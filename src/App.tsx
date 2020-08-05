import React from 'react';
import Routes from './router';
import { BrowserRouter } from 'react-router-dom';
import Index from './pages/index/Index'


function App() {
  return (
    <BrowserRouter>
      <Index />
      <Routes/>
    </BrowserRouter>
  )
}

export default App;
