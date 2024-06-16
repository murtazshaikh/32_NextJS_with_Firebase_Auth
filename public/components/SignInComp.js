"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Button from "@/public/components/Button";

const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        setError("Check your creds!");
      }
      console.log(res, "res");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-5">
      <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {error && <p className="text-red-400 mb-4 text-xs">{error}</p>}
        <Button onClick={handleSignIn} className="w-full mb-5 bg-indigo-600">
          Sign In
        </Button>

        <p className="text-white flex items-center justify-center text-sm">
          New User?&nbsp;{" "}
          <button
            onClick={() => router.push("/sign-up")}
            className="text-indigo-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInComp;
