import { HttpError } from "@/errors/HttpError";

const BaseUrl = "http://localhost:5000/v1/api";


// export const updatePageBalance = async (data: any) => {
//     try {
//       const access_token = localStorage.getItem("access-token");
//       const api_key = localStorage.getItem("x-api-key");
    
//       const userID = localStorage.getItem("userID");
//       if (!access_token || !api_key) {
//         throw new Error(
//           "Access token or x-api-key not found. Please try to login again"
//         );
//       }
//       const response = await fetch(`${BaseUrl}/student/${userID}/buyPages`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           CLIENT_ID: "x-client-id",
//           AUTHORIZATION: access_token, // Định dạng nội dung gửi là JSON
//           "x-api-key": api_key,
//         },
//         body: JSON.stringify(data), // Convert formData thành JSON
//       });
//       if (!response.ok)
//         throw new HttpError(response.statusText + data.id, response.status);
//     } catch (err) {
//       console.error("Page balance updated", err);
//       throw err;
//     }
//   };

  export const updatePageBalance = async (data: any) => {
    const access_token = localStorage.getItem("access-token");
    const userID = localStorage.getItem("userID");
    if (!access_token || !userID) {
      throw new Error(
        "Access token or userID not found. Please try to login again"
      );
    }
    console.log(JSON.stringify(data));
    const response = await fetch(
      `${BaseUrl}/student/${userID}/buyPages`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          CLIENT_ID: "x-client-id",
          AUTHORIZATION: access_token,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    return result;
  };
  