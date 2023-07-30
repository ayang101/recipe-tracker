import { Link } from "react-router-dom";
import './App.css';


const Home = () => {
    return (
        <div className='home'>
            <div className='header'>
                <ul>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Login In</Link></li>
                    <li><Link to='/logout'>Log Out</Link></li>
                </ul>
            </div>
            <div>
                <h1 className="app-name">Recipe Tracker</h1>
            </div>
        </div>
    );

};

export default Home;