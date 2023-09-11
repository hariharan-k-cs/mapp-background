import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { startTransition, useState } from 'react'
export default function App() {
  const [background,setbackground] =useState('#ffffff')
  const[one,setone] = useState('blue')
  const[two,settwo] = useState('blue')
  const[three,setthree] = useState('blue')
  const[four,setfour] = useState('blue')
  const backcolor=()=>{
    const hexrange = '0123456789ABCDEF'
    let color = '#'
    let color2='#'
    let color3 = '#'
    let color4='#'
    let color5='#'
    for(let i =0;i<6;i++){
      color+=hexrange[Math.floor(Math.random()*16)]
      color2+=hexrange[Math.floor(Math.random()*16)]
      color3+=hexrange[Math.floor(Math.random()*16)]
      color4+=hexrange[Math.floor(Math.random()*16)]
      color5+=hexrange[Math.floor(Math.random()*16)]

    }
    setbackground(color)
    setone(color2)
    settwo(color3)
    setthree(color4)
    setfour(color5)
console.log('hellow')
  }
  return (
    <>
    <StatusBar backgroundColor={background}/>
   <View style={[styles.container,{backgroundColor:background}] }>
    <View style={[styles.one,{backgroundColor:one},styles.common]}><Text>one</Text></View>
    <View style={[styles.two,{backgroundColor:two},styles.common]}><Text>two</Text></View>
    <View style={[styles.three, {backgroundColor:three},styles.common]}><Text>three</Text></View>
    <View style={[styles.four,{backgroundColor:four},styles.common]}><Text>four</Text></View>
    <TouchableOpacity 
    onPress={()=>{backcolor()}}>
      <View style={styles.action}>
         <Text style={styles.actiontxt}>Press me</Text>
      </View>
    </TouchableOpacity>
    </View>

    </> 
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',

  },
  action:{
    borderRadius:12,
    backgroundColor:'#6A1B4D',
   paddingVertical:10,
   paddingHorizontal:40, 
  },
  actiontxt:{
    fontSize:24,
    color:'#FFFFFF',
    textTransform:'uppercase'

  },
  one:{
    height:100,
    width:100,
    borderColor:'black',
    color:'blue'
  },
  two:{
    height:100,
    width:200,
    borderColor:'black'
  },
  three:{
    height:100,
    width:200,
    borderColor:'black'
  },
  four:{
    height:200,
    width:200,
    borderColor:'black'
  },
  common:{
    padding:5,
    margin:8,
    
  }
})