import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Canceled from "./components/Canceled";

import Start from "./Screens/start.js";
import Login from "./Screens/login.js";
import Signup from "./Screens/signup.js";

import Book from "./Screens/book.js";
import List from "./Screens/list.js";

import YourListings from "./Screens/yourListings.js";
import EditListing from "./Screens/editListing.js";
import YourBookings from "./Screens/yourBookings.js";
import ViewListings from "./Screens/ViewListings.js";
import IndividualListing from "./Screens/individualListing.js";

import Profile from "./Screens/profile.js";
import EditProfile from "./Screens/editProfile.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/success" component={<Success />} />
      <Route path="/canceled" element={<Canceled />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/list" element={<List />} />
      <Route path="/listings" element={<ViewListings />} />
      <Route path="/editlisting" element={<EditListing />} />
      <Route path="/book" element={<Book />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/yourlistings" element={<YourListings />} />
      <Route path="/yourbookings" element={<YourBookings />} />
      <Route path="/individuallisting" element={<IndividualListing />} />
      <Route path="/" element={<Start />} />
    </Routes>
  </Router>
);
