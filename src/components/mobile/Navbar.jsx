import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import userAddressAction from '../../redux/actions/userAddressAction';
import axios from 'axios';

const Navbar = ()=>{
    const location = useSelector((state) => state.userAddressReducer);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userTokenReducer);
    
    useEffect(()=> {
        if(!location?.deliveryAddress?.city) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/address/getlocation/${token}`)
            .then((res)=>{
                if(res.data.status){
                    dispatch(userAddressAction(res.data?.location))
                }
            });
        }
    }, []); 
    return (
        <div className="w-[100%] fixed flex bottom-0 navbar z-10 justify-center md:justify-evenly" id='navbar'>
            <Link to={'/'}><FontAwesomeIcon id="home" name='' icon={faHome} className="deactive-btn" /></Link>
            <Link to={'/search'}><FontAwesomeIcon id="search" name='orderHistory' icon={faSearch} className="deactive-btn" /></Link>
            <Link to={'/favourite'}><FontAwesomeIcon id="favourite" icon={faHeart} name='favourite' className="deactive-btn" /></Link>
            <Link to={'/profile'}><FontAwesomeIcon id="profile" icon={faUser} name='profile' className="deactive-btn" /></Link>
        </div>
    );
}

export default Navbar;