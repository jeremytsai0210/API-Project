import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SpotDetail.css';

const SpotDetail = () => {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);
    
    useEffect(() => {
        async function getSpot() {
            const response = await fetch(`/api/spots/${spotId}`);
            const data = await response.json();
            setSpot(data.spot);
        }
        getSpot();
    }, [spotId]);

    return (
        <>
            <div className="spot-details"> 
                {/* Add your component content here */}
                <h1>Spot Name</h1>
                <p>Location: City, State, Country</p>
                <div className="images">
                    <span className="large-image">
                        <img src="large-image-url" alt="Large Image" />
                    </span>
                    <span className="small-images">
                        <img src="small-image-url-1" alt="Small Image 1" />
                        <img src="small-image-url-2" alt="Small Image 2" />
                        <img src="small-image-url-3" alt="Small Image 3" />
                        <img src="small-image-url-4" alt="Small Image 4" />
                    </span>
                </div>
                <p>Hosted by First Name, Last Name</p>
                <p>Description</p>
                <div>
                    <p>Price per night</p>
                    <button onClick={() => alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div className="review-details">

            </div>
        </>
        

    );
};

export default SpotDetail;