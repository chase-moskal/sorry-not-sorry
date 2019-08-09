#!/usr/bin/env node

const mustache = require("mustache")
const {readFile, writeFile} = require("fs").promises

const readText = path => readFile(path, {encoding: "utf-8"})
	.then(text => text.trim())

const readBase64 = async(path) => "data:image/svg+xml;base64," + (await readFile(path))
	.toString("base64")

async function main() {
	const template = await readText("source/sorry.template")
	const view = {
		ready: await readText("source/guts/ready.js"),
		sorryMainRoutine: await readText("source/guts/sorry-main-routine.js"),
		detectLegacy: await readText("source/guts/detect-legacy.js"),
		createSorryPopup: await readText("source/guts/create-sorry-popup.js"),
		icons: "var icons = (" + JSON.stringify({
			firefox: await readBase64("assets/firefox.svg"),
			chrome: await readBase64("assets/chrome.svg"),
			edge: await readBase64("assets/edge.svg"),
			safari: await readBase64("assets/safari.svg")
		}) + ")"
	}
	const javascript = mustache.render(template, view)
	await writeFile("dist/sorry.js", javascript, {encoding: "utf-8"})
}

main()
