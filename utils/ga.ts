export const pageview = (url: string) => {
    // @ts-ignore
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    });
};

export interface EventProps {
    action: string;
    params: object;
}

// log specific events happening.
export const event = ({action, params}: EventProps) => {
    // @ts-ignore
    window.gtag("event", action, params);
};
