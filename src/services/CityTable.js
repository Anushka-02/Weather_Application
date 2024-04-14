// cityService.js

// Function to fetch city data from the API
export const fetchCityData = async () => {
  try {
    const response = await fetch('https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name');
    if (!response.ok) {
      throw new Error('Failed to fetch city data');
    }
    const data = await response.json();
    // Assuming the data structure has properties like id, name, country, timezone, etc.
    const cities = data.records.map(record => ({
      id: record.recordid,
      name: record.fields.name,
      country: record.fields.cou_name_en,
      timezone: record.fields.timezone,
      // Add more properties as needed
    }));
    return cities;
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
