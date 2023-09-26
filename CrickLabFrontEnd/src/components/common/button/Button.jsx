const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon,
  optional,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full 
        ${outline ? "bg-white" : "bg-blue-500"} 
        ${outline ? "border-black" : "border-white-500"} 
        ${outline ? "text-black" : "text-white"} 
        ${small ? "py-1" : "py-3"} 
        ${small ? "font-light" : "font-semibold"} 
        ${small ? "border-[1px]" : "border-2"} 
        ${optional}
        `}
      >
        {Icon}
        {label}
      </button>
    </>
  );
};

export default Button;
