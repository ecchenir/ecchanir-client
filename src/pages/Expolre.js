import React from 'react' 
import pant1 from "../assists/Explore/pant-1.avif" 
import pant2 from "../assists/Explore/pant-2.avif" 
import pant3 from "../assists/Explore/pant-3.avif" 
import shirt1 from "../assists/Explore/t-shirt1.avif" 
import shirt2 from "../assists/Explore/t-shirt2.avif" 
import shirt3 from "../assists/Explore/t-shirt3.avif" 
import "../styles/Explore.css";


const Expolre = () => {
  return (
        
        <div className="container-fluid row mt-3 explore">
          <h2 className="text-center  show p-2">""Explore""</h2>
          <div className="row  p-5 m-5">
                {/*Start Explore  */}
                {/* First Exploring */}

                <div className="col-md-4">
                <div className="card" style={{width: '18rem'}}>
  <img src={pant1} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/* End First Exploring */}
                </div>
                
                <div className="col-md-4">
                 {/* 2nd Exploring */}
<div className="card" style={{width: '18rem'}}>
  <img src={pant2} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/*  End 2nd Exploring */}
                </div>
                <div className="col-md-4">
                 {/* 2nd Exploring */}
<div className="card" style={{width: '18rem'}}>
  <img src={pant3} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/*  End 2nd Exploring */}
                </div>





                {/* End Explore */}
          </div>
          <div className="row p-5 m-5">
              <div className="col-md-4">
                {/* 3rd Explore */}
<div className="card" style={{width: '18rem'}}>
  <img src={shirt1} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/*  End 3rd Explore */}

              </div>
              <div className="col-md-4">
             {/* 4th Explore */}
<div className="card" style={{width: '18rem'}}>
  <img src={shirt2} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/*  End 4ths Explore */}

              </div>
              <div className="col-md-4">
             {/* 5th Explore */}
<div className="card" style={{width: '18rem'}}>
  <img src={shirt3} className="card-img-top" alt="..." height="250px" />
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{/*  End 5ths Explore */}

              </div>
          </div>
        </div>
       
        
       
    
  )
}

export default Expolre