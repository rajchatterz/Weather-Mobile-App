import { View, Text, TextInput, Button,ActivityIndicator,StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import {Ionicons } from '@expo/vector-icons'
import WeatherSearch from './component/WeatherSearch'
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
      <ImageBackground style={styles.imageContainer} source={require('./assets/image/bcg.jpeg')}>
      
        <View>
            <View>
          <WeatherSearch onPress={ handleGetWeather} onChangeText={ (text)=>setCity(text)} />
            </View>
            <View>
              
            </View>
          
        </View>
        
     
      </ImageBackground>
    
  )
}
export default WeatherApp

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    
    marginTop: Platform.OS === 'android' ? 30:0,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 60,
    
  },
  btn: {
    backgroundColor: 'yellow',
    padding:10
  }
})