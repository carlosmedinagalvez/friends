type FieldErrorProps = {
    message?: string;
}
function FieldError({ message }: FieldErrorProps) {
    if (!message) return null;
    return <p className="error">{message}</p>;
}
export default FieldError;