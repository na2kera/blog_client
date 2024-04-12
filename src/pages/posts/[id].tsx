import { type Post } from "@/types";
import React from "react";

type Props = {
  post: Post;
};

// pages/posts/[id].tsx
export async function getStaticPaths() {
  const res = await fetch("https¥://localhost:3001/api/v1/posts");
  const posts: Post[] = await res.json();

  //全てのパスを取得
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

  console.log(post);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

const Post = ({ post }: Props) => {
  return <div>詳細ページです</div>;
};

export default Post;
