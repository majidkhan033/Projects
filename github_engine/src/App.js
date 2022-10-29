import './App.css';
import Home from './components/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from "./components/Search";

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        const {data} = await axios.get("https://api.github.com/users")
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, [])
 


  return (
    <>
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home users={users} loading={loading} />} />
      </Routes>
      <Footer />
    </>
  );
}
 export default App;