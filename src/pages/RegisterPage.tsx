/**
 * Login Page Component
 * This component serves as the login page for the Warehouse application.
 * It provides a link to navigate back to the home page.
 */

import React from "react";
import Header from "@/components/Header";
import { LSUtil, StrUtil } from "@/utilities/utilities";
import Button from "@/components/Button";
import { AppRoute } from "@/routes";
import { useNavigate } from "react-router";
import { User, UserRole, UserRoles } from "@/utilities/types";

const RegisterPage: React.FC = () => {
  /// Set page title & navigate hook
  React.useEffect(() => {
    document.title = "User Login";
  });
  let navigate = useNavigate();

  // State variables for form inputs and validation
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = React.useState(false);
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [invalidFirstName, setInvalidFirstName] = React.useState(false);
  const [lastName, setLastName] = React.useState<string>("");
  const [invalidLastName, setInvalidLastName] = React.useState(false);
  const [role, setRole] = React.useState<UserRole>("warehouse manager");

  // Register button click handler
  function registerButtonClick() {
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

    // Validate first name
    if (firstName.trim() === "" || firstName.trim().length < 2) {
      setInvalidFirstName(true);
      return;
    } else {
      setInvalidFirstName(false);
    }

    // Validate last name
    if (lastName.trim() === "" || lastName.trim().length < 2) {
      setInvalidLastName(true);
      return;
    } else {
      setInvalidLastName(false);
    }

    // Simple validation
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      role: role,
    };
    LSUtil.setUser(user);

    // Redirect to home page after successful registration
    navigate(AppRoute.HOME);
  }

  return (
    <div
      data-theme={LSUtil.getTheme()}
      className={"w-screen h-screen bg-base-200 motion-preset-fade"}
    >
      <Header title={"Login"} />

      <div className={"w-128 mx-auto mt-8 p-8 flex flex-col space-y-4"}>
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

        <div>
          <label className={"label-text"} htmlFor={"firstNameInput"}>
            First Name
          </label>
          <input
            id="firstNameInput"
            type="text"
            placeholder="John"
            className={`input ${invalidFirstName ? "is-invalid" : ""}`}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setInvalidFirstName(false);
            }}
          />
          {invalidFirstName && (
            <span className="helper-text">First name cannot be empty</span>
          )}
        </div>

        <div>
          <label className={"label-text"} htmlFor={"lastNameInput"}>
            Last Name
          </label>
          <input
            id="lastNameInput"
            type="text"
            placeholder="Doe"
            className={`input ${invalidLastName ? "is-invalid" : ""}`}
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              setInvalidLastName(false);
            }}
          />
          {invalidLastName && (
            <span className="helper-text">Last name cannot be empty</span>
          )}
        </div>

        {/* user role select from UserRoles */}
        <div>
          <label className={"label-text"} htmlFor={"roleSelect"}>
            Role
          </label>
          <select
            id="roleSelect"
            className="select w-full"
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
          >
            {UserRoles.map((role) => (
              <option key={role} value={role}>
                {StrUtil.capitalizeFirstLetter(role)}
              </option>
            ))}
          </select>
        </div>

        <Button
          text={"Register"}
          className={"btn btn-primary mt-8"}
          onClick={registerButtonClick}
        />
      </div>
    </div>
  );
};
export default RegisterPage;
