import React from "react";
import { FaHeart } from "react-icons/fa6";
import HeartBtn from "./HeartBtn";
import {  MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from "react-icons/md";
import { Link } from "react-router-dom";
import {CgRuler} from 'react-icons/cg'

const Item = ({ property }) => {
  console.log(property);
  return (
    <div className="rounded-2xl p-5 bg-white shadow-2xl ">
      <div className="pb-2 relative">
        <img src={property.image} alt={property.title} className="rounded-xl" />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn />
        </div>
      </div>
      <h5 className="bold-16 my-1 text-secondary">{property.city}</h5>
      <h4 className='medium-18 line-clamp-1'>{property.title}</h4>
      {/* info */}
      <div className="flex gap-x-2 py-2">
        <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBed />
          {property.facilities.bedrooms}
        </div>
        <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBathtub />
          {property.facilities.bathrooms}
        </div>
        <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineGarage />
          {property.facilities.parkings}
        </div>
        <div className=" flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <CgRuler/>
          400
        </div>
      </div>
        <p className="pt-e mb-4 line-clamp-2">{property.description}</p>
        <div className="flexBetween">
            <div className="bold-20">${property.price}.000</div>
            <Link to={'/'}>
            <button className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-2xl">View Details</button></Link>
        </div>
    </div>
  );
};

export default Item;
