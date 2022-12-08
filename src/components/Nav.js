import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import Logo from "./Logo";

function Nav({ user, children, setUser }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  return (
    <>
      <Header>
        <nav>
          <Logo className="logo" href="/">
            <span>We</span>Read
          </Logo>
          <ul className="links">
            <li>
              <NavLink to="/create">Write</NavLink>
            </li>
            <li>{user ? user.name : <NavLink to="/login">Signin</NavLink>}</li>
            <li>{user ? <NavLink onClick={logout}>Logout</NavLink> : <NavLink to="/signup">Signup</NavLink>}</li>
          </ul>
        </nav>
      </Header>
      {children}
      <Footer className="footer">
        <SocialIcon url="https://linkedin.com/in/" bgColor="#ff3d00" />
        <SocialIcon network="twitter" bgColor="#ff3d00" />
        <SocialIcon network="facebook" bgColor="#ff3d00" />
        <SocialIcon network="instagram" bgColor="#ff3d00" />
        <SocialIcon network="discord" bgColor="#ff3d00" />
        {/* <SocialIcon url="https://www.example.com" label="Share" /> */}
      </Footer>
    </>
  );
}

const Header = styled.header`
  width: 100%;
  & nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-inline: auto;
    width: 90%;
    height: 15%;
    & a.logo {
      text-align: left;
      font-weight: 500;
      font-size: 60px;
    }
    & ul {
      display: flex;
      justify-content: space-between;
    }
    & li:last-child {
      border: #080708 solid 3px;
    }
    & li:last-child {
      margin-right: 0;
      border: #080708 3px solid;
      background: #080708;
      color: #fff;
    }
    & li {
      margin: 0 20px;
      align-self: center;
      list-style: none;
      border-bottom: 3px solid #ff3d00;
      color: #080708;
      padding: 5px 20px;
      font-size: 28px;
      transition: all 0.25s ease-in-out;
      &:hover {
        box-shadow: 10px 10px 15px 0px #ff3d00;
        border-bottom: 0;
      }
      & a {
        text-decoration: none;
        color: inherit;
        font-weight: 500;
      }
    }
  }
`;
const Footer = styled.footer`
  background: #080708;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & a {
    margin: 0 15px;
  }
`;
export default Nav;
