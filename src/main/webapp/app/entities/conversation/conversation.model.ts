import { Message } from '../message';
import { Identity } from '../identity';
export class Conversation {
    constructor(
        public id?: number,
        public convName?: string,
        public message?: Message,
        public identity?: Identity,
    ) {
    }
}
