import { Reaction } from "./reaction.type";
import { Trigger } from "./trigger.type";

type Service = {
    id: string;
    triggers: Trigger[];
    reactions: Reaction[];
};
