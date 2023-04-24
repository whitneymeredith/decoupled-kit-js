---
id: 'next-drupal-env-vars'
title: 'Setting Environment Variables'
slug: '/frontend-starters/nextjs/nextjs-drupal/setting-environment-variables'
sidebar_position: 1
---

## Local Development

In order to fetch data from the Drupal instance, Next.js needs to know the
endpoint at build time. For local development, the starter kit uses
[dotenv](https://www.npmjs.com/package/dotenv).

In your projects `.env.development.local` file, update the `BACKEND_URL` and
`IMAGE_DOMAIN` with your Drupal CMS URL, and the `IMAGE_DOMAIN`. If the
`BACKEND_URL` and `IMAGE_DOMAIN` are the same, you can omit setting the
`IMAGE_DOMAIN`.

For example:

```
BACKEND_URL=https://my-drupal-site.pantheon.site/
IMAGE_DOMAIN=my-image-cdn.site
```

If your site is translated and you would like the hreflang metadata set
correctly, you may set `FRONTEND_URL` to the URL of your frontend site.

If the `FRONTEND_URL` is not set, it will default to the value of
`PANTHEON_ENVIRONMENT_URL`

```
FRONTEND_URL=https://my-frontend-site.pantheon.site
```

For development, this value can be set to any string, or `http://localhost:3000`

## Decoupled Preview

To enable Decoupled Preview, the following environment variables must be set in
the `.env.development.local` for local dev and in the Pantheon dashboard for
production or Multidev environments.

```
PREVIEW_SECRET
CLIENT_ID
CLIENT_SECRET
```

- `PREVIEW_SECRET` - Set the Preview Secret here: {your Backend
  URL}/admin/structure/dp-preview-site/example_nextjs_preview
- `CLIENT_ID` - Visible as the UUID for the “Example Consumer” here: {your
  Backend URL}/en/admin/config/services/consumer
- `CLIENT_SECRET` - Set the Client Secret here: {your Backend
  URL}/admin/config/services/consumer/2/edit

See [Implementing Preview](./implementing-preview.md) for more information on
how to implement Decoupled Preview with Next.js and Drupal.

## Connecting to Multidev Environments

To connect to a Multidev environment, the `PANTHEON_ENVIRONMENT` environment
variable can be used inside of `next.config.js`.

Either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it
in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-drupal-site.pantheonsite.io
```

Taking a look at how the `next.config.js` works, there is this logic which sets
the `backendUrl`.

```js
let backendUrl, imageDomain;
if (process.env.BACKEND_URL === undefined) {
	backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
	imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;

	// populate BACKEND_URL as a fallback and for build scripts
	process.env.BACKEND_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
} else {
	backendUrl = process.env.BACKEND_URL;
	imageDomain =
		process.env.IMAGE_DOMAIN ||
		process.env.BACKEND_URL.replace(/^https?:\/\//, '');
}
```

In order to connect to a Multidev backend, this backendUrl will need to be
updated. `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name.

This code could be added under the above logic to connect to a Multidev that is
prefixed with the branch name of my site.

```js
/**
 * PANTHEON_ENVIRONMENT is equal to `multi-demo` since that is the name of my branch. I will use this variable to create a `backendUrl` which points
 * to my Multidev backend.
 **/
if (process.env.PANTHEON_ENVIRONMENT !== 'live') {
	backendUrl = `https://${
		process.env.PANTHEON_ENVIRONMENT
	}-${backendUrl.replace(/^https?:\/\/[^-]*-/, '')}`;
}
```
