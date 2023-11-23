import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './films.css'

const MovieList = ({ movies, gridview }) => {

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
                        movies.map((movie, index) => (
                            <div className="image-container">
                                <div className="image">
                                    <img src={movie.poster} alt="alt" />
                                </div>
                                <div className="details">
                                    <span>

                                        <i className="bi-film"></i>&nbsp;&nbsp;
                                        {movie.title}
                                    </span>

                                    <i class="bi bi-three-dots-vertical"  onClick={() => handleDetailsClick(index)}></i>
                                    
                                </div>
                                {showPopup == index && (
                                    <div className="popup">
                                        <button onClick={() => handlePopupClose()}>Close</button>
                                        <ul className="dropdown-items">
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
                            {movies.map((movie, index) => (
                                <tr key={index} className='table-row'>
                                    <td >{movie.title}</td>
                                    <td >{movie.director}</td>
                                    <td >{movie.releaseDate}</td>
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

const Films = () => {
    const [movies, setMovies] = useState([]);
    const [gridview, setGridView] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/films/');
                const moviesData = response.data.results.map((movie) => ({
                    title: movie.title,
                    poster: `https://via.placeholder.com/150`, // Placeholder image, replace with actual poster URL
                    releaseDate: movie.release_date,
                    director: movie.director,
                }));
                setMovies(moviesData.slice(0,6));
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <div className='header_part'>
                <div className="heading">
                    <h3>Films</h3>
                </div>
                <div className="grid">
                    {gridview ?
                        <div className='views' >
                            <i class="bi bi-grid" onClick={() => { setGridView(true) }} style={{backgroundColor:"white",color:"var(--Grey-2, #696974)",paddingLeft:"0"}}>Grid</i>
                            <i class="bi bi-list" onClick={() => setGridView(false)} style={{backgroundColor:"#03123D"}}></i>
                        </div> :
                        <div className='views' >
                            <i class="bi bi-grid-fill" onClick={() => { setGridView(true) }} style={{backgroundColor:"#03123D"}}></i>
                            <i class="bi bi-list-ul" onClick={() => setGridView(false)} style={{backgroundColor:"white" ,color:"var(--Grey-2, #696974)",paddingRight:"0"}}>List</i>
                        </div>
                    }
                </div>
            </div>
            <MovieList movies={movies} gridview={gridview} />
        </div>
    );
};

export default Films;
