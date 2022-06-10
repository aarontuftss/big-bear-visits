import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import * as propertyActions from "./store/property"
import * as keyActions from './store/key'
import * as reservationActions from "./store/reservation"
import NewProp from "./components/Forms/NewProp";
import EditProp from "./components/Forms/EditProp";
import NewReservation from "./components/Forms/NewReservation";
import EditReservation from "./components/Forms/EditReservation";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(()=> dispatch(propertyActions.getAllProperties()))
    .then(()=> dispatch(keyActions.getKey()))
    .then(() => dispatch(reservationActions.getAllReservations()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" exact={true}>
            <LoginFormPage />
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/search" exact={true}>
            <SearchPage />
          </Route>
          <Route path="/users/:userId" exact={true}>
            <h1>Specific User Page</h1>
          </Route>
          <Route path="/properties/new" exact={true}>
            <NewProp />
          </Route>
          <Route path="/properties/:propertyId" exact={true}>
            <PropertyPage />
          </Route>
          <Route path="/properties/:propertyId/edit" exact={true}>
            <EditProp />
          </Route>
          <Route path="/reservations/new/:propertyId" exact={true}>
            <h1>New Reservation Form</h1>
            <NewReservation />
          </Route>
          <Route path="/reservations/:reservationId" exact={true}>
            <h1>Personal Reservation Info & Support Submit Form</h1>
            <EditReservation />
          </Route>
          <Route path="/about" exact={true}>
            <h1>About Page</h1>
          </Route>
          <Route path="*" exact={true}>
            <h1>404 Page</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
