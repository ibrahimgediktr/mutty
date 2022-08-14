import {
    addMutedKeyword,
    getMutedList,
} from "../../../services/twitter.service";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "../../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {oauth_token, oauth_token_secret} = getCookie(req, "auth");
    if (req.method !== "POST") {
        return res.status(405);
    }

    const {keywords} = req.body;

    const promises = keywords.map((keyword: string) => addMutedKeyword({oauth_token, oauth_token_secret}, keyword))

    await Promise.all(promises)

    return res
        .status(200)
        .json({
            success: true
        });
};

export default handler;
