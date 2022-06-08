import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import * as propertyActions from "./store/property"
import NewProp from "./components/Forms/NewProp";
import EditProp from "./components/Forms/EditProp";
import NewReservation from "./components/Forms/NewReservation";
import EditReservation from "./components/Forms/EditReservation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(()=> dispatch(propertyActions.getAllProperties()))
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
            <h1>Welcome to my homepage</h1>
          </Route>
          <Route path="/search" exact={true}>
            <h1>Browse Properties</h1>
          </Route>
          <Route path="/users/:userId" exact={true}>
            <h1>Specific User Page</h1>
          </Route>
          <Route path="/properties/new" exact={true}>
            <h1>Create Property Form</h1>
            <NewProp />
          </Route>
          <Route path="/properties/:propertyId" exact={true}>
            <h1>Specific Property</h1>
          </Route>
          <Route path="/properties/:propertyId/edit" exact={true}>
            <h1>Edit Property Form</h1>
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
