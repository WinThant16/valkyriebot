import "dotenv/config";
import { REST, Routes } from "discord.js";
import commands from "./commands/index.js";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

async function main() {
  const clientId = process.env.CLIENT_ID!;
  const guildId = process.env.GUILD_ID;
  const body = commands.map(c => c.data.toJSON());

  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
    console.log("Guild commands refreshed");
  } else {
    await rest.put(Routes.applicationCommands(clientId), { body });
    console.log("Global commands refreshed");
  }
}
main().catch(err => { console.error(err); process.exit(1); });
