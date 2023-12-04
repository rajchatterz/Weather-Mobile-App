import { View, Text, TextInput, Button,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const fetchWeather = async () => {
    setLoading(true)
    setError(false) 
    try {
      const API_KEY = '97abbfee3233b110cffbb6407cc22df3'
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

      const response = await fetch(API_URL)
      const data = await response.json()
      console.log(data.main.temp)
      if (response.ok) {
        setWeatherData(data)
        setError(false)
      } else {
        setError(true)
      }
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
    

  }
  function handleGetWeather() {
    if (city.trim() !== '') {
      return fetchWeather()
    } else {
      setCity('Not Found')
    }
  }
  console.log(city)
  
  return (
    <View style={{marginTop:100}}>
      <TextInput onChangeText={(text)=>setCity(text)} placeholder='Enter The City Name'/>
      <Button title='Tap Me' onPress={handleGetWeather} />
      {loading ? (
        <ActivityIndicator/>
      ) : error ? (
          <Text>Error fetching weather data</Text>
        ) : weatherData ? (
            <View>
              <Text>{weatherData.main.temp}</Text>
            </View>
      ):null}
      
    </View>
  )
}
export default WeatherApp