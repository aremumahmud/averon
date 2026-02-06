import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/hero'
import Statistics from '../components/Statistics'
import About from '../components/About'
import Services from '../components/Services'
import Trust from '../components/Trust'
import Testimonials from '../components/Testimonials'
import Parallax from '../components/Parallax'
import Refer from '../components/Refer'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Newsletter from '../components/Newsletter'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Home() {
  useEffect(() => {
    // Handle hash navigation on mount
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />
      <Hero />
      {/* <Statistics /> } */}
      <About />
      <Services />
      <Trust />
      <Testimonials />
      <Parallax />
      <Refer />
      <Blog />
      <Contact />
      <Newsletter />
      <FAQ />
      <Footer />
    </>
  )
}

export default Home
