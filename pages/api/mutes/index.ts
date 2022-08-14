import {
    addMutedKeyword,
    getMutedList,
} from "../../../services/twitter.service";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "../../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {oauth_token, oauth_token_secret} = getCookie(req, "auth");

    if (!oauth_token || !oauth_token_secret) {
        return res.status(401).json([]);
    }

    if (req.method === "GET") {
        const mutedKeywords = await getMutedList({
            oauth_token,
            oauth_token_secret,
        });

        return res.status(200).json(mutedKeywords);
    } else if (req.method === "POST") {
        const {keyword} = req.body;
        return res
            .status(200)
            .json(
                await addMutedKeyword({oauth_token, oauth_token_secret}, keyword)
            );
    } else {
        return res.status(401).json([]);
    }
};

export default handler;
