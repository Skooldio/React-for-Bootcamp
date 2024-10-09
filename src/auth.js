// Function to log in a user
export const login = async (username) => {
  if (username) {
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Wait for 2.5 seconds
    await Promise.resolve(localStorage.setItem("currentUser", username));
    return true;
  }
  return false;
};

// Function to log out the current user
export const logout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
  await Promise.resolve(localStorage.removeItem("currentUser"));
};

// Function to check if a user is logged in
export const isLoggedIn = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
  const user = await Promise.resolve(localStorage.getItem("currentUser"));
  return user !== null;
};

// Function to get the current user's username
export const getCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2200)); // Wait for 2.2 seconds
  return await Promise.resolve(localStorage.getItem("currentUser"));
};
