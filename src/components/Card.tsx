import React from "react";
import Image from "next/image";

type CardProps = {
    title?: string;
    text?: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
    return (
        <>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image src="https://placekitten.com/640/360" width="360" height="640" alt="Card Image" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{props.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{props.text}</p>
            {children}
        </>
    )
}

export default Card;