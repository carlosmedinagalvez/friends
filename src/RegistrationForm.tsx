import {useState} from 'react';
import TextInput from './TextInput';

function RegistrationForm(){
    const [form, setForm] = useState({ nombre:'', ciudad:'' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Nombre: ',form.nombre);
        console.log('ciudad: ',form.ciudad);
    }
  return (
      <form onSubmit={handleSubmit}>
          <TextInput label="Nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} />
          <TextInput label="ciudad" name="ciudad" type="text" value={form.ciudad} onChange={handleChange} /> 
          <button type="submit">Enviar</button>
    </form>
  );
}
export default RegistrationForm;