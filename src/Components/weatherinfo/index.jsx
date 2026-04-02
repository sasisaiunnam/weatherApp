// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'

// function WeatherInfo() {

// const [weatherInfo,setWeatherInfo] =useState('')
//  const [city, setCity] = useState(''); 
//   const [inputCity, setInputCity] = useState('');


// console.log(weatherInfo)

//    const weatherData =async(searchcity) =>{
// try{
//     const apiKey ="8c11175bad977486908418a7ecc2432a"
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=${apiKey}`

//     const response = await fetch(url)
//     const data = await response.json()
//     setWeatherInfo(data)

// }
// catch{error}
    
//    }

//    useEffect (()=>{
//     if(city){
//      weatherData(city)
//     }
//    },[]);

//    const handleSearch = (e) => {
//     e.preventDefault();
//     if (inputCity.trim()) {
//       setCity(inputCity);
//       weatherData(inputCity);
//     }
//   };


//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input type='text' placeholder='enter city' onChange={(e)=>{setInputCity(e.target.value)}}  />
//         <button type='submit'>search</button>

//       </form>
//       { weatherInfo && ( 
//         <div style={{ marginTop: '20px' }}>
//           <p><strong>City:</strong> {weatherInfo.name}, {weatherInfo.sys.country}</p>
//           <p><strong>Temperature:</strong> {weatherInfo.main.temp}°C</p>
//           <p><strong>Feels Like:</strong> {weatherInfo.main.feels_like}°C</p>
//           <p><strong>Weather:</strong> {weatherInfo.weather[0].main} - {weatherInfo.weather[0].description}</p>
//           <p><strong>Humidity:</strong> {weatherInfo.main.humidity}%</p>
//           <p><strong>Wind Speed:</strong> {weatherInfo.wind.speed} m/s</p>
//         </div>
//       )}
        

      
//     </div>
//   )
// }

// export default WeatherInfo


import React, { useEffect, useState } from 'react';

function WeatherInfo() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherData = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = "8c11175bad977486908418a7ecc2432a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeatherInfo(data);
    } catch (error) {
      setError(error.message);
      setWeatherInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    weatherData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
      weatherData(inputCity);
    }
  };

  const getWeatherIcon = (weather) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
      Haze: '🌫️'
    };
    return icons[weather] || '🌤️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Weather App
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter city name..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="flex-1 px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">Loading...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Weather */}
        {weatherInfo && weatherInfo.main && !loading && (
          <div className="space-y-5 sm:space-y-6">

            {/* Location */}
            <div className="text-center">
              <div className="text-5xl sm:text-7xl">
                {getWeatherIcon(weatherInfo.weather[0].main)}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold">
                {weatherInfo.name}
              </h2>
              <p className="text-gray-500 text-sm sm:text-lg">
                {weatherInfo.sys.country}
              </p>
            </div>

            {/* Temp */}
            <div className="text-center">
              <div className="text-4xl sm:text-6xl font-bold text-blue-600">
                {Math.round(weatherInfo.main.temp)}°C
              </div>
              <p className="text-sm sm:text-xl text-gray-600 capitalize">
                {weatherInfo.weather[0].description}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t">

              <div className="p-3 sm:p-4 rounded-xl bg-blue-100">
                <p className="text-xs sm:text-sm">Feels Like</p>
                <p className="font-bold text-lg sm:text-2xl">
                  {Math.round(weatherInfo.main.feels_like)}°C
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-purple-100">
                <p className="text-xs sm:text-sm">Humidity</p>
                <p className="font-bold text-lg sm:text-2xl">
                  {weatherInfo.main.humidity}%
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-pink-100">
                <p className="text-xs sm:text-sm">Wind</p>
                <p className="font-bold text-lg sm:text-2xl">
                  {weatherInfo.wind.speed} m/s
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-indigo-100">
                <p className="text-xs sm:text-sm">Pressure</p>
                <p className="font-bold text-lg sm:text-2xl">
                  {weatherInfo.main.pressure} hPa
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherInfo;