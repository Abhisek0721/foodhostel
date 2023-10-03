import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faAddressBook, faChartColumn, faWallet } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodItems from './FoodItems';
import FoodOrderList from './FoodOrderList';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const DashboardNav = ()=>{
    const navigate = useNavigate();
    const [divSection, setDivSection] = useState(<FoodOrderList />);
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

        // check seller existance
        axios.post('/seller',{
            "token" : token
        }).then((res)=>{
            if(!res.data.redirect){
                // if redirect is true, then seller account exist. so, no need to redirect to home page.
                navigate('/');
            }
        });
    },[]);

    const renderDiv = (id)=>{
        // let divSec = document.getElementById("divSec");
        if(id === "FoodOrderList"){
            setDivSection(<FoodOrderList />);
            // divSec.removeChild(<FoodItems />);
            // divSec.appendChild(<FoodOrderList />);
        }else{
            setDivSection(<FoodItems />);
            // divSec.removeChild(<FoodOrderList />);
            // divSec.appendChild(<FoodItems />);
        }
    }

    return (
        <div className='mt-16 flex'>
            <nav className='flex flex-col bg-red-700 px-10 py-4 shadow-lg justify-evenly z-10 h-[90vh] w-[20%] fixed'>
                <div id='FoodOrderList' onClick={()=>renderDiv("FoodOrderList")} className="text-white font-semibold hover:text-red-200 active:text-red-300 hover:cursor-pointer"><FontAwesomeIcon  icon={faAddressBook} className="text-xl mr-3" /> Food Orders</div>
                <div id='FoodItems' onClick={()=>renderDiv('FoodItems')} className="text-white font-semibold hover:text-red-200 active:text-red-300 hover:cursor-pointer"><FontAwesomeIcon  icon={faBowlFood} className="text-xl mr-3" />Food Items</div>
                <div id='Revenue' onClick={()=>renderDiv('Revenue')}  className="text-white font-semibold hover:text-red-200 active:text-red-300 hover:cursor-pointer"><FontAwesomeIcon  icon={faChartColumn} className="text-xl mr-3" /> Revenue</div>
                <div id='Wallet' onClick={()=>renderDiv('Wallet')}  className="text-white font-semibold hover:text-red-200 active:text-red-300 hover:cursor-pointer"><FontAwesomeIcon  icon={faWallet} className="text-xl mr-3" /> Wallet</div>
            </nav>

            <div id='divSec' className='w-[80%] ml-[20%]'>
                {divSection}
            </div>
        </div>
    );
}

export default DashboardNav;