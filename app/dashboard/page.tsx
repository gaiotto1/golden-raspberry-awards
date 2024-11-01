'use client';
import React from 'react';
import YearsWithMultipleWinners from './components/years-with-multiple-winners/years-with-multiple-winners';
import TopStudiosWithWinners from './components/top-studios-with-winners/top-studios-with-winners';
import ProducersWinInterval from './components/producers-win-interval/producers-win-interval';
import WinnersByYear from './components/winners-by-year/winners-by-year';

const Dashboard: React.FC = () => (
  <div className="container mt-4">
    <h2 className="mb-4">Dashboard</h2>
    <div className="row">
      <div className="col-12 col-lg-6 mb-4">
        <YearsWithMultipleWinners />
      </div>
      <div className="col-12 col-lg-6 mb-4">
        <TopStudiosWithWinners />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-lg-6 mb-4">
        <ProducersWinInterval />
      </div>
      <div className="col-12 col-lg-6 mb-4">
        <WinnersByYear />
      </div>
    </div>
  </div>
);

export default Dashboard;
