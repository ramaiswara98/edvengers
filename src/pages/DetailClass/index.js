import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom';
import {Button,Gap} from '../../component';
import './detailclass.css';
const DetailClass = () => {
    //getParamsfromurl
    const id = useParams().id;
    const user = JSON.parse(localStorage.getItem('user'));
    const [takenClass,setTakenClass] = useState([]);
    const [event,setEvent]=useState([]);
    const [graduate,setGraduate] = useState("none");
    var sumAttended =0;
    useEffect(() => {
        axios.get('http://localhost:4000/v1/takenclass/getbyid/'+id)
        .then(result => {
            console.log(result.data.data);
            setTakenClass(result.data.data);
            setEvent(result.data.data.event);
        })
        .catch(err => {
            alert("Something Wrong when load the taken class data");
        })
    },[]);

    //updateStatus Event of Class
    function onAttendClicks(tcId,e_id,e_title,e_date){
        const data = {
            id:tcId,
            event:[{
                id:e_id,
                title:e_title,
                data:e_date,
                status:"attended"
            }]
        };
        axios.post("http://localhost:4000/v1/takenclass/updateeventstatus",data)
        .then(result=>{
            setTakenClass(result.data.data);
            setEvent(result.data.data.event);
        })
        .catch(err=>{
            alert("Failed to Update");
        })
    }
    function clainGraduate(){
        if(sumAttended==event.length){
            createCertificate();
        }else{
            alert("You need to attend all the event to claim graduate");
        }
    }
    

    //Creating Certificate
    function createCertificate(){
        const data = {
            userId:user._id,
            userName:user.name,
            certificate_title:takenClass.className,
            issueYear:"2021",
            issueMonth:"6",
            expirationYear:"2026",
            expirationMonth:"6"
        }
        axios.post("http://localhost:4000/v1/certificate/create",data)
        .then(result => {
            axios.post("http://localhost:4000/v1/takenclass/updatecertificateid",{
                id:takenClass._id,
                certificateId:result.data.data._id
            })
            .then(rest => {
                alert("Yea, Congratulation For Your Graduation");
                window.location.href = '/my-account';
            })
            .catch()
        })
        .catch(err=>{
            console.log(err);
            alert("Somethng Wrong");
        })
    }
    return (
        <div>
            <p>Detail Class</p>
            <div className="detail-class-box">
                <div className="frist-row">
                    <h4 className="title-detail-class">{takenClass.className}</h4>
                    <Gap height={20}/>
                    <div className='events'>
                       
                        {/* EventItem */}
                        {event.map(myevent =>{
                            var button;var p;
                            if(myevent.status == null){
                                var key=1;
                                button="block";
                                p="none";
                            }else{
                                button="none";
                                p="block";
                                sumAttended=sumAttended+1;
                            }
                            return<div key={myevent.id}> 
                            <div className="item-event" >
                            <p className="item-event-title">{myevent.title}</p>
                            <Gap width={20}/>
                            <div className="button-attend" style={{display:button}}>
                                <Button title="Attend" onClick={()=>onAttendClicks(takenClass._id,myevent.id,myevent.title,myevent.date)}/>
                            </div>
                            <p style={{display:p}}>Attended</p>
                        </div></div>
                        })}
                        
                    </div>
                    <Gap height={40}/>
                    <div className='detail-class-button'>
                        {takenClass.certificateId == '' && (
                            <Button title="Claim Graduate" onClick={()=>clainGraduate()}/> 
                        )}
                    
                    </div>
                    
                </div>    
            </div>
        </div>
    )
}

export default DetailClass
