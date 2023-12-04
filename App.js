import { View, Text, TextInput, Button,ActivityIndicator,StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import {Ionicons } from '@expo/vector-icons'

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
          <View style={styles.searchInput}>
            <TextInput style={{borderWidth:1,paddingVertical:1,fontSize:20}} placeholder='Enter the City' onChangeText={(text)=>setCity(text)} />
            <TouchableOpacity onPress={handleGetWeather}>
              <Text style={styles.btn}>Search</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator/>
          ) : error ? (
              <Text>Error not found</Text>
          ):weatherData?(
            <View style={styles.container}>   
            <View>
              <Text>{ weatherData.name}</Text>
              <Text>Time</Text>
            </View>
            <View>
            <View>
              <Text>15 degree C</Text>
              <Text>Cloudy</Text>
            </View>
            <View>
              <Text>1</Text>
              <Text>1</Text>
              <Text>1</Text>
            </View>
                </View>
                </View>
          ):null}
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