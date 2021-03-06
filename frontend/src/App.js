import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import * as weatherActions from "./store/weather"
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
import UserPage from "./components/UserPage";
import AboutPage from "./components/About";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  // const { params } = useParams()

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(()=> dispatch(propertyActions.getAllProperties()))
    .then(()=> dispatch(keyActions.getKey()))
    .then(() => dispatch(reservationActions.getAllReservations()))
    .then(() => dispatch(weatherActions.getWeather()))
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
            <UserPage />
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
          <Route path="/reservations/:reservationId/:propId" exact={true}>
            <EditReservation />
          </Route>
          <Route path="/about" exact={true}>
            <AboutPage />
          </Route>
          <Route path="*" exact={true}>
            <div className="loaderr">
              <h1>404 Page Not Found</h1>
              <p>Please check your URL path & try again.</p>
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
