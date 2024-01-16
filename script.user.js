// ==UserScript==
// @name        Lando site indicator
// @description To easily visually distinguish dev sites from production etc
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140.5 140.5'%3E%3Cpath fill='%23df4090' d='M70.3 0a70.3 70.3 0 1 0 70.2 70.3A70.3 70.3 0 0 0 70.2 0Zm0 9a61.4 61.4 0 0 1 57.4 39.8c-4.5-2.7-13.5-3.6-25-2.6-1.2 0-2.7 1 0 1.2 3.4.2 8.3 1.3 9.7 4.1 2.6 5.5-7.6 9-11 10.8a38 38 0 0 0-.4-1.3 32.1 32.1 0 1 0-61.6 18l.5 1.3c-3.9.4-14.4 3-15-3.1-.4-3.1 3.2-6.7 5.8-8.7 2.2-1.6.5-1.6-.6-1-10.4 5.4-17.5 11-19.8 15.8a61.3 61.3 0 0 1 60-74.5Zm0 122.6a61.3 61.3 0 0 1-57.7-40.3c5.6 3.5 18.6 4 35 1.5a32.1 32.1 0 0 0 54-15.9c15-6.7 25.5-14 28.5-20a61.3 61.3 0 0 1-59.9 74.7Z'/%3E%3C/svg%3E
// @namespace   wtfdesign
// @match       https://*.lndo.site/*
// @match       http://*.lndo.site/*
// @grant       none
// @version     1.0
// @author      wtflm
// ==/UserScript==
(function() {
	// Window border
	let css = document.createElement("style");
	css.textContent = `
		:root::after {
			display: block;
			content: "";
			width: calc(100% - 16px);
			height: calc(100% - 16px);
			pointer-events: none;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999999;
			box-sizing: border-box;
			border-radius: 8px;
			margin: 8px;
			transition: color .2s ease-out;
			box-shadow: 0 0 0 16px currentColor;
			color: #DB2A6F22
		}

		:root:-moz-window-inactive::after {
			color: #DB2A6FFF;
		}
	`;
	document.head.append(css);

	// Favicon overlay
	let canvas = document.createElement("canvas");
	canvas.width = 256;
	canvas.height = 256;
	let context = canvas.getContext("2d");
	let originalIcon = new Image();
	let landoOverlay = new Image();
	originalIcon.addEventListener("load", ev => {
		context.drawImage(originalIcon, 0, 0, canvas.width, canvas.height);
		landoOverlay.addEventListener("load", ev => {
			context.drawImage(landoOverlay, 0, 0, canvas.width, canvas.height);
			let composite = canvas.toDataURL();
			let compositeIcon = document.createElement("link");
			compositeIcon.rel = "icon";
			compositeIcon.href = composite;
			console.log("are we doing this?");
			document.querySelectorAll('link[rel="icon"]').forEach(ev => ev.remove());
			if (document.readyState != "complete") {
				document.addEventListener("readystatechange", ev => {
					setTimeout(() => document.body.append(compositeIcon), 500);
				});
			} else {
				setTimeout(() => document.body.append(compositeIcon), 500);
			}
		});
		landoOverlay.src = GM.info.script.icon;
	});
	if (!(originalIcon.src = document.querySelector(`link[rel="icon"]`)?.href)) {
		originalIcon.src = "./favicon.ico";
	}
})();
