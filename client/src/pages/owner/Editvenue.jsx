import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Editvenue(){
    const nav=useNavigate();
    const {id}=useParams();

    const[vene,setvenue]=useState(null);

    useEffect(()=>{
        const venues=JSON.parse(localStorage.getItem("venues")) ||
    })
}