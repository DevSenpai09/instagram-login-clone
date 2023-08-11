import { useState } from "react";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="h-full w-full grid place-content-center">
      <div className="grid gap-5">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-neutral-400 rounded-md px-3 py-1"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-neutral-400 rounded-md px-3 py-1"
        />
        <button
          onClick={() => handleSignIn()}
          className="w-full bg-neutral-100 py-2 rounded-md"
        >
          {isLoading ? (
            <span className="w-5 h-5 block border-2 border-neutral-400 border-l-transparent rounded-full animate-spin mx-auto"></span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
