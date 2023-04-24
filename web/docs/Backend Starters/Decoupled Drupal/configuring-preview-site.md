---
id: 'configuring-preview-site'
title: 'Configuring a Preview Site'
slug: '/backend-starters/decoupled-drupal/configuring-preview-site'
sidebar_position: 6
---

## Before You Begin

Make sure you have necessary permissions, for example login as Site
Administrator user.

1. Log in to your Drupal instance.
1. Make sure **Pantheon Decoupled** & **Decoupled Preview** module are
   installed.

## Creating a new Preview Site Configuration

1. Go to the **Structure** >> **Preview Sites** section of your Drupal instance.
1. Click on **Add preview site** to create a new configuration for your preview
   site.
1. Fill out the form to set up the Label, URL, Secret, Preview Type, and select
   the Content Type required.
1. Set the URL to point to http(s)://{YOUR_SITE_URL}/api/preview replacing
   `{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` for
   testing preview locally.
1. Set a secret for the Preview Site and note this value down.

## Editing an existing Preview Site Configuration

1. Go to the **Structure** >> **Preview Sites** section of your Drupal instance.
1. Locate the existing preview site you wish to edit, such as the **Example
   NextJS Preview** site.
1. Click on **Edit** to open the configuration form.
1. Update the placeholder URL to the desired URL for your preview site, from the
   example URL `https://example.site/api/preview` replace `example.site` with
   the URL of your frontend site or use `localhost:3000` for local testing.
1. Save your changes.
