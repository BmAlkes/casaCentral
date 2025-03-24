import { Button, Group } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
}) => {
  const [imageUrl, setImageUrl] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  
  const handleNext =()=>{
    setPropertyDetails((prev)=>({...prev,image:imageUrl}))
    nextStep()
  }

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "landingpage2",
        uploadPreset: "o2w04ml6",
        maxFile: 1,
      },
      (err, result) => {
    
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="mt-12 flexCenter flex-col" onClick={() => widgetRef.current?.open()}>
      {!imageUrl ? (
        <div className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer">
          <MdOutlineCloudUpload size={44} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div onClick={() => widgetRef.current?.open()}>
          <img src={imageUrl} alt="" className="h-full max-h-96 w-full object-cover cursor-pointer" />
        </div>
      )}
      <Group justify="center" mt="xl">
                    <Button onClick={prevStep}>Go Back</Button>
                    <Button onClick={handleNext} disabled={!imageUrl}>Next step</Button>
                  </Group>
    </div>
  );
};

export default UploadImage;
