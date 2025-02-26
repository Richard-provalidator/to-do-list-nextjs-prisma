"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEmailValidator } from "../hooks/useEmailValidator";

export default function SignUpClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    const { isValidEmail } = useEmailValidator();

    if (!isValidEmail(email)) {
      setErrorMessage("올바른 이메일 양식을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (data.success) {
      alert(`환영합니다! ${name}님`);
      router.push("/login");
    } else {
      setErrorMessage(data.error || "회원가입에 실패했습니다.");
    }
  };

  return (
    <main className="min-j-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">회원가입</h1>
      <form className="mt-6 w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          className="input-style"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input-style"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-style"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button className="button-style">회원가입</button>
      </form>
    </main>
  );
}
