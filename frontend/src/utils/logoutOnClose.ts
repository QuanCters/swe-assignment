import { useAuth } from "@/hooks/useAuth";

let navigating = false;

const setupLogoutOnClose = () => {
  // Xử lý sự kiện click vào liên kết hoặc điều hướng
  document.querySelectorAll("a, .navigateBtn").forEach((element) => {
    element.addEventListener("click", () => {
      navigating = true;
    });
  });

  // Xử lý onbeforeunload
  // based on suggestion from https://stackoverflow.com/a/38495856
  window.addEventListener("beforeunload", (event) => {
    if (!navigating) {
      const { isSPSO, signOut } = useAuth();
      const access_token = localStorage.getItem("access-token");
      const api_key = localStorage.getItem("x-api-key");
      if (!access_token || (!api_key && isSPSO())) {
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        AUTHORIZATION: access_token,
      };
      signOut();
      fetch(
        `http://localhost:5000/v1/api/user/logout-${isSPSO() ? "spso" : "student"}`,
        {
          keepalive: true,
          method: "POST",
          headers: headers,
        }
      );
    }
    return;
  });

  // Reset biến navigating sau khi trang được tải
  window.addEventListener("pageshow", () => {
    navigating = false;
  });
};

export default setupLogoutOnClose;
