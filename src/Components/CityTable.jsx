// CityTable.js
import React, { useState } from 'react';

function CityTable({ cities, onCityClick }) {
  const [sortedCities, setSortedCities] = useState(cities);
  console.log(cities)
  const [sortOrder, setSortOrder] = useState('asc');

  const sortColumn = (columnName) => {
    const sorted = [...sortedCities].sort((a, b) => {
      if (a[columnName] < b[columnName]) return sortOrder === 'asc' ? -1 : 1;
      if (a[columnName] > b[columnName]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedCities(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortColumn('city')}>City</th>
          <th onClick={() => sortColumn('country')}>Country</th>
          <th onClick={() => sortColumn('timezone')}>Timezone</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {cities.map(city => (
          <tr key={city.geoname_id} onClick={() => onCityClick(city)}>
            <td>{city.name}</td>
            <td>{city.cou_name_en}</td>
            <td>{city.timezone}</td>
            {/* Render more columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CityTable;
