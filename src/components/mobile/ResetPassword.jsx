import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Header from './Header';
import { useNavigate } from "react-router-dom";


const ResetPassword = ()=>{
    let [password, setPassword] = useState('');
    let [value, setValue] = useState(''); // represent phone number
    let [failMsg, setFailMsg] = useState(null);
    let [otp, setOtp] = useState(null);
    const navigate = useNavigate();
    let [user, setUser] = useState({});

    const userSubmit = async (e)=>{
        e.preventDefault();
        let otpDiv = document.getElementById('otp');
        otpDiv.style.display = 'block';
        // Sending data to server
        try {
            await axios.post("/reset-password",{
                "phoneNumber" : value,
                "password": password
            }).then((res)=>{
                if(!res.data.redirect){
                    user.phoneNumber = res.data.phoneNumber;
                    user.password = res.data.password;
                    user.generatedOTP = res.data.generatedOTP;
                    setUser({...user});
                }
            });
        } catch (error) {
            setFailMsg('Technical Issue! Try again later.');
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden'); setFailMsg(false)}, 4000);
        }
    }

    const verifyOTP = (userOTP)=>{
        try {
            axios.post("/reset-password",{
                "otp" : userOTP,
                "generatedOTP" : user.generatedOTP,
                "phoneNumber" : user.phoneNumber,
                "password" : user.password,
            }).then((res)=>{
                if(res.data.redirect === true){
                    navigate('/login');
                }else{
                    setFailMsg(res.data.msg);
                    let failMsg = document.getElementById('fail-msg');
                    failMsg.classList.remove('hidden');
                    setTimeout(() => {failMsg.classList.add('hidden'); setFailMsg(false)}, 4000);
                }
            });
        } catch (error) {
            setFailMsg('Technical Issue! Try again later.');
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden'); setFailMsg(false)}, 4000);
        }
    }

    const togglePassword = ()=>{
        let pwd = document.getElementById('newPwd');
        let eye = document.getElementById('show');
        let eyeSlash = document.getElementById('hide');
        if(pwd.type === 'password'){
            pwd.type = 'text';
            eye.classList.remove('hidden');
            eyeSlash.classList.add('hidden');
        }else{
            pwd.type = 'password';
            eyeSlash.classList.remove('hidden');
            eye.classList.add('hidden');
        }
    }

    return (
        <>
        {(window.innerWidth<=800)?<></>:<Header />}
        <div className='border-2 p-8 relative top-16 h-[100vh]'>
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">Reset Password</h1>
                <div>
                    <Link to={'/login'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            
            <form method="post" onSubmit={userSubmit} className="lg:w-[60%] mx-auto">
                <div className='mt-10 lg:w-[50%] lg:mx-auto'>
                    {/* Two hidden message */}
                    <p className='text-lg bg-red-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='fail-msg'>{failMsg}</p>
                    {/* End of Two hidden message */}
                    <PhoneInput defaultCountry='IN'
                        className='entryField'
                        placeholder="Phone Number"
                        value={value}
                        onChange={setValue}
                        id="phNum"
                        focusInputOnCountrySelection={false}
                        required
                    />
                    <div className="flex entryField justify-between">
                        <input type="password" id='newPwd' className='outline-none' onChange={e=>setPassword(e.target.value)} placeholder='Create New Password' required/>
                        <span className='bg-slate-300 px-1 rounded-xl text-center' onClick={togglePassword}>
                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" id='hide' />
                            <FontAwesomeIcon icon={faEye} className="text-lg hidden" id='show' />
                        </span>
                    </div>
                    <input type="submit" value={"Send OTP"} id='signupBtn' className="primary-btn"/>
                </div>
            </form>

            <div className='mx-auto font-semibold mt-10 h-20 lg:w-[50%]' id='otp' style={{'display':'none'}}>
                <input type="text" name="otp" onChange={(e)=>setOtp(e.target.value)} className='outline-none entryField text-center' placeholder='Enter OTP (XXXX)' required/>
                <input type="button" onClick={()=>verifyOTP(otp)} value="Verify" className='w-[100%] p-3 text-lg rounded-lg bg-green-700 hover:bg-green-800 active:bg-green-600 text-yellow-200 font-semibold lg:cursor-pointer lg:py-1' />
            </div>
    
            <div className='mx-auto font-semibold mt-20 h-20'>
                <p className='text-center font-mono'>or</p>
                <p className='text-center font-semibold mt-5 h-20'>Know Your Password ?
                    <Link to={'/login'} className='text-red-700 ml-2'>Log in</Link>
                </p>
            </div>
        </div>
        </>
    )
}

export default ResetPassword;