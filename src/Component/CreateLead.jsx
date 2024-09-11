import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct } from '../reducer/prodReducer';
import { addLead, getSingleLead, updateLead } from '../reducer/LeadReducer';
import { useNavigate, useParams } from 'react-router-dom';

function CreateLead() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState('');
  const [updatename, setUpdatename] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [mode, setMode] = useState(true); // mode to track create/update


  const updateid = params.id;
  // console.log(updateid);

  // Fetch single lead if updating
  const singleLead = useSelector((store) => store.Lead.Lead.data);

  useEffect(() => {
    if (updateid) {
      dispatch(getSingleLead(updateid));
      setMode(false); // set mode to update
    }
  }, [dispatch, updateid]);
  

  useEffect(() => {
    if (singleLead && updateid) {
      // console.log('SingleLead Data:', singleLead); // Log singleLead to debug
      const [lead]=singleLead
      // console.log(lead);
      
      setName(lead.name);
      setEmail(lead.email);
      setNumber(lead.number);
      setProduct(lead.product ? lead.product._id : '');
      setUpdatename(lead.product ? lead.product.productName : '');
      
    }
  }, [singleLead, updateid]);
  


  // Fetch all products for the dropdown
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const productname = useSelector((store) => store.Product.product.data) || [];


  const submitLead = (e) => {
    e.preventDefault();

    if (!name) {
      setError('Name field is blank');
      return;
    }
    if (!email) {
      setError('Email field is blank');
      return;
    }
    if (!number) {
      setError('Number field is blank');
      return;
    }
    if (!product) {
      setError('Product field is blank');
      return;
    }

    const data = { name, email, number, product };

    if (mode) {
      dispatch(addLead(data));
    } else {
      // alert('hk')
      dispatch(updateLead({ data, updateid }, updateid));
    }
    setName('')
    setEmail('')
    setNumber('')
    setProduct('')
    setUpdatename('')
    navigate('/LeadList');
  };

  return (
    <>
      <form onSubmit={submitLead} className="mb-5">
        <div className="container border p-4">
          <h3 className="text-center">
            <u>{mode ? 'Create Lead' : 'Update Lead'}</u>
          </h3>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="leadname" className="form-label">Lead Name</label>
                <input type="text" className="form-control" id="leadname" placeholder="Lead Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="number" className="form-label">Enter Number</label>
                <input type="number" className="form-control" id="number" placeholder="Enter Number" value={number} onChange={(e) => setNumber(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="product" className="form-label">Select Product</label>
                <select name="product" id="product" className="form-control" value={product} onChange={(e) => setProduct(e.target.value)}>
                  <option value="">{updatename || 'Select Product'}</option>
                  {productname.length > 0 ? (
                    productname.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.productName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No products available</option>
                  )}
                </select>

              </div>
            </div>
          </div>

          <p className="text-danger">{error}</p>
          <button type="submit" className="btn btn-success">
            {mode ? 'Add Lead' : 'Update Lead'}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateLead;
