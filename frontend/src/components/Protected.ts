import {useNavigate} from "react-router-dom";

// @ts-ignore
const Protected = ({ isLoggedIn, children }) => {
    let navigate = useNavigate();

    if (!isLoggedIn) {
        return navigate('/');
    }
    return children;
};
export default Protected;