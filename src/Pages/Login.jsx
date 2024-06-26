import "@/styles/form.css";
import { useForm } from "react-hook-form";
import { loginUserService } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hook/useAuthContext";
export const Login = () => {
  const {
    register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const onSubmit = async (data) => {
    try {
      const response = await loginUserService(data);
      if (response.status === 200) {
        navigate("/");
        console.log("Usuario autenticado de forma exitosa");
        login(response.data.token);
      }
    } catch (error) {
      console.log("Ocurrió un error en Login", error);
    }
  };
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
      </form>
    </main>
  );
};
