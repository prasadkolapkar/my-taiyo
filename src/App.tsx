import React from 'react';
import './App.css';
import Header from './shared/components/Header';
import Sidebar from './shared/components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from './components/Overview';
import Contact from './components/Contact';
import MapCharts from './components/MapCharts';

const App = () => {
  return (
    <div><Router>
      <Header />
      <div className="flex flex-1">
        <div className="w-1/5 bg-gray-800 text-white p-4 border-t-2 border-white h-screen"><Sidebar /></div>
        <div className="flex-1 bg-gray-100 p-4 w-full">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/map" element={<MapCharts />} />
          </Routes>
        </div>
      </div></Router>
    </div >
  );
};

export default App;
