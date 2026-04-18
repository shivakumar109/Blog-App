import AddArticle from './Components/AddArticle'
import AdminDashboard from './Components/AdminDashboard'
import AuthorDashboard from './Components/AuthorDashboard'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import UserDashbord from './Components/UserDashbord'
import RootLayout from './Components/RootLayout'
import ArticleById from './Components/ArticleById'
import Articles from './Components/Articles'
import ProtectedRoute from './Components/ProtectedRoute'
import Unauthorized from './Components/Unauthorized'
// import ErrorBoundary from './Components/ErrorBoundary'
import {createBrowserRouter,RouterProvider} from 'react-router'
import {Toaster} from 'react-hot-toast'

function App() {

  const routingObj = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'addartical',
          element:<AddArticle/>
        },
        {
          path:'admindashbord',
          element:<AdminDashboard/>
        },
        {
          path:'authordashbord',
          element:<AuthorDashboard/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register/>
        },
        {
          path:'userdashbord',
          element:<ProtectedRoute allowedRoles={["ADMIN","USER"]}><UserDashbord/></ProtectedRoute>
        },
        {
          path:'article/:id',
          element:<ArticleById/>
        },
        {
          path:'articles',
          element:<Articles/>
        },
        {
          path:'unauthorized',
          element:<Unauthorized/>
        },
        // {
        //   path:'errorBoundary',
        //   element:<ErrorBoundary/>
        // }
      ]
    }
  ])

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    <RouterProvider router={routingObj}/>
    </>
  )
}

export default App