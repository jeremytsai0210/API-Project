import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import './LandingPage.css';


function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots));

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