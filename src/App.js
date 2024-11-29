import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout';
import Home from './components/home/Home'
import EmergencyContacts from './components/emergency/EmergencyContacts'
import Tips from './components/knowledgeHub/Tips'
import Blogs from './components/knowledgeHub/Blogs'
import Laws from './components/knowledgeHub/Laws'
import SelfDefence from './components/selfdefence/SelfDefence'
import AboutUs from './components/aboutus/AboutUs'
import SignInSignUp from './components/SignInSignUp/SignInSignUp'
import Safety from './components/Safety/Safety'
import ResetPassword from './components/SignInSignUp/ResetPassword';
import Profile from './components/Profile/Profile';


function App() {

  const router=createBrowserRouter(
    [
      {
        path:"/",
        element:<RouteLayout/>,
        children:[
          {
            path:"/",
            element:<Home/>
          },
          {
            path:"/EmergencyContacts",
            element:<EmergencyContacts/>
          },
          {
            path:"/SelfDefence",
            element:<SelfDefence/>,
          },
          { 
            path:"/KnowledgeHub",
            children:[
              {
                path:"Tips",
                element:<Tips/>
              },
              {
                path:"Laws",
                element:<Laws/>
              },
              {
                path:"Blogs",
                element:<Blogs/>
              }
            ]
           
          },
          {
            path:"/AboutUs",
            element:<AboutUs/>,
          },
          {
            path:'/SignInSignUp',
            element:<SignInSignUp/>,
          },        
          {
            path:'/Safety',
            element:<Safety/>,
          },       
          {
            path:'/reset-password',
            element:<ResetPassword/>,
          },        
          {
            path:'/profile',
            element:<Profile/>,
          },        
        ]
      }
    ]
  )


  return (
    <div className="app">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
