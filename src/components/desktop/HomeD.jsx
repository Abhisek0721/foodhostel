import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";

const HomeD = () => {
  let navigate = useNavigate();
  const userAddress = useSelector((state) => state.userAddressReducer);
  const token = useSelector((state) => state.userTokenReducer);
  let pincode = userAddress?.pincode;
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // fetch food items with respect to location
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/fooditem/showFoodItems?pincode=${pincode}`
      )
      .then((res) => {
        if (res.data?.status) {
          setFoodItems(res?.data?.data);
        }
      });
  }, []);

  let filterFood = (category) => {
    if (category) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/fooditem/showFilteredFoodItems?pincode=${pincode}&category=${category}`
        )
        .then((res) => {
          setFoodItems(res.data?.data);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/fooditem/showFoodItems?pincode=${pincode}`
        )
        .then((res) => {
          if (res.data?.status) {
            setFoodItems(res?.data?.data);
          }
        });
    }
  };

  const orderNow = (foodDetail) => {
    // check auth
    if (token) {
      return navigate("/order", { state: { foodDetail } });
    } else {
      return navigate("/checkout");
    }
  };

  return (
    <div>
      <div className="categories mt-20 p-10">
        <h1 className="text-lg font-semibold mb-4">Top Categories</h1>
        <button
          onClick={() => filterFood("")}
          className="bg-red-400 px-2 py-1 mb-4 rounded-md block mx-auto active:bg-red-500"
        >
          Show All Categories
        </button>
        <div className="flex justify-evenly">
          {/* Briyani */}
          <div className="cursor-pointer" onClick={() => filterFood("Briyani")}>
            <div className="item">
              <img src={require("../img/categories/briyani.png")} alt="" />
              <p className="text-center font-semibold">Briyani</p>
            </div>
          </div>
          {/* Pizza */}
          <div className="cursor-pointer" onClick={() => filterFood("Pizza")}>
            <div className="item">
              <img src={require("../img/categories/pizza.png")} alt="" />
              <p className="text-center font-semibold">Pizza</p>
            </div>
          </div>
          {/* Burger */}
          <div className="cursor-pointer" onClick={() => filterFood("Burger")}>
            <div className="item">
              <img src={require("../img/categories/burger.png")} alt="" />
              <p className="text-center font-semibold">Burger</p>
            </div>
          </div>
          {/* Rolls */}
          <div className="cursor-pointer" onClick={() => filterFood("Rolls")}>
            <div className="item">
              <img src={require("../img/categories/roll.png")} alt="" />
              <p className="text-center font-semibold">Rolls</p>
            </div>
          </div>
          {/* Sandwich */}
          <div
            className="cursor-pointer"
            onClick={() => filterFood("Sandwich")}
          >
            <div className="item">
              <img src={require("../img/categories/sandwich.png")} alt="" />
              <p className="text-center font-semibold">Sandwich</p>
            </div>
          </div>
          {/* Sweets */}
          <div className="cursor-pointer" onClick={() => filterFood("Sweets")}>
            <div className="item">
              <img src={require("../img/categories/sweets.png")} alt="" />
              <p className="text-center font-semibold">Sweets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="available-food mt-12 mb-24 p-10">
        <h1 className="text-lg font-semibold mb-4">Available Foods</h1>
        <div className="ml-10 mt-5 flex flex-wrap mx-auto">
          {foodItems &&
            foodItems.map((item) => {
              return (
                <a
                  onClick={() => orderNow(item)}
                  id={item.foodId}
                  key={`${item.foodId}-${Math.random() * 1000}`}
                  className="cursor-pointer"
                >
                  <div className="card border-2 border-black h-80">
                    <div className="food-img">
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/static/foodImages/${item.imgName}`}
                        className="h-44 mx-auto"
                        alt=""
                      />
                    </div>
                    <div className="detail px-4">
                      <div className="flex justify-between">
                        <p className="text-lg font-semibold w-44">
                          {item.foodName}
                        </p>
                        <div className="rating bg-green-600 flex px-1 rounded-md h-7">
                          <p className="text-lg text-white place-self-center">
                            {item?.foodRating}
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
                            {item.foodCategory}
                          </span>
                          <span className="rating p-2 rounded-md">
                            Rs.{item.foodPrice} for 1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          {foodItems.length === 0 ? (
            <div className="mx-4 mt-8 mb-20 w-[100%]">
              <p className="text-lg text-center font-serif">
                Food is not available at your location.
              </p>
              <Link to={"/location"}>
                <button className="bg-red-400 px-2 py-1 mt-4 rounded-md block mx-auto active:bg-red-500">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2 ml-1" />
                  Set Location
                </button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeD;
