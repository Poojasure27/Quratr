// actions.ts

export const signUp = async (formData: { email: string; password: string }) => {
    try {
      // Simulate an API call for sign-up
      if (formData.email && formData.password) {
        return "Success"; // Mock response, replace with actual API call
      } else {
        return "Sign-up failed. Please try again.";
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      return "Sign-up failed. Please try again.";
    }
  };
  
  export const login = async (formData: { email: string; password: string }) => {
    try {
      // Simulate an API call for login
      if (formData.email === "test@example.com" && formData.password === "password123") {
        return "Success"; // Mock response, replace with actual API call
      } else {
        return "Invalid credentials. Please try again.";
      }
    } catch (error) {
      console.error("Error during login:", error);
      return "Login failed. Please try again.";
    }
  };
  
  export const logout = async () => {
    try {
      // Simulate an API call for logout
      return "Logged out";
    } catch (error) {
      console.error("Error during logout:", error);
      return "Logout failed.";
    }
  };
  