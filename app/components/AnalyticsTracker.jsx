"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentVisitId = useRef(null);
    const lastTrackedUrl = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined" || !pathname) return;

        const trackVisit = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
            const url = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
            // Get the current hash if any, and build full valid URL
            const hash = window.location.hash;
            const query = searchParams.toString();
            const fullUrl = `${pathname}${query ? '?' + query : ''}${hash}`;

            if (lastTrackedUrl.current === fullUrl) return;

            // If leaving previous page, send leave beacon
            if (currentVisitId.current && lastTrackedUrl.current !== null) {
                fetch(`${url}/leave-page`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: currentVisitId.current }),
                }).catch(() => { });
                currentVisitId.current = null;
            }

            lastTrackedUrl.current = fullUrl;

            try {
                const res = await fetch(`${url}/track-visit`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: fullUrl }),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.id) {
                        currentVisitId.current = data.id;
                    }
                }
            } catch (err) { }
        };

        trackVisit();

        window.addEventListener('hashchange', trackVisit);

        return () => {
            window.removeEventListener('hashchange', trackVisit);
        };
    }, [pathname, searchParams]); // Reacts to Next.js route navigation

    // Handle full tab/browser window close
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (currentVisitId.current) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
                const url = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
                fetch(`${url}/leave-page`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: currentVisitId.current })
                }).catch(() => { });
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return null;
}
