import http from "http";
import app from "./server";

const server = http.createServer(app);
let currentApp = app;

const port = 4545 || process.env.PORT;

console.log("port", port);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

if (module.hot) {
	module.hot.accept(["./server"], () => {
		server.removeListener("request", currentApp);
		server.on("request", app);
		currentApp = app;
	});
}