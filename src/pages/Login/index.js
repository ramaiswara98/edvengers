import React, { useState } from 'react'
import { Button, Gap, Input, TextLink } from '../../component/atom'
import '../Register/register.css'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Logo, SignInBg } from '../../assets';
const Login = () => {
    const history =useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const onSubmit = ()=>{
        const data = {
            email:email,
            password:password
        }
        axios.post("http://localhost:4000/v1/auth/login",data)
        .then(result =>{
            if(result.data.data != null){
                const user = JSON.stringify(result.data.data);
                localStorage.setItem('user',user);
                window.location.href='/';
            }else{
                alert("Login Failed ! || Email or Password is wrong")
            }
        })
        .catch(err => {
            console.log(err.data);
        })
    }
    return (
        <div className="container">           
            <div className="left">
                <img src={SignInBg} className="background"/>
            </div>
            <div className="right">
            <img src={Logo} className="logo"/>
            <Gap height={20}/>
            <Input label="Email" placeholder="Input Your Email" type="email" onChange={(e)=> setEmail(e.target.value)} />
            <Gap height={20}/>
            <Input label="Password" placeholder="Input Your Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            <Gap height={30}/>
            <Button title="Login" onClick={() => history.push('/my-class')} onClick={onSubmit} />
            <Gap height={50}/>
            <TextLink text="Don't have an account ? Register" onClick={() => history.push('/register')}/>
            </div>
        </div>
    )
}

export default Login
