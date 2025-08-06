import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import ScreenWrapper from '../components/screenWrapper'
import { theme } from '../constants/theme'
import {CalendarDaysIcon, Cog6ToothIcon, MagnifyingGlassIcon, NewspaperIcon} from 'react-native-heroicons/outline'
import {MapPinIcon} from 'react-native-heroicons/solid'
import { hp, weatherImages } from '../constants/common'
import {debounce} from 'lodash'
import { fetchLocations, fetchNews, fetchWeatherForecast } from '../api/weather'
import { getData, storeData } from '../constants/utils'
import { useNavigation } from '@react-navigation/native'



const HomeScreen = () => {
  const router = useNavigation();

  const [showSearch, toggleSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([])
  const [weather, setWeather] = useState({})
  const [localNews, setLocalNews] = useState([])
  const handleLocation = (loc) =>{
    toggleSearch(false)
    setLoading(true)
     setLocations([])

     fetchWeatherForecast({
      cityName:loc?.name,
      days:'7'
     }).then(data=>{
     setWeather(data)
     setLoading(false)
     storeData('city', loc?.name)
     })
  }

  const handleSearch =value=>{
   
    if(value.length>2){
      fetchLocations({cityName:value}).then(data=>{
        setLocations(data)
    })
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

  const {current, location} = weather;

  useEffect(()=>{
    fetchMyWeatherData()
    fetchLocalNews()
    
  },[])

  const fetchMyWeatherData = async() =>{
    let myCity = await getData('city');
    let cityName = 'Lucknow';
    if(myCity) cityName = myCity;
    fetchWeatherForecast({cityName,days:'7'
      
    }).then(data=>{
      setWeather(data)
      setLoading(false)
    })

    
  }

  const fetchLocalNews = async()=>{
    fetchNews('us').then(data=>{
      setLocalNews(data?.articles)
      setLoading(false)
    })
  }



 
  return (
    <View className='flex-1 relative'>
       <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent/>
       <Image
       blurRadius={70}
        source={require('../assets/images/bg.png')}
        className='h-full w-full absolute'
       />
       {
        loading?(
          <View className='flex-1 flex-row justify-center items-center'>
             <ActivityIndicator size={'large'} color={'#FFAA33'}/>
            </View>
        ):(
           <ScreenWrapper>
         <View style={{height:'10%'}} className='mx-4 relative z-50'>
          {/* <View className='flex-row justify-end items-center rounded-full' style={{backgroundColor:showSearch?theme.bgWhite(0.2):"transparent"}}>

            {
              showSearch? (

              <TextInput
              onChangeText={handleTextDebounce}
              placeholder='Search City...'
              placeholderTextColor={'lightgray'}
              className='pl-6 flex-1 h-10 text-base text-white'
             />
              ):null
            }
             
             <TouchableOpacity
             onPress={()=>toggleSearch(!showSearch)}
              style={{backgroundColor:theme.bgWhite(0.3)}}
              className='rounded-full p-3 m-1'
             >
               <MagnifyingGlassIcon size={22} color={'white'}/>
               
             </TouchableOpacity>

              
             <TouchableOpacity
             onPress={()=>router.navigate('settings')}
              style={{backgroundColor:theme.bgWhite(0.3)}}
              className='rounded-full p-3 m-1'
             >
               <Cog6ToothIcon size={22} color={'white'}/>
               
             </TouchableOpacity>
          </View> */}
          <View className='flex-row items-center justify-end bg=white/20 rounded-full'>
  {showSearch && (
    <TextInput
      onChangeText={handleTextDebounce}
      placeholder='Search City...'
      placeholderTextColor={'lightgray'}
      className='pl-4 pr-2 py-2 flex-1 h-10 text-base text-white bg-white/20 rounded-full mr-2'
      style={{maxWidth: '100%'}} // optional: limit input width
    />
  )}

  <TouchableOpacity
    onPress={() => toggleSearch(!showSearch)}
    className='rounded-full p-3 m-1'
    style={{backgroundColor: theme.bgWhite(0.3)}}
  >
    <MagnifyingGlassIcon size={22} color={'white'} />
  </TouchableOpacity>


</View>

          {
            locations.length>0 && showSearch?(
              <View className='w-full absolute bg-gray-300 top-16 rounded-3xl'>
                {
                  locations.map((loc, index)=>{
                    let showBorder = index+1 !=locations.length;
                    let borderClass = showBorder?'border-b-2 border-b-gray-400':''; 
                    return(
                      <TouchableOpacity
                      onPress={()=>handleLocation(loc)}
                       key={index}
                      className={`flex-row items-center border-0 p-3 px-4  mb-1 ${borderClass}`}
                      >
                        <MapPinIcon size={20} color={'gray'}/>
                        <Text className='text-black ml-2' style={{fontSize:hp(2)}}>{loc?.name}, {loc?.country}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
                </View>
            ):null
          }

         </View>

         {/* forecast  */}

         <View
          className='flex-1 flex justify-around mb-2 mx-4'
         >
          <Text className='text-white text-center font-bold' style={{fontSize:hp(2.8)}}>{location?.name},
            <Text className='text-gray-300 text-center font-semibold' style={{fontSize:hp(2)}}>{" "+ location?.country}</Text>
          </Text>
          
  {/* weather image */}
          <View
           className='flex-row justify-center'
          >
          <Image
           source={weatherImages[current?.condition?.text]|| weatherImages['other']}
           className='h-52 w-52'
          />

          </View>

          <View className='space-y-2'>
           <Text className='text-center font-bold text-white ml-5' style={{fontSize:hp(6.6)}}>
             {current?.temp_c}&#176;
           </Text>
           <Text className='text-center  text-white tracking-widest' style={{fontSize:hp(2.6)}}>
           {current?.condition?.text}
           </Text>
          </View>

          <View className='flex-row justify-between mx-4'>

            <View className='flex-row space-x-2 items-center'>
               <Image
                source={require('../assets/icons/wind.png')}
                className='h-6 w-6'
               />
               <Text className='text-white font-semibold text-base'> {current?.wind_kph}km</Text>
            </View>

             <View className='flex-row space-x-2 items-center'>
               <Image
                source={require('../assets/icons/drop.png')}
                className='h-6 w-6'
               />
               <Text className='text-white font-semibold text-base'> {current?.humidity}%</Text>
            </View>

             <View className='flex-row space-x-2 items-center'>
               <Image
                source={require('../assets/icons/sun.png')}
                className='h-6 w-6'
               />
               <Text className='text-white font-semibold text-base'>6:05 A.M</Text>
            </View>

          </View>

          {/* news section */}

 <View className='mb-5 space-y-3'>
  <View className='flex-row items-center mx-5 space-x-2 my-2'>
    <NewspaperIcon size={22} color='white'/>
    <Text className='text-white text-base'>News Section</Text>
  </View>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 15 }}
  >
    {localNews?.map((news, index) => (
      <View
        key={index}
        className='mr-4 p-3 rounded-2xl'
        style={{
          backgroundColor: theme.bgWhite(0.15),
          width: 280, // Set a fixed width for each news card
        }}
      >

        {news?.urlToImage ? (
          <Image
            source={{ uri: news?.urlToImage }}
            className='w-full h-36 rounded-xl mb-2'
            resizeMode='cover'
          />
        ) : (
          <View className='w-full h-36 rounded-xl mb-2 bg-gray-400 justify-center items-center'>
            <Text className='text-white text-xs'>No Image</Text>
          </View>
        )}
        <Text className='text-white font-bold mb-1' style={{ fontSize: hp(2) }}>
          {news?.title?.length > 80 ? news?.title.slice(0, 80) + '...' : news?.title}
        </Text>
        <Text className='text-white text-sm' style={{ fontSize: hp(1.6) }}>
          {news?.description ? (news?.description.length > 100 ? news?.description.slice(0, 100) + '...' : news?.description) : 'No description available.'}
        </Text>
      </View>
    ))}
  </ScrollView>
</View>



          {/* forecast section */}

          <View className='mb-2 space-y-3'>
           <View className='flex-row items-center mx-5 space-x-2'>
              <CalendarDaysIcon size={22} color='white'/>
                <Text className='text-white text-base'>Daily Forecast</Text>
           </View>
           <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal:15}}
            showsHorizontalScrollIndicator={false}

           >

            {
              weather?.forecast?.forecastday?.map((item, index)=>{
                let date = new Date(item?.date)
                let options = {weekday:'long'}
                let dayName = date.toLocaleDateString('en-US', options)
                dayName = dayName.split(',')[0]
                 return(
                    <View
                    key={index}
             className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
             style={{backgroundColor:theme.bgWhite(0.15)}}
            >
              <Image
               source={weatherImages[item?.day?.condition?.text]|| weatherImages['other']}
               className='h-11 w-11'
              />
              <Text className='text-white'>{dayName}</Text>
              <Text className='text-white font-semibold' style={{fontSize:hp(2.3)}}>{item?.day?.avgtemp_c}&#176;</Text>

            </View>
                 )
              })
            }
           

           </ScrollView>
          </View>

         </View>
      </ScreenWrapper>
        )
       }

     
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})