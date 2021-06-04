import axios from 'axios';
import React, { useState } from 'react'
import { Button, Gap,TextLink } from '../../component/atom';
import Input from '../../component/atom/Input';
import './register.css';
import {useHistory} from 'react-router-dom';
import { RegisterBg,Logo } from '../../assets';
const Register = () => {
    const history = useHistory();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const onSubmit = ()=>{
        const data = {
            name:name,
            email:email,
            password:password
        }
        console.log(name+email+password);
        axios.post("http://localhost:4000/v1/auth/register",data, {
            headers:{
                'content-type':'application/json'
            }
        })
        .then(result =>{
            if(result.data.data == null){
                alert(result.data.message)
            }else{
                alert('Register Success')
                history.push('/login');
            }
            
        }
           
        )
        .catch(err =>{
            alert(err.data)
        })
    }
    return (
        <div className="container">
                <div className="left">
                    <img className="background" src={RegisterBg}/>
                </div>
                <div className="right">
                <img src={Logo} className="logo"/>
                <Input label="Full Name" placeholder="Input Your Last Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <Gap height={20}/>
                <Input label="email" placeholder="Input Your Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Gap height={20}/>
                <Input label="password" placeholder="Input Your Password" type="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Gap height={30}/>
                <Button title="Register" onClick={onSubmit} />
                <Gap height={50}/>
                <TextLink text="Already have account ? Login" onClick={ ()=> history.push('/login')} />
                </div>
            </div>
            
    )
}

export default Register
