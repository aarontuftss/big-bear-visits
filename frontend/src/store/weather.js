const GET_WEATHER = 'WEATHER/GET/WEATHER';



// GET Weather
export const getWeather = () => async (dispatch) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4df9908727msh857334bea63b5f1p14c6f4jsnf639cf66a38a',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const response = await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Big%20Bear%20Lake', options)
        // .then(response => {response.json()})
        // .catch(err => console.error(err));

    if (response) {
        const weather = await response.json();
        dispatch(getWeatherAction(weather));
        return weather;
    }

    return response.code; // ERROR HANDLING?
}

const getWeatherAction = (weather) => ({
    type: GET_WEATHER,
    weather
})



const initialState = '';

const weatherReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_WEATHER:
            newState = action.weather
            return newState;
        default:
            return state;
    }
}

export default weatherReducer;