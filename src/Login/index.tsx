import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    username: string
    password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    console.log("watch(username)", watch("username"))
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    return <div className="flex flex-col gap-2 max-w-md m-auto p-4 translate-y-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input {...register("username")} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                </svg>
                <input {...register("password", { required: true })} />
            </label>
            {errors.password && <span className="text-red-500 my-3">This field is required</span>}
            <div className="mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
}