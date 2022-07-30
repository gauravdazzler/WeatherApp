//rfc

import React, { useEffect, useState } from "react";
import "./css/dark.css";

// import "./css/style.css";

const Tempapp2 = () => {
    
    const [city, setCity] = useState("");
    const [search, setSearch] = useState("Mumbai");
    const [mode, setMode] = useState('');
    const [status, setStatus] = useState("");

    let time = new Date().toLocaleTimeString();
    const [cTime, setTime] = useState(time);

    const UpdateTime = () => {
        time = new Date().toLocaleTimeString();
        setTime(time);
    };
    setInterval(UpdateTime,1000);


    const changeStatus = () => {
        if(status === 'Clouds'){
            setStatus('cloud');
        }
        else if(status === 'Sunny'){
            setStatus('sun');
        }
        else if(status === 'Rainy'){
            setStatus('cloud-rain');
        }
        else{
            setStatus('cloud');
        }
    }

    const changeMode  =  () =>{

        if(mode  === 'light')
        {
            setMode('dark')
        }
        else
        {
            setMode('light')
        }

    
    }

    


    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=5d9fbc3dc614b3124a20ac931d2a6078`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        }

        fetchApi();
       
    }, [search])

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    // let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();


    return (
        <>

            <div className="box" style={{background: mode === 'light' ? 'rgb(165,187,221)' : 'rgb(18,18,18)'}} >
                <div className="inputData">
                    <input type="search" value={search} className="inputField" onChange={(event) => { setSearch(event.target.value) }} />
                </div>

                <div className="mode">
                    <button type="button" onClick={changeMode}>{mode === 'light' ? 'Dark' : 'Light'}</button>
                </div>


                <div id="weathercon">
                    <i className="fas fa-sun" style={{color: '#eccc68'}}></i>
                </div>


                {!city ? (
                    <p className="notfound" style={{color : mode === 'light'  ? 'black' : "white"}}> No Data Found</p>
                ) : (
                    <div>
                        <div className="info">
                        <h2 className="location"><i className="fa-solid fa-street-view" style={{color : mode === 'light'  ? 'black' : "white"}}></i></h2>

                            <h2 className="location" style={{color : mode === 'light'  ? 'black' : "white"}}>
                                {search}
                            </h2>


                        {/* Time and date */}
                            <p id="date" style={{color : mode === 'light'  ? 'black' : "white"}}>{cTime} | {date} / {month} / {year}</p>


                        {/* temprature */}
                            <h1 className="temp" style={{color : mode === 'light'  ? 'black' : "white"}}>
                                {city.temp}°C
                            </h1>
                            <h3 className="tempmin_max" style={{color : mode === 'light'  ? 'black' : "white"}}> Min : {city.temp_min}°C | Max : {city.temp_max}°C</h3>
                        </div>

                        <div className="wave"></div>
                        <div className="wave -two"></div>
                        <div className="wave -three"></div>
                    </div>

                    
            )

        }

        </div>

        {/* <script>
            const curDate = document.getElementById("date");
            let weathercon = document.getElementById("weathercon");

            const tempStatus = "clouds";

            const getCurrentDay = () => {
                var weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tue"
                weekday[3] = "Wed";
                weekday[4] = "Thu" ;
                weekday[5] = "Fri" ;
                weekday[6] = "Sat";

                let currentTime = new Date();
                let day = weekday[currentTime.getDay()];
                return day;
             };

             const getCurrentTime = () => {

                var months = [
                    "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

                var now = new Date();
                var month = months[now.getMonth() + 1];
                var date = now.getDate();

                let hours = now.getHours();
                let mins = now.getMinutes();

                let periods = "AM";

                if(hours > 11){
                    periods = "PM";
                    if(hours > 12) hours -= 12;
                }
                if(mins < 10){
                    mins = "0" + mins;
                }

                return `${month} ${date} | ${hours}:${mins}${periods}`;
                // console.log(month + "/"+ day)
             };

            curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
             
        </script> */}
        </>
    )
}

export default Tempapp2