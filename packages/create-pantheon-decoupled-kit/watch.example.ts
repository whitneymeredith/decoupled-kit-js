import type { ParsedArgs } from 'minimist';
import path from 'path';
export const watchOptions: ParsedArgs = {
	_: ['next-wp'],
	outDir: path.resolve('../../starters/next-wordpress-generated'),
	appName: 'Next WordPress Watch Example',
	cmsEndpoint: 'https://myWPSite.pantheonsite.io/wp/graphql',
	// prevent the install step after project generation.
	// The watch script sets this to true after the initial run.
	noInstall: true,
	// force overwrite of the target directory.
	// WARNING: this option could overwrite uncommitted work.
	// Choose an empty outDir for best results with this options.
	force: true,
	// squelch console output from generators.
	// watch script still shows output.
	silent: true,
	// number of milliseconds to debounce file system watching
	debounce: 5000,
};
