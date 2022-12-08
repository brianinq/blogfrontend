import { useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "./index";
import { useNavigate } from "react-router-dom";

function CreateArticle({ user, categories, addBlog, token }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("An example post in mark down");
  const [poster, setPoster] = useState(
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  );
  const [category, setCategory] = useState(1);
  const [body, setBody] = useState(`You can write your content in markdown syntax.
  
Or just type out the content text. 

## This is example content in markdown
## THis is a a sub heading

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

## ![image-title](https://avataaars.io/)

### We can even write code here and syntax will be highlighted
  `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        poster,
        user_id: user.id,
        category_id: category,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        navigate("/");
        r.json((blog) => {
          addBlog(blog);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Write An Article</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormField>
          <FormField>
            <Label htmlFor="Poster">Poster</Label>
            <Input type="text" id="Poster" value={poster} onChange={(e) => setPoster(e.target.value)} />
          </FormField>
          <FormField>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              onChange={(e) => {
                console.log(e.target);
                setCategory(e.target.value);
              }}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField>
            <Label htmlFor="body">Instructions</Label>
            <Textarea id="body" rows="10" value={body} onChange={(e) => setBody(e.target.value)} />
          </FormField>
          <FormField>
            <Button type="submit">{isLoading ? "Loading..." : "Publish Article"}</Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
        <p>
          <em>Category: {categories[category - 1]?.name}</em>
          &nbsp;·&nbsp;
          <cite>By {user.username}</cite>
        </p>
        <img src={poster} alt={title} />
        <ReactMarkdown>{body}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 95%;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 100px;
`;

const WrapperChild = styled.div`
  flex: 1;
  & img {
    display: block;
    max-width: 100%;
  }
  & ol,
  & ul {
    padding: 10px 0;
    padding-left: 20px;
  }
  & h2,
  & h3,
  & h4,
  & p {
    padding: 5px 0;
  }
`;
const Select = styled.select`
  padding: 4px 10px;
  font-family: inherit;
  outline: none;
  border: 2px solid #ff3d00;
  border-radius: 20px;
  width: 100%;
`;
export default CreateArticle;
