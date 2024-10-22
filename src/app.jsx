import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TopSpot from './topspot';
import './cs/style.css';

const App = () => {
  const [topspots, setTopspots] = useState([]);

  useEffect(() => {
    Axios.get('https://ccc.helloworldbox.com/items/top_spots')
      .then(response => setTopspots(response.data.data))
      .catch(error => console.error('Error fetching top spots:', error));
  }, []);

  return (
    <div className='App'>
      <div className="container header-container"> 
        <h1 className="text-center">San Diego Top Spots</h1>
        <h3 className="text-center">A list of the top 30 places to see in San Diego, California.</h3>
      </div>
      <div className="container top-spots-container">
        <div className="row">
          {topspots.length > 0 ? (
            topspots.map((topspot, index) => (
              <div className="col-md-4 mb-4 d-flex" key={index}>
                <TopSpot {...topspot} />
              </div>
            ))
          ) : (
            <p>Loading top spots...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
