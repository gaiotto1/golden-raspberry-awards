import React from 'react';

interface FiltersProps {
  yearFilter: string;
  winnerFilter: string;
  setYearFilter: (value: string) => void;
  setWinnerFilter: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ yearFilter, winnerFilter, setYearFilter, setWinnerFilter }) => (
  <div className="row mb-3">
    <div className="col-md-4 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Filter by year"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        aria-label="Filter by year"
      />
    </div>
    <div className="col-md-4 mb-3">
      <select
        className="form-control"
        value={winnerFilter}
        onChange={(e) => setWinnerFilter(e.target.value)}
        aria-label="Filter by winner"
      >
        <option value="">All</option>
        <option value="true">Winner</option>
        <option value="false">Non-winner</option>
      </select>
    </div>
  </div>
);

export default Filters;
