import { User } from '../../shared';
import { Message } from '../message';
import { Conversation } from '../conversation';
export class Identity {
    constructor(
        public id?: number,
        public identityName?: string,
        public identityPassword?: string,
        public user?: User,
        public sender?: Message,
        public conv?: Conversation,
    ) {
    }
}
