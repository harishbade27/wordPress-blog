import axios from 'axios';

const API_URL = "https://demo.modifyed.xyz/wp-json/wp/v2";

// Fetch posts from WordPress
export const getPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Fetch pages from WordPress
export const getPages = async () => {
  try {
    const res = await axios.get(`${API_URL}/pages`);
    return res.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
};

// Fetch individual post or page by slug
export const getPostOrPageBySlug = async (slug) => {
  try {
    // First, check if the slug belongs to a page
    const res = await axios.get(`${API_URL}/pages?slug=${slug}`);
    if (res.data.length === 0) {
      // If no page is found, try fetching a post by slug
      const postRes = await axios.get(`${API_URL}/posts?slug=${slug}`);
      return postRes.data.length > 0 ? postRes.data[0] : null;
    }
    return res.data[0];
  } catch (error) {
    console.error('Error fetching post or page by slug:', error);
    return null;
  }
};
