import { Identity } from '../identity';
import { Conversation } from '../conversation';
export class Message {
    constructor(
        public id?: number,
        public message?: string,
        public identity?: Identity,
        public conv?: Conversation,
    ) {
    }
}
