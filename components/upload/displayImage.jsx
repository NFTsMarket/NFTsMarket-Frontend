import React, { useState } from "react";
import {Center} from "@chakra-ui/react";
import Image from 'next/image'

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Center>
    <div>
      {selectedImage && (
        <div>
        <Image alt="not fount" width={"250px"} height={"400px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
    </Center>
  );
};

export default UploadAndDisplayImage;