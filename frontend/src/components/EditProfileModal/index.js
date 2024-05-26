// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateArtist } from "../../store/artist";
import "./EP.css";
const EditProfileModal = (artist) => {
  const { closeModal } = useModal();

  const dispatch = useDispatch();
  const history = useHistory();
  const { name, description, id } = artist.artist;
  const [newName, setNewName] = useState(`${name}`);
  const [newDescription, setNewDescription] = useState(`${description}`);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let err = {};

    if (newName.length < 2) {
      err.name = "Name must be longer than 2 characters";
    } else if (newDescription.length < 5) {
      err.description = "Description must be longer than 5 characters";
    }

    if (Object.values(err).length > 0) {
      setErrors(err);
    } else {
      try {
        const artistInfo = { newName, newDescription };
        const newBoi = await dispatch(updateArtist(id, artistInfo));

        history.push(`/artist/${id}`);
        closeModal();
      } catch (error) {
        console.log("errors", error);
      }
    }
  };

  return (
    <div className="editCont">
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="editDes"
            type="text"
            placeholder={`${name}`}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
          {errors.name && <div>{errors.name}</div>}
        </label>
        <label>
          Description:
          <textarea
            className="editDes"
            placeholder={`${description}`}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
          {errors.description && <div>{errors.description}</div>}
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProfileModal;
