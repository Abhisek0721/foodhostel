import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faHeart, faHandHoldingHand, faHome, faContactBook, faLocationDot, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userAddressAction from "../../redux/actions/userAddressAction";

const NavbarD = ()=>{
    const navigate = useNavigate();
    const userAddress = useSelector((state) => state.userAddressReducer);
    const token = useSelector((state) => state.userTokenReducer);
    const dispatch = useDispatch();
    let [roadName, setRoadName] = useState("Set Location");
    let [signinElem, setSigninElem] = useState('');
    let [joinusElem, setJoinusElem] = useState('');

    const logout = ()=>{
        try {
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        // check auth
        if(token){
            // fetch location
            axios.get(`${process.env.REACT_APP_SERVER_URL}/address/getlocation/${token}`)
            .then((res)=>{
                if(res.data.status){
                    dispatch(userAddressAction(res.data?.location))
                    setRoadName(res.data?.location?.roadName);
                }
            });
            // setJoinusElem(<Link to={'/joinus'} className='text-white hover:text-red-200 active:text-red-300'><FontAwesomeIcon icon={faHandHoldingHand} className="text-xl" /> Join Us </Link>);
            setSigninElem(<span onClick={logout} className='text-white hover:text-red-200 active:text-red-300 cursor-pointer'><FontAwesomeIcon icon={faUser} className="text-xl" /> Logout</span>);
        }else{
            // fetch location
            setJoinusElem(<Link to={'/checkout'} className='text-white hover:text-red-200 active:text-red-300'><FontAwesomeIcon icon={faHandHoldingHand} className="text-xl" /> Join Us </Link>);
            setSigninElem(<Link to={'/login'} className='text-white hover:text-red-200 active:text-red-300 cursor-pointer'><FontAwesomeIcon icon={faUser} className="text-xl mr-1" />Sign In</Link>);
        }
    },[roadName, userAddress]);

    return (
        <div className="flex py-4 px-8 justify-between shadow-lg z-10 fixed top-0 w-[100%] bg-red-700">
            <div className="logo-mobile text-white flex">
                Foodhostel.com
                <Link to={'/location'} className="ml-10 mt-1 hover:text-red-200 active:text-red-300">
                    <div className="location">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xl mr-3" />
                        <p className='text-sm font-semibold'>{roadName}</p>
                    </div>
                </Link>
            </div>
            <div className='mr-4 flex justify-between w-[50%]'>
                <Link to={'/'} className="text-white hover:text-red-200 active:text-red-300"><FontAwesomeIcon icon={faHome} className="text-xl" /> Home </Link>
                <Link to={'/search'} className="text-white hover:text-red-200 active:text-red-300"><FontAwesomeIcon icon={faSearch} className="text-xl" /> Search </Link>
                <Link to={'/contact'} className="text-white hover:text-red-200 active:text-red-300"><FontAwesomeIcon icon={faContactBook} className="text-xl" /> Contact Us </Link>
                <Link to={'/aboutus'} className="text-white hover:text-red-200 active:text-red-300"><FontAwesomeIcon icon={faBookOpen} className="text-xl" /> About Us </Link>
                <Link to={'/favourite'} className="text-white hover:text-red-200 active:text-red-300"><FontAwesomeIcon icon={faHeart} className="text-xl" /> Favourite </Link>
                {/* {joinusElem} */}
                {signinElem}
            </div>
        </div>
    )
}

export default NavbarD;