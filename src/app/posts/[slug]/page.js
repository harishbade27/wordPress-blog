'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostOrPageBySlug } from '../../../lib/api';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


export default function PostDetailPage() {
    const params = useParams();
    const slugParam = params?.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!slug) return;

                const data = await getPostOrPageBySlug(slug);
                console.log("content", data);

                if (data) {
                    setPost(data);
                } else {
                    setError('Post not found.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
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
            <Link href="/posts" className="btn btn-secondary mb-3"><FaArrowLeft /> Back to Posts</Link>

            <div className="card shadow p-4">
                <h2 className="text-primary">{post?.title?.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
            </div>
        </div>
    );
}
