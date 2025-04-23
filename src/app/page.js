'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBook } from 'react-icons/fa';

export default function Home() {
  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="p-5 bg-light rounded-4 shadow mb-4 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="display-5 text-primary fw-bold mb-3">
          Welcome to the WordPress Blog
        </h1>
        <p className="lead text-muted mb-0">
          Explore blog posts and pages fetched directly from a WordPress site.
        </p>
      </motion.div>

      <motion.div
        className="row justify-content-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="col-md-6 col-lg-5">
          <div className="d-grid gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/posts" className="btn btn-primary btn-lg shadow-sm d-flex align-items-center gap-2 justify-content-center">
                <FaFileAlt /> View Posts
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/pages" className="btn btn-secondary btn-lg shadow-sm d-flex align-items-center gap-2 justify-content-center">
                <FaBook /> View Pages
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
