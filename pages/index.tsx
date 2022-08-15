import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <nav>
        <Link href="/MyCanvas">
          <a style={{display: 'flex'}}>MyCanvas</a>
        </Link>
        <Link href="/main">
          <a style={{display: 'flex'}}>로그인 / 회원가입</a>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
