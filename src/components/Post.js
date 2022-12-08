import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Button from "./Button";
import Textarea from "./Textarea";

function Post({ user }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  let blogId = params["id"];
  useEffect(() => {
    fetch(`/blogs/${blogId}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setPost(data);
          setComments(data.comments);
          console.log(data.comments);
        });
      }
    });
  }, [blogId]);

  return (
    <Main>
      {post ? (
        <div className="post">
          <img className="poster" src={post?.poster} alt={post?.title} />
          <h1>{post?.title}</h1>
          <User>
            <img className="avatar" src={post.user?.avatar} alt="" />
            <small>By {post.user?.name}</small>
          </User>
          <ReactMarkdown>{post?.body}</ReactMarkdown>
          {post.user?.id === user?.id && (
            <div className="actions">
              <Button onClick={() => navigate("/")} className="del">
                Delete
              </Button>
              <Button onClick={() => navigate("/create")} className="edit">
                Edit
              </Button>
            </div>
          )}
          <Divider />
          <div id="comment-form">
            <h2 id="reply-title" className="section-title">
              Leave a Comment
            </h2>{" "}
            <form className="comment-form">
              <p className="comment-form-comment">
                <Textarea id="comment" name="comment" placeholder="Your Comment" required="required" aria-required="true"></Textarea>
              </p>
              <p className="form-submit">
                <Button name="submit" type="submit" value="Submit">
                  Submit
                </Button>
              </p>
            </form>
          </div>
          <div className="comments">
            <h4>COMMENTS</h4>
            <div>
              {comments
                ? comments?.map((c) => (
                    <div key={c.id} className="content">
                      <div className="av">
                        <img src={c.creator.avatar} alt={c.creator.name} />
                      </div>
                      <div>
                        <p>By: {c.creator.username}</p>
                        <p>{c.content}</p>
                      </div>
                    </div>
                  ))
                : "No comments yet"}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Main>
  );
}

const Divider = styled.hr`
  border: none;
  border-bottom: 2px solid #ff3d00;
  margin: 30px 0 20px;
`;

const Main = styled.main`
  width: 100%;
  height: fit-content;
  margin-bottom: 100px;
  .comment-form {
    & textarea {
      width: 50%;
      border-color: #080708;
    }
    & p button {
      color: #fff;
      padding: 5px 10px;
    }
  }
  .comments {
    h4 {
      width: fit-content;
      border-bottom: #ff3d00 3px solid;
    }
    div p {
      width: 70%;
      margin: 0;
      padding: 5px;
    }
    .content {
      display: flex;
      margin: 10px 0;
      padding-left: 10px;
      border: 2px solid #080708;
      border-radius: 10px;
      gap: 50px;
      align-items: center;
    }
    .av {
      & img {
        width: 40px;
        height: 40px;
        border: #080708 2px solid;
        border-radius: 50%;
      }
    }
  }
  & .post {
    margin: 50px 0;
    margin-inline: auto;
    width: 80%;

    & img.poster {
      width: 100%;
      height: 400px;
      object-fit: cover;
      margin: 20px 0;
    }
    p {
      line-height: 1.5;
      font-weight: 400;
      font-size: 1.1rem;
      padding: 10px 0;
    }
    .actions {
      display: flex;
      margin: 20px 0;
      width: 20%;
      justify-content: space-between;

      button.del {
        background: red;
        color: #fff;
      }
      button.edit {
        background: green;
        color: #fff;
      }
    }
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  img.avatar {
    margin-right: 20px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    border: #080708 2px solid;
  }
`;

export default Post;
