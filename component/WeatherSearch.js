import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

export default function weatherData({onPress,onChangeText}) {
  return (
            <View style={styles.searchInput}>
                <TextInput style={{borderWidth:1,color:'white',paddingHorizontal:10,backgroundColor:'#382c3c', paddingVertical:1,borderRadius:7, fontSize:20,borderColor:'white',width:'70%',elevation:100}} placeholder='Type London' onChangeText={onChangeText} />
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
  },
  btn: {
    backgroundColor: '#211823',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    elevation: 100,
    color: 'white',
    fontWeight:'bold'
  }
})