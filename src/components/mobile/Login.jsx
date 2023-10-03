import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import 'react-phone-number-input/style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = ()=>{
    const [value, setValue] = useState();
    const [password, setPassword] = useState();
    let [auth, setAuth] = useState(false);
    let [token, setToken] = useState(null);
    let [msg, setMsg] = useState(false);

    const togglePassword = ()=>{
        let pwd = document.getElementById('Pwd');
        let eye = document.getElementById('eye');
        let eyeSlash = document.getElementById('eyeSlash');
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

    const login = async (e) => {
        e.preventDefault();
        // Sending data to server
        try {
            const loginResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`,{
                "phoneNumber" : value,
                'password' : password
            }).then((res)=>{
                setAuth(res?.data?.auth);
                setToken(res?.data?.sessionId);
                setMsg(res?.data?.message);
            }).catch((err)=> {
                setAuth(err?.response?.data?.auth);
                setMsg(err?.response?.data?.message);
            });
        } catch (error) {
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden')}, 4000);
        }
    }

    if(auth===true){
        localStorage.setItem('token',token);
        // Resetting of Entry Field and formValues
        setValue('');
        setPassword('');
        document.getElementById('phNum').value = '';
        document.getElementById('Pwd').value = '';
        window.location.href = '/';
    }
    if(msg){
        let failMsg = document.getElementById('fail-msg');
        failMsg.classList.remove('hidden');
        setTimeout(() => {failMsg.classList.add('hidden'); setMsg(false)}, 4000);
    }

    return (
        <>
        <div className='p-8 relative top-16'>
            {/* <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Log in</h1>
                <div>
                <a href='/'><FontAwesomeIcon icon={faXmark} className="text-3xl" /></a>
                </div>
            </div> */}
            <div className='mt-2'>
                <Link to={'/'}><img src={require('../img/logo192.png')} className="mx-auto" width={150} alt="" /></Link>
            </div>
            
            <form method='post' onSubmit={(e)=>login(e)} className='mt-5 lg:w-[50%] lg:mx-auto'>
                {/* Two hidden message */}
                <p className='text-lg bg-red-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='fail-msg'>{msg}</p>
                {/* End of Two hidden message */}
                <PhoneInput defaultCountry='IN'
                    className='entryField'
                    placeholder="Phone Number"
                    value={value} 
                    onChange={setValue}
                    id='phNum'
                    required
                />
                <div className="flex entryField justify-between">
                    <input type="password" id='Pwd' className='outline-none' onChange={ (e)=>{setPassword(e.target.value)} } placeholder='Password' required/>
                    <span className='bg-slate-300 px-1 rounded-xl text-center float-right' onClick={togglePassword}>
                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg" id='eyeSlash' />
                        <FontAwesomeIcon icon={faEye} className="text-lg hidden" id='eye' />
                    </span>
                </div>
                <input type="submit" value={"Continue"} className="primary-btn" />
            </form>

            <p className='text-center font-semibold mt-10 text-sm'>Forgotten Password ?
                <Link to={'/resetPassword'} className='text-red-700 ml-2'>Reset Password</Link>
            </p>

            <div>
                <p className='text-center font-mono my-3'>or</p>
                <p className='text-center font-semibold mb-5'>New to FoodHostel?
                    <Link to={'/signup'} className='text-red-700 ml-2'>Create account</Link>
                </p>
            </div>
        </div>
        </>
    )
}

export default Login;