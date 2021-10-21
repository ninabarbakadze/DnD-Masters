import Login from '../Login/Login';
import Hero from '../Hero/Hero';
import './Home.scss';

export default function Home() {
  return (
    <div className="home-container">
      <Login />
      <Hero />
    </div>
  );
}
