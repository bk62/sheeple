import React from "react";

// TODO reorganize or reimplement  - only some input types
export type HtmlInputProps = {
    autoFocus?: boolean;
    // onChange?: () => void;
    // onBlur?: () => void;
    // misc html attrs
    [x: string | symbol]: string | number | boolean | unknown;
}

export type CustomInputProps = {
    className?: string;
    disabled?: boolean;
    errorMessage?: string | null;
    placeholder?: string;
}

export type InputProps = HtmlInputProps & CustomInputProps & {
    type?: "file" | "number" | "password" | "range" | "search" | "text" | "url";
    ref?: React.Ref<HTMLInputElement>;
};

export type TextareaProps = HtmlInputProps & CustomInputProps & {
    rows?: number;
    cols?: number;
    ref?: React.Ref<HTMLTextAreaElement>;
}

export const FormError: React.FC<{ errorMessage: string }> = (props) => {
    return (
        <>
            <p
                className="text-xs text-red-600 "
            >
                {props.errorMessage}
            </p>
        </>
    )
}

const InputWithRef = (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { className, errorMessage, type, ...rest } = props;
    return (
        <>
            <input
                className={`
                    form-input

                    ${className}
                    ${errorMessage && "form-input-error"}
                `}
                type={type}
                ref={ref}
                {...rest}
            />
            {errorMessage && (
                <FormError
                    errorMessage={errorMessage}
                />
            )}
        </>
    );
}
export const Input = React.forwardRef(InputWithRef);

const TextareaWithRef = (props: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const { className, errorMessage, ...rest } = props;
    return (
        <>
            <textarea
                className={`
                    form-input
                    w-full

                    ${className}
                    ${errorMessage && "form-input-error"}
                `}
                ref={ref}
                {...rest}
            />
            {errorMessage && (
                <FormError
                    errorMessage={errorMessage}
                />
            )}
        </>
    );
}

export const Textarea = React.forwardRef(TextareaWithRef);

