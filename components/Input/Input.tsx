const Input = ({
  onChange,
  onEnterPress,
  type = 'string',
  placeholder = '',
  className = '',
  value = '',
}: any) => {
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (onEnterPress) {
        onEnterPress(e.target.value);
      }
    }
  };

  return (
    <input
      onChange={onChange}
      onKeyDown={handleKeyDown}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${className} border border-black focus:border-black focus:outline-black w-[30vw] px-1 py-2 focus:ring-0 rounded`}
    />
  );
};

export default Input;
