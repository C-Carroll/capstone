import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AlbumBrowser from "./components/AlbumsBrowser";
import AlbumsPage from "./components/AlbumPage";
import ArtistPage from "./components/ArtistPage";
import BecomeArtist from "./components/BecomeArtistModal";
import NewAlbum from "./components/NewAlbum";
import LandingPage from "./components/LandingPage";
import AlbumsDeatsPage from "./components/AlbumDeats";
import LoadingPage from "./components/LoadingScreen";

import Foot from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/load">
            <LoadingPage />
          </Route>
          <Route path="/albumDeat/:albumId">
            <AlbumsDeatsPage />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumsPage />
          </Route>
          <Route path="/newArtist">
            <BecomeArtist />
          </Route>
          <Route path="/albums">
            <AlbumBrowser />
          </Route>
          <Route path="/newAlbum">
            <NewAlbum />
          </Route>
          <Route path="/artist/:artistId">
            <ArtistPage />
          </Route>
        </Switch>
      )}
      <Foot />
    </>
  );
}

export default App;
