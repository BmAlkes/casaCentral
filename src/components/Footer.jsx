import React from "react";
import { Link } from "react-router-dom";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../constant/data";

const Footer = () => {
  return (
    <footer className="max-padd-container">
      <div className="max-padd-container bg-primary roundend-tr-3xl pt-12 xl:pt-2p pb-8">
        <h3 className="h3">Explore real state opportunities with us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          ad dolores commodi alias, ex fuga vero voluptatibus numquam
          perspiciatis corporis amet cum similique distinctio assumenda
          voluptatum ducimus veritatis harum officia?
        </p>
        <hr  className="my-8 bg-slate-800/30 h-[2px]"/>
        {/* container */}
        <div className="flex justify-between flex-wrap gap-2">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-x-2">
              <span className="font-[900] text-[24px]">
                Casa <span className="font-[600] medium-20 ">Central</span>
              </span>
            </Link>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              quae aut similique fugit culpa illum maxime cumque. Odio, saepe
              eligendi repellendus explicabo, dolore doloremque nam consequatur
              ad esse ex fugit.
            </p>
          </div>
          <div className="FlexBetween pl-6  h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none"
            />

            <button className="btn-secondary rounded-full relative right-[0.33rem]">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-8">
          {FOOTER_LINKS.map((col) => (
            <FooterColumn key={col.title} title={col.title}>
              <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                {col.links.map((link)=>(
                  <Link to={"/"} key={link} className="hover:text-secondary">{link}</Link>
                ))}
              </ul>
            </FooterColumn>
          ))}
          <div className=" flex flex-col gap-5">
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link)=>(
                <Link key={link.label} className="flex gap-4 md:flex-col lg:flex-row hover:text-secondary">
                  <p>{link.label}</p>:<p>{link.value}</p>
                </Link>
              ))}
            </FooterColumn>
          </div>
          <div className="flex ">
            <FooterColumn title={SOCIALS.title}>
              <ul className="flex gap-4">
                {SOCIALS.links.map((link)=>(
                  <Link key={link.id} to={'/'} className="text-xl hover:bg-secondary rounded-full p-2" >{link.icon}</Link>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>
      {/* copyright */}
      <hr  className="my-8 bg-slate-800/30 h-[2px] bg-primary"/>
      <div className="bg-primary flex justify-between items-center">
      <div>
        <img src="https://res.cloudinary.com/landingpage2/image/upload/v1739727604/5000x5000-3-removebg-preview_qvlhb9.webp" alt="" className="w-80" />
      </div>
      <div>
          <span className="text-center">All rights reserved Dotvizion </span> 
        <p className="">

Dotvizion Solutions for web applications – ©2023
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};
