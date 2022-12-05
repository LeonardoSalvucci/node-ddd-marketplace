import { ContainerBuilder, YamlFileLoader, Logger } from "node-dependency-injection";

class ContainerLogger implements Logger {
  warn(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }
}

export const container = new ContainerBuilder();

export async function registerInjectionContainer() {
  container.logger = new ContainerLogger();
  const loader = new YamlFileLoader(container);
  const env = process.env.NODE_ENV || "dev";
  
  await loader.load(`${__dirname}/application_${env}.yml`)
}