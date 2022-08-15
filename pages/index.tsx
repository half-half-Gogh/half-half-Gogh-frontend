import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <nav>
        <Link href="/MyCanvas">
          <a>MyCanvas</a>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
