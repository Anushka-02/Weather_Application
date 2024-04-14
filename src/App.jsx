
import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './Components/TopButtons'
import Inputs from './Components/Inputs'
import TimeAndLocation from './Components/TimeAndLocation'
import TempratureAndDetails from './Components/TempratureAndDetails'
import Forecast from './Components/Forecast'

import getWeatherData from './services/weatherService'
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react'
import { fetchCityData } from './services/CityTable'

function App() {



  const [query, setQuery] = useState({})
  useEffect(()=>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
  
          setQuery({
              lat, lon
          })
      })
  }
  },[])
  
 const [units, setUnits] = useState('metric')
 const [weather, setWeather] = useState(null)


  useEffect(() =>{

    const fetchWeather = async ()=>{
      await getFormattedWeatherData({...query, units})
      .then((data) => {
        setWeather(data)
      })
      
    }
  
    fetchWeather();


  },[query, units])

  console.log(fetchCityData())

  const formatBackgound = () =>{
    console.log(weather.details)

    // if(!weather) return "from-cyan-700 to to-blue-700";

    // const theshold = units === 'mertic' ? 20 : 60;

    // if(weather.temp <= theshold) return 'from-cyan-700 to-blue-700';

    // return 'from-yellow-700 to-orange-700';

    if (!weather) return "from-cyan-700 to to-blue-700";

  // Determine weather conditions based on the data
  const weatherCondition = weather.details.toLowerCase();

  // Set background colors based on weather conditions
  switch (weatherCondition) {
    case 'clouds':
      return 'from-gray-700 to-gray-500';
    case 'haze':
      return 'from-gray-400 to-gray-300';
    case 'clear':
      // Assuming 'clear' weather is cool
      return 'from-cyan-700 to-blue-700';
    case 'rain':
    case 'thunderstorm':
      // Assuming 'rain' and 'thunderstorm' weather is cold
      return 'from-blue-700 to-purple-700';
    default:
      // For any other condition, return a default background
      return 'from-cyan-700 to-blue-700';
  }
    
  };

  return (
    
    <>
      <div className= {`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackgound()}`}>
        <TopButtons setQuery = {setQuery}/>
        <Inputs setQuery= {setQuery} units= {units} setUnits={setUnits}/>

        {weather &&(
          <>
        <TimeAndLocation weather = {weather}/>
        <TempratureAndDetails weather = {weather}/>
        <Forecast title="Hourly forecast" items={weather.hourly}/>
        <Forecast title="Daily forecast" items={weather.daily}/>
        </>
        )}
      </div>
    </>
  )
}

export default App
