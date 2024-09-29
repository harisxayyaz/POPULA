import React from 'react'

const Sidebar = () => {
  return (
    <section
        className="flex flex-col gap-3 justify-center items-center md:h-full md:w-[60%] bg-[#270139] text-center md:text-left py-8 px-24 bg-cover bg-center "
        style={{ backgroundImage: "url('/design.svg')" }}
      >
        <img
          src="/whiteLogo.svg"
          alt="white logo"
          className="h-12 md:block hidden"
        />

        <img src="/user.png" alt="user photo" className="h-24 w-24" />
        <p className="text-white text-center">
          “POPULA provided exceptional service, exceeding my expectations and
          leaving me extremely satisfied.”
        </p>
        <p className="text-[#31A1A1] text-center tracking-widest">
          ANTON VILLE | CEO, ADC PHARM.
        </p>
      </section>
  )
}

export default Sidebar