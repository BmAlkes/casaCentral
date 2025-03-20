import React from "react";
import { useQuery } from "react-query";
import { getProperty } from "../utils/api";
import { useLocation, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import HeartBtn from "../components/HeartBtn";
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from "react-icons/md";
import { CgRuler } from "react-icons/cg";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );


  if(isLoading){
    return(
      <div className="flex items-center justify-center h-64">
        <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading"/>
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }
  return <section className="max-padd-container my-[99px]">
        <div className="pb-2 relative">
        <img src={data.image} alt={data.title} className="rounded-xl max-h-[27rem] self-center w-full object-cover" />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn />
        </div>
      </div>
      {/* container */}
      <div className="flexBetween gap-8">
<div className="flex-1">

      <h5 className="bold-16 my-1 text-secondary">{data.city}</h5>
      <div className="flexBetween">

      <h4 className='medium-18 line-clamp-1'>{data.title}</h4>
      <div className="bold-20">${data.price}.000</div>
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
          <CgRuler/>
          400
        </div>
      </div>
        <p className="pt-e mb-4 ">{data.description}</p>
        <div className="flexBetween">
          
         
            <button className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-2xl" onClick={()=>navigate(`../listing/${data.id}`)} >View Details</button>
        </div>
</div>
{/* right side */}
<div  className="flex-1">
  map
</div>
      </div>
  </section>;
};

export default Property;
