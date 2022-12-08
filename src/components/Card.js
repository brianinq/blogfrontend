import React from "react";
import styled from "styled-components";

function Card({ blog, handleClick }) {
  return (
    <CardDiv>
      <img src={blog.poster} alt={blog.title} />
      <h3>{blog.title}</h3>
      <p>{blog.summary.replace("##", "")}</p>
      <button
        onClick={() => {
          handleClick(blog);
        }}
      >
        Continue...
      </button>
    </CardDiv>
  );
}

const CardDiv = styled.div`
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  & img {
    width: 100%;
    border-bottom: 10px solid #080708;
    border-radius: 10px 10px 0 0;
  }
  h3 {
    margin: 10px;
  }
  p {
    margin: 10px;
  }
  & button {
    background: none;
    outline: none;
    border: none;
    font-size: 18px;
    border-bottom: 2px solid #080708;
    color: #ff3d00;
    cursor: pointer;
    margin-left: 10px;
    transition: scale 0.25s ease-in-out;
    margin-bottom: 20px;

    &:hover {
      scale: 1.08;
    }
  }
`;
export default Card;
