type TextInputProps = {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function TextInput({
    label,
    name,
    value,
    type = 'text',
    onChange
}: TextInputProps) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
            ></input>
        </div> 
  );
}

export default TextInput;