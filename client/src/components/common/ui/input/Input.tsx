import './Input.styles.css'

const Input = ({ ref, ...props }: React.ComponentPropsWithRef<"input">) => {
    return <input ref={ref} {...props} />;
};

export { Input };
