import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import DidYouKnow from './components/DidYouKnow';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16"> {/* Add padding top to account for fixed header */}
        <Hero />
        <Features />
        <HowItWorks />
        <Newsletter />
        <DidYouKnow />
        <Footer />
      </div>
    </div>
  );
}
