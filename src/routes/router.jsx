
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/home'

const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/my-books-app' element={ <Home/>} />
          </Routes>
      </BrowserRouter>
  )
}
export default Router

   
