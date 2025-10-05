import { SlashCommandBuilder } from "discord.js";
import type { Command } from "./types.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a die")
    .addIntegerOption(o =>
      o.setName("sides")
        .setDescription("Number of sides")
        .setMinValue(2)
        .setMaxValue(1000)
    ),
  async execute(interaction) {
    const sides = interaction.options.getInteger("sides") ?? 6;
    const value = 1 + Math.floor(Math.random() * sides);
    await interaction.reply(`You rolled ${value} on a d${sides}`);
  }
};

export default command;
