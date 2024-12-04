import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { loginWithRole } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;
    if (isLogged()) {
      throw redirect({ to: "/" });
    }
  },
});

enum Role {
  STUDENT = "0000",
  SPSO = "1111",
}

function Login() {
  const [account, SetAccount] = useState<Role>();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (e: any) => {
      e.preventDefault();

      const roleName =
        Object.keys(Role)
          .find((key) => Role[key as keyof typeof Role] === account)
          ?.toLowerCase() || "";
      // Logic xử lý form
      const formData = new FormData(e.target);
      const formObject: Record<string, string> = {};

      formData.forEach((value, key) => {
        if (value) {
          formObject[key] = value.toString();
        }
      });
      return loginWithRole(roleName, formObject);
    },
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const handleSubmit = async (e: any) => {
    mutation.mutate(e);
  };
  if (mutation.isLoading)
    return (
      <div className="w-full h-[100vh] bg-black/5 flex items-center justify-center fixed">
        <CircularProgress size={40} />
      </div>
    );

  return (
    <div className="flex py-12 justify-center items-center">
      <div className="shadow-2xl flex flex-col gap-14 p-12 w-[50vw] max-w-[512px] items-center rounded-2xl min-w-fit relative">
        {account && (
          <button
            className="rounded-full absolute left-10 top-7 bg-gray-500 h-7 aspect-square flex items-center justify-center"
            type="button"
            onClick={() => {
              SetAccount(undefined);
            }}
          >
            <FaArrowLeft className="text-white" />
          </button>
        )}
        <img
          src="src/assets/hcmut.png"
          alt="hcmut.png"
          className="h-40 w-40 aspect-square"
        />
        <div className="w-full h-[2px] bg-black/40 rounded-full"></div>
        {!account && (
          <div className="flex flex-col items-start w-full gap-7">
            <h2 className="text-xl font-bold">
              Log in using your accounts on:
            </h2>
            <div className="flex flex-col gap-5 w-full">
              <button
                className="w-full py-3 bg-[#0052B4] font-bold text-white rounded-2xl focus:outline-2 focus:outline-red-600"
                onClick={() => {
                  SetAccount(Role.STUDENT);
                }}
              >
                HCMUT Account
              </button>
              <button
                className="w-full py-3 bg-[#0052B4] font-bold text-white rounded-2xl focus:outline-2 focus:outline-red-600"
                onClick={() => {
                  SetAccount(Role.SPSO);
                }}
              >
                Admin SPSO
              </button>
            </div>
          </div>
        )}
        {account && (
          <form
            className="flex flex-col w-full gap-7 -mt-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center">
              Login
              <span
                className={`font-normal text-base block ${account === Role.SPSO ? "hidden" : ""}`}
              >
                Using HCMUT account to login
              </span>
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="username" className="font-bold">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="email"
                  className="form-input bg-transparent rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-input bg-transparent rounded-md"
                />
              </div>
            </div>
            <button
              className="py-3 bg-[#0052B4] w-1/3 min-w-fit self-center font-semibold text-white mt-5 rounded-xl"
              type="submit"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
