import { InvalidArgumentError } from "./exceptions/InvalidArgumentError";

export type Primitives = String | string | number | Boolean | boolean | Date;

/**
 * This class handle primitives values to aggregate validations and functionality to them
 */
export class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureIsValidValue(value); // Rule to validate that value is not null or undefined;
  }

  private ensureIsValidValue(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(`The value must be defined`);
    }
  }

  equals(other: ValueObject<T>): boolean {
    return this.constructor.name == other.constructor.name && this.value === other.value; // Ensure equals as same type and same value
  }

  toString(): string {
    return this.value.toString();
  }
}