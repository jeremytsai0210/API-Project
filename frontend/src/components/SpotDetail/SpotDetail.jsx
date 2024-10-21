import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal';
import { useModal } from '../../context/Modal';
import './SpotDetail.css';

const SpotDetail = () => {
    // const dispatch = useDispatch();
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [spot, setSpot] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = useSelector((state) => state.session.user);
    // console.log(user);

    const { openModal, closeModal } = useModal();

    const handleReviewSubmit = (review) => {
        const reviewData = {
            review,
            userId: user.id
        };

        dispatch(reviewActions.createReview(spotId, reviewData));
        setIsModalOpen(false);
    }

    useEffect(() => {
        const fetchSpotDetails = async () => {
            try {
                const spotResponse = await fetch(`/api/spots/${spotId}`);
                const spotData = await spotResponse.json();
                setSpot(spotData);
                // console.log(spotData);
    
                const reviewResponse = await fetch(`/api/spots/${spotId}/reviews`);
                const reviewData = await reviewResponse.json();
                setReviews(reviewData.Reviews);
                // console.log(reviewData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotDetails();
    }, [spotId]);
    
    // const spot = useSelector((state) => state.spots[spotId]);

    // console.log('\n');
    // console.log("TESTING-TESTING-TESTING-TESTING");
    // console.log('\n');

    // const reviews = useSelector((state) => state.reviews[spotId] || []);
    // const user = useSelector((state) => state.session.user);

    // const [loading, setLoading] = useState(true);
    
    // console.log('\n');
    // console.log(spot);
    // console.log(reviews);
    // console.log('\n');

    // useEffect(() => {
    //     dispatch(spotActions.fetchSpotDetails(spotId));
    //     dispatch(reviewActions.fetchReviews(spotId));
    // }, [dispatch, spotId]);

    if(loading) {
        return <div>Loading...</div>
    }

    if(!spot) {
        return <div>Spot Not Found</div>
    }

    // // Calculate average rataing
    // console.log(reviews);
    // console.log(reviews.length);
    const averageRating = reviews.length === 0 
        ? "New" 
        : (reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length).toFixed(2);

    // // Calculate review count
    const reviewCount = reviews.length === 1
        ? "1 Review"
        : `${reviews.length} Reviews`;

    const isOwner = user && spot.Owner && user.id === spot.Owner.id;

    return (
        <>
            <div className="spot-details"> 
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
                            <p className="spot-price">${spot.price.toFixed(2)} night</p>
                            <span className="spot-review">
                                <i className="fa fa-star">⭐</i>
                                {averageRating}
                                {reviews.length > 0 && (
                                    <>
                                        <span> · </span>
                                        <span>{reviewCount}</span>
                                    </>
                                )}
                            </span>
                        </div>
                        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
                    </div>
                </div>
            </div>

            {/* REVIEWS */}

            <div className="review-details">
                <h2>Reviews</h2>
                <span>
                    <i className="fa fa-star">⭐</i>
                    {averageRating}
                    {reviews.length > 0 && (
                        <>
                            <span> · </span>
                            <span>{reviewCount}</span>
                        </>
                    )}
                </span>

                <div className="review-modal">
                    {user && !isOwner && (
                        <div>
                            <OpenModalButton
                                onButtonClick={() => setIsModalOpen(true)}
                                buttonText={"Post Your Review"}
                                modalComponent={<ReviewFormModal spotId={spotId}/>}
                                className="review-button"
                            />
                        </div>
                    )}
                </div>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review">
                            <h3>
                                <strong>{review.User.firstName}</strong> - {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h3>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    user && !isOwner ? (
                        <div>Be the first to post a review!</div>
                    ) : (
                        <div>No reviews yet.</div>
                    )
                )}
            </div>
        </>
    );
};

export default SpotDetail;