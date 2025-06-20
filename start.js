import { exec } from "node:child_process";
import { rm, mkdir } from "node:fs/promises";

process.on("SIGKILL", () => {
    console.log("Receive SIGKILL code, trying to exit");

    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("Receive SIGTERM code, trying to exit");

    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("Receive SIGINT code, trying to exit");

    process.exit(0);
});

process.on("exit", () => {
    console.log(`Process exited with code ${process.exitCode || 0}`);
});

await rm("./dist", { recursive: true });

await mkdir("./dist");

const start = Date.now();
exec("npx tsc", async (error, stdout, stderr) => {
    if (error) {
        console.error(error);
        return;
    }

    if (stderr) {
        console.error(stderr);
        return;
    }

    const end = Date.now();

    console.log(`Took ${end-start}ms to build.`);

    await import("./dist/index.js");
});