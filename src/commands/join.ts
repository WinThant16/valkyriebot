import { SlashCommandBuilder } from "discord.js";
import type { Command } from "./types.js";
import type { GuildMember, VoiceBasedChannel } from "discord.js";
import {
  joinVoiceChannel,
  getVoiceConnection
} from "@discordjs/voice";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join your current voice channel"),
  async execute(interaction) {
    if (!interaction.guildId) {
      await interaction.reply({ content: "This only works in a server.", ephemeral: true });
      return;
    }

    const member = interaction.member as GuildMember | null;
    const channel = member?.voice?.channel as VoiceBasedChannel | null;

    if (!channel) {
      await interaction.reply({ content: "Join a voice channel first.", ephemeral: true });
      return;
    }

    // If already connected in this guild, do nothing
    const existing = getVoiceConnection(interaction.guildId);
    if (existing) {
      await interaction.reply({ content: `Already connected in ${channel.guild.name}.`, ephemeral: true });
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });

    await interaction.reply(`Joined ${channel.name}`);
  }
};

export default command;
