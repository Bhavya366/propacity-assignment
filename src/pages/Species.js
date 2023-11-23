import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const SpiecesList = ({ spieces, gridview }) => {

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
                        spieces.map((spiece, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={spiece.poster} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>
                                        <i className="bi-person-fill"></i>&nbsp;&nbsp;
                                        {spiece.name}
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
                                <th>Language</th>
                                <th>Release Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {spieces.map((spiece, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{spiece.name}</td>
                                    <td >{spiece.Language}</td>
                                    <td >{spiece.lifespan}</td>
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

const Species = () => {
    const [spieces, setspieces] = useState([]);
    const [gridview, setGridView] = useState(false)

    useEffect(() => {
        const fetchspieces = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/species/');
                const spiecesData = response.data.results.map((spiece) => ({
                    name: spiece.name,
                    homeworld: `https://swapi.dev/api/people/34/`, // Placeholder image, replace with actual poster URL
                    lifespan: spiece.average_lifespan,
                    Language: spiece.Language,
                }));
                setspieces(spiecesData.slice(0,6));
            } catch (error) {
                console.error('Error fetching spiece data:', error);
            }
        };

        fetchspieces();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>Spieces</h3>
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
            <SpiecesList spieces={spieces} gridview={gridview} />
        </div>
    );
};

export default Species;
