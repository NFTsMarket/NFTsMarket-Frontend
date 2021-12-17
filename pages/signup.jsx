import { useState } from "react";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First Name" {...register("firstName")} />
      <input type="text" placeholder="Last Name" {...register("lastName")} />
      <input type="password" placeholder="Password" {...register("password")} />
      <input type="submit" />
    </form>
  );
}

export default SignUp;
