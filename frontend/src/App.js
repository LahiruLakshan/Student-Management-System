import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import AddStudent from "./pages/AddStudent";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import AllStudents from "./pages/AllStudents";
import SearchStudent from "./pages/SearchStudent";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>

                <Route exact path="/" element={<AllStudents/>}/>
                <Route exact path="/add" element={<AddStudent/>}/>
                <Route exact path="/find" element={<SearchStudent/>}/>
            </Routes>

        </Router>
    );
}

export default App;
