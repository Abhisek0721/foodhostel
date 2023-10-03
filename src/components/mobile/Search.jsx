import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Search = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userTokenReducer);
  const address = useSelector((state) => state.userAddressReducer);
  const pincode = useState(address?.pincode);
  let [foodList, setFoodList] = useState(null);

  useEffect(() => {
    // check auth
    if (!token) {
      navigate("/checkout");
    }
  }, []);

  const searchFood = (text) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/fooditem/searchFood?pincode=${pincode[0]}&text=${text}&skipFrom=0&limit=20`
      )
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.status) {
          setFoodList(res.data?.data);
        }
      });
  };

  const orderNow = (foodDetail) => {
    return navigate("/order", { state: { foodDetail } });
  };

  return (
    <>
      <div className="p-8 min-h-screen relative top-16">
        <div className="flex justify-between">
          <p className="text-sm font-bold">Search Food</p>
          <div>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </Link>
          </div>
        </div>

        <div className="search-bar mt-8">
          <input
            type="text"
            className="entryField outline-none"
            onChange={(e) => searchFood(e.target.value)}
            placeholder="Search Food"
          />
        </div>

        <div className="text-center flex flex-col overflow-y-auto">
          {foodList && foodList.length > 0 ? (
            foodList.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => orderNow(item)}
                  className="hover:cursor-pointer bg-red-100 rounded-md my-2"
                >
                  <p className="text-slate-500 text-lg hover:text-red-700">
                    {item.foodName}
                  </p>
                  <p className="text-slate-500 text-sm">
                    ( {item.foodCategory} )
                  </p>
                </div>
              );
            })
          ) : (
            <div>
              <p className="text-slate-500 text-lg">No Match</p>
            </div>
          )}
        </div>
      </div>
      {window.innerWidth <= 800 ? <Navbar /> : <></>}
    </>
  );
};

export default Search;
