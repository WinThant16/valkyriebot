import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import type { Command } from "./types.js";

const lines = [
  "The Valkyrie watches over you",
  "Rise and meet your fate with courage",
  "Your path shines bright today"
];

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("greet")
    .setDescription("Valkyrie sends a greeting"),
  async execute(interaction) {
    const msg = lines[Math.floor(Math.random() * lines.length)];
    const embed = new EmbedBuilder()
      .setTitle("Valkyrie")
      .setDescription(msg)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
