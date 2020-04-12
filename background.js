// Fired when one or more items change.
chrome.storage.onChanged.addListener((changes) => {
	for (let key in changes) {
		if (key === 'activated') {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				let tab = tabs[0];

				if (tab) {
					chrome.tabs.reload(tab.id);
				}
			});
		}
	}
});

// Fired when the active tab in a window changes
chrome.tabs.onActivated.addListener(() => {
	chrome.storage.sync.get(['activated'], ({ activated }) => {
		if (activated) {
			chrome.browserAction.setIcon({ path: 'icons/icon_16.png' });
		} else {
			chrome.browserAction.setIcon({ path: 'icons/icon_disabled_16' });
		}
	});
});

// Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
chrome.runtime.onMessage.addListener((request) => {
	for (let [key, value] of Object.entries(request)) {
		if (key === 'changeIcon') {
			if (value) {
				chrome.browserAction.setIcon({ path: 'icons/icon_16.png' });
			} else {
				chrome.browserAction.setIcon({ path: 'icons/icon_disabled_16.png' });
			}
		}
	}
});

// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get(['activated'], ({ activated }) => {
		if (activated == undefined) {
			chrome.storage.sync.set({ activated: false });
		}

		if (activated) {
			chrome.browserAction.setIcon({ path: 'icons/icon_16.png' });
		} else {
			chrome.browserAction.setIcon({ path: 'icons/icon_disabled_16.png' });
		}
	});
});
