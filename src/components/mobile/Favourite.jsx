import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faStar,
  faHeartBroken,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Favourite = () => {
  const token = useSelector((state) => state.userTokenReducer);
  let [foodList, setFoodList] = useState(null);
  let [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check auth
    if (token) {
      // fetch food lists from favourite list
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/favourite/getFavouriteFood/${token}`
        )
        .then((res) => {
          if (res.data?.status) {
            setFoodList(res.data?.data);
          }
        });
        
    } else {
      navigate("/checkout");
    }
  });

  const removeFav = (foodId) => {
    // fetch food items with respect to location
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/favourite/deleteFavouriteFood/${token}?foodId=${foodId}`)
      .then((res) => {
        if (res.data.status === true) {
          setMsg("Removed from favourite list.");
          let Msg = document.getElementById("msg");
          Msg.classList.remove("hidden");
          setTimeout(() => {
            Msg.classList.add("hidden");
            setMsg(null);
          }, 4000);
        }
      });
  };

  const orderNow = (foodDetail) => {
    return navigate("/order", { state: { foodDetail } });
  };

  return (
    <>
      <div className="rounded-md shadow-lg border-2 p-8 min-h-screen relative top-16">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Favourite</h1>
          <div>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faXmark} className="text-3xl" />
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-y-auto">
          <div className="p-3 shadow-md lg:block">
            {/* Two hidden message */}
            <p
              className="text-lg bg-red-700 text-white text-center my-3 rounded-md lg:block transition duration-700 ease-in-out hidden"
              id="msg"
            >
              {msg}
            </p>
            {/* End of Two hidden message */}
            {foodList &&
              foodList.map((item) => {
                return (
                  <div key={item?.foodItem?._id} id={item?.foodItem?._id} className="card my-5">
                    <FontAwesomeIcon
                      icon={faHeartBroken}
                      onClick={() => removeFav(item?.foodItem?._id)}
                      className="text-lg hover:cursor-pointer float-right bg-slate-400 p-2 rounded-full text-red-600 place-self-center ml-1"
                    />
                    <div
                      className="food-img hover:cursor-grab"
                      onClick={() => orderNow(item?.foodItem)}
                    >
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/static/foodimages/${item?.foodItem?.imgName}`}
                        className="w-[200px] h-[150px] mx-auto"
                        alt=""
                      />
                    </div>
                    <div className="detail px-4">
                      <div className="flex justify-between">
                        <p className="text-lg font-semibold w-44">
                          {item?.foodItem?.foodName}
                        </p>
                        <div className="rating bg-green-600 flex px-1 rounded-md h-7">
                          <p className="text-lg text-white place-self-center">
                            {item?.foodItem?.foodRating}
                          </p>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-sm place-self-center text-white ml-1"
                          />
                        </div>
                      </div>
                      <div className="des mt-3">
                        <div className="flex justify-between">
                          <span className="rating bg-red-100 p-2 rounded-md">
                            {item?.foodItem?.foodCategory}
                          </span>
                          <span className="rating p-2 rounded-md">
                            Rs.{item?.foodItem?.foodPrice} for 1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {window.innerWidth <= 800 ? <Navbar /> : <></>}
    </>
  );
};

export default Favourite;
