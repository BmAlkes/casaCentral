import { Container, Modal,Stepper, Button, Group } from "@mantine/core"
import { useState } from "react";
import AddLocation from "./AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "./UploadImage";
import Facilities from "./Facilities";
import BasicDetails from "./BasicDetails";


const AddPropertyModal = ({opened, setModalOpened}) => {
    const [active, setActive] = useState(0);
    const{user} = useAuth0()
    const [propertyDetails, setPropertyDetails] =useState({
       title:"",
       description:"",
       price:0,
       country:"",
       address:"",
       image:null,
    facilities:{
        bedrooms:0,
        parkings:0,
        bathrooms:0
    },
    userEmail:user?.email
    })
   
    const nextStep = ()=>{
        setActive((current)=>(current < 4 ? current + 1 : current  ))
    }
    const prevStep = ()=>{
        setActive((current)=>(current > 0 ? current - 1 : current  ))
    }

  return (
    <Modal opened={opened} onClose={()=>setModalOpened(false)} closeOnClickOutside size={"90rem"}>
        <Container h={"34rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Location" description="Address">
          <AddLocation nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails}/>
        </Stepper.Step>
        <Stepper.Step label="Images" description="Upload">
        <UploadImage prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails}/>
        </Stepper.Step>
        <Stepper.Step label="Basics" description="Details">
          <BasicDetails prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} setOpened={setModalOpened} setActiveStep={setActive} />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <Facilities prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} setOpened={setModalOpened} setActiveStep={setActive} />
        </Stepper.Step>
      </Stepper>

     
        </Container>

    </Modal>
  )
}

export default AddPropertyModal