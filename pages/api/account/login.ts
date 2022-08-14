import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthorizeUrl } from '../../../services/twitter.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405);
  }

  const result = await getAuthorizeUrl();

  res.status(200).json(result);
};

export default handler;
