import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const VehiclesList = ({ vehicles, gridview }) => {

    const [showPopup, setShowPopup] = useState(-1);

    const handleDetailsClick = (index) => {
        setShowPopup(index);
    };

    const handlePopupClose = () => {
        setShowPopup(-1);
    };

    return (
        <>
            {gridview ?
                <div className='grid-container'>
                    {
                        vehicles.map((vehicle, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={vehicle.poster} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>
                                        <i className="bi-truck"></i>&nbsp;&nbsp;
                                        {vehicle.name}
                                    </span>

                                    <i class="bi bi-three-dots-vertical"  onClick={() => handleDetailsClick(index)}></i>
                                    
                                </div>
                                {showPopup == index && (
                                    <div className="popup">
                                        <button onClick={() => handlePopupClose()}>Close</button>
                                        <ul>
                                            <li>Download</li>
                                            <li>View</li>
                                            <li>Rename</li>
                                            <li>Share Link</li>
                                            <li>Move</li>
                                            <li>Mark Private</li>
                                            <li>Delete</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                        ))
                    }
                </div > :
                <div className='list-container'>
                    <table className="table">
                        <thead className='thead'>
                            <tr>
                                <th>Name</th>
                                <th>Speed</th>
                                <th>Model</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{vehicle.name}</td>
                                    <td >{vehicle.speed}</td>
                                    <td >{vehicle.model}</td>
                                    <td > <i class="bi bi-three-dots-vertical"  onClick={() => handleDetailsClick(index)}></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>


    );
};

const Vehicles = () => {
    const [vehicles, setvehicles] = useState([]);
    const [gridview, setGridView] = useState(false)

    useEffect(() => {
        const fetchvehicles = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/vehicles/');
                const vehiclesData = response.data.results.map((vehicle) => ({
                    name: vehicle.name,
                    homeworld: `https://swapi.dev/api/vehicles/2/`, // Placeholder image, replace with actual poster URL
                    model: vehicle.average_model,
                    speed: vehicle.max_atmosphering_speed,
                }));
                setvehicles(vehiclesData.slice(0,6));
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchvehicles();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>Vehicles</h3>
                </div>
                <div className="grid">
                    {gridview ?
                        <div className='views' >
                            <i class="bi bi-grid" onClick={() => { setGridView(true) }} style={{backgroundColor:"white",color:"var(--Grey-2, #696974)",paddingLeft:"0"}}>Grid</i>
                            <i class="bi bi-list" onClick={() => setGridView(false)} style={{backgroundColor:"#03123D"}}></i>
                        </div> :
                        <div className='views' >
                            <i class="bi bi-grid-fill" onClick={() => { setGridView(true) }} style={{backgroundColor:"#03123D"}}></i>
                            <i class="bi bi-list-ul" onClick={() => setGridView(false)} style={{backgroundColor:"white",color:"var(--Grey-2, #696974)",paddingLeft:"0"}}>List</i>
                        </div>
                    }
                </div>
            </div>
            <VehiclesList vehicles={vehicles} gridview={gridview} />
        </div>
    );
};

export default Vehicles;
