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

  let date1 = new Date((weatherData.dt * 1000))
  let date = date1.toLocaleString()
  return (
      <ImageBackground style={styles.imageContainer} source={require('./assets/image/bcg.jpeg')}>
        <View style={styles.viewContainer}>
          <WeatherSearch onPress={handleGetWeather} onChangeText={(text) => setCity(text)} />
          <View style={styles.viewContainer}>
            <View style={styles.tempContainer}>
              <View style={styles.mainContainer}>
                <Text style={{fontSize:40, fontWeight:'bold',color:'white',fontFamily:''}}>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ weatherData.name}</Text>:null}</Text>
                <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{date}</Text>:null}</Text>
              </View>
              <View style={styles.mainContainer}>
                <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ (parseFloat(weatherData.main.temp)-273).toFixed(2)}</Text>:null}</Text>
                <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ weatherData.weather[0].main}</Text>:null}</Text>
              </View>
            </View>
            <View>
              <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ weatherData.main.pressure}</Text>:null}</Text>
              <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ weatherData.main.humidity}</Text>:null}</Text>
              <Text>{loading ? (<ActivityIndicator />) : error ? (<Text>Error found</Text>) : weatherData ? <Text>{ (parseFloat(weatherData.main.temp)-273).toFixed(2)}</Text>:null}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    
  )
}
export default WeatherApp

const styles = StyleSheet.create({
  imageContainer: {
    flex:1,
    objectFit:'cover'
  },
  viewContainer: {
    flex: 1,
    gap:70,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tempContainer: {
    flex: 1,
    justifyContent:'space-between',
  },
  mainContainer: {
    justifyContent: 'center',
    gap:10
  }
})