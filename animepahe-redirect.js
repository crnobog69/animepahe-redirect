// ==UserScript==
// @name        AnimePahe Domain Redirect
// @description Automatically redirects animepahe.ru links to animepahe.si since the .ru domain no longer exists
// @namespace   AnimepaheRedirect
// @version     1.1.0
// @match       *://*/*
// @grant       none
// @run-at      document-start
// @author      crnobog69
// @homepage    https://github.com/crnobog69
// @updateURL   https://raw.githubusercontent.com/crnobog69/animepahe-redirect/refs/heads/main/animepahe-redirect.js
// @downloadURL https://raw.githubusercontent.com/crnobog69/animepahe-redirect/refs/heads/main/animepahe-redirect.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Check if current page is animepahe.ru and redirect immediately
    if (window.location.hostname === 'animepahe.ru' || window.location.hostname.endsWith('.animepahe.ru')) {
        const newUrl = window.location.href.replace(/animepahe\.ru/g, 'animepahe.si');
        console.log('AnimePahe Redirect: Redirecting from', window.location.href, 'to', newUrl);
        window.location.replace(newUrl);
        return;
    }
    
    // Function to replace animepahe.ru links with animepahe.si
    function replaceAnimePaheLinks() {
        // Find all links on the page
        const links = document.querySelectorAll('a[href*="animepahe.ru"]');
        
        links.forEach(link => {
            const oldHref = link.href;
            const newHref = oldHref.replace(/animepahe\.ru/g, 'animepahe.si');
            
            if (oldHref !== newHref) {
                link.href = newHref;
                console.log('AnimePahe Redirect: Updated link from', oldHref, 'to', newHref);
            }
        });
        
        // Also check for text content that might contain animepahe.ru URLs
        const textNodes = document.evaluate(
            "//text()[contains(., 'animepahe.ru')]",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        
        for (let i = 0; i < textNodes.snapshotLength; i++) {
            const textNode = textNodes.snapshotItem(i);
            if (textNode.nodeValue.includes('animepahe.ru')) {
                textNode.nodeValue = textNode.nodeValue.replace(/animepahe\.ru/g, 'animepahe.si');
                console.log('AnimePahe Redirect: Updated text content');
            }
        }
    }
    
    // Function to handle click events on animepahe.ru links
    function handleLinkClicks(event) {
        const link = event.target.closest('a');
        if (link && link.href && link.href.includes('animepahe.ru')) {
            event.preventDefault();
            const newUrl = link.href.replace(/animepahe\.ru/g, 'animepahe.si');
            console.log('AnimePahe Redirect: Intercepted click, redirecting to', newUrl);
            window.open(newUrl, link.target || '_self');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceAnimePaheLinks);
    } else {
        replaceAnimePaheLinks();
    }
    
    // Also run when new content is added (for dynamic pages)
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.querySelector && node.querySelector('a[href*="animepahe.ru"]')) {
                            shouldUpdate = true;
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldUpdate) {
            replaceAnimePaheLinks();
        }
    });
    
    // Start observing
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });
    
    // Add click event listener to handle dynamic links
    document.addEventListener('click', handleLinkClicks, true);
    
    // Add a small indicator in console
    console.log('AnimePahe Domain Redirect userscript loaded - animepahe.ru → animepahe.si');
})();
