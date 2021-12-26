import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthorizeUrl } from '../../../services/twitter-service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  //setCookie(res, 'Next.js', 'api-middleware!')
  const result = await getAuthorizeUrl();

  res.status(200).json(result);
}

export default handler;
