import { useForm } from 'react-hook-form';
import './register.css'
type IFormInput = {
    username: string;
    password: string;
    passwordComfirm: string;

}
export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit = (data: IFormInput) => {
        console.log(data);
        data.password !== data.passwordComfirm ?  alert('Password is not match') : alert('Ok!!');
       
    
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="container">
                    <div className="row">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <form onSubmit={handleSubmit(onSubmit)} method="POST" action="#" role="form">
                                    <div className="form-group">
                                        <h2>Create account</h2>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label" htmlFor="signupEmail">Username</label>
                                        <input  {...register("username", { required: true, maxLength: 20 })}
                                            id="signupEmail" type="text" className="form-control" />
                                        {errors?.username?.type === "required" && <p>This field is required</p>}
                                        {errors?.username?.type === "maxLength" && (
                                            <p>Username cannot exceed 20 characters</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label" htmlFor="signupPassword">Password</label>
                                        <input  {...register("password", { required: true })}
                                            id="signupPassword" type="password"  className="form-control"  />
                                         {errors?.password?.type === "required" && <p>This field is required</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="signupPasswordagain">Password again</label>
                                        <input  {...register("passwordComfirm", { required: true },
                                        
                                        )}
                                            id="signupPasswordagain" type="password"  className="form-control" />
                                         {errors?.passwordComfirm?.type === "required" && <p>This field is required</p>}
                                    
                                    </div>
                                    <div className="form-group">
                                        <button id="signupSubmit" type="submit" className="btn btn-info btn-block">Create your account</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;