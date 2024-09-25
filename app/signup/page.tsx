"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./signup.module.css";
import { signUp } from "./actions"; 
import Image from "next/image";
import googleIcon from "../../public/assets/icons/icons8-google.svg";
import facebookIcon from "../../public/assets/icons/icons8-facebook.svg";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };

    const result = await signUp(formData);
    if (result === "Success") {
      router.push("/Restaurants");
    } else {
      setError(result);
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google sign-up logic
    router.push("/restaurant"); // Redirect after successful Google sign-up
  };

  const handleFacebookSignup = () => {
    // Handle Facebook sign-up logic
    router.push("/restaurant"); // Redirect after successful Facebook sign-up
  };

  return (
    <div className={styles.signupContainer}>
    
      <div className={styles.signupBox}>
        <div className={styles.signUpForm}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>

          <div className={styles.socialSignup}>
            <button onClick={handleGoogleSignup} className={styles.googleButton}>
              <Image src={googleIcon} alt="Google Icon" width={17} height={17} />
              Sign Up with Google
            </button>
            <button onClick={handleFacebookSignup} className={styles.facebookButton}>
              <Image src={facebookIcon} alt="Facebook Icon" width={17} height={17} />
              Sign Up with Facebook
            </button>
          </div>

          {/* Add "Already have an account? Login" link */}
          <div className={styles.loginLink}>
            <p>
              Already have an account?{" "}
              <span onClick={() => router.push("/login")} className={styles.link}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
