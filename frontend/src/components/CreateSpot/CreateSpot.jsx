import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import './CreateSpot.css';

function validateForm(formData) {
    const errors = {};
    if(!formData.name) {
        errors.name = "Please enter a name for your spot";
    }
    if(!formData.address) {
        errors.address = "Please enter an address for your spot";
    }
    if(!formData.city) {
        errors.city = "Please enter a city for your spot";
    }
    if(!formData.state) {
        errors.state = "Please enter a state for your spot";
    }
    if(!formData.country) {
        errors.country = "Please enter a country for your spot";
    }
    if(!formData.price) {
        errors.price = "Please enter a price for your spot";
    }
    if(!formData.previewImage) {
        errors.previewImage = "Please enter a preview image for your spot";
    }
    if(!formData.description) {
        errors.description = "Please enter a description for your spot";
    }
    if(!formData.latitude) {
        errors.latitude = "Please enter a latitude for your spot";
    }
    if(!formData.longitude) {
        errors.longitude = "Please enter a longitude for your spot";
    }
    if(!formData.images.length < 1) {
        errors.images = "Please enter at least one image for your spot";
    }

    return errors;
}

const CreateSpot = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [newSpotId, setNewSpotId] = useState(null);

    const [errors, setErrors] = useState({});

    // const handleImageChange = (index, value) => {
    //     const newImageUrls = [...imageUrls];
    //     newImageUrls[index] = value;
    //     setImageUrls(newImageUrls);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const spotData = {
            name,
            description,
            address,
            city,
            state,
            country,
            price,
            previewImage,
            imageUrls,
            latitude,
            longitude
        };

        const validationErrors = validateForm(spotData);
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const newSpot = await dispatch(spotActions.addSpot(spotData));

            if (newSpot) {
                alert("Spot created successfully!");
                setNewSpotId(newSpot.id);
            } else {
                alert("Failed to create spot. Please try again.");
            }
        } catch (error) {
            console.error("Error creating spot: ", error);
        }
    };

    return (
        <div className="new-spot">
            <h1>Create a New Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div className="country">
                    <label>
                        Country:
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            className={errors.country ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                <div className="address">
                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            className={errors.address ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                <div className="city-state-container">
                    <div className="city">
                        <label>
                            City:
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                className={errors.city ? "error" : ""}
                                required
                            />
                        </label>
                    </div>
                    <span>,</span>
                    <div className="state">
                        <label>
                            State:
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="STATE"
                                className={errors.state ? "error" : ""}
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="lat-long-container">
                    <div className="lat">
                        <label>
                            Latitude:
                            <input
                                type="text"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                placeholder="Latitude"
                            />
                        </label>
                    </div>
                    <span>,</span>
                    <div className="lng">
                        <label>
                            Longitude:
                            <input
                                type="text"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                placeholder="Longitude"
                            />
                        </label>
                    </div>
                </div>
                <hr />
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <div className="description">
                    <label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please write at least 30 characters"
                            rows="5"
                            className={errors.description ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                <hr />
                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlihgts what makes your place special.</p>
                <div className="name">
                    <label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of your spot"
                            className={errors.name ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                <hr />
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="price">
                    <label>
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"
                            className={errors.price ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                <hr />
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div className="preview-image">
                    <label>
                        <input
                            type="text"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            placeholder="Preview Image URL"
                            className={errors.previewImage ? "error" : ""}
                            required
                        />
                    </label>
                </div>
                {/* <div className="images">
                    <label>
                        {imageUrls.map((url, index) => (
                            <input
                                key={index}
                                type="text"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className={errors.images ? "error" : ""}
                                placeholder="Image URL"
                            />
                        ))}
                    </label>
                </div> */}
                <button type="submit">Create Spot</button>
            </form>
            {newSpotId && (
                <NavLink to={`/spots/${newSpotId}`}>
                    Go to your new spot
                </NavLink>
            )}
        </div>
    );
};

export default CreateSpot;