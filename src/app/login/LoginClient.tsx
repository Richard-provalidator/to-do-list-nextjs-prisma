"use client";

export default function LoginClient() {
  return (
    <main>
      <h1>로그인</h1>
      <form>
        <input
          className="input-style"
          type="email"
          placeholder="이메일"
          required
        />
        <input
          className="input-style"
          type="password"
          placeholder="비밀번호"
          required
        />
        <button className="button-style" type="submit">
          로그인
        </button>
      </form>
    </main>
  );
}
