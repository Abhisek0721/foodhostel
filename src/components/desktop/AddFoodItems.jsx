import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faAddressBook, faChartColumn, faWallet, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AddFoodItems = ()=>{
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [msg, setMsg] = useState(null);
    let [token, setToken] = useState(null);
    let [location, setLocation] = useState({});
    let [restroName, setRestroName] = useState(null);
    const [foodDetails, setFoodDetails] = useState({'foodName':'','foodCategory':'Briyani','foodPrice':''});

    useEffect(()=>{
        // check auth
        const token = localStorage.getItem('token');
        if(token){
            const user = jwtDecode(token);
            if (!user) {
                navigate('/login');
            }else{
                // fetch location
                axios.post('/checklocation',{
                    "token": token
                }).then((res)=>{
                    setLocation(res.data);
                });
                setToken(token);
            }
        }else{
            navigate('/checkout');
        }

        // check seller existance
        axios.post('/seller',{
            "token":token
        }).then((res)=>{
            if(!res.data.redirect){
                // if redirect is true, then seller account exist. so, no need to redirect to home page.
                navigate(`/dashboard`);
            }else{
                setRestroName(res.data.restroName);
            }
        });
    },[]);

    const addFoodItem = async (e)=>{
        e.preventDefault();
        // if image size is less than 700KB
        if(selectedImage.size<500000){
            console.log(selectedImage);
            try {
                // Uploading food image and its details
                await axios.post("/addFood", {
                    ...foodDetails,
                    'restroName':restroName,
                    selectedImage,
                    'token': token,
                    ...location
                },{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res)=>{
                    if(res.data.redirect === true){
                        navigate(`/dashboard`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }else{
            setMsg("Image Size should be less than 700KB.")
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden')}, 4000);
        }
    }

    const checkBeverage = (category)=>{
        let beverageVolume = document.getElementById("volume");
        if(category === "Beverage"){
            beverageVolume.style.display = "block";
        }else{
            beverageVolume.style.display = "none";
        }
    }

    return (
        <div className='mt-16 flex'>

            <nav className='flex flex-col bg-red-700 px-10 py-4 shadow-lg justify-evenly z-10 h-[90vh] w-[20%] fixed'>
                <Link to={''} className="text-white font-semibold hover:text-red-200 active:text-red-300"><FontAwesomeIcon  icon={faAddressBook} className="text-xl mr-3" /> Food Orders</Link>
                <Link to={''} className="text-white font-semibold hover:text-red-200 active:text-red-300"><FontAwesomeIcon  icon={faBowlFood} className="text-xl mr-3" /> Food Items</Link>
                <Link to={''} className="text-white font-semibold hover:text-red-200 active:text-red-300"><FontAwesomeIcon  icon={faChartColumn} className="text-xl mr-3" /> Revenue</Link>
                <Link to={''} className="text-white font-semibold hover:text-red-200 active:text-red-300"><FontAwesomeIcon  icon={faWallet} className="text-xl mr-3" /> Wallet</Link>
            </nav>

            <div className='w-[80%] ml-[20%] p-8'>

                <div className="flex justify-between" id='addItem'>
                    <h1 className="text-2xl font-bold">Add Food Item</h1>
                    <div>
                        <Link to={'/dashboard'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                    </div>
                </div>
            
                <form method="post" encType="multipart/form-data" onSubmit={addFoodItem}>
                    <div className='mt-10 lg:w-[50%] lg:mx-auto'>
                        {selectedImage && (
                            <div className='my-10'>
                                <img alt="Selected Food Image" className='w-[250px] h-auto rounded-md' src={URL.createObjectURL(selectedImage)} />
                                {/* <button className='mt-5 bg-red-600 px-5 py-1 text-yellow-200 rounded-md' onClick={()=>setSelectedImage(null)}>Remove</button> */}
                            </div>
                        )}
                        {/* Two hidden message */}
                        <p className='text-lg bg-red-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='fail-msg'>{msg}</p>
                        {/* End of Two hidden message */}
                        <label htmlFor="foodImg" className='text-md ml-2'>Upload Food Image :</label>
                        <input type="file" onChange={(e)=>{setSelectedImage(e.target.files[0])}} className='entryField' name="foodImg" id="foodImg" accept="image/*" required />
                        <input type="text" name="foodName" onChange={ (e)=>{foodDetails.foodName = e.target.value; setFoodDetails({...foodDetails})} } className='entryField' id='foodName' placeholder='Food Name' required/>
                        <label htmlFor="foodCategory" className='text-md ml-2'>Select Category :</label>
                        <select name="foodCategory" onChange={ (e)=>{foodDetails.foodCategory = e.target.value; setFoodDetails({...foodDetails}); checkBeverage(e.target.value);} } className='entryField' id='foodCategory' placeholder='Food Category' required>
                            <option value="Briyani">Briyani</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Sweets">Sweets</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Others">Others</option>
                        </select>
                        <input type="number" name="beverageVolume" onChange={ (e)=>{foodDetails.beverageVolume = e.target.value; setFoodDetails({...foodDetails})} } className='entryField' style={{"display":"none"}} id='volume' placeholder='Volume (in ml)' />
                        <input type="number" name="foodPrice" onChange={ (e)=>{foodDetails.foodPrice = e.target.value; setFoodDetails({...foodDetails})} } className='entryField' id='foodPrice' placeholder='Price for 1 (in INR)' required />
                        <input type="submit" value={"Add Food Item"} className="primary-btn"/>
                    </div>
                </form>

            </div>

        </div>
    );
}

export default AddFoodItems;