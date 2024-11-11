import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    try {
      const res = await login(data).unwrap();
      
      dispatch(setCredentials({ ...res }));
      setTimeout(() => {
        navigate("/dashboard")
      },1000)
    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password")
    }
  };
  useEffect(() => {
    if (userInfo) {
        toast.success("Welcome Back")
        navigate("/dashboard")

    }
  }, [navigate, userInfo]);

  return (
    <div className="max-w-[1600px] mx-auto px-3">
      <div className="flex flex-col gap-8">
      <h1 className="text-6xl font-semibold text-center">Welcome back!</h1>
      <p className="text-center text-lg">Please login to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 mt-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg">Username</label>
          
          <input
            id="username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
              
            })}
            className="px-3 py-2 outline-none border border-black rounded-md"
            placeholder="enter username"
          />
          {errors.username && <span className="text-red-500">Min length 3 and Max length 20</span>}
         
        </div>
        <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg">Password</label>
          <input
            type="password"
          id="password"
            {...register("password", { minLength: 5,required: true })}
            className="px-3 py-2 outline-none border border-black rounded-md"
            placeholder="enter password"
          />
          {errors.password && <span className="text-red-500">Min length 5</span>}
        </div>

        <button className="bg-green-500 px-9 py-3 rounded-md hover:scale-95 transition-transform" type="submit">Login</button>
      </form>
      <Toaster />

    </div>
  );
};

export default Login;
