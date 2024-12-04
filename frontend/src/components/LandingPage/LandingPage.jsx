import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import './LandingPage.css';
import { FaItalic } from 'react-icons/fa';

function LandingPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const spots = useSelector((state) => Object.values(state.spots));

    // Problem is in backend. Fetching the routes does not give me 
    // avgRating and previewImage. Need to figure out how to fix new
    // migrations and/or seeding for more data. Also need to check how 
    // you are getting the data for avgRating and images. Otherwise, hotfix
    // would be to have to fake some hard-code data on the frontend to make
    // it 'work' for now.
    console.log(state);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        <div className="landing-page">
            <h1>Explore Spots</h1>
            <div className="spots-grid">
                {spots.map((spot) => (
                    <Link
                        key={spot.id}
                        to={`/spots/${spot.id}`}
                        className="spot-tile"
                        title={spot.name}
                    >
                        {console.log(spot)}
                        <img 
                            // external url for image for now
                            src={"https://images.unsplash.com/photo-1567371891232-7265b51bab42?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            // src={spot.previewImage} /* Not sure how to get image dynamically */
                            alt={spot.name}
                            className="spot-thumbnail"
                        />
                        <div className="spot-details">
                            <div className="city-state">
                                {spot.city}, {spot.state}
                            </div>
                            <div className="tooltip" data-tooltip={spot.name}>
                                <h6>{spot.name}</h6>
                            </div>
                            <div className="spot-rating">
                                <div className="stars">{spot.rating || "NEW"}</div>
                            </div>
                            <div className="spot-price">
                                ${spot.price} / night
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LandingPage;