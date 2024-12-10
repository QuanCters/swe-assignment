import { useAuth } from "@/hooks/useAuth";
import Tab from "./Tab";
import { useState } from "react";
import { useNavigate, useMatch } from "@tanstack/react-router";
import { Popover } from "@mui/material";
import { logoutWithRole } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const { isLogged, isSPSO, signOut } = useAuth();
  const match = useMatch({ from: "/login", shouldThrow: false });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const mutation = useMutation({
    mutationFn: () => {
      return logoutWithRole(isSPSO() ? "spso" : "student");
    },
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      signOut();
      navigate({ to: "/login" });
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSignOut = async () => {
    mutation.mutate();
  };

  return (
    <header className="sticky top-0 w-full min-w-fit flex items-center bg-primary h-[64px] text-justify drop-shadow-md justify-between px-8 z-50">
      <div className="left-sec flex items-center gap-8 h-full ">
        {/* Logo Section */}
        <div className="logo flex w-auto flex-row gap-4 items-center">
          <img
            src="./src/assets/hcmut.png"
            alt="Logo"
            className="aspect-square w-[3vw] h-[3vw] min-w-10 min-h-10"
          />
          <h1 className="w-[154px] text-black text-[18px] font-bold font-['Roboto'] leading-tight select-none">
            Smart Printing <br /> Service
          </h1>
        </div>
        {/* Tab Group Section */}
        <nav className="tab-group relative flex flex-row justify-center h-full flex-1 items-stretch">
          {/* Tab with Lines */}
          <Tab page="Home" route="/" routeMatch="/" wholeRoute={true} />
          {isLogged() && <Tab page="Printing History" />}
          {isLogged() && !isSPSO() && (
            <Tab page="Print" routeMatch="/_private/_student/_print" />
          )}
          {isLogged() && isSPSO() && (
            <Tab
              page="Manage"
              routeMatch="/_private/_spso/manage"
              route="/manage/printer"
            />
          )}
        </nav>
      </div>
      {/* Right Section */}
      {isLogged() && (
        <div className="right-sec flex items-center flex-row h-2/3 divide-x-2 divide-gray-500 select-none">
          <h2 className="bold text-[15px] p-4">
            {isSPSO() ? "SPSO" : "Student"} Name
          </h2>
          <button
            className="flex h-full items-center place-content-center flex-row gap-1 p-4"
            aria-describedby={id}
            onClick={handleClick}
          >
            <img className="w-9 h-9 rounded-full border-black border-2 min-w-9 " />
            <svg
              width="12"
              height="6"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L5 5L10 0H0Z" fill="black" fill-opacity="0.87" />
            </svg>
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: -80,
            }}
          >
            {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
            <div className="flex flex-col w-40 p-4">
              <button className="navigateBtn" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </Popover>
        </div>
      )}{" "}
      {!isLogged() && (
        <div>
          <button
            type="button"
            className="px-6 py-3 bg-[#0052B4] text-white font-semibold rounded-xl hover:bg-gradient-to-r hover:from-[#0052B4] hover:to-[#0074E8] transition-all ease-in duration-300 hover:shadow-[0px_4px_15px_rgba(0,116,232,0.5)]"
            onClick={() => {
              if (!match) navigate({ to: "/login" });
              else window.location.reload();
            }}
          >
            Login
          </button>
        </div>
      )}
      {mutation.isLoading && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999] bg-black/20 flex items-center justify-center">
          <CircularProgress size={40} />
        </div>
      )}
    </header>
  );
}
