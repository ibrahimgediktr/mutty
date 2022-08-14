import {serialize, CookieSerializeOptions} from 'cookie';
import {NextApiRequest, NextApiResponse} from 'next';

export const getCookie = (req: NextApiRequest, key: string) => {
    const {cookies} = req;
    const value = cookies[key];
    if (!value) {
        return {};
    }

    try {
        return JSON.parse(value.slice(2));
    } catch (e) {
        console.warn('parsing error', e);
    }

    return {}
};

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
) => {
    const stringValue =
        typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

    if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000;
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};
