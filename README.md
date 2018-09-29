# Landing page for Stickerum project

[![](https://capella.pics/8a741ff4-ac50-4e63-8622-261fd6cf7455.jpg/cover/eff2f5)](https://stickerum.ru/)

## Development and deployment

Use Node.js and NPM to build scripts and styles.

### Get images from Instagram

To get the latest pack of images from your Instagram profile you need an Instagram access token.

1. Create a new Instagram app on the page:
https://www.instagram.com/developer/clients/register/

Fill fields with any valid params and take a look on "redirect URIs" field:
Valid redirect URIs: https://stickerum.ru

Enter here your site's address with protocol.

2. Pass your app's `CLIENT_ID` and `REDIRECT_URI` then open the following URI

`https://www.instagram.com/oauth/authorize/?client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&response_type=token&scope=public_content`

You will be asked to login and give an access to the app

Then you will be redirected to your page.
For example: `https://stickerum.ru/#access_token=<ACCESS_TOKEN>`

Your access token was placed to the URI. Place this token into the `.env` file (copy skeleton from `.env.sample`).

Then call a script:

```
npm run instagram
```

![](https://capella.pics/d56f50bb-22b8-4db6-9448-de9f0830c137.jpg)

### Build JS and CSS

Use the following commands to build scripts and styles.

```
npm run build
```

```
npm run css
```

### Run Docker server

```shell
docker-compose up
```

Local site will be available at [http://localhost:8080](http://localhost:8080).
