
function detectLegacy() {
	try {
		eval("const foo=x=>x+1")
		return false
	}
	catch (error) {
		return true
	}
}
