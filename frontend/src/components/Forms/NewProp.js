import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import * as propertyActions from "../../store/property";
import './Forms.css';



function NewProp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("Big Bear Lake");
    const [state, setState] = useState("California");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("https://www.destinationbigbear.com/media/images/HiddenWolfRetreat/2000/00100.jpg");
    const [images, setImages] = useState([]);

    const [errors, setErrors] = useState([]);

    // const key = useSelector(state => state.key)

    useEffect(() => {
    }, [errors])

    if (!sessionUser) return <Redirect to="/login" />;


    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            ownerId: sessionUser.id,
            price: price,
            name: name,
            address: address,
            city: city,
            state: state,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            maxGuests: maxGuests,
            description: description,
            imageUrl: imageUrl
        }

        let validations = await validateErrors()

        if (!validations.length){
            await dispatch(propertyActions.uploadNewProperty(data))
                .then(() => history.push(`/users/${sessionUser.id}`))
    
        }else{
            setErrors(validations)
        }
    };

    // async function getCoord(address1, city1, state1) {
    //     const addy = `${address1.split(' ').join('+')},+${city1},+${state1}`
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${key}`
    //     const url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${key}`
    //     const response = await fetch(url1)

    //     if (response.ok) {
    //         const data = await response.json();
    //         const newAddy = data.results[0].geometry.location
    //         return newAddy;
    //     }
    // }


    const validateErrors = async () => {
        let errors = []

        let addresRegex = /^[0-9]* .*/g



        if (name.length > 100 ) errors.push('Name must be less than 100 characters')
        if (!name.length || name.length < 3) errors.push('Name must be at least 3 characters')
        
        if (!address.match(addresRegex)) errors.push('Please provide a valid address')
        
        
        if (city.toLowerCase() !== 'big bear lake' && city.toLowerCase() !== 'big bear city') errors.push('Property must be in Big Bear Lake or Big Bear City')
        if (state.toLowerCase() !== 'california') errors.push('Property must be in California')
        
        if ( bathrooms === '' || bedrooms === '' || maxGuests === '') errors.push('Please provide valid number of bedrooms, bathrooms, & guests')
        
        
        if (description.length < 5) errors.push('Desciption must be at least 5 characters')
        if (description.length > 200) errors.push('Description must be less than 200 characters')
        
        //max constraints
        
        if (price > 2000) errors.push('Price must be under $2,000 / night')
        if (bedrooms > 15) errors.push('Must have less than 15 bedrooms')
        if (bathrooms > 15) errors.push('Must have less than 15 bathrooms')
        if(maxGuests > 16) errors.push('Properties cannot have more than 16 guests')

        //min constraints
        if (price < 75) errors.push('Price must be at least $75/night')
        if (bedrooms < 1) errors.push('Property must have at least 1 bedroom')
        if (bathrooms < 1) errors.push('Property must have at least 1 bathroom')
        if (maxGuests < 1) errors.push('Property must allow at least 1 guest')


        // await getCoord(address, city, state)
        // if (imageUrl === '') errors.push('Please provide an image')
        return errors;
    }

    return (
        <div className="formWrap">
            <form onSubmit={handleSubmit} className='formm'>
            <h1>Upload a Property</h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Bedrooms
                    <input
                        type="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Bathrooms
                    <input
                        type="number"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Max Guests
                    <input
                        type="number"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        // type="text area"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label hidden={true}>
                    {/* Images */}
                    <input
                        type="text"
                        hidden={true}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="logB">Submit Property</button>
            </form>
        </div>
    );
}

export default NewProp;