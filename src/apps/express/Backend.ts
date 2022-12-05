import { registerInjectionContainer } from "./dependency-injection";
import { Server } from "./server";

export class Backend {
  server?: Server;

  /**
   * 
   * @returns httpServer instance
   * @dev This function will first register the dependency injection container and then start the application
   */
  async start() {
    // Start and register services in injection container before starting the server
    await registerInjectionContainer();

    // Create Server instance
    const port = process.env.PORT || "3000";
    this.server = new Server(port);

    // Every other bootstrap initializations will be here
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  /**
   * 
   * @returns 
   * @dev This function will stop the server
   */
  async stop() {
    // Any other stop logic will be here
    return this.server?.stop();
  }
}