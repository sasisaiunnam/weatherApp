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
  
  const weatherData = async(searchCity) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = "8c11175bad977486908418a7ecc2432a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherInfo(data);
    } catch(error) {
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
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return icons[weather] || '🌤️';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Weather App
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input 
              type='text' 
              placeholder='Enter city name...' 
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <button 
              type='submit'
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weatherInfo && weatherInfo.main && !loading && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Location & Icon */}
            <div className="text-center">
              <div className="text-7xl mb-2">
                {getWeatherIcon(weatherInfo.weather[0].main)}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {weatherInfo.name}
              </h2>
              <p className="text-gray-500 text-lg">{weatherInfo.sys.country}</p>
            </div>

            {/* Temperature */}
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round(weatherInfo.main.temp)}°C
              </div>
              <p className="text-xl text-gray-600 capitalize mt-2">
                {weatherInfo.weather[0].description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-gray-200">
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Feels Like</p>
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(weatherInfo.main.feels_like)}°C
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Humidity</p>
                <p className="text-2xl font-bold text-purple-700">
                  {weatherInfo.main.humidity}%
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
                <p className="text-2xl font-bold text-pink-700">
                  {weatherInfo.wind.speed} m/s
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Pressure</p>
                <p className="text-2xl font-bold text-indigo-700">
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