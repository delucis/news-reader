# news-reader

[![Netlify Status](https://api.netlify.com/api/v1/badges/84247535-66cf-4c09-9b41-8682fd20e006/deploy-status)][ibtd]

This repository builds a website used to download in-ear audio for [_I began the day inside the world trying to look at it, but it was lying on my face, making it hard to see._][wp], for variable ensemble, video and audio playback.

A live version can be found at [`ibtd.netlify.com`][ibtd].


## Development

### Set-up

Download and install dependencies:

```sh
git clone https://github.com/delucis/news-reader.git
cd news-reader
npm i
```

### Scripts

#### `npm run build`

Most of the assets are static and are stored in the `/public` directory, but HTML, Javascript, and CSS sources in `/src` need to be processed at build-time.

#### `npm run dev`

While working on the `/src` files, it can be convenient to have them be reprocessed every time they change. Run the `dev` script to rebuild every time something changes.

[ibtd]: https://ibtd.netlify.com/
[wp]: http://chrisswithinbank.net/2018/11/i-began-the-day-inside-the-world-trying-to-look-at-it-but-it-was-lying-on-my-face-making-it-hard-to-see/
