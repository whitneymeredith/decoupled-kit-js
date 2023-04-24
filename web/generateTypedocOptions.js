// @ts-check
/**
 * Generates options for docusaurus-plugin-typedoc
 * given a package name and position for the sidebar.
 * @param {string} packageName
 * @param {number} position
 * @param {object} extra tsconfig options
 * @returns TypeDocOptions
 */
const generateTypedocOptions = (packageName, position, tsConfigOptions) => {
	const options = {
		...tsConfigOptions,
		entryPoints: [`../packages/${packageName}/`],
		tsconfig: `../packages/${packageName}/tsconfig.json`,
		readme: `../packages/${packageName}/README.md`,
		out: `Packages/${packageName}`,
		entryPointStrategy: 'packages',
		exclude: [
			'**/main.*',
			'**/node_modules/**',
			'**/__tests__/**',
			'**/__mocks__/**',
			'**/vite-env.*',
		],
		sidebar: {
			categoryLabel: `${packageName}`,
			position: position,
		},
	};

	/** @type {import('typedoc').Options} */
	return options;
};

module.exports = generateTypedocOptions;
