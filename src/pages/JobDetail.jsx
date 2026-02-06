import './JobDetail.css'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import careersCopy from '../../copy/careers.json'

function JobDetail() {
    const { jobId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleApplyClick = (position) => {
        // Navigate to application page with job position
        navigate(`/application?position=${encodeURIComponent(position)}`);
    };

    // Get job from careers.json
    const jobFromJson = careersCopy.jobListings.jobs.find(job => job.slug === jobId);
    
    // Default job data structure
    const defaultJobData = {
        'personal-care-assistant-full-time': {
            responsibilities: [
                "Assist clients with personal hygiene (bathing, dressing, grooming)",
                "Provide companionship and emotional support",
                "Help with meal preparation and feeding assistance",
                "Support mobility and safe movement throughout the home",
                "Provide medication reminders and assistance",
                "Perform light housekeeping tasks",
                "Monitor and report changes in client condition",
                "Communicate effectively with clients, families, and care team"
            ],
            requirements: [
                "High school diploma or equivalent",
                "Previous caregiving experience preferred but not required",
                "Excellent communication and interpersonal skills",
                "Compassionate, patient, and reliable personality",
                "Ability to lift up to 50 pounds",
                "Valid driver's license and reliable transportation",
                "Clean background check and drug screening",
                "CPR certification preferred (we can help you obtain)",
                "Flexibility to work various shifts"
            ],
            benefits: [
                "Competitive pay based on experience",
                "Flexible full-time scheduling",
                "Health insurance options",
                "Paid time off and holidays",
                "Ongoing training and professional development",
                "Supportive work environment",
                "Opportunity to make a real difference",
                "Mileage reimbursement for client visits"
            ]
        }
    };

    // Merge job from JSON with default data
    const job = jobFromJson ? {
        ...jobFromJson,
        image: careersCopy.images.jobImages[jobId] || careersCopy.images.jobImages['personal-care-assistant-full-time'],
        responsibilities: defaultJobData[jobId]?.responsibilities || [],
        requirements: defaultJobData[jobId]?.requirements || [],
        benefits: defaultJobData[jobId]?.benefits || []
    } : null;

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
                                    Apply for This Position
                                </button>
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
                            Take the next step in your healthcare career. Apply for the {job.title} position today 
                            and become part of our compassionate care team.
                        </p>
                        <button 
                            className="apply-btn-large"
                            onClick={() => handleApplyClick(job.title)}
                        >
                            Apply for {job.title}
                        </button>
                        <p className="apply-note">
                            Questions about this position? Contact us at{' '}
                            <a href="mailto:john.ovuera@averon.care" className="email-link">
                                john.ovuera@averon.care
                            </a>{' '}
                            or call{' '}
                            <a href="tel:8003855157" className="phone-link">
                                800-385-5157
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
