export const regexpPass = new RegExp(
  `(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$`
);
export const usernameRegexp = new RegExp(`^[a-zA-Z0-9.]*$`);
