import React, { useEffect, useState } from 'react';
import { getTopStudiosWithWins } from '../../../services/apiService';
import { Studio } from '../../../types/movies.type';

const TopStudiosWithWinners: React.FC = () => {
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    const fetchStudios = async () => {
      const data = await getTopStudiosWithWins();
      setStudios(data?.studios.slice(0, 3));
    };
    fetchStudios();
  }, []);

  return (
    <div className="card">
      <div className="card-header" style={{ fontSize: '1.25rem' }}>Top 3 studios with winners</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((studio, index) => (
              <tr key={index}>
                <td>{studio.name}</td>
                <td>{studio.winCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudiosWithWinners;
