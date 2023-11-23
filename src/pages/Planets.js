import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const PlanetList = ({ planets, gridview }) => {

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
                        planets.map((planet, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={planet.poster} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>
                                        <i className="bi-globe2"></i>&nbsp;&nbsp;
                                        {planet.name}
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
                                <th>Gravity</th>
                                <th>Climate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {planets.map((planet, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{planet.name}</td>
                                    <td >{planet.gravity}</td>
                                    <td >{planet.climate}</td>
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

const Planets = () => {
    const [planets, setplanets] = useState([]);
    const [gridview, setGridView] = useState(false)

    useEffect(() => {
        const fetchplanets = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/planets/');
                const planetsData = response.data.results.map((planet) => ({
                    name: planet.name,
                    poster: `https://via.placeholder.com/150`, // Placeholder image, replace with actual poster URL
                    climate: planet.climate,
                    gravity: planet.gravity,
                }));
                setplanets(planetsData.slice(0,6));
            } catch (error) {
                console.error('Error fetching planet data:', error);
            }
        };

        fetchplanets();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>Planets</h3>
                </div>
                <div className="grid">
                    {gridview ?
                        <div className='views' >
                            <i class="bi bi-grid" onClick={() => { setGridView(true) }} style={{backgroundColor:"white",color:"var(--Grey-2, #696974)",paddingLeft:"0"}}>Grid</i>
                            <i class="bi bi-list" onClick={() => setGridView(false)} style={{backgroundColor:"#03123D"}} ></i>
                        </div> :
                        <div className='views' >
                            <i class="bi bi-grid-fill" onClick={() => { setGridView(true) }} style={{backgroundColor:"#03123D"}}></i>
                            <i class="bi bi-list-ul" onClick={() => setGridView(false)} style={{backgroundColor:"white",color:"var(--Grey-2, #696974)",paddingLeft:"0"}}>List</i>
                        </div>
                    }
                </div>
            </div>
            <PlanetList planets={planets} gridview={gridview} />
        </div>
    );
};

export default Planets;
