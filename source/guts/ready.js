
var ready = config.ready || function ready(func) {
	if (document.body) func()
	else {
		var done = false
		document.addEventListener("readystatechange", function() {
			if (done) return
			if (document.body) {
				done = true
				func()
			}
		})
	}
}
