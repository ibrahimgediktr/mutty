import {NextApiRequest, NextApiResponse} from "next";
import {getAccessToken} from "../../../services/twitter.service";
import {getCookie, setCookie} from "../../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405);
    }

    const {oauth_token, oauth_token_secret} = getCookie(req, "auth");

    if (oauth_token || oauth_token_secret) {
        setCookie(res, "auth", '', {
            secure: true,
            httpOnly: true,
            path: "/",
            expires: new Date(1970, 1, 1),
            domain: req.headers["host"]?.replace(":3000", ""),
        });

        res.status(200).json({
            success: true
        });
    } else {
        res.status(401).json({
            success: false,
        });
    }
};

export default handler;
