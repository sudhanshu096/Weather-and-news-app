import axios from "axios";
import { apiKey, newsApiKey } from "../constants/common";

const forecastEndpoint = params=>`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint = params=>`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`
const newsEndpoint = params =>
  `https://newsapi.org/v2/top-headlines?country=${params.country || 'us'}&apiKey=${newsApiKey}`;

const apiCall = async(endpoint)=>{
    let options ={
        method:"GET",
        url:endpoint
    }
    try {
         const response = await axios.request(options);
         return response?.data; 
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const fetchWeatherForecast = params=>{
    return apiCall(forecastEndpoint(params))
}

export const fetchLocations = params=>{
    return apiCall(locationsEndpoint(params))
}

export const fetchNews = params => {
  return apiCall(newsEndpoint(params));
};