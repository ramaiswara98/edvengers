import React, { useEffect, useState } from 'react'
import './myaccount.css'
import {Gap, Button} from '../../component'
import axios from 'axios';
import { LinkedInButton } from '../../assets';
const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [myClass,setMyClass] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/v1/takenclass/getbyuserid/'+user._id)
        .then(result => {
            setMyClass(result.data.data);
        })
        .catch(err => {
            alert("Something wrong when load data class");
        })
    },[]);

    function addToProfile(cid,status){
        if(status == 'ungraduate'){
            alert("You Must Graduate First")
        }else{
            axios.get("http://localhost:4000/v1/certificate/getById/"+cid)
        .then(result => {
            const certificate = result.data.data;
            const certificate_url = "http://edvengers.com/certificate/"+cid;
            window.location.href = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name='+certificate.certificate_title+'&organizationId=14572153&issueYear='+certificate.issueYear +'&issueMonth='+certificate.expirationMonth+'+&expirationYear='+certificate.expirationYear+'&expirationMonth='+certificate.expirationMonth+'&certUrl='+certificate_url.trim()+'&certId='+certificate._id;
        })
        .catch(err => {
            alert("Something Wrong");
        })
        }
        
    }

    function viewCertificate(cid,status){
        if(status == 'ungraduate'){
            alert("You Must Graduate First")
        }else{
        window.location.href="/certificate/"+cid;
        }
    }
    return (
        <div className="myaccount-wrap">
            <div className="account-box">
                <div className="profile-item">
                    <h4 className="title">Full Name</h4>
                    <h4>{user.name}</h4> 
                </div>
                <div className="profile-item">
                    <h4 className="title">Email</h4>
                    <h4>{user.email}</h4> 
                </div>
                <div className="profile-item">
                    <h4 className="title">Password</h4>
                    <h4>{user.password}</h4> 
                </div>
            </div>
            <Gap height={20}/>
            {/* My Class */}
            <div className='table-wrap'>
                <table id='table'>
                    <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {myClass.map(takenClass => {
                            return <tr>
                            <td>{takenClass.className}</td>
                            <td>{takenClass.status}</td>
                            <td>
                                <div>
                                <button className="btnCertificate" onClick={()=>viewCertificate(takenClass.certificateId,takenClass.status)}><b>View Certificate</b></button>
                                <Gap height={20}/>
                                <img className="linkedIn" src={LinkedInButton} onClick={()=> addToProfile(takenClass.certificateId,takenClass.status)} />
                                </div>                               
                            </td>
                        </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyAccount