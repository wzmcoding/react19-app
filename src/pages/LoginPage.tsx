import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useStore } from '../store';

interface LoginForm {
    username: string;
    password: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const login = useStore(state => state.login);

    const onSubmit = async (data: LoginForm) => {
        try {
            await login(data.username, data.password);
            navigate('/');
        } catch (error) {
            console.error('登录失败:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl mb-4">Sweet Days</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">用户名</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('username', { required: '请输入用户名' })}
                            />
                            {errors.username && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.username.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">密码</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                {...register('password', { required: '请输入密码' })}
                            />
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password.message}</span>
                                </label>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            登录
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 