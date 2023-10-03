import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faStar, faHeart, faMinusSquare, faPlusSquare, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useSelector } from "react-redux";

const Order = ()=>{
    let loc = useLocation();
    const navigate = useNavigate();
    const location = useSelector((state) => state.userAddressReducer);
    const token = useSelector((state) => state.userTokenReducer);
    let [qty, setQty] = useState(1);
    let [beverageDetail, setBeverageDetail] = useState({});
    let [totalPrice , setTotalPrice] = useState(loc.state.foodDetail.foodPrice*qty);
    let [addedItems, setAddedItems] = useState([]);
    let [addMoreClicked, setAddMoreClicked] = useState(false);

    useEffect(()=>{
        // check auth
        // check auth
        if (!token) {
            navigate("/checkout");
        }
    },[]);
      
    const createOrder = async ()=>{
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/foodorder/createOrder`, {
            "sessionId": token,
            "foodName": loc.state.foodDetail.foodName,
            "foodPrice": totalPrice,
            "qty": qty,
            "sellerId": loc.state.foodDetail.sellerId,
            "foodId": loc.state.foodDetail._id,
            "addedItems": [],
            "deliveryAddress": location
          }).then((res)=>{
            if(res.data.status) {
                window.location.href = res.data.redirect;
            }
        });
    }

    const addToFav = async ()=>{
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/favourite/addToFavourite`, {
            'sessionId': token,
            'foodName':loc.state.foodDetail.foodName,
            'foodId': loc.state.foodDetail._id
        }).then((res)=>{
            if(res.data?.status){
                navigate('/favourite');
            }
        });
    }


    const changeQty = (sign)=>{
        if(addMoreClicked === false){
            if(sign === "+"){
                setQty(++qty);
                setTotalPrice((loc.state.foodDetail.foodPrice)*qty);
            }else{
                if(qty !== 1){
                    setQty(--qty);
                    setTotalPrice((loc.state.foodDetail.foodPrice)*qty);
                }
            }
        }
    }

    return (
        <>
        <div className='rounded-md p-8 relative top-16'>
            <div id='order-container'>
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Order Now</h1>
                    <div>
                        <Link to={'/'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                    </div>
                </div>

                <div className='mt-10'>
                    <h3 className='text-center font-semibold text-lg'>Total : Rs.{totalPrice}</h3>
                    <div className="p-3 lg:flex">
                        <div id={loc.state.foodDetail.foodId} className="mx-auto">
                        <FontAwesomeIcon icon={faHeart} onClick={()=>addToFav()} className="text-lg hover:cursor-pointer float-right bg-slate-400 p-2 rounded-full text-red-600 place-self-center ml-1" />
                            <div className='card'>
                                <div className="food-img">
                                    <img className='h-56 mx-auto' src={`${process.env.REACT_APP_SERVER_URL}/static/foodimages/${loc.state.foodDetail.imgName}`} alt="" />
                                </div>
                                <div className="detail px-4">
                                    <div className="flex justify-between">
                                        <p className='text-lg font-semibold w-44'>{loc.state.foodDetail.foodName}</p>
                                        <div className="rating bg-green-600 flex px-1 rounded-md h-7">
                                            <p className='text-lg text-white place-self-center'>{loc.state.foodDetail.foodRating}</p>
                                            <FontAwesomeIcon icon={faStar} className="text-sm place-self-center text-white ml-1" />
                                        </div>
                                    </div>
                                    <div className='des mt-3'>
                                        <div className='flex justify-between'>
                                            <span className='rating bg-red-100 p-2 rounded-md'>{loc.state.foodDetail.foodCategory}</span>
                                            <span className='rating p-2 rounded-md'>Rs.{loc.state.foodDetail.foodPrice*qty} for {qty}</span>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <span className='rating p-2 rounded-md'>Qty : {qty}</span>
                                            <span className='rating p-2 rounded-md'>
                                                <FontAwesomeIcon icon={faMinusSquare} onClick={()=>changeQty("-")} className="text-2xl active:text-red-800 rounded-sm text-red-600 hover:cursor-pointer mr-1" />
                                                <FontAwesomeIcon icon={faPlusSquare}  onClick={()=>changeQty("+")} className="text-2xl active:text-red-800 rounded-sm text-red-600 hover:cursor-pointer ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-around lg:justify-evenly'>
                        <button onClick={()=>createOrder()} className='bg-green-700 active:bg-green-700 text-white font-semibold text-lg float-right rounded-md px-4 py-1 mt-7'>Order Now</button>
                    </div>
                </div>
            </div>

        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default Order;