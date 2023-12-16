import React,{useEffect,useState} from 'react';
import { useNavigate,useLocation} from "react-router-dom";


const Spinner = ({path = 'login'}) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue)
        },1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname,
        })
        return ()=> clearInterval(interval)
    },[count, location, navigate, path])
  return (
    <>
    
    <div className="d-flex flex-column justify-content-center align-items-center bg-success" style={{height:'100vh'}}>
    <h1 className="text-center text-dark">Redirecting to you in {count} second</h1>
  <div className="spinner-grow text-dark" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Spinner