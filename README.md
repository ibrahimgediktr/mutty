## Mutty

Make better Twitter Timeline with Mutty. Mutty is simple Twitter Mute tool. You can mute multiple keywords with easy way
 
### How it works

When you looked Twitter API Docs, you cannot see any API supports for muting words. Yes, right but wrong. Actually It has support but It's only supported for custom apps like (Twitter for Mac, Twitter for iOS etc.) If you find any these apps consumer key and consumer secret. You can manage muting operations. Implemented it with Twitter For Mac app. When you authorize to Twitter, you will see "Authorize with Twitter for Mac"

This project is not logging and storing any tokens. It just set your oauth tokens into cookies and It's only reading for sending to Twitter API's. I added all practices for securing cookie. If you don't trust the website. You can use it on local with local setup guide

### Local Setup

```bash

$ git clone https://github.com/peacecwz/mutty

$ npm i

```

Edit .env.sample file and put Twitter Consumer Key and Consumer Secret and save as .env (remove ".sample")

```bash

$ npm run dev

```

## Contribution

Feel free to contribute as issue or PR

## License

This project is licensed under the MIT License
