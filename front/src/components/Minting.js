import React, { useState } from "react";
import './Minting.css';
import { post } from 'axios';

function Minting() {
    const [imageSrc, setImageSrc] = useState(''); 
    
    const encodeFileToBase64 = (fileBlob) => { 
        const reader = new FileReader(); 
        reader.readAsDataURL(fileBlob); 
        return new Promise((resolve) => { 
            reader.onload = () => { 
                setImageSrc(reader.result); 
                resolve(); 
            
            }; 
        }); 
    }; 
    
    return ( 
    <main className="container"> 
    <h2>이미지 미리보기</h2> 
    <input type="file" onChange={
        (e) => { encodeFileToBase64(e.target.files[0]); 
    }} /> 
    <div className="preview"> 
    {imageSrc && <img src={imageSrc} alt="preview-img" />} 
    </div> 

    <form>
    <label>
     <span>이름</span>
     <input type="text" name="name" />
     </label>

    <label className="textInfo">
     <span>정보</span>
     <input type="text" name="name" />
     </label>

     <label className="textInfo">
     <span className="textInfo">가격</span>
     <input type="text" name="name" />
     </label>

  <input type="submit" value="Submit" />

</form>

    </main> 
    );

}


export default Minting;