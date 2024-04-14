    import { DateTime } from "luxon";


    const API_KEY = "1f013c8719070eba00187837c2112551";

    const BASE_URL_2_5 = "https://api.openweathermap.org/data/2.5/";
    const BASE_URL_3_0 = "https://api.openweathermap.org/data/3.0/";





    const getWeatherData = (infoType, searchParams)=>{
        let url;
        if (infoType === 'weather') {
            url = new URL(`${BASE_URL_2_5}${infoType}`);
        } else if (infoType === 'onecall') {
            url = new URL(`${BASE_URL_3_0}${infoType}`);
        }
        url.search = new URLSearchParams({...searchParams, appid:API_KEY});
        
        return fetch(url)
        .then((res)=> res.json())

    };

    const formatCurrentWeather = (data) =>{
        const {
            coord: { lat, lon },
            main: {temp, feels_like, temp_min, temp_max, humidity},
            name,
            dt,
            sys: {country, sunrise, sunset},
            weather,
            wind: {speed}
        } = data

        const {main: details, icon} = weather[0]

        return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
    }

    const formatForecastWeather = (data) =>{
        let {timezone, daily, hourly } = data;
        daily = daily.slice(1, 6).map(d => {
            return {
                title: formatToLocalTime(d.dt, timezone, 'ccc'),
                temp: d.temp.day,
                icon: d.weather[0].icon
            }
        });

        hourly = hourly.slice(1, 6).map(d => {
            return {
                title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
                temp: d.temp,
                icon: d.weather[0].icon
            }
        });

        return {timezone, daily, hourly};
    }

    const getFormattedWeatherData = async (searchParams) => {

        const formattedCurrentWeather = await getWeatherData('weather', searchParams)
                                        .then(formatCurrentWeather)

                                        const { lat, lon } = formattedCurrentWeather;

        const formattedForecastWeather = await getWeatherData('onecall', {
            lat,
            lon,
            exclude: "current,minutely,alerts", 
            units: searchParams.units
        }).then(formatForecastWeather)

        return {...formattedCurrentWeather, ...formattedForecastWeather};
    }

    const formatToLocalTime = (secs, zone,
                                format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
                            ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


    const iconUrlFromCode = (code)=>`https://openweathermap.org/img/wn/${code}@2x.png`;

    export default getFormattedWeatherData;

    export {formatToLocalTime, iconUrlFromCode}

