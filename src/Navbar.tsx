import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Members from './Members';
import Home from './Home';
import RegistrationForm from './RegistrationForm';

function Navbar() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                {'|'}
                <Link to="/members">Members</Link>
                {'|'}
                <Link to="/newmember">New Member</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/newmember" element={<RegistrationForm />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Navbar;