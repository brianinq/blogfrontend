import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";

function Posts({ categories, blogs, handleClick }) {
  const [search, setSearch] = useState("");

  const displayData = blogs.filter((b) => b.title.toLowerCase().includes(search.toLocaleLowerCase()));
  return (
    <Main>
      <h1>Article of the day</h1>
      {/* {blogs.map((blog) => (
        <p>{blog.title}</p>
      ))} */}

      <Article>
        <div className="img">
          <img src={blogs[0]?.poster} alt="" />
        </div>
        <div className="content">
          <p className="pill">{blogs[0]?.category.name}</p>
          <h2>{blogs[0]?.title}</h2>
          <p className="content">{blogs[0]?.body.replace("##", "")}</p>
          <div className="cta">
            <Button
              onClick={() => {
                handleClick(blogs[0]);
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </Article>
      <div className="filters">
        <div className="categories">
          {categories?.map((cat) => (
            <Button key={cat.id}>{cat.name}</Button>
          ))}
        </div>
        <div className="search">
          <form>
            <Input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter keywords to search"
              className="search"
            />
          </form>
        </div>
      </div>
      <Section>
        {displayData?.map((blog) => (
          <Card key={blog.id} blog={blog} handleClick={handleClick} />
        ))}
      </Section>
    </Main>
  );
}

const Main = styled.main`
  width: 90%;
  margin-inline: auto;
  & .filters {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 100px 0;
    & .categories button {
      margin: 0 20px;
    }
  }
`;

const Section = styled.section`
  margin-bottom: 100px;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
`;

const Article = styled.article`
  margin: 20px 0 50px;
  display: flex;
  gap: 100px;
  & .img {
    width: 100%;
  }
  & img {
    max-width: 100%;
    border-radius: 20px 0 0 20px;
  }
  & div {
    flex: 1;
  }
  & .pill {
    background: #00f;
    width: fit-content;
    padding: 3px 10px;
    color: #fff;
  }
  & h2 {
    margin: 10px 0;
  }
  & p.content {
    font-weight: 400;
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    line-clamp: 9;
    padding-right: 15px;
    -webkit-box-orient: vertical;
  }
  & .cta {
    display: flex;
    align-items: center;
    margin-top: 2rem;
  }
`;

export default Posts;
