'use strict';
import { readFileSync } from 'fs';
import { hex } from 'chalk';
import { join } from 'path';

let config: Record<string, string> = {};

const ok = hex('#63c5da'),
	err = hex('#e3242b');

let contents: string = readFileSync(
	join(__dirname, '../config.txt')
).toString();
let lines: RegExpMatchArray | null = contents.match(/[^\r\n]+/g);

if (!lines) {
	console.error(err('Invalid config file.'));
	process.exit(1);
}

lines.forEach((line) => {
	line = line.trimLeft();
	if (line.includes(':')) {
		let data = line.split(':');
		config[data[0].trim()] = data.slice(1).join(':').trim();
	}
});

export { ok, err, config };
