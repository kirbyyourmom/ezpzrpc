import { Client } from 'discord-rpc';
import { config, ok, err } from './config.js';

const {
	clientId,
	details,
	state,
	smallImage,
	smallImageText,
	largeImage,
	largeImageText,
	button1Text,
	button1Url,
	button2Text,
	button2Url,
} = config;

if (!clientId) {
	console.error(err('clientId must be provided.'));
	process.exit();
}

const client = new Client({ transport: 'ipc' });

function validateButtons(
	buttons: { label: string | undefined; url: string | undefined }[]
) {
	let validated: { label: string; url: string }[] = [];
	validated = validated.filter((button) => button.label && button.url);
	if (validated.length) return validated;
}

client.on('ready', () => {
	client
		.setActivity({
			details,
			state,
			startTimestamp: new Date(),
			largeImageKey: largeImage,
			smallImageKey: smallImage,
			smallImageText,
			largeImageText,
			buttons: validateButtons([
				{ label: button1Text, url: button1Url },
				{ label: button2Text, url: button2Url },
			]),
			instance: false,
		})
		.catch((error) => {
			console.error(err(error));
		});
	console.log(ok('Discord RPC connected.'));
});

client.login({ clientId: clientId }).catch((error) => {
	console.error(err(error));
});
