'use client';

import React, { useState } from 'react';

const NewsletterWidget: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Here you would typically call your newsletter API
        // For now, we'll just simulate a submission
        setTimeout(() => {
            alert('Thank you for subscribing!');
            setEmail('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="widget clearfix">
            <div className="card">
                <div className="card-body">
                    <form className="form-signin" onSubmit={handleSubmit}>
                        <div className="center text-center">
                            <i className="icon-line-mail text-muted mb-3" style={{ fontSize: '48px', lineHeight: 1 }}></i>
                            <h3 className="h3 mb-3 fw-normal font-primary">Subscribe to Our Newsletter</h3>
                            <p className="font-secondary mb-2">Lorem ipsum dolor sit adipisicing elit.</p>
                        </div>

                        <div className="form-label-group mb-3">
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="btn btn-lg bg-color text-white w-100 text-uppercase ls1"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Subscribing...' : 'Sign in'}
                        </button>
                        <div className="center text-center">
                            <small className="mt-5 text-muted fst-italic">We also Hate Spam</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterWidget;