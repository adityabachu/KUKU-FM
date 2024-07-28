import Header from '../components/Header';
import Carousel from '../components/Carousel';
import InfiniteScroll from '../components/InfiniteScroll';

const carouselItems = [
  {
    image: '/path/to/image1.jpg',
    title: 'Explore a World of Knowledge',
    description: 'Listen to stories, podcasts, and more!',
  },
  {
    image: '/path/to/image2.jpg',
    title: 'Expand Your Horizons',
    description: 'Learn new things every day.',
  },
  {
    image: '/path/to/image3.jpg',
    title: 'Join a Community of Learners',
    description: 'Engage with like-minded individuals.',
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Carousel items={carouselItems} />
        <InfiniteScroll />
      </main>
    </div>
  );
}
