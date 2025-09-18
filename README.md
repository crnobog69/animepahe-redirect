# AnimePahe Domain Redirect

A userscript that automatically redirects dead `animepahe.ru` links to the working `animepahe.si` domain.

## What it does

- **Automatic redirect**: If you visit `animepahe.ru`, instantly redirects to `animepahe.si`
- **Link replacement**: Finds and updates all `animepahe.ru` links on any webpage
- **Click interception**: Handles clicks on old links and redirects them
- **Dynamic content**: Works with pages that load content after initial page load

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)
2. Click [here](animepahe-redirect.user.js) to install the script
3. Enable the script in your userscript manager

## Features

- Works on **all websites** (`*://*/*`)
- Silent operation (no visual indicators)
- Console logging for debugging
- Handles both direct navigation and link clicks

## Why?

The `animepahe.ru` domain no longer exists, but many websites and applications still reference it. This script ensures you'll always reach the correct working domain (`animepahe.si`) without encountering "This site can't be reached" errors.

---

**Author**: [crnobog69](https://github.com/crnobog69)  
**Version**: 1.1.0
