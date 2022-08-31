import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json("");
  }

  if (!req.query["url"] || typeof req.query["url"] != "string") {
    return res.status(400).json("");
  }

  const url: string = req.query["url"];

  if (!url.startsWith("https://api.twitter.com/oauth/authorize?oauth_token=")) {
    return res.status(400).json("");
  }

  return res.redirect(url);
};

export default handler;
