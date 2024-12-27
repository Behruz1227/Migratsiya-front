import React, { useState } from 'react';
import Charts from '../../../components/chart/Charts';
import ApexBarChart from '../../../components/chart/ChartLine';



const NewStatistika: React.FC = () => {
  return (
    <div className=''>
      <div className=''>
        <h1>Migration Statistics</h1>
        <div className='mt-20 mb-10'>
          <Charts />
        </div>
        <div className='mt-20 mb-10'>
         <ApexBarChart/>
        </div>
      </div>

    </div>
  );
};

export default NewStatistika;
