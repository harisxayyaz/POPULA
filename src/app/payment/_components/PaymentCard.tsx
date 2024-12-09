import Image from "next/image";

interface DynamicCardProps {
  description: string;
  imagePath: string;
  listItems: string[];
}

const DynamicCard: React.FC<DynamicCardProps> = ({
  description,
  imagePath,
  listItems,
}) => {
  return (
    <div className="h-56 cursor-pointer active:border active:border-black flex w-[70%] rounded-lg bg-white overflow-hidden">
      <div className="h-full">
        <Image
          src={imagePath}
          className="h-full w-full object-cover"
          width={170}
          height={371}
          alt="dynamic-card-image"
        />
      </div>
      <div className="bg-white w-full p-4 gap-4 flex flex-col">
        <h1 className="font-semibold">{description}</h1>
        <div>
          <ul className="custom-bullets">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
