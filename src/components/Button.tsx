import React from "react";

interface imageProp {
  url: string;
}

const Button = (props: imageProp) => {
  return (
    <button className="bg-white h-[35px] w-[120px] text-black items-center justify-center flex rounded">
      <img src={props.url} alt="google" className=" w-5 h-5" />
    </button>
  );
};

export default Button;
