
function ready(func) {
	if (document.readyState !== "loading") func()
	else {
		var done = false
		document.addEventListener("readystatechange", function() {
			if (done) return
			if (document.readyState !== "loading") {
				done = true
				func()
			}
		})
	}
}
