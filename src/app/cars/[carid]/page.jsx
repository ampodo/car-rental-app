import React from 'react'

function CarInfo({ params }) {
    
  return (
    <div>
     <h1 className="text-xl font-normal text-black">CarInfo</h1> 
     <p> Car Id : {params.carid}</p>
     </div>
  );
}

export default CarInfo;