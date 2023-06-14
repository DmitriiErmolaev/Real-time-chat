import './App.css';
import {useAuthState} from "react-firebase-hooks/auth";
import React, {useContext} from "react"
import {Context} from "./index.js"
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import Loader from "./components/Loader"

function App() {
  const {auth} = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if(loading) {
    return <Loader/>
  }

  return (
    <Router>
      <Navbar />
      <AppRouter />
    </Router>
  )
}

export default App;
