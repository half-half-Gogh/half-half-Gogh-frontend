import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/main");
  }, []);
  return <></>;
};

export default Home;
