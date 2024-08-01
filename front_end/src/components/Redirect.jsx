import React, { useState, useEffect } from "react";
import axios from "axios";

const Redirect = () => {
  const [responseData, setResponseData] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    // Handle potential axios errors
    axios.post("http://localhost:4000/tiktokaccesstoken", {
      code,
    })
      .then((response) => {
        const parsedResponse = response.data; // Assuming JSON response
        setResponseData(parsedResponse);
        setAccessToken(parsedResponse.access_token);
        console.log(parsedResponse.access_token);
        setIsLoading(false); // Set loading to false on successful response
      })
      .catch((error) => {
        console.error("Error fetching access token:", error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Access Token: {accessToken}</p>
          {/* Add any additional UI elements or information here */}
        </div>
      )}
    </div>
  );
};

export default Redirect;
