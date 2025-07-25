import Image from "next/image";
import React from "react";
import img1 from "../../public/Assets/images/67b3181d8d487b310912ba63_empower-image.jpg";

import { Button } from "../ui/button";

const Inspiration = () => {
  return (
    <div className="flex sm:flex-row-reverse flex-col-reverse md:flex-row items-center justify-between gap-4 p-4">
      {/* part left */}

      <div className="flex flex-col items-end sm:w-[50%] justify-center gap-4 p-4 ">
        <Image src={img1} alt="image_1" />
      </div>

      {/* part right */}
      <div className="flex flex-col items-center h-[355px]  sm:w-[50%] sm:  gap-4 p-4  ">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl font-light">
            Empowering style through elegance and thoughtful design Inspire.
          </h1>
          <p>
            From everyday essentials to standout statement pieces, each item is
            thoughtfully designed to ensure quality, comfort, and elegance. We
            take pride in crafting clothing that complements every aspect of
            your lifestyle
          </p>
        </div>

        <div className="flex flex-col items-start  w-[100%]  justify-end gap-4">
          <Button> show now</Button>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
