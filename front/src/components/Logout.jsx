import { ReactSession }  from 'react-client-session';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    localStorage.removeItem("username");
    navigate('/');

}

export default Logout;