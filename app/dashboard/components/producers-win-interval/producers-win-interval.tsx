import React, { useEffect, useState } from 'react';
import { getProducersWinInterval } from '../../../services/apiService';
import { ProducersWinIntervalResponse, ProducerWinInterval } from '../../../types/movies.type';

const ProducersWinInterval: React.FC = () => {
  const [data, setData] = useState<ProducersWinIntervalResponse>({ min: [], max: [] });

  useEffect(() => {
    const fetchIntervalData = async () => {
      const result = await getProducersWinInterval();
      setData(result);
    };
    fetchIntervalData();
  }, []);

  return (
    <div className="card">
      <div className="card-header" style={{ fontSize: '1.25rem' }}>Producers with longest and shortest interval between wins</div>
      <div className="card-body">
        <h6>Maximum</h6>
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th>Producer</th>
              <th>Interval</th>
              <th>Previous Year</th>
              <th>Following Year</th>
            </tr>
          </thead>
          <tbody>
            {data.max.map((producer: ProducerWinInterval, index) => (
              <tr key={index}>
                <td>{producer.producer}</td>
                <td>{producer.interval}</td>
                <td>{producer.previousWin}</td>
                <td>{producer.followingWin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h6>Minimum</h6>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Producer</th>
              <th>Interval</th>
              <th>Previous Year</th>
              <th>Following Year</th>
            </tr>
          </thead>
          <tbody>
            {data.min.map((producer: ProducerWinInterval, index) => (
              <tr key={index}>
                <td>{producer.producer}</td>
                <td>{producer.interval}</td>
                <td>{producer.previousWin}</td>
                <td>{producer.followingWin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProducersWinInterval;
