'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPosts } from '../../lib/api';
import { motion } from 'framer-motion';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <button onClick={() => router.push('/')} className="btn btn-secondary">
          ← Back
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">Blog Posts</h1>
        <p className="text-muted">Click on a post title to read more.</p>
      </div>

      <div className="list-group shadow">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-3"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="list-group-item list-group-item-action p-4 border rounded"
            >
              <h5 className="mb-1">{post.title.rendered}</h5>
              <p
                className="mb-0 text-muted"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
