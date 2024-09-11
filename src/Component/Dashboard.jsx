import React from 'react'

function Dashboard() {
  return (
    <>
      <h2><u>Dashboard</u></h2>
      <div className="container p-5">
          <div className="row">
            <div className="col-md-5 border p-4 bg-info ">
              <h4 className=''>Lead</h4>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5 border p-4 bg-info ">
              <h4 className=''>Product</h4>
            </div>
          </div>
      </div>
    </>
  )
}

export default Dashboard