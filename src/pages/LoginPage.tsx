/**
 * Login Page Component
 * This component serves as the login page for the Warehouse application.
 * It provides a link to navigate back to the home page.
 */

import React from "react";
import Header from "@/components/Header";
import { LSUtil } from "@/utilities/utilities";
import { AppRoute } from "@/routes";
import Button from "@/components/Button";
import { User } from "@/utilities/types";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  // Set page title & navigate hook
  // Also check if user is already logged in & redirect to home page if logged in
  let navigate = useNavigate();
  try {
    LSUtil.getUser();
    React.useEffect(() => {
      navigate(AppRoute.HOME);
    });
  } catch {
    // User not logged in, do nothing
  }

  // State variables for form inputs and validation
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);

  // Login button click handler
  function loginButtonClick() {
    // Validate phone number
    if (!/^\+998\d{9}$/.test(phoneNumber)) {
      setInvalidPhoneNumber(true);
      return;
    } else {
      setInvalidPhoneNumber(false);
    }

    // Validate password
    if (password.length < 6) {
      setInvalidPassword(true);
      return;
    } else {
      setInvalidPassword(false);
    }

    // Simple validation
    const user: User = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: phoneNumber,
      role: "warehouse manager",
    };
    LSUtil.setUser(user);

    // Redirect to home page after login
    navigate(AppRoute.HOME);
  }

  return (
    <div
      data-theme={LSUtil.getTheme()}
      className={"w-screen h-screen bg-base-200 motion-preset-fade"}
    >
      <Header title={"Login"} />

      <div className={"w-128 mx-auto mt-24 p-8 flex flex-col space-y-4"}>
        <div>
          <label className={"label-text"} htmlFor={"phoneNumberInput"}>
            Phone number
          </label>
          <input
            id="phoneNumberInput"
            type="text"
            placeholder="+998012345678"
            className={`input ${invalidPhoneNumber ? "is-invalid" : ""}`}
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              setInvalidPhoneNumber(false);
            }}
          />
          {invalidPhoneNumber && (
            <span className="helper-text">Expected format: +998012345678</span>
          )}
        </div>

        <div>
          <label className={"label-text"} htmlFor="passwordInput">
            Password
          </label>
          <div className={`input ${invalidPassword ? "is-invalid" : ""}`}>
            <input
              id="passwordInput"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setInvalidPassword(false);
              }}
            />
            <button
              type="button"
              className="block cursor-pointer"
              aria-label="password toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <span className="icon-[tabler--eye] text-base-content/80 block size-5 shrink-0"></span>
              ) : (
                <span className="icon-[tabler--eye-off] text-base-content/80 block size-5 shrink-0"></span>
              )}
            </button>
          </div>
          {invalidPassword && (
            <span className="helper-text">
              Password must be at least 6 characters long
            </span>
          )}
        </div>

        <Button
          text={"Login"}
          className={"btn btn-primary mt-8"}
          onClick={loginButtonClick}
        />

        <p className={"text-center"}>Don't have an account yet?</p>
        <Button text={"Register"} href={AppRoute.REGISTER} />
      </div>
    </div>
  );
};
export default LoginPage;
