import './JobDetail.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContent } from '../contexts/ContentContext'
import careersCopyFallback from '../../copy/careers.json'
import contactCopyFallback from '../../copy/contact.json'

function JobDetail() {
    const { careersData, contactData } = useContent();
    const careersCopy = careersData || careersCopyFallback;
    const contactCopy = contactData || contactCopyFallback;
    const { jobId } = useParams();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleApplyClick = (position) => {
        // Get the job type from the current job
        const job = jobListings[jobId];
        const jobType = job ? job.type : 'Personal Care Assistant';
        
        const subject = encodeURIComponent(`Application for ${position} - ${jobType} Position`);
        const body = encodeURIComponent(`Dear Hiring Manager,

I am writing to express my interest in the ${position} position (${jobType}).

PERSONAL INFORMATION:
- First Name: [Please provide]
- Last Name: [Please provide]
- Email: [Please provide]
- Mobile Phone: [Please provide]
- Address: [Please provide]
- City, State, Postal Code: [Please provide]
- Date of Birth: [Please provide]
- Location: [Please provide]
- Hours wanted weekly: [Please provide]

EDUCATION & TRAINING:
- High School: [Yes/No]
- College: [Yes/No]
- School: [Please provide]
- Degree Received: [Please provide]

EMPLOYMENT HISTORY:
- Previous Employer: [Please provide]
- Supervisor: [Please provide]
- Phone Number: [Please provide]
- Dates of Employment: [Please provide]

PROFESSIONAL REFERENCES:
- Name: [Please provide]
- Phone Number: [Please provide]

ADDITIONAL INFORMATION:
- Availability (Days & Times): [Please specify your availability]
- Trainings or Certifications: [Please list any trainings or certifications that apply to this position, e.g., CNA certification, First Aid/CPR, Dementia Care Training, etc.]
- Have you ever been convicted of a felony in the last (5) years?: [Please explain]
- Are you legally eligible for employment in the United States?: [Please confirm]
- How did you hear about our company?: [Please provide]

I have attached my resume and CV. I am excited about the opportunity to make a meaningful difference in the lives of clients while building a rewarding career in caregiving.

Thank you for considering my application. I look forward to hearing from you soon.



Best regards,
[Your Full Name]
[Your Phone Number]
[Your Email Address]`);
        
        window.location.href = `mailto:${import.meta.env.VITE_ADMIN_EMAIL || 'info@example.com'}?subject=${subject}&body=${body}`;
    };

    const jobListings = {
        'caregivers-cna': {
            id: 1,
            title: "Caregivers",
            type: "On-Site",
            location: "On-Site",
            salary: "",
            posted: "Now Hiring",
            image: careersCopy.images.jobImages['caregivers-cna'],
            description: "Caregivers play a critical role in providing non-medical Personal Assistance Services (PAS) to individuals who need support with daily living activities. They assist with personal care, mobility, homemaking, transportation, and offer emotional support and companionship, creating a sense of comfort and security.",
            responsibilities: [
                "Assist with activities of daily living (bathing, dressing, grooming)",
                "Support safe mobility and transfers",
                "Provide companionship and emotional support",
                "Assist with homemaking tasks and meal preparation",
                "Transportation assistance for appointments and errands",
                "Medication reminders (non-medical assistance)"
            ],
            requirements: [
                "High school diploma or equivalent",
                "Strong communication and interpersonal skills",
                "Empathy and compassion towards others",
                "Physical stamina; ability to lift and move clients when necessary",
                "Attention to detail and ability to follow specific care plans",
                "Background check and drug screening may be required"
            ],
            benefits: [
                "Opportunities for career advancement and professional development",
                "Rewarding work with meaningful impact",
                "Supportive, team-oriented work environment",
                "Ongoing training and education opportunities"
            ]
        }
    };

    const job = jobListings[jobId];

    if (!job) {
        return (
            <div className="job-detail-page">
                <Header />
                <div className="job-not-found">
                    <div className="job-not-found-container">
                        <h1>Job Not Found</h1>
                        <p>The job you're looking for doesn't exist or has been removed.</p>
                        <Link to="/careers" className="back-to-careers-btn">
                            ← Back to Careers
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="job-detail-page">
            <Header />
            
            {/* Job Detail Hero */}
            <section className="job-detail-hero">
                <div className="job-detail-hero-container">
                    <div className="job-detail-breadcrumb">
                        <Link to="/careers" className="breadcrumb-link">← Back to Careers</Link>
                    </div>
                    
                    <div className="job-detail-hero-content">
                        <div className="job-detail-image" data-aos="fade-right">
                            <img src={job.image} alt={job.title} />
                            <div className="job-detail-overlay">
                                <span className="job-status">{job.posted}</span>
                            </div>
                        </div>
                        
                        <div className="job-detail-info" data-aos="fade-left" data-aos-delay="200">
                            <div className="job-detail-meta">
                                <span className="job-type">{job.type}</span>
                                <span className="job-salary">{job.salary}</span>
                            </div>
                            <h1 className="job-detail-title">{job.title}</h1>
                            <div className="job-detail-location">
                                <span className="location-icon">📍</span>
                                <span>{job.location}</span>
                            </div>
                            <p className="job-detail-description">{job.description}</p>
                            
                            <div className="job-detail-actions">
                                <button 
                                    className="apply-btn-large"
                                    onClick={() => handleApplyClick(job.title)}
                                >
                                    Apply via Email
                                </button>
                                <Link to="/careers/apply" className="apply-btn-large" style={{ marginLeft: 12 }}>
                                    Application Form
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Details Content */}
            <section className="job-details-content-section">
                <div className="job-details-content-container">
                    <div className="job-details-grid">
                        <div className="job-section" data-aos="fade-up">
                            <h2 className="job-section-title">Key Responsibilities</h2>
                            <ul className="job-list">
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">✓</span>
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="job-section-title">Requirements</h2>
                            <ul className="job-list">
                                {job.requirements.map((requirement, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">•</span>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section benefits-section" data-aos="fade-up" data-aos-delay="400">
                            <h2 className="job-section-title">Benefits & Perks</h2>
                            <ul className="job-list benefits-list">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">★</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Section */}
            <section className="job-apply-section">
                <div className="job-apply-container">
                    <div className="job-apply-content" data-aos="fade-up">
                        <h2 className="apply-section-title">Ready to Join Our Team?</h2>
                        <p className="apply-section-description">
                            Take the next step in your caregiving career. Apply for the {job.title} position today 
                            and become part of our compassionate Personal Assistance Services team.
                        </p>
                        <button 
                            className="apply-btn-large"
                            onClick={() => handleApplyClick(job.title)}
                        >
                            Apply for {job.title}
                        </button>
                        <p className="apply-note">
                            Questions about this position? Contact us at{' '}
                            <a href={`mailto:${import.meta.env.VITE_ADMIN_EMAIL || 'info@example.com'}`} className="email-link">
                                {import.meta.env.VITE_ADMIN_EMAIL || 'info@example.com'}
                            </a>{' '}
                            or call{' '}
                            <a href={contactCopy.contactDetails.phoneLink} className="phone-link">
                                {contactCopy.contactDetails.phone}
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default JobDetail
