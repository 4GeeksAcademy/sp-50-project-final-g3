import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import HomeClassList from '../component/HomeClassList.jsx';
import HomeUserClasses from '../component/HomeUserClasses.jsx';
import HomeFilters from '../component/HomeFilters.jsx';
import TrainerHomepage from '../component/TrainerHomepage.jsx';


const Homepage = () => {
    const { store, actions } = useContext(Context);
    let isLogged = store.logged
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'))
    const isUser = currentUser && currentUser.role == 'users' ? true : false;
    const isTrainer = currentUser && currentUser.role == 'trainers' ? true : false;
    const [filters, setFilters] = useState({
        trainingLevel: '',
        trainingType: ''
    })

    const handleFilterSubmit = (event, filters) => {
        setFilters(filters);
        console.log('Filters submitted:', filters);
    };


    return (
        <>
            {isLogged && isUser ?
                <div className='container-fluid'>
                    <div className='row'>
                        <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
                    </div>
                    <div className='row'>
                        <div className='col-lg-9 col-md-9 col-sm-12'>
                            <HomeClassList filters={filters} />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-10' style={{ 'backgroundColor': '#D3D3D3', 'height': '100vh' }}>
                            <HomeUserClasses />
                        </div>
                    </div>
                </div>
                :
                (isLogged && isTrainer) ?
                    <div className='container-fluid'>
                        <TrainerHomepage />
                    </div>
                    :
                    <div className='container-fluid'>
                        <div className='row'>
                            <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
                        </div>
                        <div className='row'>
                            <div className='col-lg-10 col-md-10 col-sm-10'>
                                <HomeClassList filters={filters} />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Homepage;