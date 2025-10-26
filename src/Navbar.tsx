import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Members from './Members';
import Home from './Home';

function Navbar() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                {'|'}
                <Link to="/members">Members</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Navbar;