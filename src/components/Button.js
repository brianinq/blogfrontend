import styled from "styled-components";

function Button({ variant = "fill", ...props }) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 8px 30px;
  text-decoration: none;
`;

const FillButton = styled(ButtonBase)`
  background-color: #080708;
  color: #ff3d00;

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: #080708;
  border: 2px solid #ff3d00;

  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default Button;
