import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const PeopleList = ({ peoples, gridview }) => {

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
                        peoples.map((people, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={people.species} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>
                                        <i className="bi-people-fill"></i>&nbsp;&nbsp;
                                        {people.name}
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
                                <th>Director</th>
                                <th>Release Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {peoples.map((people, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{people.name}</td>
                                    <td >{people.director}</td>
                                    <td >{people.birthyear}</td>
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

const People = () => {
    const [peoples, setpeoples] = useState([]);
    const [gridview, setGridView] = useState(false)

    useEffect(() => {
        const fetchpeoples = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/people/');
                const peoplesData = response.data.results.map((people) => ({
                    name: people.name,
                    species: `https://via.placeholder.com/150`, // Placeholder image, replace with actual species URL
                    birthyear: people.birth_year,
                    
                }));
                setpeoples(peoplesData.slice(0,6));
            } catch (error) {
                console.error('Error fetching people data:', error);
            }
        };

        fetchpeoples();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>People</h3>
                </div>
                <div className="grid">
                    {gridview ?
                        <div className='views'  >
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
            <PeopleList peoples={peoples} gridview={gridview} />
        </div>
    );
};

export default People;
