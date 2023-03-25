import React from 'react'

//components
import Landing from './components/Landing';
import Diagram from './components/Diagram';
import Form from './components/Form';

//layouts
import RootLayout from './components/layouts/RootLayout';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="diagram" element={<Diagram />} />
      <Route path="form" element={<Form />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App