import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProperty, removeBooking } from "../utils/api";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import HeartBtn from "../components/HeartBtn";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import Map from "../components/Map";

import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../components/BookingModal";
import UserDetailContext from "../Context/userDetailsContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { token, bookings },
    setUserDetail,
  } = useContext(UserDetailContext);


  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking Canceled",{position:'bottom-right'})
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }
  return (
    <section className="max-padd-container my-[99px]">
      <div className="pb-2 relative">
        <img
          src={data.image}
          alt={data.title}
          className="rounded-xl max-h-[27rem] self-center w-full object-cover"
        />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn id={id} />
        </div>
      </div>
      {/* container */}
      <div className="xl:flexBetween gap-8">
        <div className="flex-1">
          <h5 className="bold-16 my-1 text-secondary">{data.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18 line-clamp-1">{data.title}</h4>
            <div className="bold-20">${data.price}.00</div>
          </div>
          {/* info */}
          <div className="flex gap-x-2 py-2">
            <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed />
              {data.facilities.bedrooms}
            </div>
            <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathtub />
              {data.facilities.bathrooms}
            </div>
            <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage />
              {data.facilities.parkings}
            </div>
            <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <CgRuler />
              400
            </div>
          </div>
          <p className="pt-e mb-4 ">{data.description}</p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {data.address} - {data.city} - {data.country}
            </div>
          </div>
          <div className="flexBetween">
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button variant="outline" w={"100%"} color="red" disabled={cancelling} onClick={()=>cancelBooking()} >
                  Cancel booking
                </Button>
                <p className="text-red-500 medium-15 ml-3">
                  You've already booked visit for{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date} at {bookings?.time}
                </p>
              </>
            ) : (
              <button
                className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm w-full "
                onClick={() => validateLogin() && setModalOpened(true)}
              >
                Book The Visit
              </button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <Map address={data.address} city={data.city} country={data.country} />
        </div>
      </div>
    </section>
  );
};

export default Property;
