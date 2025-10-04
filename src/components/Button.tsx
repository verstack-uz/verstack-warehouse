/**
 * Button Component
 * This component renders a button that can function as a link or trigger an action when clicked.
 */

// third-party imports
import React from "react";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, href, onClick, className }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={"btn btn-primary" + (className ? ` ${className}` : "")}
    >
      {text}
    </a>
  );
};
export default Button;
