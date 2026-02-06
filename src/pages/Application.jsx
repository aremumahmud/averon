import './Application.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import emailService from '../services/emailService'
import CloudinaryDocumentUpload from '../components/CloudinaryDocumentUpload'

function Application() {
    const [searchParams] = useSearchParams()
    const jobPosition = searchParams.get('position') || ''

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const steps = [
        { key: 'personal', label: 'Personal Information' },
        { key: 'experience', label: 'Experience & Education' },
        { key: 'additional', label: 'Additional & Documents' },
    ]
    const [currentStep, setCurrentStep] = useState(0)

    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        noMiddleName: false,
        preferredName: '',
        lastName: '',
        address: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        homePhone: '',
        mobilePhone: '',
        email: '',
        location: '',
        hoursWantedWeekly: '',
        dateOfBirth: '',
        educationHighSchool: false,
        educationCollege: false,
        school: '',
        degreeReceived: '',
        employers: [
            { employer: '', dateFrom: '', dateTo: '' }
        ],
        availability: '',
        trainingsCertifications: '',
        felonyConviction: '',
        eligibleForEmployment: '',
        resumeUrl: '',
        cvUrl: '',
        howDidYouHear: ''
    })

    const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
    const updateArrayItem = (arrKey, idx, field, value) => {
        setForm(prev => {
            const newArr = [...prev[arrKey]]
            newArr[idx] = { ...newArr[idx], [field]: value }
            return { ...prev, [arrKey]: newArr }
        })
    }
    const addArrayItem = (arrKey, template) => {
        setForm(prev => ({ ...prev, [arrKey]: [...prev[arrKey], { ...template }] }))
    }
    const removeArrayItem = (arrKey, idx) => {
        setForm(prev => ({ ...prev, [arrKey]: prev[arrKey].filter((_, i) => i !== idx) }))
    }

    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Only allow submission on the last step
        if (currentStep !== steps.length - 1) {
            return
        }

        const required = [
            form.firstName,
            form.lastName,
            form.mobilePhone,
            form.email,
            form.address,
            form.city,
            form.state,
            form.postalCode,
            form.hoursWantedWeekly,
        ]
        if (required.some(v => !v)) {
            alert('Please complete all required fields marked with *')
            return
        }
        try {
            setSubmitting(true)

            console.log('Sending email with file links...')
            const formWithPosition = {
                ...form,
                jobPosition: jobPosition || 'General Application'
            }
            const result = await emailService.sendApplicationEmail(formWithPosition)
            if (result && result.success !== false) {
                alert('Application submitted successfully. Thank you!')
                window.location.reload()
            } else {
                alert('Submission failed. Please try again or email us directly.')
            }
        } catch (err) {
            console.error(err)
            alert('An error occurred while submitting your application.')
        } finally {
            setSubmitting(false)
            window.scrollTo(0, 0)
        }
    }

    return (
        <div className="application-page">
            <Header />

            <section className="application-hero">
                <div className="application-hero-container">
                    <h1 className="application-title">Employment Application</h1>
                    <p className="application-subtitle">
                        {jobPosition ? `Applying for: ${jobPosition}` : 'Complete all sections to submit your application'}
                    </p>
                </div>
            </section>

            <section className="application-form-section">
                <div className="application-form-container">
                    <form className="application-form" onSubmit={handleSubmit} onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.type !== 'textarea' && e.target.tagName !== 'BUTTON') {
                            e.preventDefault()
                        }
                    }}>
                        {/* Progress Indicator */}
                        <div className="progress-indicator">
                            {steps.map((step, idx) => (
                                <div key={step.key} className={`progress-step ${currentStep >= idx ? 'active' : ''} ${currentStep === idx ? 'current' : ''}`}>
                                    <div className="step-number">{idx + 1}</div>
                                    <div className="step-label">{step.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Personal Information */}
                        {currentStep === 0 && (
                            <div className="form-section-content">
                                <h2 className="section-heading">Personal Information</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>First Name <span className="required">*</span></label>
                                        <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name <span className="required">*</span></label>
                                        <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Middle Name</label>
                                        <div className="middle-name-group">
                                            <input type="text" value={form.middleName} onChange={e => update('middleName', e.target.value)} disabled={form.noMiddleName} />
                                            <label className="checkbox-label">
                                                <input type="checkbox" checked={form.noMiddleName} onChange={e => { update('noMiddleName', e.target.checked); if (e.target.checked) update('middleName', '') }} />
                                                No Middle Name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Preferred Name</label>
                                        <input type="text" value={form.preferredName} onChange={e => update('preferredName', e.target.value)} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Address <span className="required">*</span></label>
                                        <input type="text" value={form.address} onChange={e => update('address', e.target.value)} required />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Address Line 2</label>
                                        <input type="text" value={form.addressLine2} onChange={e => update('addressLine2', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>City <span className="required">*</span></label>
                                        <input type="text" value={form.city} onChange={e => update('city', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>State <span className="required">*</span></label>
                                        <input type="text" value={form.state} onChange={e => update('state', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Postal Code <span className="required">*</span></label>
                                        <input type="text" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile Phone <span className="required">*</span></label>
                                        <input type="tel" value={form.mobilePhone} onChange={e => update('mobilePhone', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Home Phone</label>
                                        <input type="tel" value={form.homePhone} onChange={e => update('homePhone', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email <span className="required">*</span></label>
                                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input type="date" value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" value={form.location} onChange={e => update('location', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Hours Desired Weekly <span className="required">*</span></label>
                                        <input type="text" value={form.hoursWantedWeekly} onChange={e => update('hoursWantedWeekly', e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Experience & Education */}
                        {currentStep === 1 && (
                            <div className="form-section-content">
                                <h2 className="section-heading">Education & Training</h2>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <div className="checkbox-group">
                                            <label className="checkbox-label">
                                                <input type="checkbox" checked={form.educationHighSchool} onChange={e => update('educationHighSchool', e.target.checked)} />
                                                High School
                                            </label>
                                            <label className="checkbox-label">
                                                <input type="checkbox" checked={form.educationCollege} onChange={e => update('educationCollege', e.target.checked)} />
                                                College
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>School</label>
                                        <input type="text" value={form.school} onChange={e => update('school', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Degree Received</label>
                                        <input type="text" value={form.degreeReceived} onChange={e => update('degreeReceived', e.target.value)} />
                                    </div>
                                </div>

                                <h2 className="section-heading" style={{ marginTop: '32px' }}>Employment History (Last 3 Years)</h2>
                                {form.employers.map((emp, idx) => (
                                    <div key={idx} className="card">
                                        <div className="card-header">
                                            <h3>Employer {idx + 1}</h3>
                                            {form.employers.length > 1 && (
                                                <button type="button" className="remove-btn" onClick={() => removeArrayItem('employers', idx)}>Remove</button>
                                            )}
                                        </div>
                                        <div className="form-grid">
                                            <div className="form-group full-width">
                                                <label>Employer Name</label>
                                                <input type="text" value={emp.employer} onChange={e => updateArrayItem('employers', idx, 'employer', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Date From</label>
                                                <input type="date" value={emp.dateFrom} onChange={e => updateArrayItem('employers', idx, 'dateFrom', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Date To</label>
                                                <input type="date" value={emp.dateTo} onChange={e => updateArrayItem('employers', idx, 'dateTo', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="add-btn" onClick={() => addArrayItem('employers', { employer: '', dateFrom: '', dateTo: '' })}>
                                    + Add Employer
                                </button>
                            </div>
                        )}

                        {/* Step 3: Additional & Documents */}
                        {currentStep === 2 && (
                            <div className="form-section-content">
                                <h2 className="section-heading">Additional Information</h2>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>What is your availability? (Days & Times)</label>
                                        <textarea rows={3} value={form.availability} onChange={e => update('availability', e.target.value)} placeholder="e.g., Monday-Friday 9am-5pm, Weekends available" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>List any trainings or certifications that apply to this position</label>
                                        <textarea rows={3} value={form.trainingsCertifications} onChange={e => update('trainingsCertifications', e.target.value)} placeholder="e.g., CNA certification, First Aid/CPR, Dementia Care Training, etc." />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Have you ever been convicted of a felony in the last (3) years? If yes, please explain.</label>
                                        <textarea rows={3} value={form.felonyConviction} onChange={e => update('felonyConviction', e.target.value)} placeholder="Please explain or type 'No' if not applicable" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Are you legally eligible for employment in the United States?</label>
                                        <textarea rows={2} value={form.eligibleForEmployment} onChange={e => update('eligibleForEmployment', e.target.value)} placeholder="Please confirm your eligibility" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Resume</label>
                                        <CloudinaryDocumentUpload
                                            value={form.resumeUrl}
                                            onChange={(url) => update('resumeUrl', url)}
                                            label="Upload Resume"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>CV</label>
                                        <CloudinaryDocumentUpload
                                            value={form.cvUrl}
                                            onChange={(url) => update('cvUrl', url)}
                                            label="Upload CV"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>How did you hear about our company?</label>
                                        <input type="text" value={form.howDidYouHear} onChange={e => update('howDidYouHear', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="wizard-actions">
                            <button
                                type="button"
                                className="secondary-btn"
                                disabled={currentStep === 0 || submitting}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setCurrentStep(s => Math.max(0, s - 1))
                                }}
                            >
                                ← Back
                            </button>
                            <div className="step-indicator-text">
                                Step {currentStep + 1} of {steps.length}
                            </div>
                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    className="primary-btn"
                                    disabled={submitting}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setCurrentStep(s => Math.min(steps.length - 1, s + 1))
                                    }}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button type="submit" className="submit-btn" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Application
