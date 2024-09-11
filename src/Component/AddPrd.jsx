import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, getAllProduct } from '../reducer/prodReducer';
import { useNavigate } from 'react-router-dom';


function AddPrd() {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const navigation = useNavigate()

  const dispatch = useDispatch();

  const submitProd = (e) => {
    e.preventDefault();

    if (!productName || !productImage) {
      alert('Please provide both product name and product image.');
      return;
    }
    // Create a FormData object to send both text and file data
    const formData = { productName, productImage }

    // Dispatch the action with FormData
    // console.log(productImage);

    dispatch(addProduct(formData));

 
    // Reset the form
    setProductName('');
    setProductImage(null);
    e.target.reset(); 
    navigation('/ProdList')
  };



  return (
    <form onSubmit={submitProd} className="mb-5" encType="multipart/form-data">
      <div className="container border p-4">
        <h3 className="text-center"><u>Add New Product</u></h3>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="pname" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="pname"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="pimage" className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                id="pimage"
                onChange={(e) => setProductImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-success" type="submit">Add Product</button>
      </div>
    </form>
  );
}

export default AddPrd;
