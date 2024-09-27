"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import { login } from "./";
import { useRouter } from "next/navigation";
// import Navbar from "../../components/Navbar/navbar";
import styles from "./login.module.css";
// import image from "../../public/assets/images/dashboard.png";
import emailIcon from "../../public/assets/icons/mail.svg";
import lockIcon from "../../public/assets/icons/lock.svg";
import eyeIconClosed from "../../public/assets/icons/eye-closed.svg";
import eyeIconOpen from "../../public/assets/icons/eye-open.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = { email, password };

    const result = await login(formData);
    if (result === "Success") {
      router.push("/Restaurants");
    } else {
      setError(result);
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, []);

  return (
 
    <div className={styles.loginContainer}>
    <div className={styles.navbarContainer}>
    
    </div>
      <div className={styles.loginBox}>
        <div className={styles.loginForm}>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWithIcon}>
                <Image src={emailIcon} alt="Email Icon" width={17} height={17} />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWithIcon}>
                <Image src={lockIcon} alt="Password Icon" width={17} height={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <Image
                    src={showPassword ? eyeIconOpen : eyeIconClosed}
                    alt="Show/Hide Password"
                    width={17}
                    height={17}
                  />
                </button>
              </div>
            </div>
            {error && <div className="alert alert-dark" role="alert">{error}</div>}
            <div className={styles.options}>
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      
    
      
      </div>
    </div>
  );
};

export default Login;
