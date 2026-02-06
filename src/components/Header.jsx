import './Header.css'
import GooeyBtn from './gooeybtn'
// import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import homeCopy from '../../copy/home.json'

function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    { name: homeCopy.header.servicesDropdown.personalCare, href: '/services/personal-care' },
    { name: homeCopy.header.servicesDropdown.companionCare, href: '/services/companion-care' },
    { name: homeCopy.header.servicesDropdown.respiteCare, href: '/services/respite-care' },
    { name: homeCopy.header.servicesDropdown.inFacilityCare, href: '/services/in-facility-care' },
    { name: homeCopy.header.servicesDropdown.specializedCare, href: '/services/specialized-care' },
    { name: homeCopy.header.servicesDropdown.endOfLifeCare, href: '/services/end-of-life-care' }
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
      document.documentElement.style.overflowX = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
      document.documentElement.style.overflowX = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize if moving to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleServiceClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const scrollToTestimonials = (e) => {
    e.preventDefault();
    closeMobileMenu();
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        // Add offset for fixed header
        const headerOffset = 80;
        const elementPosition = testimonialsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with hash
      navigate('/#testimonials');
    }
  };

  return (
    <header className="header" data-aos="fade-down">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" data-aos="fade-right" data-aos-delay="100" onClick={closeMobileMenu}>
          <img src={homeCopy.images.logo} alt={homeCopy.header.logo.alt} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav" data-aos="fade-down" data-aos-delay="200">
          <ul className="nav-list">
            <li><Link to="/about" className="nav-link">{homeCopy.header.navigation.about}</Link></li>
            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link to="/services" className="nav-link dropdown-toggle">
                {homeCopy.header.navigation.services}
                <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
              </Link>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link key={index} to={service.href} className="dropdown-item">
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li><Link to="/careers" className="nav-link">{homeCopy.header.navigation.careers}</Link></li>
            <li><a href="/blogs" className="nav-link">{homeCopy.header.navigation.blog}</a></li>
            <li><a href="#testimonials" className="nav-link" onClick={scrollToTestimonials}>{homeCopy.header.navigation.testimonials}</a></li>
            <li><Link to="/refer-us" className="nav-link">{homeCopy.header.navigation.referUs}</Link></li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div className="social-media-links desktop-social" data-aos="fade-down" data-aos-delay="250">
          <a 
            href="https://www.facebook.com/profile.php?id=61587256243906" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Visit our Facebook page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/cyrilliahomehealthcare?igsh=MWtjNW5jdzV5Y3ZucA==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Visit our Instagram page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="cta-buttons desktop-cta" data-aos="fade-left" data-aos-delay="300">
          {/* <ThemeToggle /> */}
          <Link to="/contact">
            <GooeyBtn text={homeCopy.header.ctaButtons.contact} variant="white" extendby={84} />
          </Link>
          <Link to="/scheduling">
            <GooeyBtn text={homeCopy.header.ctaButtons.scheduleCare} variant="black" extendby={120} direction="left" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={handleMobileMenuToggle}
          aria-label={homeCopy.header.mobileMenu.toggleAriaLabel}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            <li>
              <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.about}
              </Link>
            </li>
            <li className="mobile-dropdown">
              <button 
                className="mobile-nav-link dropdown-toggle"
                onClick={handleServiceClick}
              >
                {homeCopy.header.navigation.services}
                <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
              </button>
              <div className={`mobile-dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    to={service.href} 
                    className="mobile-dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/careers" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.careers}
              </Link>
            </li>
            <li>
              <a href="/blogs" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.blog}
              </a>
            </li>
            <li>
              <a href="#testimonials" className="mobile-nav-link" onClick={scrollToTestimonials}>
                {homeCopy.header.navigation.testimonials}
              </a>
            </li>
            <li>
              <Link to="/refer-us" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.referUs}
              </Link>
            </li>
          </ul>

          {/* Mobile Social Media Links */}
          <div className="social-media-links mobile-social">
            <a 
              href="https://www.facebook.com/profile.php?id=61587256243906" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our Facebook page"
              onClick={closeMobileMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/cyrilliahomehealthcare?igsh=MWtjNW5jdzV5Y3ZucA==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our Instagram page"
              onClick={closeMobileMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="mobile-cta-buttons">
            <Link to="/contact" className="mobile-cta-btn primary" onClick={closeMobileMenu}>
              {homeCopy.header.ctaButtons.contactUs}
            </Link>
            <Link to="/scheduling" className="mobile-cta-btn secondary" onClick={closeMobileMenu}>
              {homeCopy.header.ctaButtons.scheduleCare}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  )
}

export default Header
