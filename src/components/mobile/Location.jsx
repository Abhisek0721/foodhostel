import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLocation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { checkToken } from "../../utils/managetoken";
// import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";
import userAddressAction from "../../redux/actions/userAddressAction";

const Location = () => {
  let navigate = useNavigate();
  const userAddress = useSelector((state) => state.userAddressReducer);
  const token = useSelector((state) => state.userTokenReducer);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(userAddress);

  useEffect(() => {
    // check auth
    if (!token) {
      navigate("/checkout");
    }
  }, []);

  const saveAddress = (e) => {
    e.preventDefault();
    console.log(address);
    // Sending data to server
    try {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/address/setlocation`, {
          sessionId: token,
          pincode: address.pincode,
          state: address.state,
          city: address.city,
          buildingName: address.buildingName,
          roadName: address.roadName,
        })
        .then((res) => {
            if(res.data.status) {
                dispatch(userAddressAction(address));
            }
            navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="rounded-md shadow-lg border-2 p-8 min-h-screen relative top-16 overflow-y-scroll">
        <div className="flex justify-between mb-5">
          <p className="text-sm font-bold">Delivery Location</p>
          <div>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </Link>
          </div>
        </div>

        {/* <div onClick={()=>checkApi()} className="active:bg-red-200 rounded-md p-1 mx-auto hover:cursor-pointer">
                <div className="detect-location">
                    <FontAwesomeIcon icon={faLocation} className="text-xl text-red-700 mr-3  mt-2" />
                    <div>
                        <p className='text-red-700 text-lg'>Detect Current Location</p>
                        <p className='text-slate-500 text-sm'>Using GPS</p>
                    </div>
                </div>
            </div> */}

        <form method="post" onSubmit={saveAddress}>
          <div className="mt-5 lg:w-[50%] lg:mx-auto">
            <input
              type="text"
              className="entryField"
              value={address?.pincode}
              id="pincode"
              placeholder="Pin Code"
              onChange={(e) => {
                address.pincode = e.target.value;
                setAddress({ ...address });
              }}
              required
            />
            <input
              type="text"
              className="entryField"
              value={address?.state}
              id="state"
              placeholder="State"
              onChange={(e) => {
                address.state = e.target.value;
                setAddress({ ...address });
              }}
              required
            />
            <input
              type="text"
              className="entryField"
              value={address?.city}
              id="city"
              placeholder="City"
              onChange={(e) => {
                address.city = e.target.value;
                setAddress({ ...address });
              }}
              required
            />
            <input
              type="text"
              className="entryField"
              value={address?.buildingName}
              id="buildingName"
              placeholder="House No., Building Name"
              onChange={(e) => {
                address.buildingName = e.target.value;
                setAddress({ ...address });
              }}
              required
            />
            <input
              type="text"
              className="entryField"
              value={address?.roadName}
              id="roadName"
              placeholder="Road Name, Area, Village"
              onChange={(e) => {
                address.roadName = e.target.value;
                setAddress({ ...address });
              }}
              required
            />
            <input
              type="submit"
              value={"Save Address"}
              id="signupBtn"
              className="primary-btn"
            />
          </div>
        </form>
      </div>
      {window.innerWidth <= 800 ? <Navbar /> : <></>}
    </>
  );
};

export default Location;
