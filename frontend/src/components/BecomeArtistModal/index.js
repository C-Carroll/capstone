import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { newArtist } from "../../store/artist";
import { useHistory } from "react-router-dom";
import "./BCA.css";

const BecomeArtist = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmission = async (e) => {
    e.preventDefault();
    setErrors({});
    let err = {};

    if (name.length < 2) {
      err.name = "Name must be longer than 2 characters";
    } else if (description.length < 5) {
      err.description = "Description must be longer than 5 characters";
    }

    if (Object.values(err).length > 0) {
      setErrors(err);
    } else {
      try {
        const artistInfo = { name, description };
        const newBoi = await dispatch(newArtist(artistInfo));
        const artBoiId = newBoi.id;
        const update = await dispatch(sessionActions.isArtist(user.id));
        history.push(`/artist/${artBoiId}`);
      } catch (error) {
        console.log("errors", error);
      }
    }
  };
  if (!user) return history.push("/");
  return (
    <div className="becomeArtistContainer">
      <h1>Become an Artist</h1>

      <form onSubmit={handleSubmission}>
        <label>
          Artist Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="uhoh">{errors.name}</div>}
        </label>
        <label>
          Artist Description:
          <textarea
          className="artDes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && (
            <div className="uhoh">{errors.description}</div>
          )}
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Become Artist</button>
      </form>
    </div>
  );
};

export default BecomeArtist;
