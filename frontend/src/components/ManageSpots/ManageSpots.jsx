import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpots.css';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const spots = useSelector((state) => Object.values(state.spots));
    // const spots = useSelector((state) => state.spots.getAllSpots);

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    if(!user) {
        return navigate("/", {
            state: { message: "You must be logged in to view this page" },
            replace: true
        });
    }

    // console.log(spots);
    // console.log(user);

    const allSpots = spots.filter((spot) => spot.ownerId === user.id);

    if(allSpots.length === 0) {
        return (
            <div className="no-spots">
                <h2>You have not created any spots yet.</h2>
                <Link to="/spots/new" className="create-spot-link">Create a spot</Link>
            </div>
        );
    }

    return (
        <div className="manage-spots">
            <h1>Manage Your Spots</h1>
            <Link to="/spots/new" className="create-spot-link">Create Spot</Link>
            <div className="spots-grid">
                {allSpots.map((spot) => (
                    <Link
                        key={spot.id}
                        to={`/spots/${spot.id}`}
                        className="spot-tile"
                        title={spot.name}
                    >
                        <img 
                            src={spot.previewImage} /* Not sure how to get image dynamically */
                            alt={spot.name}
                            className="spot-thumbnail"
                        />
                        <div className="spot-details">
                            <div className="city-state">
                                {spot.city}, {spot.state}
                            </div>
                            <div className="tooltip" data-tooltip={spot.name}>
                                <h3>{spot.name}</h3>
                            </div>
                            <div className="spot-rating">
                                <div className="stars">{spot.rating || "NEW"}</div>
                            </div>
                            <div className="spot-price">
                                ${spot.price} / night
                            </div>
                        </div>
                        <div className="spot-buttons">
                            <button className="edit-spot"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // navigate(`/spots/${spot.id}/edit`);
                                }}
                            >Edit</button>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteSpotModal spot={spot} />}
                                className="delete-spot"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ManageSpots;