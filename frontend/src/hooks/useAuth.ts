export const useAuth = () => {
  const signIn = (accessToken: string, apiKey?: string) => {
    localStorage.setItem("access-token", accessToken);
    if (apiKey) localStorage.setItem("x-api-key", apiKey);
  };

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("x-api-key");
  };

  const isLogged = () => localStorage.getItem("access-token");

  const isSPSO = () => localStorage.getItem("x-api-key");

  return { signIn, signOut, isLogged, isSPSO };
};

export type AuthContext = ReturnType<typeof useAuth>;
