'use client';

import React from 'react';

interface SocialShareProps {
    title: string;
    url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    return (
        <div className="si-share d-flex justify-content-between align-items-center mb-4 px-0">
            <span>Share this Post:</span>
            <div className="ms-4">
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon si-colored si-facebook mx-1"
                >
                    <i className="icon-facebook"></i>
                </a>
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon si-colored si-twitter mx-1"
                >
                    <i className="icon-twitter"></i>
                </a>
                <a
                    href={shareLinks.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon si-colored si-pinterest mx-1"
                >
                    <i className="icon-pinterest"></i>
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon si-colored si-linkedin mx-1"
                >
                    <i className="icon-linkedin"></i>
                </a>
            </div>
        </div>
    );
};

export default SocialShare;