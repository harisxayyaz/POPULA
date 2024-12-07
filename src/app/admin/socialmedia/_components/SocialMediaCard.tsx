import Image from "next/image";
import ToggleSwitch from "./ToggleSwitch";

interface GenericCardProps {
  imagePath: string;
  title: string;
  version: string;
  onToggle?: () => void; // Optional handler for the toggle button
}

const SocialMediaCard: React.FC<GenericCardProps> = ({
  imagePath,
  title,
  version,
}) => {
  return (
    <div className="flex flex-col w-[300px] h-[300px] border-2 border-[#e9eaeb] bg-white rounded-lg p-4">
      {/* Toggle Button Section */}
      <div className="flex justify-end">
        <ToggleSwitch/>
      </div>

      {/* Content Section */}
      <div className="flex flex-col h-full gap-4 w-full justify-center items-center">
        <Image src={imagePath} width={90} height={90} alt={title} />
        <h1 className="font-bold text-[24px] text-[#3B3F5C]">{title}</h1>
        <p className="text-[16px] text-gray-400">v {version}</p>
      </div>
    </div>
  );
};

export default SocialMediaCard;
