import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {LogIn,Mail,Lock,Eye,EyeOff} from "lucide-react";
import freshmartlogo from "../assets/freshmart-logo.svg";
import axios from "axios";
import {adminLoginStyles as s} from '../assets/dummyStyles';
 const Login=()=>{
const [email,setEmail] =useState("");
const [password,setPassword]=useState("");
const [showPassword,setShowPassword]=useState(false);
const [error,setError]=useState("");
const [isLoading,setIsLoading]=useState(false);

const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname||"/dashboard";

const handleSubmit=async (e)=>{
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
        const {data}=await axios.post("http://localhost:5000/api/users/login",{email,password},);
        if (data.success){
            if(data.user?.role!=="admin"){
                setError("this accnt does not have admin access");
                return;
            }
            localStorage.setItem("token",data.token);
                 localStorage.setItem("freshmart_user",JSON.stringify(data.user));
                 navigate(from,{replace:true})
        }
    } catch (error) {
        setError(error.response?.data?.message||"login failed")
    }finally{
        setIsLoading(false);
    }
}
return(
    <div className={s.mainContainer}>
<div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className={s.glow1}/>
 <div className={s.glow2}/>
  <div className={s.glow3}/>
    </div>


    <div className={s.contentWrapper}>
<div className={s.brandHeader}>
    <div className={s.brandInner}>
        <div className={s.logoWrapper}>
            <img src={freshmartlogo} className={s.logoImage}/> 

        </div>
        <div className="leading-tight">
<p className={s.adminLabel}>
Admin Panel
</p>
<h1 className={s.brandTitle}>
FreshMart
</h1>
        </div>

    </div>

</div>


<div className={s.card}>

<div className={s.cardTopLine}/>
<form className={s.form} onSubmit={handleSubmit}>
{
    error&&(<div className={s.errorContainer}>
<div className={s.errorDot}/>
{error}
    </div>
)}
<div className={s.fieldGroup}>
    <label className={s.fieldLabel}>

<span>Email Address</span>

    </label>
    <div className={s.fieldWrapper}>
        <div className={s.fieldGlow}/>

<div className={s.fieldInputContainer}>
    <Mail className={s.fieldIcon}/>
    <input className={s.fieldInput} type="email" placeholder="email address" value={email} onChange={(e)=>setEmail(e.target.value)} required autoFocus/>
    </div>  

    </div>

</div>

<div className={s.fieldGroup}>
    <label className={s.fieldLabel}>
        <span >Password</span>
    </label>
<div className={s.fieldWrapper}>

 <div className={s.fieldGlow}/>

<div className={s.fieldInputContainer}>
    <Lock className={s.fieldIcon}/>
    <input className={s.fieldInput} type={showPassword?"text":"password"} placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
    <button className={s.toggleButton} type="button" onClick={()=>{setShowPassword(!showPassword)}}>
{showPassword?(
    <EyeOff className={s.toggleIcon}/>
):(<Eye className={s.toggleIcon}/>)}
    </button>
    </div> 

</div>

</div>

<button className={s.submitButton} type="submit" disabled={isLoading}>
    <span  className={s.submitInner}>
{isLoading?(
    <>
    <div className={s.spinner}/>

   Signing In...
    </>
): (
    <>
    <LogIn className={s.submitIcon}/>
    Sign In
    </>
)}
    </span>
</button>

</form>
</div>

</div>
<style >{`
@keyframes spin-slow{
0%{
transform:translate(-50%,-50%) rotate(0deg);
}
100%{
transform:translate(-50%,-50%) rotate(360deg);
}
}
.animate-spin-slow{
animation:spin-slow 20s linear infinite;}
`}

</style>



    </div>
)
};

export default Login;