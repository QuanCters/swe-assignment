import { HttpError } from "@/errors/HttpError";

const BaseUrl = import.meta.env.VITE_API_URL;

export const confirmThenRedirect = async (password: any, price: any, page: any) => {
  //First of all, confirm correct password
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
  
  //then generate a link to MOMO
  const response = await fetch(`${BaseUrl}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token
    },
    body: JSON.stringify(price),
  });

  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  console.log(result);

  if (result.message.resultCode != 0) throw new HttpError(result.message.message, result.message.resultCode);

    localStorage.setItem('pageCount', page);
    localStorage.setItem('orderId', result.message.orderId);
    return result;
};

export const updatePageBalance = async (dataPageCount: any) => {
  const access_token = localStorage.getItem("access-token");
  const userID = localStorage.getItem("userID");
  if (!access_token || !userID) {
    throw new Error(
      "Access token or userID not found. Please try to login again"
    );
  }
  // const responseOrder = await fetch(`${BaseUrl}/payment/status`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     CLIENT_ID: "x-client-id",
  //     AUTHORIZATION: access_token,
  //   },
  //   body: JSON.stringify(dataOrderId),
  // });
  // if (!responseOrder.ok) throw new HttpError(responseOrder.statusText, responseOrder.status);
  // const resultOrder = await responseOrder.json();

  // if (resultOrder.orderId != 0) throw new HttpError(responseOrder.statusText, responseOrder.status);

  //then update balance
  const response = await fetch(`${BaseUrl}/student/${userID}/buyPages`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
    },
    body: JSON.stringify(dataPageCount),
  });

  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  return result;
};

export const checkStatus = async (dataOrderId: any) => {
  const access_token = localStorage.getItem("access-token");
  const userID = localStorage.getItem("userID");
  if (!access_token || !userID) {
    throw new Error(
      "Access token or userID not found. Please try to login again"
    );
  }
  const responseOrder = await fetch(`${BaseUrl}/payment/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
    },
    body: JSON.stringify(dataOrderId),
  });
  if (!responseOrder.ok) throw new HttpError(responseOrder.statusText, responseOrder.status);
  const resultOrder = await responseOrder.json();
  return resultOrder;
}
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
