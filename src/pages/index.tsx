import { Post } from "@/types";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: Post[];
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts);

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home({ posts }: Props) {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);

      router.reload();
    } catch (err) {
      alert("削除に失敗しました。");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h2>Rails & Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>
        Create new Post
      </Link>
      <div>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
            <Link href={`posts/${post.id}`} className={styles.postCardBox}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button
                className={styles.editButton}
                onClick={() => {
                  router.push(`/edit-post/${post.id}`);
                }}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                Delete
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
