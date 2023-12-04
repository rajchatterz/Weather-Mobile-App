import { View, Text, TextInput, Button,ActivityIndicator,StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFonts} from 'expo-font'
import WeatherSearch from './component/WeatherSearch'
const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [fontLoaded] = useFonts({
    'Outfit-Bold':require('./assets/font/Outfit-Bold.ttf')
  })
  if (!fontLoaded) {
    return null
  }
  const fetchWeather = async () => {
    setLoading(true)
    setError(false) 
    try {
      const API_KEY = 'Enter Your api'
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


  let date = null
  if (weatherData && weatherData.dt) {
    const date1 = new Date(weatherData.dt * 1000)
    date = date1.toLocaleDateString() + ' ' + date1.toLocaleTimeString()
  }
  console.log(weatherData)
  return (
      <ImageBackground style={styles.imageContainer} source={require('./assets/image/bcg.jpeg')}>
        <View style={styles.viewContainer}>
          <WeatherSearch onPress={handleGetWeather} onChangeText={(text) => setCity(text)} />
          <View style={styles.viewContainer}>
            <View style={styles.tempContainer}>
              <View style={styles.mainContainer}>
                <Text style={{fontSize:50, fontWeight:'bold',color:'#f6e2ce',fontFamily:'Outfit-bold'}}>{loading ? (<ActivityIndicator />) : error ? (<Text>No Location Found</Text>) : weatherData ? <Text>{ weatherData.name}</Text>:null}</Text>
                <Text style={{color:'#f8f8f8',fontSize:20,fontWeight:'500'}}>{loading ? (<ActivityIndicator />) : error ? (<Text>Invalid Date</Text>) : weatherData ? <Text>{date}</Text>:null}</Text>
              </View>
              <View style={styles.mainContainer}>
                <Text style={{color:'white',fontSize:60,fontWeight:'bold'}}>{loading ? (<ActivityIndicator />) : error ? (<Text></Text>) : weatherData ? <Text>{ (parseFloat(weatherData.main.temp)-273).toFixed(2)}°C</Text>:null}</Text>
                <Text style={{color:'white',fontSize:24,fontWeight:'bold'}}>{loading ? (<ActivityIndicator />) : error ? (<Text></Text>) : weatherData ? <Text>{ weatherData.weather[0].main}</Text>:null}</Text>
              </View>
            </View>
            <View style={styles.lowerContainer}>
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'white'}}>Pressure</Text>
                <Text style={{color:'white'}}>{loading ? (<ActivityIndicator />) : error ? (<Text></Text>) : weatherData ? <Text>{ weatherData.main.pressure}</Text>:null}</Text>
              </View>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{color:'white'}}>Humidity</Text>
                <Text style={{color:'white'}}>{loading ? (<ActivityIndicator />) : error ? (<Text></Text>) : weatherData ? <Text>{ weatherData.main.humidity}</Text>:null}</Text>
              </View>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{color:'white'}}>Feel Now</Text>
                <Text style={{color:'white'}}>{loading ? (<ActivityIndicator />) : error ? (<Text></Text>) : weatherData ? <Text>{ (parseFloat(weatherData.main.feels_like)-273).toFixed(2)}</Text>:null}</Text>
              </View>
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
  },
  lowerContainer: {
    flexDirection: 'row',
    borderTopWidth: 2,
    paddingTop: 20,
    justifyContent: 'space-evenly',
    gap:70,
    borderColor:'white'
    
  }
})