import React from 'react'
import homeImage from '../img/register.jpg'

const HomeImage = ({classname})=>{
    return (
        <div className="d-flex justify-content-center align-items-center">
            <img src={homeImage} alt="Home image" className={classname} style= {{height:'100vh',objectFit:'cover'}} />
        </div>
    )
};

export default HomeImage;