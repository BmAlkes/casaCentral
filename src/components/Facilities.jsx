import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../Context/userDetailsContext";
import useProperties from "../hooks/useProperties";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../utils/api";

const Facilities = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) =>
        value < 1 ? "Must have at least one bedroom" : null,
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, bathrooms, parkings } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        bathrooms,
        bedrooms,
        parkings,
      }));
    }
    console.log(propertyDetails);
    mutate();
  };

  const { user } = useAuth0();
  const {
    userDetail: { token },
  } = useContext(UserDetailContext);
  const { refetch } = useProperties();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bathrooms, bedrooms, parkings },
        },
        token,
        user?.email
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          bathrooms: 0,
          parkings: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false), setActiveStep(0);
      refetch();
    },
  });

  return (
    <Box maw={"30%"} mx="auto" my={"sm"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="N* of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          withAsterisk
          label="N* of Parkins"
          min={0}
          {...form.getInputProps("parkins")}
        />
        <NumberInput
          withAsterisk
          label="N* of Bathrooms "
          min={0}
          {...form.getInputProps("bathrooms")}
        />

        <Group justify="center" mt="xl">
          <Button onClick={prevStep} variant="default">
            {" "}
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
