module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.md'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};