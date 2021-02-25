module.exports = {
	extends: [
		'@lrnz09/eslint-config',
		'@lrnz09/eslint-config/typescript',
		'@lrnz09/eslint-config/react-native',
		'@lrnz09/eslint-config/prettier',
	],
	root: true,
	rules: {
		'react-native/no-raw-text': 'off',
	},
}
