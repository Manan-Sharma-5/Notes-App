import {CredentialsContext} from "../App";
import {useContext} from "react";

const Header = (props) => {

    const [, setCredentials] = useContext(CredentialsContext);

    const logout = () => {
        setCredentials(null);
        props.setIsAuthenticated(false);
    }

    return (
        <div className="header">
        <div className="title">
        <h1>Take Note</h1>
        </div>
        <div className="button-logout">
        <button className="logout" onClick={logout}>Logout</button>
        </div>
        </div>
    );
    }

export default Header;