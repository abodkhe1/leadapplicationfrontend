import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct } from '../reducer/prodReducer'; // Ensure correct path

function ProdList() {
  const dispatch = useDispatch();
  const product = useSelector((store) => store.Product.product.data);

  useEffect(() => {
    dispatch(getAllProduct());
    ;
  }, [dispatch]);
// console.log(product);


  return (
    <div className="container">
      <h3 className='text-center'><u>Product List</u></h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SR No</th>
            <th>Product Name</th>
            <th>Product Image</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {product && product.length > 0 ? (
            product.map((item, index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.productName}</td>
                <td>
                  {item.productImage ? <img src={item.productImage} alt={item.productName} style={{ width: '50px' }} /> : 'No Image'}
                </td>
                {/* <td>
                  <button className="btn btn-primary btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          {/* <tr>
            <td colSpan="4">End of List</td>
          </tr> */}
        </tfoot>
      </table>
    </div>
  );
}

export default ProdList;
