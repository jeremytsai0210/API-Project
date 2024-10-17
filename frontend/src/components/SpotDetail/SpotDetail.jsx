import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import './SpotDetail.css';

const SpotDetail = () => {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getSpot = async () => {
            setLoading(true);
            const response = await fetch(`/api/spots/${spotId}`);
            const data = await response.json();
            setSpot(data);
            setLoading(false);
        }

        getSpot();
    }, [spotId]);

    if(loading) {
        return <div>Loading...</div>
    }

    if(!spot) {
        return <div>Spot Not Found</div>
    }

    return (
        <>
            <div className="spot-details"> 
                {/* Add your component content here */}
                <h1 className="spot-name">{spot.name}</h1>
                <p className="spot-location">Location: {spot.city}, {spot.state}, {spot.country}</p>
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
                <div className="spot-information">
                    <div>
                        <h3 className="spot-host">Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}</h3>
                        <p className="spot-description">{spot.description}</p>
                    </div>
                    <div>
                        <div className="price-and-review">
                            <p className="spot-price">${spot.price} night</p>
                            <span className="spot-review">Star AvgRating numReviews</span>
                        </div>
                        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="review-details">
                Reviews go here...
            </div>
        </>
        

    );
};

export default SpotDetail;