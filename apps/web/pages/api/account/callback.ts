import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../../../services/twitter-service';
import { setCookie } from '../../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405);
  }

  const { pin, oauth_token } = req.body;

  const result = await getAccessToken(oauth_token, pin);

  if (result) {
    setCookie(res, 'auth', result, {
      secure: true,
      httpOnly: true,
      path: '/',
      expires: new Date(new Date().getTime() + 86409000),
      domain: req.headers['host'].replace(':4200', ''),
    });

    res.status(200).json({
      success: true,
    });
  } else {
    res.status(401).json({
      success: false,
    });
  }
};

export default handler;
