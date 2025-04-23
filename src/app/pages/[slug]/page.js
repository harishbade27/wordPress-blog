'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostOrPageBySlug } from '../../../lib/api';
import Link from 'next/link';

export default function PageDetail() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        if (!slug) return;

        const data = await getPostOrPageBySlug(slug);

        if (data) {
          setPage(data);
        } else {
          setError('Page not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch page.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

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
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <Link href="/pages" className="btn btn-secondary mb-3">← Back to Pages</Link>

      <div className="card shadow p-4">
        <h2 className="text-primary">{page?.title?.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: page?.content?.rendered }} />
      </div>
    </div>
  );
}
