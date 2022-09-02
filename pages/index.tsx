import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/main");
  // }, []);
  return (
    <div>
      <nav>
        <Link href="/canvas/changh2">
          <a style={{ display: "flex" }}>MyCanvas</a>
        </Link>
        <Link href="/main">
          <a style={{ display: "flex" }}>로그인 / 회원가입</a>
        </Link>
        <Link href="/galley/changh2">
          <a style={{ display: "flex" }}>갤러리</a>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
