import chalk from "chalk";
class OutputType {
	static INFORMATION = "INFORMATION";
	static SUCCESS = "SUCCESS";
	static WARNING = "WARNING";
	static ERROR = "ERROR";
	static IMPORTANCE = "IMPORTANCE";
}
function print(message, outputType) {
	switch (outputType) {
		case OutputType.INFORMATION:
			console.log(chalk.whiteBright(message));
			break;
		case OutputType.SUCCESS:
			console.log(chalk.greenBright(message));
			break;
		case OutputType.WARNING:
			console.log(chalk.yellowBright(message));
			break;
		case OutputType.ERROR:
			console.log(chalk.redBright(message));
			break;
		case OutputType.IMPORTANCE:
			console.log(chalk.magentaBright.bold(message));
			break;
		default:
			console.log(message);
			break;
	}
}

export { OutputType, print };
