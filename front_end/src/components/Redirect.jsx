import React from "react";
import { useEffect } from "react";
import axios from "axios";

const Redirect= () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    axios.post("https://redirect-uri-u98q.onrender.com/tiktokaccesstoken", {
    code: code,
    });
  }, []);
  
  return <div>Redirect page</div>;
};

export default Redirect;