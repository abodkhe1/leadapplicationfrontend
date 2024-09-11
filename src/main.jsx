import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Dashboard from './Component/Dashboard.jsx'
import AddPrd from './Component/AddPrd.jsx'
import ProdList from './Component/ProdList.jsx'
import CreateLead from './Component/CreateLead.jsx'
import LeadList from './Component/LeadList.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route index element={<Navigate to='/Dashboard' />} />
        <Route path='/Dashboard' element={< Dashboard />} />
        <Route path='/AddPrd' element={< AddPrd />} />
        <Route path='/ProdList' element={< ProdList />} />
        <Route path='/CreateLead' element={< CreateLead />} />
        <Route path='/LeadList' element={< LeadList />} />
        <Route path='/updateLead/:id' element={< CreateLead />} />
      </Route>
      )
      )


      createRoot(document.getElementById('root')).render(
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StrictMode>,
      )
