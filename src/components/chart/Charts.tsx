import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js konfiguratsiyasini ro'yxatdan o'tkazish
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  // Data
  const dataDoughnut1 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Colors',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const dataDoughnut2 = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Fruits',
        data: [200, 150, 100],
        backgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
        hoverBackgroundColor: ['#45A049', '#8E24AA', '#FB8C00'],
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '20px', padding: '0 50px' }}>
      {/* Chap tomondagi diagramma */}
      <div
        style={{
          width: '370px',
          padding: '30px',
          backgroundColor: '#f9f9f9', // Chap diagramma uchun fon rangi
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Yosh bo'yicha</h3>
        <select name="" id="">
            <option value="">10</option>
            <option value="">20</option>
            <option value="">30</option>
        </select>
        <Doughnut data={dataDoughnut1} />
      </div>

      {/* O'ng tomondagi diagramma */}
      <div
        style={{
          width: '370px',
          padding: '30px',
          backgroundColor: '#e8f5e9', // O'ng diagramma uchun fon rangi
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Doughnut Chart 2</h3>
        <Doughnut data={dataDoughnut2} />
      </div>
    </div>
  );
};

export default Charts;
