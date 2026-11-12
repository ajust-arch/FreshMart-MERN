import { useLayoutEffect } from "react";
import { Navigate,Route,Routes,useLocation } from "react-router-dom";
import Login from "./components/pages/Login";
import AddItems from "./components/pages/AddItems/AddItems";
import ItemList from "./components/pages/ItemList/ItemList";
import HookahList from "./components/pages/HookahList/HookahList";
import AddHookah from "./components/pages/AddHookah/AddHookah";
import Home from "./components/pages/Home/Home";

const hasAdminSession=()=>{
const token=localStorage.getItem("token");
const savedUser=localStorage.getItem("freshmart_user");
if(!token|| !savedUser) return false;
try {
  return JSON.parse(savedUser).role==="admin";
} catch  {
  return false;
}

  
};
const ProtectedRoute=({children})=>{
  const location = useLocation();
  return hasAdminSession()? children: <Navigate to='/login' replace state={{from : location}}/>;

};
const PublicOnlyRoute=({children})=> hasAdminSession()? <Navigate to='/dashboard' replace />: children;

const ScrollToTop=(children)=>{ 
  const{pathname}=useLocation();

  useLayoutEffect(()=>{
    window.history.scrollRestoration="manual";
    const root =document.documentElement;
    const PreviousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior="auto";
    window.scrollTo({top:0,left:0,behavior:"auto"});
  root.style.scrollBehavior= PreviousBehavior;
  },[pathname])
  return null;
}

const App=()=>{
  return (
    <>
    <Routes>
  
            <Route path="/" element={<Navigate to='/login' replace />}/>
                  <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}/>
               <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
               <Route path="/add-items" element={<ProtectedRoute><AddItems/></ProtectedRoute>}/>   
               <Route path="/add-item" element={<ProtectedRoute><AddItems/></ProtectedRoute>}/>  
    <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/> 
    <Route path="/item-list" element={<ProtectedRoute><ItemList/></ProtectedRoute>}/> 
    <Route path="/add-hookah" element={<ProtectedRoute><AddHookah/></ProtectedRoute>}/> 
    <Route path="/hookah-list" element={<ProtectedRoute><HookahList/></ProtectedRoute>}/> 
      <Route path="*" element={<Navigate  to='/' replace/>}/> 
    
    </Routes>
    </>
  );
};
export default App;