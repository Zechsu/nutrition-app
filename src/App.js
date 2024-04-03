import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate as Redirect,
} from "react-router-dom";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import './App.css';

function App() {
  return (
    <Router>
      <div className="ui text container">
        <h2 className="ui header">Nutrition App</h2>
        <div className="ui dividing header">
          <button className="ui button">
            <Link to="/">
              Home
            </Link>
          </button>
          <button className="ui button">
            <Link to="/create">
              Create
            </Link>
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
