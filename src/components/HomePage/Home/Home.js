import React, { useEffect, useRef, useState } from "react";
import { Countdown } from "../Timer/Countdown/Countdown.js";
import { Handles } from "../HandlesSection/Handles.js";
import styles from "./Home.module.css";
import "../../../fonts/Absolute_Xero/Absolute_Xero.ttf";

import { gsap } from "gsap";
import { Power3 } from "gsap";
import { TimelineLite } from "gsap/gsap-core.js";
import { CSSPlugin } from 'gsap/CSSPlugin'

import { motion } from 'framer-motion';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { useNavigate } from "react-router-dom";

function Home({ auth, setAuth }) {
  // Particle Bg
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  gsap.registerPlugin(CSSPlugin);
  const futureDate = new Date(2024, 2, 6); // March 6, 2024

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  let item = useRef(null);
  let item1 = useRef(null);
  let item2a = useRef(null);
  let item2b = useRef(null);
  let item3 = useRef(null);
  let item4 = useRef(null);
  let item5 = useRef(null);

  const [tl] = useState(new TimelineLite({ paused: false }));
  const [tl2] = useState(new TimelineLite({ paused: false }));
  const [tl3] = useState(new TimelineLite({ paused: false }));
  const [tl4] = useState(new TimelineLite({ paused: false }));
  const navigate = useNavigate();

  useEffect(() => {
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const throttledMouseMove = throttle((e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    }, 16); // Adjust the throttle limit as needed

    const mouseMove = (e) => {
      throttledMouseMove(e);
    };
    window.addEventListener("mousemove", mouseMove);

    tl.fromTo(
      item,
      1.4,
      { opacity: 0, x: '100%', y: '-100%', ease: Power3.easeOut },
      { opacity: 1, x: 0, y: 0, ease: Power3.easeOut }
    );
    tl2.fromTo(
      item1,
      1.4,
      { opacity: 0, x: '-100%', y: '100%', ease: Power3.easeOut },
      { opacity: 1, x: 0, y: 0, ease: Power3.easeOut }
    );
    tl3.fromTo(
      item2a,
      0.7,
      { opacity: 0, x: '100%', ease: Power3.easeOut },
      { opacity: 1, x: 0, ease: Power3.easeOut }
    )
      .delay(1)
      .fromTo(
        item2b,
        0.7,
        { opacity: 0, x: '-100%', ease: Power3.easeOut },
        { opacity: 1, x: 0, ease: Power3.easeOut }
      )
      .fromTo(
        item3,
        0.5,
        { opacity: 0, ease: Power3.easeOut },
        { opacity: 1, ease: Power3.easeOut }
      )
      .fromTo(
        item4,
        0.5,
        { opacity: 0, ease: Power3.easeOut },
        { opacity: 1, ease: Power3.easeOut }
      );
    tl4.fromTo(
      item5,
      1,
      { opacity: 0, x: "100%", ease: Power3.easeOut },
      { opacity: 0.9, y: "-55px", x: 0, z: 30, ease: Power3.easeOut }
    ).delay(2);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [tl, tl2, tl3, tl4]); // Add tl, tl2, tl3, tl4 to the dependency array

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 12
    },
    text: {
      height: 130,
      width: 130,
      x: mousePosition.x - 63,
      y: mousePosition.y - 65,
      backgroundColor: "white",
      mixBlendMode: "difference"
    },
    count: {
      height: 100,
      width: 100,
      x: mousePosition.x - 48,
      y: mousePosition.y - 50,
      backgroundColor: "white",
      mixBlendMode: "difference"
    },
    subText: {
      height: 50,
      width: 50,
      x: mousePosition.x - 23,
      y: mousePosition.y - 25,
      backgroundColor: "white",
      mixBlendMode: "difference"
    },
    register: {
      height: 50,
      width: 50,
      x: mousePosition.x - 23,
      y: mousePosition.y - 25,
      borderWidth: '1px',
      mixBlendMode: "difference"
    },
  };

  const fetchData = () => {
    if (auth === "false") {
      navigate("/competitions")
      console.log("navigated")
    }
    else {
      navigate("/competitions")
    }
  };

  const [cursorVariant, setCursorVariant] = useState("default");

  const textEnter = () => setCursorVariant("text");
  const countEnter = () => setCursorVariant("count");
  const registerEnter = () => setCursorVariant("register");
  const subTextEnter = () => setCursorVariant("subText");
  const textLeave = () => setCursorVariant("default");

  const isDesktop = window.screen.width > 600;

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          x: { delay: 0 },
          y: { delay: 0 },
          type: 'tween', stiffness: 10000, bounce: 0
        }} />

      <div className={`${styles.mainDiv}`}>
        <div className={`${styles.backContainer}`}>
          <div
            ref={(el) => {
              item = el;
            }}
            className={`${styles.topLayer}`}
          >
            <div className={`${styles.topLayerLeft}`}></div>
            <div className={`${styles.topLayerLeftRight}`}></div>
          </div>

          <div
            ref={(el) => {
              item1 = el;
            }}
            className={`${styles.downLayer}`}
          >
            <div className={`${styles.downLayerLeft}`}></div>
            <div className={`${styles.downLayerRight}`}></div>
          </div>
        </div>

        <div className={`${styles.upContainer}`}>
          <div className={`${styles.homeGradientLayer}`}>
            <div
              ref={(el) => {
                item2a = el;
              }} onMouseEnter={textEnter} onMouseLeave={textLeave} className={`${styles.PragatiHeading}`}>
              <div className={`${styles.PragatiSponsorDiv}`}>
                <p className={`${styles.PragatiSponsorText}`}>MCKVIE</p>
                <p className={`${styles.PragatiSponsorText}`}>Presents</p>
              </div>
              <div className={`${styles.PragatiTitle}`}>Pragati' </div>
              <div className={`${styles.PragatiYear}`}>24</div>
            </div>

            <div
              ref={(el) => {
                item2b = el;
              }} onMouseEnter={subTextEnter} onMouseLeave={textLeave} className={`${styles.SubHeading}`}>
              <div className={`${styles.HrLine}`} />
              <div>
                <p className={`${styles.PragatiTag}`}>The Annual Technical Fest</p>
              </div>
            </div>
          </div>

          {/* <a href="http://localhost:3000/auth/google"> */}
          <button
            ref={(el) => {
              item4 = el;
            }}
            className={`${styles.RegisterButton}`}
            onMouseEnter={registerEnter} onMouseLeave={textLeave} onClick={fetchData}
          >
            Explore Events
          </button>
          {/* </a> */}

          <div
            ref={(el) => {
              item3 = el;
            }} className={`${styles.homeGradientLayerRev}`}>
            <div className={`${styles.CountdownContainer}`}>
              <div className={`${styles.CountdownHeading}`}>- STARTS IN -</div>
            </div>
            <div className={`${styles.Countdown}`} onMouseEnter={countEnter} onMouseLeave={textLeave}>
              <Countdown futureDate={futureDate} />
            </div>
          </div>

          <div
            className={`${styles.Handles}`}
            ref={(el) => {
              item5 = el;
            }}
            onMouseEnter={subTextEnter} onMouseLeave={textLeave}
          >
            <Handles />
          </div>
        </div>
      </div>

      {isDesktop && <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            number: {
              value: 25,
              density: {
                enable: false,
                value_area: 500,
              },
            },
            color: {
              value: "#b69f9f",
            },
            shape: {
              type: "triangle",
              stroke: {
                width: 5,
                color: "#000000",
              },
              polygon: {
                nb_sides: 4,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.9166266064160501,
              random: false,
              anim: {
                enable: false,
                speed: 0.5,
                opacity_min: 0.1,
                sync: true,
              },
            },
            size: {
              value: 4.00602506169279,
              random: true,
              anim: {
                enable: false,
                speed: 4,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 240.36150370156736,
              color: "#effdff",
              opacity: 0.2964458545652664,
              width: 0.9614460148062693,
            },
            move: {
              enable: true,
              speed: 2.409640098708463,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 60,
                rotateY: 10,
              },
            },
          },
          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: false,
                mode: "repulse",
              },
              onclick: {
                enable: false,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 0.1,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 100,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 0.1,
              },
              repulse: {
                distance: 0, // Adjust the distance for the repulsion effect
                duration: 0.4,
                speed: 0.02, // Adjust the speed of repulsion
                random: true, // Add randomness to the repulsion direction
              },
              push: {
                particles_nb: 1, // Adjust the number of particles pushed on click
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: false,
          fpsLimit: 120,
          fullScreen: {
            enable: true,
            zIndex: -20,
          },
        }}
      />}
    </>
  );
}

export default Home;
