import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const FoodOrderList = ()=>{
    let [orderList, setOrderList] = useState(null);
    const token = useSelector((state) => state.userTokenReducer);
    let navigate = useNavigate();

    useEffect(()=>{
        // check auth
        if (!token) {
            navigate("/checkout");
        }

        // fetch food order list
        axios.post('/foodorderlist',{
            "token":token
        }).then((res)=>{
            if(res.data){
                setOrderList(res.data);
            }
        });
    },[]);

    const renderDateTime = (str) => {
        let dateTime = new Date(str);
        let date = dateTime.getDate();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let year = dateTime.getFullYear();
        let hour = dateTime.getHours();
        let minute = dateTime.getMinutes();
        return `${date}-${month[dateTime.getMonth()]}-${year} ${hour}:${minute}`;
    }

    return (
        <div className='mb-24 p-10 h-[90%]'>
        <h1 className='text-lg font-semibold mb-4'>Food Orders</h1>

            <div className='ml-10 mt-5 flex flex-col justify-center'>

                {orderList && (
                    orderList.map((order)=>{
                        return (
                            <div key={order.orderId}>
                            <div className="flex justify-around bg-red-100 rounded-md px-5 py-10 shadow-md my-5">
                                {/* Start Food Details */}
                                <div className="text-slate-700 font-semibold my-auto">
                                    <div className="mb-3">Food Name : {order.foodName}</div>
                                    <div>Food Id : {order.foodId}</div>
                                    <div>Order Id : {order.orderId}</div>
                                    <div className="my-3">Added Items : {order.addedItems.map((item)=>{return (<div className="ml-5">Name : {item.foodName}<span className="mx-2"></span>Qty : {item.qty}<span className="mx-2"></span>Price : {item.price}</div>)})}</div>
                                    <div className="my-2">Order Date {'&'} Time : {renderDateTime(order.orderDateTime)}</div>
                                    <div className="mt-2">Food Price : {order.foodPrice}</div>
                                </div>
                                {/* End Food Details */}
                                {/* Start Shipping Details */}
                                <div className="text-slate-700 font-semibold my-auto">
                                    <p className="text-xs font-sans mb-3">Shipping Details</p>
                                    <div>
                                        <div className="mb-2">Customer Name : {order.customerName}</div>
                                        <div>
                                            <div>{order.deliveryAddress.buildingName},</div>
                                            <div>{order.deliveryAddress.roadName},</div>
                                            <div>{order.deliveryAddress.city},</div>
                                            <div>{order.deliveryAddress.state} - {order.deliveryAddress.pincode}</div>
                                        </div>
                                        <div className="mt-2">Phone Number : {order.buyerPhoneNumber}</div>
                                    </div>
                                    <button className="px-2 py-1 text-sm float-right rounded-md hover:bg-red-600 active:bg-red-500 text-yellow-300 bg-red-700 mt-10">Cancel and Refund</button>
                                </div>
                                {/* End of Food Details */}
                            </div>
                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
}

export default FoodOrderList;