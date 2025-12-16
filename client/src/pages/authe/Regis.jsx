import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){

    const nav=useNavigate();
    const [form,setform]=useState({
        email:"",
        password:""
    });

}