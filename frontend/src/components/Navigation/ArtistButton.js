import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import BecomeArtist from "../BecomeArtistModal";
import "./Navigation.css";

const ArtistButton = ({ user }) => {
  const dispatch = useDispatch();

  const userId = user.id;
  const artist = useSelector((state) => state.session.artist);

  useEffect(() => {
    dispatch(sessionActions.isArtist(userId));
  }, [dispatch]);

  return (
    <div className="linkToAP">
      {artist ? (
        <NavLink to={`/artist/${artist.id}`} id="vfp">
          {artist.name}
        </NavLink>
      ) : (
        <div>
          <NavLink to="/newArtist" id="vfp">
            Become an Artist
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ArtistButton;
