import { REvent, EventType } from "./REvent";

export class Animal extends REvent {
  constructor() {
    super({ event: EventType.Animal });
  }
}
