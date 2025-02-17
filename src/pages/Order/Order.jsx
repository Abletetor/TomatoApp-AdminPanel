import { useState } from 'react';
import './Order.css';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const Order = () => {
   const [orders, setOrders] = useState([]);

   //Fetch Orders
   const fetchAllOrders = async () => {
      try {
         const response = await axios.get(`${baseUrl}/api/order/list`);
         if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Update Status
   const statusChangeHandler = async (e, orderId) => {
      try {
         const response = await axios.post(`${baseUrl}/api/order/status`, { orderId, status: e.target.value });
         if (response.data.success) {
            await fetchAllOrders();
         }
      } catch (error) {
         console.log(error);

      }

   };

   useEffect(() => {
      fetchAllOrders();
   }, []);
   return (
      <div className='order add'>
         <h3>Order Page</h3>
         <div className="order-list">
            { orders.map((order, index) => (
               <div className="order-item" key={ index }>
                  <img src={ assets.parcel_icon } alt="" />
                  <div>
                     <p className="order-item-food">
                        { order.items.map((item, index) => {
                           if (index === order.items.length - 1) {
                              return item.name + ' x ' + item.quantity;
                           } else {
                              return item.name + ' x ' + item.quantity + ', ';
                           }
                        }) }
                     </p>
                     <p className="order-item-name">
                        { order.address.firstName + " " + order.address.lastName }
                     </p>
                     <div className="order-item-address">
                        <p>{ order.address.street + "," }</p>
                        <p>
                           { order.address.city + ", " + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode }
                        </p>
                     </div>
                     <p className='order-item-phone'>{ order.address.phone }</p>
                  </div>
                  <p>Items: { order.items.length }</p>
                  <p>${ order.amount }</p>
                  <select onChange={ (e) => statusChangeHandler(e, order._id) } value={ order.staus }>
                     <option value="Food Processing">Food Processing</option>
                     <option value="Out for Delivery">Out for Delivery</option>
                     <option value="Delivered">Delivered</option>
                  </select>
               </div>
            )) }
         </div>

      </div>
   );
};

export default Order;
