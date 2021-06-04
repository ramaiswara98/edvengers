import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../../component/atom/Button'
import Gap from '../../component/atom/Gap';
import {useHistory} from 'react-router-dom';
const Home = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    if(localStorage.getItem('user') == null){
        window.location.href='/login';
    }
    //initiate LocalStateForDataClass
    const [dataClass, setDataClass] = useState([]);
    
    //fetch data list class from API
    useEffect(() =>{
        axios.get('http://localhost:4000/v1/class/get')
        .then(result =>{
            setDataClass(result.data.data);
        })
        .catch(err =>{
            console.log(err);
            
        })
    },[]);

    //Fungsi Join Class Button
    function joinClass(idClass,event,className){
        console.log(event);
        const data = {
            userId:user._id,
            classId:idClass,
            className:className,
            event:event
        }
        axios.post('http://localhost:4000/v1/takenclass/create',data)
        .then(result =>{
            window.location.href = '/my-class';
        })
        .catch(err => {
            alert("Something Wrong");
        })
    }

    //element html
    return (
             <div className="myclass-wrap">
            <p>Available Class</p>
           {dataClass.map(myclass => {
               return<div>
                            <div className="class-box">
                                <h3 className="title-class">{myclass.name}</h3>
                                <div className="graduate-button">
                                    <Button title="Join this Class" onClick = {()=>joinClass(myclass._id,myclass.event,myclass.name)} />
                                </div>       
                            </div>
                            <Gap height={30}/>
                    </div>
                    
           })}
        </div>
    )
}

export default Home
