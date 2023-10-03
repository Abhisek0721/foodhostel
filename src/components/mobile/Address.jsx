import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link , useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import { useEffect } from 'react';


const Address = ()=>{
    const navigate = useNavigate();
    const token = useSelector((state) => state.userTokenReducer);
    const address = useSelector((state) => state.userAddressReducer);

    useEffect(()=> {
        // check auth
        if(!token){
            navigate('/checkout');
        }
    }, []);
    
    return (
        <>
        <div className='rounded-md shadow-lg border-2 p-8 relative top-16 min-h-screen'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Address</h1>
                <div>
                    <Link to={'/'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            
            <div className='mt-10 overflow-y-auto'>
                <div className="p-3 lg:flex">
                    <div className='mb-10 lg:w-[30%] lg:mr-5'>
                        <p className='font-semibold'>
                            {address.buildingName}, {address.roadName}, {address.city}, {address.state} - {address.pincode}
                        </p>
                    </div>
                </div>
                <Link to={'/location'}><button className='bg-red-700 text-white font-semibold text-lg float-right rounded-md px-4 py-1 mb-14 mt-7'>Edit</button></Link>
            </div>
        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default Address;