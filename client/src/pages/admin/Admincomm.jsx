import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Admincomm() {
    const nav = useNavigate();
    const [book, setbook] = useState([]);

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("loggeduser"));

        if (!admin || admin.role !== "admin") {
            nav("/login");
            return;
        }
        const storebook = JSON.parse(localStorage.getItem("book")) || [];
        setbook(storebook);

    }, [nav]);

    const commission = book.reduce((sum, b) => sum + b.commission, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
                commision analytics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-sm text-gray-500">
                        commision rate
                    </p>
                    <h2 className="text-2xl font-bold text-indigo-600">
                        3%
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <p className="text-sm text-gray-500 ">
                        total bookings
                    </p>
                    <h2 className="text-2xl font-bold">
                        {book.length}
                    </h2>
                    <div className="bg-white p-6 rounded shadow">
                        <p className="text-sm text-gray-500">total commission</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            {commission}
                        </h2>

                    </div>

                </div>
                {book.length === 0 ? (
                    <p className="text-gray-500">
                        no bookings yet
                    </p>
                ) : (
                    <div className="bg-white rounded shadow overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 text-sm">
                                <tr>
                                    <th className="p-3">
                                        venue
                                    </th>
                                    <th className="p-3">
                                        amount
                                    </th>
                                    <th className="p-3">
                                        commission
                                    </th>
                                    <th className="p-3">
                                        date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {book.map((b) => (
                                    <tr key={b.id} className="border-t">
                                        <td className="p-3">
                                            {b.venuename}
                                        </td>
                                        <td className="p-3">
                                            {b.amount}
                                        </td>
                                        <td className="p-3 text-green-600">
                                            {b.commission}
                                        </td>
                                        <td className="p-3 ">
                                            {b.date}
                                        </td>

                                    </tr>
                                )

                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admincomm;