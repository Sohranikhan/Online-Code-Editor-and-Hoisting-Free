"use client"
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

const useFetchProjects = ()=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookie.get('token')
    
  useEffect(() => {
    const getData = async () => {
      try {
          const headers = { Authorization: `${token}` }
        const response = await fetch("http://localhost:4000/projects", {
          headers: headers,
        });
        const jRes = await response.json();
        setData(jRes);
    } catch (error) {
        setError("Failed to fetch projects.");
      }
    };
    if (token) {
        getData(); // Only fetch if the token is available
    }
}, [token]);
return {data, error}
}

export default useFetchProjects