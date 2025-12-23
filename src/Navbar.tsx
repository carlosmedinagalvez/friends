import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Members from './Members';
import Home from './Home';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import UploadFileToS3 from './UploadFileToS3';
import UploadImageToS3 from './UploadImageToS3';

function Navbar() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/login">Login</Link>
                {'|'}
                <Link to="/">Home</Link>
                {'|'}
                <Link to="/members">Members</Link>
                {'|'}
                <Link to="/newmember">New Member</Link>
                {'|'}
                <Link to="/uploadImageToS3">Image upload</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/newmember" element={<RegistrationForm />} />
                <Route path="/uploadImageToS3" element={<UploadImageToS3 />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Navbar;