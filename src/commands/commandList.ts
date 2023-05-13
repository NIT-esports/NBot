import { Command, Help, Pick, Poll, Room, Teaming, Who } from "."

export const CommandList: Command[] = [
    new Help(),
    new Pick(),
    new Poll(),
    new Room(),
    new Teaming(),
    new Who()
]