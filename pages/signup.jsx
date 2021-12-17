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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: "Enter your first name" })}
        />
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: "Enter your last name" })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Enter a password",
            minLength: {
              value: 6,
              message: "Your password should be at least 6 characters long",
            },
          })}
        />
        <input type="submit" />
      </form>
      {errors.firstName && <p>{errors.firstName.message}</p>}
      {errors.lastName && <p>{errors.lastName.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
    </>
  );
}

export default SignUp;
