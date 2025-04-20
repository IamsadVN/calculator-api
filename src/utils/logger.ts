import chalk from "chalk";

function getTime(): string {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth()}-${date.getDate() > 10 ? date.getDate() : "0" + date.getDate()} ${date.getHours() > 10 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()}`;
}

export const Logger = {
    info: (msg: string) => {
        console.log(chalk.blue(getTime()),chalk.green("INFO"),chalk.white(msg));
    }
}