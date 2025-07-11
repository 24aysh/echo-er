export const Input = ({
  type,
  placeholder,
  className = "",
  ref,
  onInput
}) => {
  return (
    <span className={`text-white cursor-pointer rounded-2xl bg-blue-500 ${className} `}>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-blue-500 outline-none w-96"
        ref={ref}
        onInput={onInput}
      />
    </span>
  );
};
