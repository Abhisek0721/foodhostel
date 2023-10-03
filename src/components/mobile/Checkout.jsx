import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 

const Checkout = ()=>{

    return (
        <>
        <div className='rounded-md p-8 relative top-16'>
            <div className="flex justify-between">
                <Link to={'/'}><FontAwesomeIcon icon={faAngleLeft} className="text-2xl" /></Link>
            </div>
            <div className='flex flex-col justify-center mt-14'>
                <h1 className="text-xl text-center font-bold">Checkout</h1>
                <div className='w-[300px] mx-auto'>
                    <img className='w-[100%]' src={require('../img/food-delivery.png')} alt="" />
                </div>
                <h2 className='text-xl text-center font-semibold mt-10'>Guest Mode</h2>
                <div className='mt-2 text-center'>
                    You are in Guest Mode.<br></br>
                    Please login to order delicious foods.
                </div>
                <div className='mt-3 mx-auto'>
                    <Link to={'/login'}><button className='bg-red-700 active:bg-red-600 text-white font-semibold text-lg mx-auto rounded-md px-4 py-1'>Login</button></Link>
                </div>
            </div>

            <footer className='lg:mb-4 mt-32'>
                <p className="text-black font-bold text-center">
                    &copy;
                    <Link to={'/'}>
                        Food Hostel
                    </Link>
                </p>
            </footer>
        </div>
        </>
    )
}

export default Checkout;