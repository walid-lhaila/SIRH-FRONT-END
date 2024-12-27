import {useEffect, useState} from 'react';
import axios from "axios";

function UseGetAllCities() {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        async function getAllCities(){
            try {
                const response = await axios.get('/moroccan-cities.json')
                setCities(response.data)
            } catch (error) {
                console.error('Error Fetching Cities')
            }
        }
        getAllCities()
    }, [])
    return ({
            cities
    }
    );
}

export default UseGetAllCities;