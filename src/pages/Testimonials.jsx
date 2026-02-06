import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import homeCopy from '../../copy/home.json'

function TestimonialsPage() {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="testimonials-page">
            <Header />
            
            {/* Hero Section */}
            <section className="testimonials-hero">
                <div className="testimonials-hero-container">
                    <div className="testimonials-hero-content" data-aos="fade-up">
                        <div className="testimonials-hero-badge">{homeCopy.testimonials.badge}</div>
                        <h1 className="testimonials-hero-title">{homeCopy.testimonials.title}</h1>
                        <p className="testimonials-hero-subtitle">
                            {homeCopy.testimonials.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            <Footer />
        </div>
    )
}

export default TestimonialsPage

