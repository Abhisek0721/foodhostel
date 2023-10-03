import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar, faHotel} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import userAddressAction from "../../redux/actions/userAddressAction";


const Home = ()=>{
    let navigate = useNavigate();
    let [roadName, setRoadName] = useState("Set Location");
    const userAddress = useSelector((state) => state.userAddressReducer);
    const token = useSelector((state) => state.userTokenReducer);
    const dispatch = useDispatch();
    let [pincode, setPincode] = useState(userAddress?.pincode);
    let [foodItems, setFoodItems] = useState([]);
    let [numOfRender, setNumOfRender] = useState(0);

    useEffect(()=>{
        // check auth
        if(token){
            // fetch location
            axios.get(`${process.env.REACT_APP_SERVER_URL}/address/getlocation/${token}`)
            .then((res)=>{
                if(res.data.status){
                    dispatch(userAddressAction(res.data?.location));
                    setPincode(res.data?.location?.pincode);
                    if(res.data?.location?.roadName){
                        setRoadName(res.data?.location?.roadName);
                    }
                }
            });
        }

        // fetch food items with respect to location
        axios.get(`${process.env.REACT_APP_SERVER_URL}/fooditem/showFoodItems?pincode=${pincode}`)
        .then((res)=>{
            if(res.data && numOfRender<2){
                setFoodItems(res?.data?.data);
            }
        });
        
    }, []);

    let filterFood = (category)=>{
        axios.get(
            `${process.env.REACT_APP_SERVER_URL}/fooditem/showFilteredFoodItems?pincode=${pincode}&category=${category}`
        )
        .then((res)=>{
            setFoodItems(res.data);
        });
    }

    const orderNow = (foodDetail)=>{
        // check auth
        if(token){
            return navigate('/order', { state : {foodDetail} });
        }else{
            return navigate('/checkout');
        }
    }

    return (
        <>
        <div className='relative top-16 p-8'>

            <div>
                <Link to={'/location'}>
                    <div className="location">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xl mr-3" />
                        <p className='text-sm font-semibold'>{roadName}</p>
                    </div>
                </Link>

                <div className="categories my-8">
                    <h1 className='text-lg font-semibold mb-4'>Top Categories</h1>
                    <a href="#availableFood"><button className='bg-red-400 px-2 py-1 mb-4 rounded-md block mx-auto active:bg-red-500' onClick={()=>setNumOfRender(0)}>Show All Categories</button></a>
                    <div className='flex justify-center'>
                        {/* Briyani */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Briyani')}>
                            <div className="item">
                                <img src={require('../img/categories/briyani.png')} alt="Briyani" />
                                <p className='text-center font-semibold'>Briyani</p>
                            </div>
                        </div>
                        </a>
                        {/* Pizza */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Pizza')}>
                            <div className="item">
                                <img src={require('../img/categories/pizza.png')} alt="Pizza" />
                                <p className='text-center font-semibold'>Pizza</p>
                            </div>
                        </div>
                        </a>
                        {/* Burger */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Burger')}>
                            <div className="item">
                                <img src={require('../img/categories/burger.png')} alt="Burger" />
                                <p className='text-center font-semibold'>Burger</p>
                            </div>
                        </div>
                        </a>
                    </div>

                    <div className='flex justify-center'>
                        {/* Rolls */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Rolls')}>
                            <div className="item">
                                <img src={require('../img/categories/roll.png')} alt="Rolls" />
                                <p className='text-center font-semibold'>Rolls</p>
                            </div>
                        </div>
                        </a>
                        {/* Sandwich */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Sandwich')}>
                            <div className="item">
                                <img src={require('../img/categories/sandwich.png')} alt="Sandwich" />
                                <p className='text-center font-semibold'>Sandwich</p>
                            </div>
                        </div>
                        </a>
                        {/* Sweets */}
                        <a href="#availableFood">
                        <div onClick={()=>filterFood('Sweets')}>
                            <div className="item">
                                <img src={require('../img/categories/sweets.png')} alt="Sweets" />
                                <p className='text-center font-semibold'>Sweets</p>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>


            <div className='available-food my-12 justify-center'>
                <h1 className='text-lg font-semibold mb-4' id='availableFood'>Available Foods</h1>
                {foodItems && (
                    foodItems.map((item)=>{
                        return (
                            <div id={item._id} key={item._id} onClick={()=>orderNow(item)}>
                                <div className='card'>
                                    <div className="food-img">
                                        <img src={`${process.env.REACT_APP_SERVER_URL}/static/foodimages/${item.imgName}`} alt="" />
                                    </div>
                                    <div className="detail px-4">
                                        <div className="flex justify-between">
                                            <p className='text-lg font-semibold w-44'>{item.foodName}</p>
                                            <div className="rating bg-green-600 flex px-1 rounded-md h-7">
                                                <p className='text-lg text-white place-self-center'>{item.foodRating}</p>
                                                <FontAwesomeIcon icon={faStar} className="text-sm place-self-center text-white ml-1" />
                                            </div>
                                        </div>
                                        <div className='des mt-3'>
                                            <div className='flex justify-between'>
                                                <span className='rating bg-red-100 p-2 rounded-md'>{item.foodCategory}</span>
                                                <span className='rating p-2 rounded-md'>Rs.{item.foodPrice} for 1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                {(foodItems.length === 0)?(
                    <div className='mx-4 mt-8 mb-20'>
                        <p className='text-lg text-center font-serif'>Food is not available at your location.</p>
                        <Link to={'/location'}><button className='bg-red-400 px-2 py-1 mt-4 rounded-md block mx-auto active:bg-red-500'><FontAwesomeIcon icon={faLocationDot} className="mr-2 ml-1" />Set Location</button></Link> 
                    </div>):<></>
                }
            </div>

        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default Home;