import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import type { Interaction } from "discord.js";
import commands from "./commands/index.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const registry = new Map(commands.map(c => [c.data.name, c]));

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
  console.log("Loaded commands:", [...registry.keys()]);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = registry.get(interaction.commandName);
  if (!cmd) {
    await interaction.reply({ content: "Unknown command", ephemeral: true });
    return;
  }
  try {
    await cmd.execute(interaction);
  } catch (err) {
    console.error(err);
    const content = "Command failed";
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ content, ephemeral: true });
    } else {
      await interaction.reply({ content, ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
