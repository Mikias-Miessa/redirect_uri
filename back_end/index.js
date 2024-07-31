const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());



app.get("/oauth", (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie("csrfState", csrfState, { maxAge: 60000 });
      let url = "https://www.tiktok.com/v2/auth/authorize/";
      // the following params need to be in `application/x-www-form-urlencoded` format.
      url += "?client_key=aw0h2vs3s39ad7dk";
      url += "&scope=user.info.basic,video.upload,video.publish";
      url += "&response_type=code";
      url +=
      "&redirect_uri=https://redirect-uri-tan.vercel.app/redirect";
      url += "&state=" + csrfState;
    res.json({ url: url });
  });

app.post("/tiktokaccesstoken", async (req, res) => {
  try {
    const { code } = req.body;
    const decode = decodeURI(code);
    const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
    const params = {
    client_key: "aw0h2vs3s39ad7dk",
    client_secret: "Gd5cLdFaAsv0pzQgidmWWkkeQHxoyBZt",
    code: decode,
    grant_type: "authorization_code",
    redirect_uri:
    "https://redirect-uri-tan.vercel.app/redirect",
  };
  const response = await axios.post(
  tokenEndpoint,
  querystring.stringify(params),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
  }
  );
  console.log("response>>>>>>>", response.data);
  res.send(response.data);
  } catch (error) {
  console.error("Error during callback:", error.message);
  res.status(500).send("An error occurred during the login process.");
  }
  window.location.href = `http://localhost:3000/redirect/?response=${encodeURIComponent(JSON.stringify(responseData))}`;  
});
 // Constants
// const CLIENT_KEY = 'YOUR_CLIENT_KEY';
// const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
// const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// // Get the authorization code from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const authorizationCode = urlParams.get('code');

// (async () => {
//     let responseData;

//     if (authorizationCode) {
//         // Prepare the POST request data
//         const postData = new URLSearchParams({
//             client_key: CLIENT_KEY,
//             client_secret: CLIENT_SECRET,
//             code: authorizationCode,
//             grant_type: 'authorization_code',
//             redirect_uri: REDIRECT_URI,
//         });

//         try {
//             // Make the POST request using fetch
//             const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: postData.toString(),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             // Decode the JSON response
//             responseData = await response.json();
//         } catch (error) {
//             // Handle fetch errors
//             responseData = {
//                 error: 'Fetch error: ' + error.message,
//             };
//         }
//     } else {
//         // Handle case where authorization code is not found
//         responseData = {
//             error: 'Authorization code not found in the URL.',
//         };
//     }

//     // Redirect back to React app with response JSON
//     window.location.href = `http://localhost:3000/redirect/?response=${encodeURIComponent(JSON.stringify(responseData))}`;
// })();

app.listen(4000, ()=>{console.log("server is running on port 4000")})
  