import React from "react";
import Link from "next/link";

const Logo: React.FC<{ className: string }> = ({ className, ...otherProps }) => {
    return (
        <Link href="/" className={`logo text-2xl font-semibold leading-normal tracking-tight text-brand ${className}`} {...otherProps}>
            sheeple
        </Link>
    );
}

export default Logo;