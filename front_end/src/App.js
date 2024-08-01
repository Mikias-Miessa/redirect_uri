import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'; 
// import { Link } from 'react-router-dom'; 
import Home from "./components/Home";
import Redirect from "./components/Redirect";
function App() {
   return (
      <div className="App">
      {/* <Link to={{ pathname: "/callback" }} element={<Redirect />}></Link> */}
       <Router>
         <Routes>
           <Route>
             <Route exact path="/redirect" element={<Redirect/>}></Route>
             <Route exact path="/" element={<Home />}></Route>
           </Route>
           </Routes>
       </Router>

      </div>
  );
}
export default App;