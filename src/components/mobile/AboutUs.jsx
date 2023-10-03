import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons' 

const AboutUs = ()=>{

    return (
        <>
        <div className='rounded-md shadow-lg border-2 relative top-16'>
            <div className='mt-10'>
                <section className="aboutus">
                    <h1 className="mb-5 font-semibold text-xl sm:text-3xl">Who Are We?</h1>
                    <div className='flex flex-col-reverse lg:flex-row'>
                        <p className='text-lg lg:w-[70%] text-justify'>
                            Our Story begins with the needs of ours. We were living in rural area where
                            online food delivery system was unavailable. So, We decided to launch foodhostel.com.
                            Foodhostel focuses students who lives in Hostels and PGs.
                            We acts as a platform that connects customers with restaurant partners.
                            We focus on providing facilities to hostelers so that they will never need to
                            adjust with the limited food items provided in Canteen or Mess.
                        </p>
                        <div>
                            <img className='mb-5 lg:mb-0' src={require('../img/food-delivery.png')} alt="" />
                        </div>
                    </div>
                </section>

                <section className="aboutus mt-20">
                    <h1 className="mb-5 font-semibold text-xl sm:text-3xl">Our Vision</h1>
                    <div className='flex flex-col-reverse lg:flex-row'>
                        <p className='text-lg lg:w-[80%] text-justify'>
                            Our Moto is to provide best food next to door step of hostelers
                            in expected time range. We give power to the customers to have varities of food options.
                            We tries to provide varieties of food items (like Chole Bhature, Briyani, Aloo Samosa, Dosa, Sambar) which includes
                            popular nortern foods, north-eastern foods, western foods, and southern foods.
                        </p>
                        <div>
                            <img src={require('../img/business.jpg')} alt="" />
                        </div>
                    </div>
                </section>

                <section className="aboutus mt-20 mb-20">
                    <h1 className="mb-10 font-semibold text-xl sm:text-3xl">Our Leadership</h1>
                    <div className='flex flex-col lg:flex-row justify-around mt-5'>
                        {/* Ashish Tiwari */}
                        <div className='bg-slate-700 w-[310px] mx-auto rounded-md px-2 py-3 mt-5 lg:w-[300px]'>
                            <div>
                                <img className='rounded-md w-[100%] h-[350px]' src={require('../img/Co-Founders/Ashish.jpg')} alt="" />
                            </div>
                            <div className="max-w-4xl h-44 p-4 text-gray-800 bg-white rounded-b-lg shadow">
                                <div className="mb-2">
                                    <div className="h-2 text-3xl text-left text-gray-600">“</div>
                                    <p className="px-4 text-[16px] text-center text-gray-800">
                                        A successful business is not just about making a profit, but about solving real problems.
                                    </p>
                                    <div className="h-2 text-3xl text-right text-gray-600">”</div>
                                </div>
                                <div className='text-[17px] text-center font-semibold mt-3 ml-4'>
                                    Ashish Tiwari
                                </div>
                                {/* <div className='text-center text-sm mb-3'>( CEO )</div> */}
                            </div>
                            <div className='flex justify-evenly pt-5 pb-3'>
                                <a href="https://www.instagram.com/ashish_10_tiwari_/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="text-2xl text-white" /></a>
                                <a href="https://www.linkedin.com/in/ashish-tiwari-00585b240" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="text-2xl text-white" /></a>
                            </div>
                        </div>

                        {/* Abhisekh Upadhaya */}
                        <div className='bg-slate-700 w-[310px] mx-auto rounded-md px-2 py-3 mt-5 lg:w-[300px]'>
                            <div>
                                <img className='rounded-md w-[100%] h-[350px]' src={require('../img/Co-Founders/Abhisekh.jpg')} alt="" />
                            </div>
                            <div className="max-w-4xl h-44 p-4 text-gray-800 bg-white rounded-b-lg shadow">
                                <div className="mb-2">
                                    <div className="h-2 text-3xl text-left text-gray-600">“</div>
                                    <p className="px-4 text-[16px] text-center text-gray-800">
                                        When I feel I can't do it, I take it as an opportunity to learn how to do it.
                                    </p>
                                    <div className="h-2 text-3xl text-right text-gray-600">”</div>
                                </div>
                                <div className='text-[17px] text-center font-semibold mt-3 ml-4'>
                                    Abhisekh Upadhaya
                                </div>
                                {/* <div className='text-center text-sm mb-3'>( CTO )</div> */}
                            </div>
                            <div className='flex justify-evenly pt-5 pb-3'>
                                <a href="https://www.instagram.com/abhisekupa/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="text-2xl text-white" /></a>
                                <a href="https://www.linkedin.com/in/abhisekh-upadhaya-5208a3165/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="text-2xl text-white" /></a>
                            </div>
                        </div>
                        
                        {/* Vashu Choudhary */}
                    </div>
                </section>
            </div>

            <footer className='mb-20 lg:mb-4'>
                <p className="text-black font-bold text-center mt-20">
                    &copy;
                    <Link to={'/'}>
                        Food Hostel
                    </Link>
                </p>
            </footer>
        </div>
        {(window.innerWidth<=800)?<Navbar />:<></>}
        </>
    )
}

export default AboutUs;