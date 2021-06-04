import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import './certificate.css';
const Certificate = () => {
    const id = useParams().id;
    const [certificate,setCertificate] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:4000/v1/certificate/getById/"+id)
        .then(result => {
            setCertificate(result.data.data);
        })
        .catch(err=>{
            alert("Something Wrong Happen");
        }

        )
    })
    return (
        <div>
            <h1>CERTIFICATE</h1>
            <h3 className="certificate-title">{certificate.certificate_title}</h3>
            <h4>TO</h4>
            <h1 className="certificate-name">{certificate.userName}</h1>
        </div>
    )
}

export default Certificate