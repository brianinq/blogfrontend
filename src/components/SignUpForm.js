import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Error, Input, FormField, Label, Textarea } from "./index";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("https://avataaars.io/");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("https://blogapp-production-49a6.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
        password_confirmation: passwordConfirmation,
        avatar: imageUrl,
        bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      navigate("/create");
      if (r.ok) {
        r.json().then((data) => onLogin(data));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="fullname">Full Name</Label>
        <Input type="text" id="fullname" placeholder="Jane Doe" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" autoComplete="off" value={username} placeholder="doejane" onChange={(e) => setUsername(e.target.value)} />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
          placeholder="password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="imageUrl">Profile Image</Label>
        <Input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://i.pravatar.cc/300" />
      </FormField>
      <FormField>
        <Label htmlFor="bio">Bio</Label>
        <Textarea rows="3" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description about yourself" />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors?.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default SignUpForm;
