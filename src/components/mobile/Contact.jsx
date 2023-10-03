import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';


const Contact = ()=>{
    const [formValues, setFormValues] = useState({'name':'','email':'','message':''});

    function contactSubmit(e){
        e.preventDefault();
        // Sending data to server
        try {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/contact/sendMessage`,{
                "name" : formValues['name'],
                "email" : formValues['email'],
                "message" : formValues['message']
            })
            let successMsg = document.getElementById('success-msg');
            successMsg.classList.remove('hidden');
            setTimeout(() => {successMsg.classList.add('hidden');}, 4000);
        } catch (error) {
            let failMsg = document.getElementById('fail-msg');
            failMsg.classList.remove('hidden');
            setTimeout(() => {failMsg.classList.add('hidden');}, 4000);
        }

        // Resetting of Entry Field and formValues
        setFormValues({'name':'','email':'','message':''});
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('msg').value = '';
    }
    

    return (
        <>
        <div className='rounded-md shadow-lg border-2 p-8 h-[80vh] relative top-16 min-h-screen'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Contact Us</h1>
                <div>
                <Link to={'/'}><FontAwesomeIcon icon={faXmark} className="text-3xl" /></Link>
                </div>
            </div>
            
            <form method="post" onSubmit={contactSubmit}>
                <div className='mt-10 lg:w-[30%] lg:mx-auto'>
                    {/* Two hidden message */}
                    <p className='text-lg bg-green-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='success-msg'>Message has been sended successfully!</p>
                    <p className='text-lg bg-red-700 text-white text-center my-3 rounded-md transition duration-700 ease-in-out hidden' id='fail-msg'>Failed to send message! Try again later.</p>
                    {/* End of Two hidden message */}
                    <input type="text" name="nameInput" className='entryField' id='name' placeholder='Name' onChange={(e)=>{ formValues['name']=e.target.value; setFormValues({...formValues}) }} required/>
                    <input type="email" name="emailInput" className='entryField' id='email' placeholder='Email' onChange={(e)=>{ formValues['email']=e.target.value; setFormValues({...formValues})  }} required/>
                    <label htmlFor="msg" className='text-lg font-semibold'>Message :</label>
                    <textarea name="msgInput" id="msg" cols="30" rows="4"  className='entryField max-h-40 min-h-40' onChange={(e)=>{ formValues['message']=e.target.value; setFormValues({...formValues}) }} required></textarea>
                    <input type="submit" value={"Send"} className="primary-btn"/>
                </div>
            </form>
        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default Contact;