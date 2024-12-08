"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });
    const data = await res.json();
    console.log(data);

    setLoading(false);
    if (res.ok) {
      redirect(decodeURIComponent(redirectUrl));
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="w-screen min-h-screen flex-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 rounded-2xl bg-main-dark-blue text-white max-w-lg w-[calc(100%-2rem)]"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>
        {error !== "" && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border bg-white text-main-dark-blue border-gray-300 rounded"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
            setError("");
          }}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border bg-white text-main-dark-blue border-gray-300 rounded"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
            setError("");
          }}
          autoComplete="current-password"
        />
        <button
          className="p-2 bg-white text-main-dark-blue rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
