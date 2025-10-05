import type { Command } from "./types.js";
import ping from "./ping.js";
import greet from "./greet.js";
import roll from "./roll.js";
import join from "./join.js";
import leave from "./leave.js";

const commands: Command[] = [ping, greet, roll, join, leave];
export default commands;
