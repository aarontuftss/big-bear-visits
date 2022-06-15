import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as propertyActions from "../../store/property";
import './Forms.css';


function EditProp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const properties = useSelector((state) => state.properties.allProperties)
    const { propertyId } = useParams()

    const propertyInfo = Object.entries(properties).filter((p) => {
        return p[1].id === parseInt(propertyId)
    })

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


    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        pageSetup()
    }, [])

    const validateErrors = () => {
        let errors = []

        let addresRegex = /^[0-9]* .*/g



        if (name.length > 100) errors.push('Name must be less than 100 characters')
        if (!name.length || name === '') errors.push('Please provide a name')
        if (!address.match(addresRegex)) errors.push('Please provide a valid address')
        if (city.toLowerCase() !== 'big bear lake' && city.toLowerCase() !== 'big bear city') errors.push('Property must be in Big Bear Lake or Big Bear City')
        if (state.toLowerCase() !== 'california') errors.push('Property must be in California')
        if (bathrooms === '' || bedrooms === '' || maxGuests === '') errors.push('Please provide valid number of bedrooms, bathrooms, & guests')
        if (description.length < 5) errors.push('Please provide a brief description')
        if (description.length > 200) errors.push('Description must be less than 200 characters')
        if (imageUrl === '') errors.push('Please provide an image')



        return errors;
    }

    function pageSetup() {
        if (sessionUser.id !== propertyInfo[0][1].ownerId) {
            history.push('/search')
        }
        setPrice(propertyInfo[0][1].price);
        setName(propertyInfo[0][1].name);
        setAddress(propertyInfo[0][1].address);
        setCity(propertyInfo[0][1].city);
        setState(propertyInfo[0][1].state);
        setBedrooms(propertyInfo[0][1].bedrooms);
        setBathrooms(propertyInfo[0][1].bathrooms);
        setMaxGuests(propertyInfo[0][1].maxGuests);
        setDescription(propertyInfo[0][1].description);
        setIsLoaded(true)
    }


    if (!sessionUser) return <Redirect to="/login" />;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: propertyId,
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

        let validations = validateErrors()

        if (!validations.length) {
            await dispatch(propertyActions.editProperty(data))
                .then(() => history.push(`/properties/${propertyId}`))

        } else {
            setErrors(validations)
        }
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