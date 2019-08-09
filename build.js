#!/usr/bin/env node

const mustache = require("mustache")
const {readFile, writeFile} = require("fs").promises

const readText = async path =>
	(await readFile(path, {encoding: "utf-8"})).trim()

const readImage = async(path, prefix = "data:image/svg+xml;base64,") =>
	prefix + (await readFile(path)).toString("base64")

async function main() {

	// load the mustache template for the javascript file
	const template = await readText("source/sorry.template")

	// resources for the template
	const view = {

		// strings of javascript
		ready: await readText("source/guts/ready.js"),
		detectLegacy: await readText("source/guts/detect-legacy.js"),
		createSorryPopup: await readText("source/guts/create-sorry-popup.js"),
		sorryMainRoutine: await readText("source/guts/sorry-main-routine.js"),

		// icon images as data uri's
		icons: "var icons = (" + JSON.stringify({
			firefox: await readImage("assets/firefox.svg"),
			chrome: await readImage("assets/chrome.svg"),
			edge: await readImage("assets/edge.svg"),
			safari: await readImage("assets/safari.svg")
		}) + ")"
	}

	// render the javascript output
	const javascript = mustache.render(template, view)

	// write javascript to dist
	await writeFile("dist/sorry.js", javascript, {encoding: "utf-8"})
}

main()
