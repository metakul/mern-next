'use client'

import { useParams } from "next/navigation";

interface Params {
  blogId: string;
  [key: string]: string; // Index signature
}

export default function Home() {
  const params = useParams<Params>();
  const blogId = params?.blogId; // Null check before accessing blogId
  return (
    <main className="container">
      <div className="text-lg">
        <p className="">
         Mint: {blogId}
        </p>
      </div>
    </main>
  );
}
