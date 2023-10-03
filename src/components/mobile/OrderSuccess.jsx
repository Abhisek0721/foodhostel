import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faSmile,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const OrderSucces = () => {
  const [orderPayload, setorderPayload] = useState({});
  let [symbole, setSymbole] = useState(null);
  let [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.userTokenReducer);

  useEffect(() => {
    // check auth
    console.log(token);
    if (!token) {
      navigate("/login");
    }

    try {
      const url = new URL(window.location.href);
      let razorpay_payment_id = url.searchParams.get("razorpay_payment_id");
      let razorpay_payment_link_id = url.searchParams.get(
        "razorpay_payment_link_id"
      );
      let razorpay_payment_link_status = url.searchParams.get(
        "razorpay_payment_link_status"
      );
      orderPayload.sessionId = token;
      orderPayload.razorpayPaymentId = razorpay_payment_id;
      orderPayload.razorpayPaymentLinkId = razorpay_payment_link_id;
      if (razorpay_payment_link_status === "paid") {
        orderPayload.paymentStatus = true;
      } else {
        orderPayload.paymentStatus = true;
      }
      setorderPayload({ ...orderPayload });

      // Sending data to server
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/foodorder/orderSuccess`,
          orderPayload
        )
        .then((res) => {
          if (res.data.status) {
            setSymbole(
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-9xl text-green-600"
              />
            );
            setMsg(
              <>
                <h3 className="text-xl font-semibold mt-10 mb-5">
                  Your Order is on the way!{" "}
                </h3>
                <FontAwesomeIcon
                  icon={faSmile}
                  className="text-xl self-center text-green-800"
                />
              </>
            );
          } else {
            setSymbole(
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-9xl text-red-600"
              />
            );
            setMsg(
              <>
                <h3 className="text-xl font-semibold mt-10 mb-5">
                  Transaction Failed! Try Again
                </h3>
                <FontAwesomeIcon
                  icon={faSadTear}
                  className="text-xl self-center text-red-800"
                />
              </>
            );
          }
          setTimeout(() => {
            navigate("/");
          }, 4000);
        });
    } catch (error) {
      navigate("/");
    }
  }, []);

  return (
    <div className="rounded-md p-8 relative top-16 flex justify-center">
      <div className="mt-10 flex flex-col justify-center">
        {symbole}
        {msg}
      </div>
    </div>
  );
};

export default OrderSucces;
