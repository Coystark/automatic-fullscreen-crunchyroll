window.addEventListener("load", function () {
	chrome.storage.sync.get(["activated"], ({ activated }) => {
		if (activated == undefined) {
			chrome.storage.sync.set({ activated: false });
		}

		if (activated) {
			elem = document.querySelector("#vilos-player");

			if (elem != null && elem != undefined) {
				elem.style.position = "fixed";
				elem.style.left = "0";
				elem.style.top = "0";

				// Need to hide all elements except #vilos-player
				document
					.querySelectorAll("body *:not( #vilos-player )")
					.forEach((value) => {
						if (!value.querySelector("#vilos-player")) {
							value.style.display = "none";
						}
					});
			}
		}
	});
});
