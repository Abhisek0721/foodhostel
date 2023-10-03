import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocation} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';


const JoinusD = ()=>{
    const navigate = useNavigate();
    let [token, setToken] = useState(null);
    const [sellerDetails, setSellerDetails] = useState({'restroName':'','pincode':'','city':'','roadName':''});

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

        // check seller existance
        axios.post('/seller',{
            "token" : token
        }).then((res)=>{
            if(res.data.redirect === true){
                navigate(`/dashboard`);
            }
        });
    },[]);

    const saveSellerDetails = (e)=>{
        e.preventDefault();

        // Sending data to server
        try {
            axios.post("/joinus",{
                "token" : token,
                "restroName": sellerDetails.restroName,
                "pincode": sellerDetails.pincode,
                "city": sellerDetails.city,
                "roadName": sellerDetails.roadName
            }).then((res)=>{
                if(res.data.redirect === true){
                    navigate('/');
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='rounded-md shadow-lg border-2 p-8 h-[80vh] relative top-16 overflow-y-scroll'>

            <div className="flex justify-between mb-5">
                <p className="text-sm font-bold">Fill Your Restaurant Details</p>
                <div>
                    <Link to={'/'}><FontAwesomeIcon icon={faXmark} className="text-xl" /></Link>
                </div>
            </div>

            <form method="post" onSubmit={saveSellerDetails}>
                <div className='mt-5 lg:w-[50%] lg:mx-auto'>
                <input type="text" className="entryField" id='restroName' placeholder='Restaurant Name' onChange={ (e) => {sellerDetails.restroName=e.target.value; setSellerDetails({...sellerDetails})} } required/>
                    <input type="text" className="entryField" id='pincode' placeholder='Pin Code' onChange={ (e) => {sellerDetails.pincode=e.target.value; setSellerDetails({...sellerDetails})} } required/>
                    <input type="text" className="entryField" id='city' placeholder='City' onChange={ (e) => {sellerDetails.city=e.target.value; setSellerDetails({...sellerDetails})} } required/>
                    <input type="text" className="entryField" id='roadName' placeholder='Road Name, Area' onChange={ (e) => {sellerDetails.roadName=e.target.value; setSellerDetails({...sellerDetails})} } required/>
                    <input type="submit" value={"Join Us"} id='signupBtn' className="primary-btn"/>
                </div>
            </form>

        </div>
    )
}

export default JoinusD;