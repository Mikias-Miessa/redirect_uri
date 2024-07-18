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
      "&redirect_uri=http://localhost:3001/redirect";
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
    "http://localhost:3001/redirect",
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
});
 
app.listen(4000, ()=>{console.log("server is running on port 4000")})
  