import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as propertyActions from "../../store/property";
import './Forms.css';


function EditProp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const propertyInfo = useSelector((state) => state.properties.singleProperty.property)

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    const location = window.location.href.split('/')
    const id = location[location.length - 2]

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(propertyActions.getOneProperty(id))
        // .then(()=> console.log(propertyInfo))
        // .then(()=> {
        //     if(sessionUser.id !== propertyInfo.ownerId){
        //         return <Redirect to={`/`} />
        //     }
        // })
        // .then(()=> {
        //     setPrice(propertyInfo.price);
        //     setName(propertyInfo.name);
        //     setAddress(propertyInfo.address);
        //     setCity(propertyInfo.city);
        //     setState(propertyInfo.state);
        //     setBedrooms(propertyInfo.bedrooms);
        //     setBathrooms(propertyInfo.bathrooms);
        //     setMaxGuests(propertyInfo.maxGuests);
        //     setDescription(propertyInfo.description);
        // })
        // .then(()=> setIsLoaded(true))
    }, []);

    useEffect(() => {
        // console.log(propertyInfo)

        // if (sessionUser.id !== propertyInfo.ownerId) {
        //     history.push('/')
        // }
        // setPrice(propertyInfo.price);
        // setName(propertyInfo.name);
        // setAddress(propertyInfo.address);
        // setCity(propertyInfo.city);
        // setState(propertyInfo.state);
        // setBedrooms(propertyInfo.bedrooms);
        // setBathrooms(propertyInfo.bathrooms);
        // setMaxGuests(propertyInfo.maxGuests);
        // setDescription(propertyInfo.description);
  
        setIsLoaded(true)
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name,
            address,
            city,
            state,
            bedrooms,
            bathrooms,
            maxGuests,
            description,
            imageUrl)

        const propData = {
            id: id,
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
        }
        await dispatch(propertyActions.editProperty(propData))
            .then(() => history.push(`/properties/${id}`))

    };

    return (
        <>
        {isLoaded && (
            <div className="formWrap">
                <form onSubmit={handleSubmit} className='formm'>
                <h1>Edit Your Property</h1>
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
                    <label>
                        Images
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Edit Property</button>
                </form>
            </div>
            )}
        </>
    );
}

export default EditProp;