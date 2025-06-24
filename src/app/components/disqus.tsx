'use client';

import { useEffect } from 'react';

interface DisqusProps {
    url: string;
    identifier: string;
    shortname: string;
}

declare global {
    interface Window {
        DISQUS?: any; // eslint-disable-line
    }
}

const DisqusComment = ({ url, identifier, shortname }: DisqusProps) => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const disqus_config = function (this: any) {
            this.page.url = url;
            this.page.identifier = identifier;
        };

        if (window.DISQUS) {
            window.DISQUS.reset({
                reload: true,
                config: disqus_config,
            });
        } else {
            const script = document.createElement('script');
            script.src = `https://${shortname}.disqus.com/embed.js`;
            script.setAttribute('data-timestamp', Date.now().toString());
            script.async = true;
            document.body.appendChild(script);
        }
    }, [url, identifier, shortname]);

    return <div id="disqus_thread" className="mt-8" />;
};

export default DisqusComment;
