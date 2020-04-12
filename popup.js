document.addEventListener('DOMContentLoaded', async () => {
	const mode = await new Promise((resolve) =>
		chrome.storage.sync.get(['activated'], ({ activated }) =>
			resolve(activated)
		)
	);

	document.getElementById('mode').innerHTML = mode
		? '<span class="activated">Activated'
		: 'Disabled';

	const switchElement = document.getElementById('toggleExtension');

	if (mode) {
		switchElement.click();
	}

	switchElement.addEventListener('click', () => {
		chrome.storage.sync.get(['activated'], ({ activated }) => {
			chrome.storage.sync.set({ activated: !activated });

			document.getElementById('mode').innerHTML = !activated
				? '<span class="activated">Activated'
				: 'Disabled';

			chrome.runtime.sendMessage({ changeIcon: !activated });
		});
	});
});
