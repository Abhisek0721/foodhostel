import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header = ()=>{
    return (
        <div className="flex py-4 px-8 justify-between shadow-lg z-10 fixed w-[100%] bg-red-700">
            <div className="logo-mobile">
                Foodhostel.com
            </div>
            <div>
                <Link to={'/profile'}><FontAwesomeIcon icon={faCircleUser} className="text-3xl text-white cursor-pointer" /></Link>
            </div>
        </div>
    )
}

export default Header;