## Mutty

Make better Twitter Timeline with Mutty. Mutty is simple Twitter Mute tool. You can mute multiple keywords with easy way
 
### How it works

When you looked Twitter API Docs, you cannot see any API supports for muting words. Yes, right but wrong. Actually It has support but It's only supported for custom apps like (Twitter for Mac, Twitter for iOS etc.) If you find any these apps consumer key and consumer secret. You can manage muting operations. Implemented it with Twitter For Mac app. When you authorize to Twitter, you will see "Authorize with Twitter for Mac"

This project is not logging and storing any tokens. It just set your oauth tokens into cookies and It's only reading for sending to Twitter API's. I added all practices for securing cookie. If you don't trust the website. You can use it on local

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
