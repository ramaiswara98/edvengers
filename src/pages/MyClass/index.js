import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button,Gap } from '../../component'
import './myclass.css'

const MyClass = () => {
    //initiate variable
    const user = JSON.parse(localStorage.getItem('user'));
    const [myclass,setMyClass] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/v1/takenclass/getbyuserid/'+user._id)
    .then(result => {
        console.log(result.data)
        setMyClass(result.data.data);
        
    })
    .catch(err => {
        alert("Something Wrong, We can't load your class")
    })
    },[]);
    function onClickDetail(id){
        window.location.href='/detail-class/'+id;
    }
    return (
        <div className="myclass-wrap">
            <p>My Class</p>
            {myclass.map(takenClass =>{
               return <div key={takenClass._id}>
                <div className="class-box">
                <h3 className="title-class">{takenClass.className}</h3>
                <div className="graduate-button">
                    <Button title="View Detail" onClick={()=>onClickDetail(takenClass._id)}/>
                </div>
                </div>
                <Gap height={30}/>
            </div>
            })}
            
        </div>
    )
}

export default MyClass