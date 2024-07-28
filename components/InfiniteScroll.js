import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/InfiniteScroll.module.css';

const InfiniteScroll = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://d31ntp24xvh0tq.cloudfront.net/api/v2.1/home/all/?preferred_langs=hindi&page=${page}&lang=english`
      );
      
      // Extract banners from the response
      const banners = response.data.items.flatMap(item => item.banners || []);
      setContent(prevContent => [...prevContent, ...banners]);
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.infiniteScroll}>
      {content.map((item, index) => (
        <div key={index} className={styles.item}>
          <img src={item.image} alt={item.title} className={styles.itemImage} />
          <h3 className={styles.itemTitle}>{item.title}</h3>
        </div>
      ))}
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InfiniteScroll;
