import { Injectable } from "@nestjs/common";
import { ScenariosService } from "../scenarios.service";
import * as Discord from "discord.js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DiscordService {
  private readonly client: Discord.Client;
  
  constructor(
    private readonly scenariosService: ScenariosService,
    private readonly configService: ConfigService
  ) {
    const options: Discord.ClientOptions = {
      intents: [
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.Guilds,
      ],
    };
    this.client = new Discord.Client(options);
    this.client.on("ready", () => {
      console.log("Discord client ready");
    });
    this.client.login(this.configService.get("DISCORD_BOT_TOKEN"));
  }
}