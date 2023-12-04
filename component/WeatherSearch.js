import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

export default function weatherData({onPress,onChangeText}) {
  return (
            <View style={styles.searchInput}>
                <TextInput style={{borderWidth:1,paddingVertical:1,fontSize:20}} placeholder='Enter the City' onChangeText={onChangeText} />
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.btn}>Search</Text>
                </TouchableOpacity>
              </View>
  )
}

const styles = StyleSheet.create({
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 60,
    }
})