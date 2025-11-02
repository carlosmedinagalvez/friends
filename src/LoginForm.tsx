import { z } from 'zod';
import FieldError from './FieldError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginSchema = z.object({
    email: z.email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
});
type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = (data: LoginForm) => {
        console.log('Logging in with: ', data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Email" />
            <FieldError message={errors.email?.message} />

        </form>
    )
}
export default LoginForm;
