/**
 * Button Component
 * This component renders a button that can function as a link or trigger an action when clicked.
 */

// third-party imports
import React from "react";

interface IconButtonProps {
  text: string;
  iconName: string;
  href?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  iconName,
  href,
  onClick,
}) => {
  return (
    <a className={"btn btn-primary"} href={href} onClick={onClick}>
      <span className={`${iconName} size-4.5 shrink-0`}></span>
      {text}
    </a>
  );
};
export default IconButton;
