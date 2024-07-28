import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import styles from '../styles/Carousel.module.css';


const Carousel = ({ items }) => {
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
    <div className={styles.carousel}>
      {content.map((item, index) => (
        <div key={index} className={styles.carouselItem}>
          <img src={item.image} alt={item.title} className={styles.carouselImage} />
          <div className={styles.carouselContent}>
            <h3 className={styles.carouselTitle}>{item.title}</h3>
            <p className={styles.carouselAuthor}>Item ID: {item.item_id}</p>
            <p className={styles.carouselEpisodes}>No of Episodes: {item.n_episodes}</p>
            <p className={styles.carouselDuration}>Duration: {Math.floor(item.duration_s / 60)} minutes</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
