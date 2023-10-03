import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const OTPverify = ()=>{
    const navigate = useNavigate();
    let [auth, setAuth] = useState(false);
    let loc = useLocation();

    useEffect(()=>{
        let input = document.getElementById('f1');
        input.focus();
    },[]);

    let handleChange = (e) => {
        let fieldName = e.target.name; // fetch value of name (eg. field-1)

        const nextfield = document.querySelector(
            `input[name=field-${Number(fieldName[6]) + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
            return nextfield.focus();
        }
      };

    const verify = async ()=>{
        let f1 = document.getElementById("f1").value;
        let f2 = document.getElementById("f2").value;
        let f3 = document.getElementById("f3").value;
        let f4 = document.getElementById("f4").value;
        let otpByUser = f1+f2+f3+f4;

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verifyOTP`,{
            'receivedOTP': otpByUser,
            'phoneNumber' : loc.state.phoneNumber,
        }).then((res)=>{
            if(res?.data?.status){
                navigate('/login');
            }
        }).catch((err)=> console.log(err))
        document.getElementById("f1").value = '';
        document.getElementById("f2").value = '';
        document.getElementById("f3").value = '';
        document.getElementById("f4").value = '';
    }

    // checkLoc will redirect if /verify endpoint haven't
    // redirected from signup or login page
    function checkLoc(){
        try {
            if(loc.state.phoneNumber){
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    return (
        <div className='rounded-md shadow-lg border-2 p-8 h-[80vh] relative top-16'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Verify OTP</h1>
                <div>
                    <Link to={'/signup'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            <p className="sub-title mt-4">
                Enter the OTP you received to (use 1111 as otp)
                <span className="phone-number">{(checkLoc())?loc.state.phoneNumber:<>?</>}</span>
            </p>
            <div className='mt-10 lg:w-[40%] lg:mx-auto'>
                <div className="wrapper">
                    <input type="text" name="field-1" id='f1' className="field 1" maxLength={"1"} onChange={handleChange}/>
                    <input type="text" name="field-2" id='f2' className="field 2" maxLength={"1"} onChange={handleChange}/>
                    <input type="text" name="field-3" id='f3' className="field 3" maxLength={"1"} onChange={handleChange}/>
                    <input type="text" name="field-4" id='f4' className="field 4" maxLength={"1"} onChange={handleChange}/>
                </div>
                <button className="resend">
                    Resend OTP
                </button>
                <input type="submit" value={"Verify"} onClick={()=>verify()} className="w-[100%] p-3 text-lg rounded-lg bg-green-600 active:bg-green-700 text-yellow-200 font-semibold" />
            </div>

        </div>
    );
}

export default OTPverify;