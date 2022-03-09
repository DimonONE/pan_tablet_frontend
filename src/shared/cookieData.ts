export const setCookieData = (): void => {
  localStorage.setItem("korev", "fivmvvro");
};

export const getCookieData = (): string | null => {
  return localStorage.getItem("korev");
};
