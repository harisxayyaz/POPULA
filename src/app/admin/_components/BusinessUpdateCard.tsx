import Image from "next/image";

interface DynamicComponentProps {
  title: string;
  status: string;
  imagePath: string;
  description: string;
  icon1Path?: string;
  icon2Path?: string;
}

const BusinessUpdateCard: React.FC<DynamicComponentProps> = ({
  title,
  status,
  imagePath,
  description,
  icon1Path = "/admin/eye.svg",
  icon2Path = "/admin/bin.svg",
}) => {
  return (
    <div className="bg-[#0F8595BA] flex flex-col cursor pointer hover:-translate-y-2 duration-500 hover:drop-shadow-md ease-in-out gap-2 !w-[350px] p-6 text-white rounded-2xl">
      <div className="flex gap-4 justify-center items-center w-full">
        <Image src={imagePath} alt="status image" width={45} height={45} />
        <div>
          <h1 className="font-bold text-[16px]">{title}</h1>
          <p>{status}</p>
        </div>
      </div>
      <p className="bg-[#D9D9D91F] h-full font-normal rounded-lg p-2">{description}</p>
      <div className="w-full flex justify-center items-center gap-4 text-white">
        <Image src={icon1Path} width={40} height={40} alt="icon 1" />
        <Image src={icon2Path} width={40} height={40} alt="icon 2" />
      </div>
    </div>
  );
};

export default BusinessUpdateCard;
