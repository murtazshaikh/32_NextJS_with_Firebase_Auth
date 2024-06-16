"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Card from "@/public/components/Card";
import { useEffect, useState } from "react";
import Button from "@/public/components/Button";

export default function Home() {
  const COMPLEMENTS = [
    "You’re a natural at whatever you do!",
    "You’re the bravest person I know! I wish I was more like you.",
    "You're better than a triple-scoop ice cream cone…with sprinkles.",
    "You’re the sweetest—you don’t have a mean bone in your body, do you?",
    "Talking to you is like a breath of fresh air.",
    "Great job today. I love working with you!",
    "Your energy is infectious!",
    "You’re so kind that you make everyone around you a better person.",
    "I love how you can turn even the simplest situation into something fun.",
    "I wish I were half of the human you are.",
    "Your creativity is on another level!",
    "I love how you decorated your house. It looks like it belongs on HGTV.",
    "When you get famous, I want to be the president of your fan club.",
    "You set such a good example for your kids.",
    "You’re irreplaceable.",
    "It’s too bad every boss can’t be like you.",
    "I love your confidence. Can you send some of it my way?",
    "You’re so kind everyone instantly feels like your friend.",
    "I wish I could figure things out as quickly as you do.",
    "I’m proud of how far you have come and for never giving up.",
  ];
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 20));
  }, []);

  console.log(!user, "a");
  console.log(!userSession, "b");

  if (!user && !userSession) {
    router.push("/sign-up");
  }

  const changeComplement = () => {
    setRandomNumber(Math.floor(Math.random() * 20));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 px-5 md:px-24 bg-gray-900">
      {user ? (
        <>
          <div className="mb-5 flex flex-col items-center">
            {user && (
              <button
                onClick={() => {
                  signOut(auth);
                  sessionStorage.setItem("user", "");
                  router.push("/sign-in");
                }}
                className="text-xl text-indigo-600"
              >
                Log out
              </button>
            )}
          </div>
          <div className="h-100 text-white mt-5 flex flex-col items-center">
            <Card className={`p-5`}>
              <p className="text-xl md:text-2xl text-center">{COMPLEMENTS[randomNumber]}</p>
            </Card>

            <Button
              className={`mt-5  bg-indigo-600`}
              onClick={changeComplement}
              disabled={!user}
            >
              Change
            </Button>
          </div>
        </>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </main>
  );
}