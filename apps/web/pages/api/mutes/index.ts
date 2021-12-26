import {
  addMutedKeyword,
  getMutedList,
} from '../../../services/twitter-service';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from '../../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { oauth_token, oauth_token_secret } = getCookie(req, 'auth');

  if (req.method === 'GET') {
    return res
      .status(200)
      .json(await getMutedList({ oauth_token, oauth_token_secret }));
  } else if (req.method === 'POST') {
    const { keyword } = req.body;
    return res
      .status(200)
      .json(
        await addMutedKeyword({ oauth_token, oauth_token_secret }, keyword)
      );
  }
};

export default handler;
