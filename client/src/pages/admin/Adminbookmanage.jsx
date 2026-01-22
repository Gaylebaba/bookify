import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Adminbookmanage(){
    const nav=useNavigate();
    const[bookings,setbookings]=useState();

    useEffect(()=>{
        const admin=JSON.parse(localStorage.getItem("loggeduser"));

        if(!admin || admin.role!=="admin"){
            nav("/login");
            return;
        }
            const storedbook=JSON.parse(localStorage.getItem("book"))||[];
            setbookings(storedbook);
    },[nav]);
    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-600">
        booking management
            </h1>

            {bookings.length === 0? (
                <p className="text-gray-500 "> 
    no bookings found
                </p>
            ):
            (<div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-sm">
                <tr>
                    <th className="p-4">
                user
                    </th>
                    <th className="p-4">
                venue
                    </th>
                    <th className="p-4">
                date
                    </th>
                    <th className="p-4">
               amount
                    </th>
                    <th className="p-4">
                commission
                    </th>
                    <th className="p-4">
               status
                    </th>
                </tr>
                </thead>
                <tbody>
                    {bookings.map((b)=>(
                        <tr key={b.id} className="border-t">
                            <td className="p-4">
                        {b.username}
                            </td>
                             <td className="p-4">
                        {b.venuename}
                            </td>
                             <td className="p-4">
                        {b.date}
                            </td>
                             <td className="p-4">
                        {b.amount}
                            </td>
                            <td className="p-4 text-green-600 font-semibold">
                        {b.commisson}
                            </td>
                            <td className={`p-4 font-semibold ${
                                b.status==="canceled" ? "text-red-600":"text-green-600"
                            }`}>
                                    
                            </td>

                        </tr>
                    ))}
                </tbody>
                </table>
                </div>)
                }

        </div>
    );
}

export default Adminbookmanage;