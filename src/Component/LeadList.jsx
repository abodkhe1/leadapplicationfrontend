import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAll, deleteLead as deleteLeadAction } from '../reducer/LeadReducer';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

function LeadList() {
  const LeadList = useSelector((store) => store.Lead.Lead.data) || []; // Ensure it’s an array
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(LeadList)) {
      setFilteredLeads(
        LeadList.filter((lead) =>
          lead.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, LeadList]);


  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      dispatch(deleteLeadAction(id));
    }
  };
  

  const filterData = (e) => {
    e.preventDefault();
  
    // Filter LeadList based on createdon date within startDate and endDate
    const filtered = LeadList.filter((lead) => {
      const createdOnDate = new Date(lead.createdon); // Parse createdon as a Date object
  
      // Compare the Date objects directly
      return createdOnDate >= new Date(startDate) && createdOnDate <= new Date(endDate);
    });
  

    setFilteredLeads(filtered);

  };
  


  const columns = [
    {
      name: 'Lead Name',
      selector: (row) => row.name,
      sortable: true,
      style: { fontSize: '16px' },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      style: { fontSize: '16px' },
    },
    {
      name: 'Number',
      selector: (row) => row.number,
      sortable: true,
      style: { fontSize: '16px' },
    },
    {
      name: 'Product Name',
      selector: (row) => row.product.productName,
      sortable: true,
      style: { fontSize: '16px' },
    },
    {
      name: 'Created On',
      selector: (row) => row.createdon,
      sortable: true,
      style: { fontSize: '16px' },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <Link to={`/updateLead/${row._id}`}>
            <i className="fa-solid fa-pen text-success" title="Update"></i>
          </Link> |
          <Link onClick={() => handleDeleteLead(row._id)}>
            <i className="fa-solid fa-trash text-danger" title="Delete"></i>
          </Link>
        </div>
      ),
      style: { fontSize: '16px' },
    },
  ];

  
  
  return (
    <div className="container">
      <h3 className="text-center"><u>Lead List</u></h3>

      <form onSubmit={filterData}>
        <div className="row m-3 border p-3">
          <div className="col-md-12">
            <h5>Filter Data</h5>
          </div>
          <div className="col-md-4">
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className='form-control' />
          </div>
          <div className="col-md-2 text-center">
            <span>To</span>
          </div>
          <div className="col-md-4">
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className='form-control' />
          </div>
          <div className="col-md-2 text-center">
            <button className='btn btn-success' type='submit'>Filter</button>
          </div>
        </div>

      </form>

      <div className="row mb-3">
        <div className="col-md-12">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLeads}
        pagination
        responsive
        customStyles={{
          rows: {
            style: {
              fontSize: '16px', // Adjust font size here
            },
          },
          headCells: {
            style: {
              fontSize: '16px', // Adjust font size here
            },
          },
        }}
      />
    </div>
  );
}

export default LeadList;
