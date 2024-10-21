import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots";
import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(spotActions.deleteSpot(spot.id));
        closeModal();
        alert("Spot Deleted");
    }

    return (
        <div className="delete-spot-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button 
                onClick={handleDelete}
                className="yes-button"
            >Yes (Delete Spot)</button>
            <button 
                onClick={closeModal}
                className="no-button"
            >No (Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal