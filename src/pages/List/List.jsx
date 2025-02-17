import { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';


const List = () => {
   const [list, setList] = useState([]);

   const fetchList = async () => {
      try {
         const response = await axios.get(`${baseUrl}/api/food/list`);

         if (response.data.success) {
            setList(response.data.data);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchList();
   }, []);

   // Remove food
   const removeFood = async (foodId) => {
      try {
         const response = await axios.post(`${baseUrl}/api/food/remove`, { id: foodId });
         if (response.data.success) {
            await fetchList();
            toast.success(response.data.message);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }

   };

   return (
      <div className="list add flex-col">
         <div className="list-table">
            <div className="list-table-format title">
               <b>Image</b>
               <b>Name</b>
               <b>Category</b>
               <b>Price</b>
               <b>Action</b>
            </div>
            { list.map((item, index) => (
               <div className="list-table-format" key={ index }>
                  <img src={ `${baseUrl}/images/${item.image}` } alt={ item.name } />
                  <p>{ item.name }</p>
                  <p>{ item.category }</p>
                  <p>{ item.price }</p>
                  <p onClick={ () => removeFood(item._id) } className='cursor'>X</p>
               </div>
            )) }
         </div>
      </div>
   );
};

export default List;
