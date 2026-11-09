// Data set: `?set=<name>` renders mascot-mv's projects/<name>/: scene3d.ts with data3d/{audio,lyrics}.json, instead of
// p(doom)'s scenes and data. Other videos use this engine without touching the p(doom) sample.
export const DATA_SET = new URLSearchParams(location.search).get('set');
/** A set's data lives with its project in mascot-mv: projects/<set>/data3d/ (served by vite.config.ts). */
export const DATA_DIR = DATA_SET ? `projects/${DATA_SET}/data3d` : 'data';
export const dataUrls = (file: string) => DATA_SET ? [`${DATA_DIR}/${file}.json`] : [`data/${file}.json`, `data/${file}.approx.json`];
