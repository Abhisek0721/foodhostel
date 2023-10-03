import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleUser, faBookBookmark, faBell, faHistory, faAddressCard, faHeart, faContactBook, faUser, faDoorOpen, faBookOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import userTokenAction from "../../redux/actions/userTokenAction";
import axios from 'axios';

const Profile = ()=>{
    let [user, setUser] = useState({
        firstName: "Guest",
        lastName: "Mode",
        phoneNumber: null
    });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userTokenReducer);
    const address = useSelector((state) => state.userAddressReducer);

    useEffect(()=>{
        // check auth
        if(token) {
            axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users/getProfile/${token}`
            )
            .then((res)=>{
                if(res.data?.status){
                    setUser(res.data?.userData);
                }
            });
        }
    },[]);

    const logout = ()=>{
        localStorage.removeItem('token');
        dispatch(userTokenAction(""));
        navigate('/login');
    }

    return (
        <>
        <div className='rounded-md shadow-lg border-2 p-8 relative top-16'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div>
                    <Link to={'/'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            
            <div className='mt-10'>
                <div className="yourinfo">
                    <div>
                        <FontAwesomeIcon icon={faCircleUser} className="text-4xl pt-1" />
                    </div>
                    <div>
                        <div className='text-center'>
                            <h2 className='font-semibold text-lg'>{`${user['firstName']} ${user['lastName']}`}</h2>
                            {(user['phoneNumber'])?(<p className='text-sm font-sans'>{user['phoneNumber']}</p>):<></>}
                        </div>
                    </div>
                </div>
                {/* 
                <div className="profile-activity mt-8 border-t border-black">
                    <p className='uppercase text-slate-400'>Activity</p>
                    <div className='text-lg font-medium py-5'>
                        Recently Viewed
                    </div>
                    <Link to="/favourite">
                    <div className='text-lg font-medium py-5'>
                        <FontAwesomeIcon icon={faBookBookmark} className="text-lg mr-3" />
                        Bookmarks
                    </div>
                    </Link>
                    <div className='text-lg font-medium py-5'>
                        <FontAwesomeIcon icon={faBell} className="text-lg mr-3" />
                        Notifications
                    </div>
                </div> */}

                <div className="profile-activity">
                    <p className='uppercase text-slate-400'>Online Ordering</p>
                    <Link to={'/address'}>
                    <div className='text-lg font-medium py-5'>
                        <FontAwesomeIcon icon={faAddressCard} className="text-lg mr-3" />
                        My Address
                    </div>
                    </Link>
                    <Link to="/favourite">
                    <div className='text-lg font-medium py-5'>
                        <FontAwesomeIcon icon={faHeart} className="text-lg mr-3" />
                        Favorite Food
                    </div>
                    </Link>
                </div>

                <div className="profile-activity">
                    <p className='uppercase text-slate-400'>Support</p>
                    <Link to={"/contact"}>
                        <div className='text-lg font-medium py-5'>
                            <FontAwesomeIcon icon={faContactBook} className="text-lg mr-3" />
                            Contact Us
                        </div>
                    </Link>
                </div>

                <div className="profile-activity">
                    <p className='uppercase text-slate-400'>Company</p>
                    <Link to={"/aboutus"}>
                        <div className='text-lg font-medium py-5'>
                            <FontAwesomeIcon icon={faBookOpen} className="text-lg mr-3" />
                            About Us
                        </div>
                    </Link>
                </div>


                <div className="profile-activity">
                    <p className='uppercase text-slate-400'>Settings</p>
                    <Link to="/resetPassword">
                    <div className='text-lg font-medium py-5'>
                        <FontAwesomeIcon icon={faUser} className="text-lg mr-3" />
                        Change Password
                    </div>
                    </Link>
                </div>

                {(user['phoneNumber'])?(
                    <div className="py-3 px-6 mb-5 mt-10">
                        <div className='text-lg font-medium py-5 text-red-700' onClick={logout}>
                            <FontAwesomeIcon icon={faDoorOpen} className="text-lg mr-3" />
                            Log out
                        </div>
                    </div>
                ):(
                    <div className="py-3 px-6 mb-5 mt-10">
                        <Link to={'/login'}>
                            <div className='text-lg font-medium py-5 text-red-700'>
                                <FontAwesomeIcon icon={faDoorOpen} className="text-lg mr-3" />
                                Log In
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default Profile;