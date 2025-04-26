import { exec } from "node:child_process";
import { rm, mkdir } from "node:fs/promises";

process.on("exit", () => {
    console.log("Exit right now, goodbye!");
})

process.on("SIGINT", () => {
    console.log("Recive SIGINT code, trying to exit")

    process.exit();
})

await rm("./dist", { recursive: true });

await mkdir("./dist");

exec("npx tsc", async (error, stdout, stderr) => {
    if (error) {
        console.error(error);
        return;
    }

    if (stderr) {
        console.error(stderr);
        return;
    }

    await import("./dist/index.js");
});