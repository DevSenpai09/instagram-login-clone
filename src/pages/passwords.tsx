import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import SignIn from "./components/SignIn";
import UsersTable from "./components/UsersTable";

const Passwords = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setIsLoading(false);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <span className="block w-10 h-10 rounded-full border-2 border-neutral-300 border-l-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen grid p-5 overflow-hidden ${
        user && "grid-rows-[auto_1fr] gap-5"
      }`}
    >
      {user && (
        <div className="flex justify-between items-center">
          <p className="text-sm">{user.email}</p>
          <button
            onClick={() => signOut(auth)}
            className="bg-neutral-100 rounded-md py-2 px-3 w-max ml-auto text-sm"
          >
            Logout
          </button>
        </div>
      )}

      {!user ? <SignIn /> : <UsersTable user={user} />}
    </div>
  );
};

export default Passwords;
