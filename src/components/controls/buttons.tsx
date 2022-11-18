import React from "react";

export interface ButtonProps {
    children: React.ReactNode;
    className?: string; // tailwind classes
    onClick?: () => void;
    type?: "submit" | "button";
    variant?: string; // default, primary, warning
    size?: string; // sm, md, lg
    disabled?: boolean;
    loading?: boolean;
}

export const buttonDefaultProps: ButtonProps = {
    children: null,
    className: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => { },
    variant: "default",
    type: "button",
    size: "sm",
    disabled: false,
    loading: false
}

const variantClassNames: Record<string, string> = {
    // TODO other color variants
    default: `bg-neutral-700 hover:bg-neutral-600  active:bg-neutral-800 focus:ring-neutral-400`,
    primary: `bg-blue-500 hover:bg-blue-400  active:bg-blue-700 focus:ring-blue-700`,
    secondary: `bg-blue-500 hover:bg-blue-400  active:bg-blue-700 focus:ring-blue-700`,
    brand: `bg-purple-800 hover:bg-purple-600  active:bg-purple-700 focus:ring-purple-700`,
    warning: `bg-blue-500 hover:bg-blue-400  active:bg-blue-700 focus:ring-blue-700`
}


export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    props = { ...buttonDefaultProps, ...props };
    // TODO size and loading anim
    const { className, children, variant, size, loading, ...rest } = props;
    const defaultClassName = variantClassNames[variant ?? "default"];
    return (
        <>
            <button
                className={`
                    text-sm text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-opacity-75
                    
                    px-4 py-2
                    rounded uppercase
                    shadow-md hover:shadow-lg outline-offset-0
                    
                    ${defaultClassName}
                    ${className}
                `}
                {...rest}
            >
                {children}
            </button>
        </>
    )
}

export default Button;
