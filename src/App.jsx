import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked. User interaction required.");
        });
      }
    };

    window.addEventListener("click", playAudio, { once: true });

    return () => {
      window.removeEventListener("click", playAudio);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate() {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);

          const audio = document.querySelector("audio");
          if (audio) {
            audio.play().catch(() => {
              console.warn("Autoplay blocked. Will require user interaction.");
            });
          }

          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 100;
      gsap.to(".main .text", {
        x: `${xMove * 0.6}%`,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(".bg", {
        x: xMove * 2.5,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }, [showContent]);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/GTA San Andreas Ringtone.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./neonbg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7 items-center">
                <img
                  src="/rockstar.png"
                  alt="Rockstar Logo"
                  className="w-16 h-16 object-contain"
                />
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar Games
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="/neonbg.jpg"
                alt="neon background"
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg] text-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                <h1 className="text-[12rem] leading-none -ml-40 stroke-black stroke-2">
                  grand
                </h1>
                <h1 className="text-[12rem] leading-none ml-20 stroke-black stroke-2">
                  theft
                </h1>
                <h1 className="text-[12rem] leading-none -ml-40 stroke-black stroke-2">
                  auto
                </h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>

            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-30">
                <h1 className="text-8xl">Still Teasing,</h1>
                <h1 className="text-8xl">Never Pleasing</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
  GTA VI just pulled up with a bazooka in one hand and a middle finger in the other - robberies, chaos, and vibes straight outta a heist movie gone wild.
</p>
<p className="mt-3 text-xl font-[Helvetica_Now_Display]">
  Neon nights, bullet fights, and cops that never quit - one second you're cruising in a Lambo, next you’re tossing grenades off rooftops like it’s Taco Tuesday.
</p>
<p className="mt-10 text-xl font-[Helvetica_Now_Display]">
  With jaw-dropping VFX, missions juicier than a Netflix thriller, and cops that actually chase - GTA VI is pure digital chaos wrapped in neon and dipped in crime!
</p>
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
