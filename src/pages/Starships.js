import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const StarshipsList = ({ starships, gridview }) => {

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
                        starships.map((starship, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={starship.poster} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>
                                        <i className="bi-rocket-fill"></i>&nbsp;&nbsp;
                                        {starship.name}
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
                                <th>Model</th>
                                <th>Speed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {starships.map((starship, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{starship.name}</td>
                                    <td >{starship.Model}</td>
                                    <td >{starship.Speed}</td>
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

const Starships = () => {
    const [starships, setstarships] = useState([]);
    const [gridview, setGridView] = useState(false)

    useEffect(() => {
        const fetchstarships = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/starships/');
                const starshipsData = response.data.results.map((starship) => ({
                    name: starship.name,
                    homeworld: `https://swapi.dev/api/starships/2/`, // Placeholder image, replace with actual poster URL
                    Speed: starship.max_atmosphering_speed,
                    Model: starship.model,
                }));
                setstarships(starshipsData.slice(0,6));
            } catch (error) {
                console.error('Error fetching starship data:', error);
            }
        };

        fetchstarships();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>Starships</h3>
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
            <StarshipsList starships={starships} gridview={gridview} />
        </div>
    );
};

export default Starships;
