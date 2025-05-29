import React from "react";
import logo from "@/public/Assets/images/67b03fa3aaf1e19b18d61d66_sale-img.jpg";
import logo1 from "@/public/Assets/images/67b03fa3ac26ee049c25c795_sale-image.jpg"
import Image from "next/image";
import { Button } from "./button";
const Bonus = () => {
  return (
    <div className="flex sm:flex-row gap-10 flex-col py-28 px-10">
      <div className="border sm:w-[50%] bg-[#EEE8E6] flex px-10 py-8 gap-3 ">
        <div className="flex flex-col gap-10 py-9">
          <h1 className="text-4xl">Exclusive winter sale save more!</h1>
          <p className="text-xl">
            Shop today and enjoy up to 40% off all outerwear and accessories!
          </p>
          <Button className="w-36"> issa</Button>
        </div>
        <div className=" relative w-[600px]">
          <Image src={logo1} alt="ko" className="w-full h-full sm:object-cover object-center" />
        </div>
      </div>

      <div className="border sm:w-[50%] bg-[#E9EFF5] flex px-10 py-8 gap-3">
        <div className="flex flex-col gap-10 py-9">
          <h1 className="text-4xl">Seasonal Sale – Up to 50% Off!!</h1>
          <p className="text-xl">
          Shop now and save up to 50% on selected styles.
          </p>
          <Button className="w-36"> i </Button>


        </div>
        <div className=" relative  sm:w-[600px] w-96">
          <Image src={logo} alt="ko" className="w-full h-full  sm:object-cover object-center" />
        </div>
      </div>
    </div>
  );
};

export default Bonus;
