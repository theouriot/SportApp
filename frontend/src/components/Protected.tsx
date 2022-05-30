import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

// @ts-ignore
const Protected = ({ isLoggedIn, children }) => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/');
        }
    },[])
    return children;
};
export default Protected;