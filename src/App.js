import React from "react"
import axios from "axios"

import Header from "./componets/header";

const API_KEY = 'f01c9932ff1e1e5ca06aa0ba895b1f21'

function App() {
  const [loading, setLoading] = React.useState(true)
  const [location, setLocation] = React.useState("")
  const [data_result, setData] = React.useState([])
  const [lon, setLon] = React.useState('')
  const [lat, setLat] = React.useState('')
  const [user_location, setUserLocation] = React.useState('Dar es salaam')
  const [loc_const] = React.useState('Dar es salaam')
  const [error, setError] = React.useState("")


  const requestGeoLocation = async () =>{
    try {
      const use = user_location ? user_location : loc_const
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${use}&limit=1&appid=${API_KEY}`)
    setLocation(response.data)
    setLon(response.data[0].lon)
    setLat(response.data[0].lat)
    return response.data
    } catch (error) {
      setError(error?.message)
    }
  }


  React.useEffect(()=>{
    
      const result = requestGeoLocation()
      // setLocation(result)
    
  },[user_location])

    const requestWeatherData = async () =>{
    try {
      if(lat && lon){
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      setData(response.data)
    return response.data
    }
    } catch (error) {
      setError(error?.message)
    }
  }


  React.useEffect(()=>{
  
if(location){
const result = requestWeatherData()
// setData(result)
if(result){
  setLoading(false)
}
    }
  
    setError(error)

  },[location])


  if(loading){
    return (
      <>
      <Header />
       <div className="flex items-center justify-center">
        <h1>Loading..</h1>
       </div>
      </>
    )
  }
  return (
   <div>
    <Header />
    <form className="container mx-auto py-4">
      <input placeholder="enter your location" className="border px-2 rounded-xl py-3 bg-gray-100 focus:border-gray-300 border-gray-100 w-full" type="text" onChange={(e)=>{
        e.preventDefault()
        setUserLocation(e.target.value)
      }} />
      
    </form>
    {error ? <>
    <div className="flex-1 items-center justify-center text-red-800 text-bold capitalized">{error}</div>
    </> : <>{data_result !== '' ? <div className="xs:px-2">
    <div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[26px] font-semibold capitalize">Current Weather Results = {location[0]?.name}</h2>
    </div>
<div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[20px] capitalize">weather</h2>
      {data_result?.weather?.map(item=>{
        return (
          <>
          <h2 className="text-black">Main = {item.main}</h2>
      <h2>Description = {item.description}</h2></>
        )
      })}
    </div>

     <div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[20px] capitalize">Temperature</h2>
      {/* <h2>{data_result?.main?.temp}</h2> */}
      <p>maximum = {data_result?.main?.temp_max}</p>
      <p>minimum = {data_result?.main?.temp_min}</p>
    </div>

    <div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[20px] capitalize">Humidity</h2>
      <h2>{data_result?.main?.humidity}</h2>
    </div>

    <div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[20px] capitalize">Wind Speed</h2>
      <h2>{data_result?.wind?.speed}</h2>
    </div></div> : <>
    <div className="py-4 container mx-auto">
      <h2 className="text-gray-600 text-[26px] font-semibold capitalize">No Current Weather Results</h2>
    </div></>}
</>}
   </div>
  );
}

export default App;
