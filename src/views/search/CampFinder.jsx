import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../../context/UserContext";
import { fetchAllFacilities, fetchStateFacility } from "../../utils/campFetch";
import { getStorage, setStorage } from "../../utils/localStorage";
import CampMap from "../campmap/CampMap";
import States from "./States";

export default function CampFinder() {
  const [state, setState] = useState('ALL');
  const [loading, setLoading] = useState(true)
  console.log(loading)
  const navigate = useNavigate();

  useEffect(() => {
    async function getCampgrounds() {
      const existingStorage = getStorage('ALL');
      if (existingStorage.length === 0) {
        const facilities = await fetchAllFacilities();
        setLoading(false);
        setStorage('ALL', facilities);
      }
    }
    getCampgrounds();
  }, []);

  const handleStateSubmit = async (e) => {
    e.preventDefault();
    if (state === 'ALL') {
      navigate(`/campmap/${state}`)    
    } else {
      console.log(state)
      const existingStateStorage = getStorage(state);
      if (existingStateStorage.length === 0) {
        const stateFacility = await fetchStateFacility(state);
        setStorage(state, stateFacility);
        navigate(`/campmap/${state}`)
       
      }
    }
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  }
  return (
    <div>
      <h1>Search for all campgrounds by State</h1>
      <form onSubmit={handleStateSubmit}>
        <States setState={handleStateChange} />
        <button type="submit" aria-label="Search">
          Search
        </button>
      </form>
      <div>
        {/* <CampMap search={search}/> */}
      </div>
    </div>
  );
}
