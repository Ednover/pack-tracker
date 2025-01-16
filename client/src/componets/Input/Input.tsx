interface InputProps {
  title: string;
  value: string;
  name: string;
  className?: string;
  bgColor?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  name,
  title,
  className = "",
  bgColor = "black",
  type = "text",
}) => {
  return (
    <div className="m-2 flex flex-col justify-center items-center gap-1">
      <label className="text-center" htmlFor="">
        {title}
      </label>
      <input
        className={`px-2 py-1 w-fit border border-black ${className}`}
        style={{ backgroundColor: bgColor }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
