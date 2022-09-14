import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftMenu from "./LeftMenu";

const About = () => {
  const [defaultPrimary, setDefaultPrimary] = useState({
    pomodoro: true,
    scheduler: false,
    forecast: false,
    us: false,
  });

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/about/pomodoro") {
      setDefaultPrimary({
        pomodoro: true,
        scheduler: false,
        forecast: false,
        us: false,
      });
    }
    if (pathname === "/about/scheduler") {
      setDefaultPrimary({
        pomodoro: false,
        scheduler: true,
        forecast: false,
        us: false,
      });
    }
    if (pathname === "/about/forecast") {
      setDefaultPrimary({
        pomodoro: false,
        scheduler: false,
        forecast: true,
        us: false,
      });
    }
    if (pathname === "/about/us") {
      setDefaultPrimary({
        pomodoro: false,
        scheduler: false,
        forecast: false,
        us: true,
      });
    }
  }, [pathname]);

  return (
    <>
      <LeftMenu />
      <Outlet context={[defaultPrimary]} />
    </>
  );
};

export default About;
