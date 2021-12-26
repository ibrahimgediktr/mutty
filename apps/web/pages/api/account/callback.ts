import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../../../services/twitter-service';
import { setCookie } from '../../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pin, oauth_token } = req.body;

  const result = await getAccessToken(oauth_token, pin);

  if (result) {
    setCookie(res, 'auth', result, {
      secure: true,
      httpOnly: true,
      path: '/',
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
