import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => { //passing the props name,entries into the Rank component
    return (
        <div className="rank-container">
          <div className='white f3'>
            {`${name}, your current entry count is...`}
          </div>
          <div className='white f3'>
            {entries}
          </div>
        </div>
      );
    }

  export default Rank;
