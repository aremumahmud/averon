import './Footer.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import homeCopy from '../../copy/home.json'

function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Footer newsletter subscription:', email);
            setEmail('');
            // Scroll to top
            window.scrollTo(0, 0);
            // Add success handling here
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Company Info */}
                    <div className="footer-section company-info">
                        <div className="footer-logo">
                            <img src={homeCopy.images.logo} alt={homeCopy.footer.companyName} className="footer-logo-img" />
                            <h3>{homeCopy.footer.companyName}</h3>
                        </div>
                        <p className="company-description">
                            {homeCopy.footer.companyDescription}
                        </p>
                        <div className="company-badges">
                            {homeCopy.footer.badges.map((badge, index) => (
                                <div key={index} className="badge">{badge}</div>
                            ))}
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{homeCopy.footer.sections.ourServices.title}</h4>
                        <ul className="footer-links">
                            {homeCopy.footer.sections.ourServices.links.map((link, index) => {
                                // Map service names to their routes
                                const serviceRouteMap = {
                                    'Personal Care Services': '/services/personal-care',
                                    'Companion Care': '/services/companion-care',
                                    'Respite Care': '/services/respite-care',
                                    'In-Facility Care': '/services/in-facility-care',
                                    'Specialized Care': '/services/specialized-care',
                                    'End-of-Life Care': '/services/end-of-life-care'
                                };
                                const route = serviceRouteMap[link] || '/services';
                                return (
                                    <li key={index}><Link to={route}>{link}</Link></li>
                                );
                            })}
                        </ul>
                        <div className="footer-cta">
                            <Link to="/scheduling" className="schedule-btn">{homeCopy.footer.sections.ourServices.ctaButton}</Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{homeCopy.footer.sections.quickLinks.title}</h4>
                        <ul className="footer-links">
                            {homeCopy.footer.sections.quickLinks.links.map((link, index) => {
                                // Map link names to routes
                                const linkRouteMap = {
                                    'About Us': '/about',
                                    'Our Services': '/services',
                                    'Careers': '/careers',
                                    'Blog': '/blogs',
                                    'Contact': '/contact',
                                    'Refer Us': '/refer-us'
                                };
                                const route = linkRouteMap[link] || '#';
                                return (
                                    <li key={index}>
                                        {route !== '#' ? (
                                            <Link to={route}>{link}</Link>
                                        ) : (
                                            <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        <h4 className="footer-heading legal-heading">{homeCopy.footer.sections.legal.title}</h4>
                        <ul className="footer-links">
                            {homeCopy.footer.sections.legal.links.map((link, index) => (
                                <li key={index}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{homeCopy.footer.sections.contactInfo.title}</h4>
                        <div className="contact-info1">
                            <div className="contact-item">
                                <strong>Service Area</strong>
                                <p>{homeCopy.footer.sections.contactInfo.serviceArea}</p>
                            </div>
                            <div className="contact-item">
                                <strong>Phone</strong>
                                <p>{homeCopy.footer.sections.contactInfo.phone}</p>
                            </div>
                            <div className="contact-item">
                                <strong>Email</strong>
                                <p>{homeCopy.footer.sections.contactInfo.email}</p>
                            </div>
                        </div>
                        
                        <div className="business-hours">
                            <h4 className="footer-heading">{homeCopy.footer.sections.businessHours.title}</h4>
                            <div className="hours-list">
                                <div className="hours-item">
                                    <span className="hours-icon">🕘</span>
                                    <div>
                                        <strong>{homeCopy.footer.sections.businessHours.weekdays.days}</strong>
                                        <p>{homeCopy.footer.sections.businessHours.weekdays.hours}</p>
                                    </div>
                                </div>
                                <div className="hours-item">
                                    <span className="hours-icon">📞</span>
                                    <div>
                                        <strong>{homeCopy.footer.sections.businessHours.weekends.days}</strong>
                                        <p>{homeCopy.footer.sections.businessHours.weekends.hours}</p>
                                    </div>
                                </div>
                                <div className="hours-item">
                                    <span className="hours-icon">🚨</span>
                                    <div>
                                        <strong>{homeCopy.footer.sections.businessHours.emergency.days}</strong>
                                        <p>{homeCopy.footer.sections.businessHours.emergency.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="footer-newsletter">
                    <div className="newsletter-content">
                        <h3>{homeCopy.footer.newsletter.title}</h3>
                        <p>{homeCopy.footer.newsletter.description}</p>
                        <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={homeCopy.footer.newsletter.emailPlaceholder}
                                required
                            />
                            <button type="submit">{homeCopy.footer.newsletter.subscribeButton}</button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>{homeCopy.footer.copyright}</p>
                        </div>
                        <div className="footer-tagline">
                            <p>
                                {homeCopy.footer.tagline}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
