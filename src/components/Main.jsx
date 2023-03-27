import React, { useEffect, useState } from 'react';
import "./Main.css"
import Popup from './Popup';
function Main(props) {
    const [data, setData] = useState([])
    const [tempData, setTemp] = useState([])
    const [trig, setTrig] = useState(false)
    const [popData, setPopData] = useState(null)
    const [str, setStr] = useState("")
    useEffect(()=>{
        handleData()
    },[])
    function handleData(){
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
        .then(res=>res.json())
        .then((jsonData)=>{
            setData(jsonData.Results)
            setTemp(jsonData.Results)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    const handlePop =(i)=>{
        setTrig(true)
        setPopData(data[i])
    }

    const handleFilter = (e)=>{
        let temp = []
        if(e.target.value==="All"){
            return setData(tempData)
        }
        else{
            temp=tempData.filter((val)=>{
                if(!val.VehicleTypes.length) return false
                return val.VehicleTypes[0].Name===e.target.value
            })
            setData(temp)
        }
    }

    const handleSearch = ()=>{
        let temp = []
        if(str){
        temp = tempData.filter((val, i)=>{
            let s = false
            if((val.Mfr_CommonName)===str){
                s = true
            }
            return s
        })

        setData(temp)
    }
    else{
        setData(tempData)
    }
        
    }

    return (
        <>
           <div className='main-container'>
            <div className='headers'>
                <h1>VEHICLE MANUFACTURERS</h1>
            </div>
            <div className='search-filter'>
                <div className='search'>
                    <label htmlFor="sear">Search By</label>
                    <input type="text" id='sear' onChange={(e)=>{setStr(e.target.value)}} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className='filter'>
                    <label htmlFor="filter">Filter By:</label>
                    <select id="filter" onChange={handleFilter}>
                        <option value="All">All</option>
                        <option value="Passenger Car">Passenger Car</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Trailer">Trailer</option>
                        <option value="Low Speed Vehicle (LSV)">Low Speed Vehicle</option>
                        <option value="Truck">Truck</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((val, i)=>{
                            let temp = "Not disclose"
                            if(val.VehicleTypes.length){
                                temp = val.VehicleTypes[0].Name 
                            }
                            return(
                                <tr key={i}  onClick={()=>handlePop(i)}>
                                    <td>{val.Mfr_CommonName}</td>
                                    <td>{val.Country}</td>
                                    <td>{temp}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
            <Popup trigg={trig} setTrigg = {setTrig} popData={popData}/>
            </div> 
            
        </>
    );
}

export default Main;
