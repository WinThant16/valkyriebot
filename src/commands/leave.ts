import { SlashCommandBuilder } from "discord.js";
import type { Command } from "./types.js";
import { getVoiceConnection } from "@discordjs/voice";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave the voice channel"),
  async execute(interaction) {
    if (!interaction.guildId) {
      await interaction.reply({ content: "This only works in a server.", ephemeral: true });
      return;
    }
    const conn = getVoiceConnection(interaction.guildId);
    if (!conn) {
      await interaction.reply({ content: "I am not in a voice channel.", ephemeral: true });
      return;
    }
    conn.destroy();
    await interaction.reply("Left the voice channel.");
  }
};

export default command;
