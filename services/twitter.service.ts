import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "querystring";

export type OAuthToken = {
    oauth_token?: string;
    oauth_token_secret?: string;
    screen_name?: string;
};

const oauth = new OAuth({
    consumer: {
        key: process.env.TWITTER_CONSUMER_KEY || "",
        secret: process.env.TWITTER_CONSUMER_SECRET || "",
    },
    signature_method: "HMAC-SHA1",
    hash_function: (baseString, key) =>
        crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

export const getAuthorizeUrl = async () => {
    const authorizeURL = new URL("https://api.twitter.com/oauth/authorize");

    const request = {
        url: "https://api.twitter.com/oauth/request_token?oauth_callback=oob",
        method: "POST",
    };

    const authHeader = oauth.toHeader(oauth.authorize(request));

    const {oauth_token}: OAuthToken = qs.parse(
        await fetch(request.url, {
            method: request.method,
            headers: {
                Authorization: authHeader["Authorization"],
            },
        }).then((res) => res.text())
    );

    authorizeURL.searchParams.append("oauth_token", oauth_token || "");

    return {authorizeURL, oauth_token};
};

export const getAccessToken = async (oauth_token: string, pin: string) => {
    const request = {
        url: "https://api.twitter.com/oauth/access_token",
        method: "POST",
    };

    const authHeader = oauth.toHeader(oauth.authorize(request));

    const result: OAuthToken = qs.parse(
        await fetch(
            `https://api.twitter.com/oauth/access_token?oauth_verifier=${pin}&oauth_token=${oauth_token}`,
            {
                method: request.method,
                headers: {
                    Authorization: authHeader["Authorization"],
                },
            }
        ).then((res) => res.text())
    );

    console.log('result', result)

    return result;
};

export const getMutedList = async (auth: OAuthToken) => {
    const {oauth_token, oauth_token_secret} = auth;

    const token: OAuth.Token = {
        key: oauth_token || "",
        secret: oauth_token_secret || "",
    };

    const request = {
        url: `https://api.twitter.com/1.1/mutes/keywords/list.json`,
        method: "GET",
    };

    try {
        const result = await fetch(request.url, {
            method: request.method,
            headers: {
                ...oauth.toHeader(oauth.authorize(request, token)),
                Accept: "application/json",
            },
        }).then((res) => res.json());

        return result;
    } catch (e) {
        console.warn("muting listing error", e);
    }

    return false;
};

export const addMutedKeyword = async (auth: OAuthToken, keyword: string) => {
    const {oauth_token, oauth_token_secret} = auth;
    const token: OAuth.Token = {
        key: oauth_token || "",
        secret: oauth_token_secret || "",
    };

    const request = {
        url: `https://api.twitter.com/1.1/mutes/keywords/create.json`,
        method: "POST",
        data: {
            keyword,
            duration: "",
            mute_options: "",
            mute_surfaces: "notifications,home_timeline,tweet_replies",
        },
    };

    try {
        const result = await fetch(request.url, {
            method: request.method,
            body: new URLSearchParams(request.data),
            headers: {
                ...oauth.toHeader(oauth.authorize(request, token)),
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => res.json());

        return result;
    } catch (e) {
        console.warn("muting error", e);
    }

    return false;
};
