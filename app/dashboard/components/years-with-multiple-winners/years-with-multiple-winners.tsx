import React, { useEffect, useState } from 'react';
import { getYearsWithMultipleWinners } from '../../../services/apiService';
import { YearWithWinner } from '../../../types/movies.type';

const YearsWithMultipleWinners: React.FC = () => {
  const [years, setYears] = useState<YearWithWinner[]>([]);

  useEffect(() => {
    const fetchYears = async () => {
      const data = await getYearsWithMultipleWinners();
      setYears(data?.years);
    };
    fetchYears();
  }, []);

  return (
    <div className="card">
      <div className="card-header" style={{ fontSize: '1.25rem' }}>List years with multiple winners</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Year</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            {years.map((year) => (
              <tr key={year.year}>
                <td>{year.year}</td>
                <td>{year.winnerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearsWithMultipleWinners;
