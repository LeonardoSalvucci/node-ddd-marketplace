import { ValueObject } from "./ValueObject";

export abstract class IntValueObject extends ValueObject<number> {
  isBiggerThan(value: number): boolean {
    return this.value > value;
  }
}