import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const FoodItems = ()=>{
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState(null);
    let [token, setToken] = useState(null);

    useEffect(()=>{
        // check auth
        const token = localStorage.getItem('token');
        if(token){
            const user = jwtDecode(token);
            if (!user) {
                navigate('/login');
            }else{
                setToken(token);
            }
        }else{
            navigate('/checkout');
        }

        // check seller's food items
        axios.post('/sellerFoods',{
            'token' : token
        }).then((res)=>{
            if(res.data){
                setFoodItems(res.data);
            }
        });
    },[]);

    const deleteItem = (foodId)=>{
        try {
            axios.post("/deleteFood",{
                'token':token,
                'foodId':foodId
            }).then((res)=>{
                if(res.data.refresh){
                    navigate('/joinus');
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mb-24 p-10 h-[90%]'>
        <h1 className='text-lg font-semibold mb-4'>Food Items</h1>

            <div className='ml-10 mt-5'>
                {foodItems && (
                    foodItems.map((item)=>{
                        return(
                            <div key={item.foodId} className='card border-2 border-black'>
                                <div className='flex justify-end' id={item.foodId}  onClick={(e)=>deleteItem(item.foodId)} >
                                    <FontAwesomeIcon icon={faTrash} className="text-md m-3 float-right p-1 rounded-sm bg-red-700 text-white ml-1 hover:bg-red-900 hover:cursor-pointer active:bg-red-600" />
                                </div>

                                <div className="food-img">
                                    <img src={`https://restro.foodhostel.com/static/media/${item.imgName}`} className="h-44 mx-auto" alt="" />
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
                                    <div className='des mt-3'>
                                        <div className='flex justify-between'>
                                            <span className='rating p-2 rounded-md'>Food Id : </span>
                                            <span className='rating p-2 rounded-md'>{item.foodId}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <Link to={'/addFoodItems'}><button className='bg-red-700 hover:bg-red-800 active:bg-red-600 text-yellow-200 font-semibold text-lg float-right rounded-md px-4 py-1 mb-14 mt-7'>Add Food Item</button></Link>
        </div>
    );
}

export default FoodItems;