---
id: 'gatsby-wordpress-troubleshooting'
title: 'Troubleshooting'
slug: '/frontend-starters/gatsby/gatsby-wordpress/troubleshooting'
sidebar_position: 4
---
## Before You Begin

This guide is for common troubleshooting tips when developing with the `@pantheon-systems/gatsby-wordpress-starter`. For information on troubleshooting on Pantheon, see [Pantheon Front-End Sites Frequently Asked Questions](https://pantheon.io/docs/guides/decoupled-sites/faq/).

## `gatsby-source-wordpress` Fails To Fetch Data From WordPress

There are a few possible reasons for this:
1. The `WP GraphQL` plugin in WordPress has not been activated
1. The `WP Gatsby` plugin in WordPress has not been activated
	> Solution: activate the plugin
1. The  `gatsby-source-plugin` fails with the following error:
	```shell
	Error: getaddrinfo ENOTFOUND dev-my-wordpress-site.pantheonsite.io
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:71:26)
    
	Error occurred while fetching non-Node root fields.
	```
	>Solution: Check that the WordPress site it active and try the command again. Ensure both the  `WP GraphQL` and `WP Gatsby` plugins are activated.
## WordPress Server Overloaded
Rarely, the `gatsby-source-wordpress` server complains of an overloaded WordPress server. If you are experiencing this issue frequently, it is recommended to add the following options to the `gatsby-source-wordpress` plugin inside of the `gatsby-config.js`. See the [plugin options on schema request concurrency](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/plugin-options.md#schemarequestconcurrency) for more information.
```js
{
// ...rest of config,
plugins: [
	resolve: `gatsby-source-wordpress`,
			options: {
				url,
				schema: {
				   perPage: 20, // default 100
				   requestConcurrency: 5, // default 15
				   previewRequestConcurrency: 2, // default 5
				 },
			},
	
	]
}
```