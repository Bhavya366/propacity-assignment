import React from 'react';
import dashboard from '../assets/dashboard.png'
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <img src={dashboard} alt="" />
            <h2>Welcome to StarWars</h2>
            <h2>Dashboard</h2>
            <p>Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.</p>
            
        </div>
    );
};

export default Dashboard;