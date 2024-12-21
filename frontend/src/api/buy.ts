import { HttpError } from "@/errors/HttpError";

const BaseUrl = import.meta.env.VITE_API_URL;

export const updatePageBalance = async (data: any, password: any) => {
  const access_token = localStorage.getItem("access-token");
  const userID = localStorage.getItem("userID");
  if (!access_token || !userID) {
    throw new Error(
      "Access token or userID not found. Please try to login again"
    );
  }

  const responsePassword = await fetch(`${BaseUrl}/user/confirm-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
    },
    body: JSON.stringify(password),
  });

  if (!responsePassword.ok) throw new Error('Invalid password, please try again.');
  const resultPassword = await responsePassword.json();

  if (resultPassword.status !== 200)
    throw new HttpError(resultPassword.message, resultPassword.status);
  //then update balance
  const response = await fetch(`${BaseUrl}/student/${userID}/buyPages`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  return result;
};

// export const confirmPassword = async (data: any) => {
//   const access_token = localStorage.getItem("access-token");
//   const userID = localStorage.getItem("userID");
//   if (!access_token || !userID) {
//     throw new Error(
//       "Access token or userID not found. Please try to login again"
//     );
//   }
//   const response = await fetch(`${BaseUrl}/user/confirm-password`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       CLIENT_ID: "x-client-id",
//       AUTHORIZATION: access_token,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new HttpError(response.statusText, response.status);
//   const result = await response.json();
//   return result;
// };
