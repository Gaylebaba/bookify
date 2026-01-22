

function Authlay({ children,image }){
    return(
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* left side div */}
            <div className="flex items-center justify-center px-4 sm:px-6  ">
        <div className="w-full max-w-md">
        {children}
        </div>
            </div>
         {/* right side div */}
         
         <div className="hidden md:block bg-cover bg-center"
         style={{ backgroundImage: `url(${image})`}} >

            {/* <div className="absolute inset-0 "></div> */}
         </div>
        </div>
    );
}

export default Authlay;