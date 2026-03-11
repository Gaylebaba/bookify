import { useNavigate } from "react-router-dom";
import sppic2 from "../../assets/images/sppic2.jpeg";
import Navbar from "../../components/Navbar";
import { useState } from "react";

function Home() {

const nav = useNavigate();
const [open,setOpen] = useState(null)

const faqs = [
{
q:"How do I book a sports venue?",
a:"Create an account, browse venues, choose your preferred slot and confirm booking through online payment."
},
{
q:"Can I cancel my booking?",
a:"Yes. You can cancel bookings from the booking history before the scheduled time."
},
{
q:"Which payment methods are supported?",
a:"Secure online payments are supported using Razorpay."
},
{
q:"Where can I see my booking history?",
a:"All bookings are available inside the user dashboard."
}
]

return (

<div className="bg-white text-gray-900">

{/* HERO */}

<div
className="relative h-[85vh] bg-cover bg-center"
style={{backgroundImage:`url(${sppic2})`}}
>

<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-indigo-900/60"></div>

<Navbar/>

<div className="relative z-10 flex items-center h-full px-8 md:px-16">

<div className="max-w-xl text-white">

<h1 className="text-5xl font-extrabold mb-6 leading-tight">
Book. Play. <span className="text-indigo-400">Repeat.</span>
</h1>

<p className="text-lg text-gray-200 mb-8">
Discover nearby sports venues and book instantly with Bookify.
No calls. No hassle. Just play.
</p>

<div className="flex gap-4">

<button
onClick={()=>{
const user = JSON.parse(localStorage.getItem("loggeduser"))
const token = localStorage.getItem("token")

if(!token || !user){
nav("/login")
return
}

if(user.role==="admin") nav("/admin")
else if(user.role==="owner") nav("/owner")
else nav("/home")
}}
className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-lg font-semibold transition"
>
Get Started
</button>

<button
onClick={()=>{
const token = localStorage.getItem("token")
if(token) nav("/venues")
else nav("/login")
}}
className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-semibold transition"
>
Browse Venues
</button>

</div>

</div>

</div>

</div>

{/* POPULAR VENUES */}

<section className="py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
Popular Sports Venues
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

<div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">

<img
src="https://images.unsplash.com/photo-1546519638-68e109498ffc"
className="h-64 w-full object-cover"
/>

<div className="p-6">

<h3 className="text-xl font-semibold mb-2">
Basketball Arena
</h3>

<p className="text-gray-600">
Professional indoor basketball court with seating and lighting.
</p>

</div>

</div>

<div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">

<img
src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
className="h-64 w-full object-cover"
/>

<div className="p-6">

<h3 className="text-xl font-semibold mb-2">
Football Turf
</h3>

<p className="text-gray-600">
High quality artificial turf perfect for 5v5 matches.
</p>

</div>

</div>

<div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">

<img
src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8"
className="h-64 w-full object-cover"
/>

<div className="p-6">

<h3 className="text-xl font-semibold mb-2">
Badminton Court
</h3>

<p className="text-gray-600">
Wooden flooring courts with professional lighting.
</p>

</div>

</div>

</div>

</section>


{/* HOW IT WORKS */}

<section className="bg-gray-50 py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-4">
How it Works
</h2>

<p className="text-center text-gray-500 mb-16">
4 Easy Steps to Book your Sports Venue
</p>

<div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

<div className="bg-white p-8 rounded-2xl shadow">
<h3 className="font-semibold text-xl mb-2">
01. Browse & Select Venue
</h3>
<p className="text-gray-600">
Find nearby sports venues based on sport and location.
</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow">
<h3 className="font-semibold text-xl mb-2">
02. Select Slot
</h3>
<p className="text-gray-600">
Choose available time slots from the venue calendar.
</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow">
<h3 className="font-semibold text-xl mb-2">
03. Pay Securely
</h3>
<p className="text-gray-600">
Complete booking through secure Razorpay payments.
</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow">
<h3 className="font-semibold text-xl mb-2">
04. Play & Enjoy
</h3>
<p className="text-gray-600">
Arrive at the venue and enjoy your game.
</p>
</div>

</div>

</section>


{/* WHY CHOOSE */}

<section className="py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
Why Choose Bookify
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

<div className="bg-gray-50 p-8 rounded-xl shadow">
<h3 className="font-semibold text-xl mb-2">
Simple Booking
</h3>
<p className="text-gray-600">
Book sports venues instantly without calls.
</p>
</div>

<div className="bg-gray-50 p-8 rounded-xl shadow">
<h3 className="font-semibold text-xl mb-2">
Multiple Sports
</h3>
<p className="text-gray-600">
Play football, cricket, badminton and more.
</p>
</div>

<div className="bg-gray-50 p-8 rounded-xl shadow">
<h3 className="font-semibold text-xl mb-2">
Trusted Reviews
</h3>
<p className="text-gray-600">
Choose venues based on real player ratings.
</p>
</div>

</div>

</section>


{/* UPCOMING FEATURES */}

<section className="bg-gray-100 py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
Upcoming Features
</h2>

<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

<div>

<h3 className="font-semibold text-xl mb-4">
Need Players?
</h3>

<ul className="space-y-3 text-gray-600">
<li>• Create matches with venue and time.</li>
<li>• Invite nearby players to join.</li>
<li>• Approve players and start playing.</li>
</ul>

</div>

<div>

<h3 className="font-semibold text-xl mb-4">
Looking for Team?
</h3>

<ul className="space-y-3 text-gray-600">
<li>• Discover matches nearby.</li>
<li>• Join available games.</li>
<li>• Connect with sports communities.</li>
</ul>

</div>

</div>

</section>


{/* FAQ */}

<section className="py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
Frequently Asked Questions
</h2>

<div className="max-w-4xl mx-auto space-y-4">

{faqs.map((faq,index)=>(
<div key={index} className="border rounded-xl overflow-hidden">

<button
onClick={()=>setOpen(open===index?null:index)}
className="w-full flex justify-between items-center p-6 font-semibold text-left"
>

{faq.q}

<span>
{open===index? "-" : "+"}
</span>

</button>

{open===index && (
<div className="px-6 pb-6 text-gray-600">
{faq.a}
</div>
)}

</div>
))}

</div>

</section>


{/* FOOTER */}

<footer className="bg-gray-900 text-gray-300 pt-16 pb-8">

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">

<div>

<h2 className="text-3xl font-bold text-white mb-3">
BOOKIFY
</h2>

<p className="text-gray-400">
Your sports community platform to discover venues and play instantly.
</p>

</div>


<div>

<h3 className="text-lg font-semibold text-white mb-4">
Company
</h3>

<ul className="space-y-2">
<li className="hover:text-white cursor-pointer">About Us</li>
<li className="hover:text-white cursor-pointer">Contact</li>
<li className="hover:text-white cursor-pointer">Careers</li>
<li className="hover:text-white cursor-pointer">Partner With Us</li>
</ul>

</div>


<div>

<h3 className="text-lg font-semibold text-white mb-4">
Follow Us
</h3>

<div className="flex gap-4">
<span>Instagram</span>
<span>Facebook</span>
<span>LinkedIn</span>
</div>

</div>

</div>

<div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">

<div className="flex justify-center gap-6 mb-4 flex-wrap">

<span>FAQs</span>
<span>Privacy Policy</span>
<span>Terms of Service</span>
<span>Cancellation Policy</span>

</div>

© 2026 Bookify. All rights reserved.

</div>

</footer>

</div>

)

}

export default Home