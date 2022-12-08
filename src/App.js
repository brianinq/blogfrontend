import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import styled from "styled-components";
import Posts from "./components/Posts";
import Post from "./components/Post";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://blogapp-production-49a6.up.railway.app/blogs").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setBlogs(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    //get user details if logged in
    fetch("https://blogapp-production-49a6.up.railway.app/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("https://blogapp-production-49a6.up.railway.app/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => setCategories(data));
      }
    });
  }, [token]);

  function onLogin(obj) {
    localStorage.setItem("token", obj.jwt);
    setUser(obj.user);
  }
  function addBlog(blog) {
    setBlogs((bs) => [...bs, blog]);
    navigate("/");
  }

  function handleClick(blog) {
    navigate(`/blogs/${blog.id}`);
  }

  return (
    <AppDiv className="App">
      <Nav user={user}>
        <Routes>
          <Route path="/" element={<Posts user={user} categories={categories} blogs={blogs} handleClick={handleClick} />} />
          <Route path="/signup" element={<Login onLogin={onLogin} />} />
          <Route path="/blogs/:id" element={<Post user={user} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route
            path="/create"
            element={user ? <CreateArticle user={user} addBlog={addBlog} token={token} categories={categories} /> : <Login onLogin={onLogin} />}
          />
        </Routes>
      </Nav>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: 100%;
  overflow: hidden;
`;
export default App;
