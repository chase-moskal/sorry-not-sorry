
function main() {

	// detect legacy browsers
	var legacy = detectLegacy()

	// if "sorry-force-legacy" is in the hash, force legacy
	if (/^#?sorry-force-legacy/i.test(window.location.hash))
		legacy = true

	// on legacy systems, create and insert the sorry popup
	if (legacy) {
		var popup = createSorryPopup()
		document.body.insertBefore(popup, document.body.firstChild)
	}
}
