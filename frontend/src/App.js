import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AlbumBrowser from "./components/AlbumsBrowser";
import AlbumsPage from "./components/AlbumPage";
import ArtistPage from "./components/ArtistPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route path='/albums/:albumId'>
          <AlbumsPage />
        </Route>
        <Route path='/albums'>
          <AlbumBrowser />
        </Route>
        <Route path='/artist/:artistId'>
          <ArtistPage />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
