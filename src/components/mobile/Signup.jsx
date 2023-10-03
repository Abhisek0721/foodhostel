import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Signup = ()=>{
    const [value, setValue] = useState('') // value represent phone number
    const [formValues, setFormValues] = useState({'fname':'','lname':'','password':''});
    const [check, setCheck] = useState('on');
    let [failMsg,setFailMsg] = useState(false);

    let navigate = useNavigate();

    // checkFun() is for checking whether the user has agreeed the terms and condition
    function checkFun(){
        (check==='on')?(setCheck('off')):(setCheck('on'));
        let signupBtn = document.getElementById('signupBtn');
        if(check==='on'){
            if(formValues['fname']!='' && formValues['lname']!='' && value!=''){
                signupBtn.classList.remove('bg-slate-400');
                signupBtn.removeAttribute('disabled');
            }else{
                setCheck('off');
            }
        }else{
            signupBtn.classList.add('bg-slate-400');
            signupBtn.setAttribute('disabled','');
        }
    }

    const userSubmit = (e)=>{
        e.preventDefault();
        // Sending data to server
        try {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`,{
                "firstName" : formValues['fname'],
                "lastName" : formValues['lname'],
                "phoneNumber" : value,
                "password": formValues['password']
            }).then((res)=>{
                if(res?.data?.status){
                    return navigate('/verify', { state : {phoneNumber:value} });
                }
                setFailMsg(res?.data?.msg);
                // console.log(res.data.msg);
                if(res?.data?.message){
                    // Show message if phone number already exist in database
                    let failMsg = document.getElementById('fail-msg');
                    failMsg.classList.remove('hidden');
                    setTimeout(() => {failMsg.classList.add('hidden'); setFailMsg(false)}, 4000);
                }
            })
        } catch (error) {
            setFailMsg('Technical Issue! Try again later.');
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden'); setFailMsg(false)}, 4000);
        }

        // Resetting of Entry Field and formValues
        setFormValues({'fname':'','lname':'','password':''});
        setValue('');
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('phNum').value = '';
        document.getElementById('createPwd').value = '';

    }

    const togglePassword = ()=>{
        let pwd = document.getElementById('createPwd');
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

    return (
        <div className='rounded-md shadow-lg border-2 p-8 relative top-16'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <div>
                    <Link to={'/login'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            
            <form method="post" onSubmit={userSubmit}>
                <div className='mt-10 lg:w-[50%] lg:mx-auto'>
                    {/* Two hidden message */}
                    <p className='text-lg bg-red-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='fail-msg'>{failMsg}</p>
                    {/* End of Two hidden message */}
                    <input type="text" className="entryField" id='fname' onChange={ (e)=>{formValues['fname']=e.target.value; setFormValues({...formValues})} } placeholder='First Name' required/>
                    <input type="text" className="entryField" id='lname' onChange={ (e)=>{formValues['lname']=e.target.value; setFormValues({...formValues})} } placeholder='Last Name' required/>
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
                        <input type="password" id='createPwd' className='outline-none' onChange={ (e)=>{formValues['password']=e.target.value; setFormValues({...formValues})} } placeholder='Create Password' required/>
                        <span className='bg-slate-300 px-1 rounded-xl text-center' onClick={togglePassword}>
                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" id='eyeSlash' />
                            <FontAwesomeIcon icon={faEye} className="text-lg hidden" id='eye' />
                        </span>
                    </div>
                    <p className='text-sm font-mono my-5'>
                        <input type="checkbox" name="agreement" onChange={checkFun} id="agreement" className='scale-125' />
                        <label htmlFor="agreement" className='m-3'>I agree to FoodHostel's <a href="#" className='text-red-700 ml-2'>Terms of Service</a> and <a href="#" className='text-red-700 ml-2'>Privacy Policy</a>.</label>
                    </p>
                    <input type="submit" value={"Continue"} id='signupBtn' className="primary-btn bg-slate-400" disabled/>
                </div>
            </form>
            <div>
                <p className='text-center font-mono mt-5'>or</p>
                <p className='text-center font-semibold mt-5 h-20'>Already have an account?
                    <Link to={'/login'} className='text-red-700 ml-2'>Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;