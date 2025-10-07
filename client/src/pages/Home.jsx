import { useEffect } from "react";
import '../components/component-styles.css';
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import Services from "../components/Services";
import CTA from "../components/CTA";
import Founder from "../components/Founder";
import Signup from "../components/Signup";

export default function Home() {
  useEffect(() => console.log("Home mounted"), []);
  return (
    <>
      <Hero/>
      <WhatWeDo/>
      <Services/>
      <CTA />
      <Founder />
      <Signup />
    </>
  );
}