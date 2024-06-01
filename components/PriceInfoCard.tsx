import Image from "next/image";

interface Props{
    title: string;
    iconSrc: string;
    value: string;
    borderColor: string; 
}


const PriceInfoCard = ({title, iconSrc, value, borderColor}: Props) => {
  return (
    <div className={`price-info_card border-1-[${borderColor}]`}>
        <p className="text-base text-black-100">
           {title} 
        </p>

        <div className="flex gap-2">
            <Image src={iconSrc} alt="title" width={24} height={24} />
            <p className="text-1xl font-semibold text-black">{value}</p>
        </div>
    </div>
  )
}

export default PriceInfoCard;