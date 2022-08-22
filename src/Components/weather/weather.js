import { useEffect, useState } from "react";
import "./weather.css"
import Search from "../images/search_icon.png";
import location from "../images/location_pin_position_icon.png";
import { citydata } from "../CityData/Citydata";
import sunny from "../images/sun_sunny_temperature_icon.png";
import cloudy from "../images/clouds_sun_sunny_icon.png";
import rainy from "../images/rain_sunny_icon.png";
 import Graphfirst from "../Graph/Graph1"
 import GraphSecond from "../Graph/Graph2"

 const Weather = ()=>{

    const Api_key = "f89056bf24635943ba1a32a4964c45c8";
    
    const [value, setValue] = useState("");
    const [city, setCity] = useState("");
    const [wordEnter, setWordEnter] = useState("");
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [arraylist, setarraylist] = useState([]);
    const [temparray, setTempArray] = useState([]);

    const showLocation =(e)=>{
        e.preventDefault()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}`)
        .then(res=> res.json())
        .then(data=> getWeather(data.coord.lon, data.coord.lat))
        .catch(err=>console.log(err))
    }
   
    const getWeather = (lon, lat)=>{
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${Api_key}&units=metric`)
        .then(res=>res.json())
        .then(data => show(data))
        .catch(err => console.log(err))
       }
       

       const currentCityWeather =(position)=>{
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        getWeather(lon, lat)
    }

   
       const show = (data)=>{
          setarraylist(data.daily)
          setList(data.current)
          let array = []
          for(let i = 0 ; i < 24 ; i++){
           array.push(data.hourly[i].temp)
          }
          console.log(array);
          setTempArray(array);
       }

    const getLocation = (e) =>{
         setCity(e.target.value);
         setValue(e.target.value);

         const searchWord = e.target.value
         setWordEnter(searchWord);

         const newFilter = citydata.filter((value) =>{
            const input = value.name.toLowerCase().includes(searchWord.toLowerCase());
            return input ; 
         })
           
         if(searchWord === ""){
            setSearch([]);
         }else{
            setSearch(newFilter);
         }
        }
        
        const onchange = (searchWord) =>{
            setValue(searchWord);
        }

        const getlocation =() =>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(currentCityWeather);
            }else{
                console.log("not avilable");
                alert("Postiotion not find");
            }
        }
      
  useEffect(()=>{
    getlocation();
  }, [])
console.log(temparray);
    return(
       
         <div id="outer-div">
         <h1 id="heading">Weather App</h1>
            <div id="inner-container1">
                   <form onSubmit={showLocation}>
                     <input id="inputbux" type="text" placeholder="Enter city Name" value={value} onChange={getLocation} />
                   </form>
                   <img id="locationimg" alt="location" src={location} />
                   <img id="searchimg" alt="search" src={Search}/>
            </div>
            {
                search.length !== 0 &&(
                    <div className="citybox">
                        {
                            search.map((value, key) =>{
                                return <div>
                                    <div className="cityname" onClick={()=> onchange(`${value.name}, ${value.state}`)}>{`${value.name}, ${value.state}`}</div>
                              </div>
                            })
                        }
                    </div>
                )}
            <div id="inner_container2">
                      {
                        arraylist?.map((e, i)=>{
                            console.log(e.dt)
                            const dateTimeStr = new Date(e.dt*1000).toLocaleString("en-US", {weeday:"long"}).slice(0,3);
                            return(
                                <div key={i} className="Weather_8days">
                <div className='Weatherdetails'>
                  <p className="weekdays">{dateTimeStr}</p>
                  <span className="span maxtemp">{e.temp.max.toFixed()}&deg;</span>
                  <span className="span mintemp">{e.temp.min.toFixed()}&deg;</span>
                </div>
                <div className="image_div">
                  <img className="image" alt="weather" src={(e.weather[0].main === "Clear") ? sunny : (e.weather[0].main === "Rain") ? rainy : cloudy} />
                  <p className='Weather_status'>{e.weather[0].main}</p>
                </div>
              </div>
                            )
                        })}     
            </div>
            
      <div className='inner-container3'>
        <div className="TempInfo">
          <span className='temp1'>{Math.floor(list.temp)}°C</span>
          <span><img className="tempimg" src={cloudy} alt="" /></span>
  

        </div>
        <Graphfirst array={temparray} />
        <div className="pressurehumidity">
                        <div className="pressure">
                            <p className='p1'> <a>Pressure</a> <br />{list.pressure} hpa</p>
                        </div>
                        <div className="humidity">
                            <p className='p1'><a>Humidity</a> <br /> {list.humidity}%</p>
                        </div>
        </div>
        <div className="last">
                        <div className="sunrisesunset">
                            <div>
                                <p className="sunrise"> <a>Sunrise</a> <br />{new Date(list.sunrise*1000).toLocaleString().slice(10, 14)}am</p> 
                            </div> 
                            <div>
                                <p className="sunset"><a>Sunset</a> <br />{new Date(list.sunset*1000).toLocaleString().slice(10, 14)}pm</p>
                                
                            </div>
                        </div>
                    </div>
        <GraphSecond />
      </div>

         </div>
        
    )
}



export default Weather