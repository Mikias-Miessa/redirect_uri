import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from "./components/Home";
import Redirect from "./components/Redirect";
function App() {
   return (
      <div className="App">
       <Router>
         <Routes>
           <Route>
             <Route exact path="/" element={<Home />}></Route>
             <Route exact path="/redirect" element={<Redirect />}></Route>
           </Route>
           </Routes>
       </Router>
      </div>
  );
}
export default App;