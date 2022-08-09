import React, { useState, useEffect } from 'react';

import { getPlacesData } from './api';

import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

   

    // getting my own position longitude and latitude
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, [])

    //getting the data from api.js
    useEffect(() => {
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => { 
                setPlaces(data);
                console.log('places: ',data)
            })
    }, [coordinates, bounds]);

    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }} >
                <Grid item xs={12} md={4}>
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default App;
