import { ApplicationCommandData, CacheType, CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { Command } from "./command";

enum COMMAND_TYPE {
    voice = "voice",
    user = "user",
    text = "text",
}

export class Pick implements Command {
    name: string;
    description: string;

    constructor() {
        this.name = "pick";
        this.description = "指定した要素からランダムに抽出します";
    }

    async execute(interaction: CommandInteraction<CacheType>) {
        var subCommand = interaction.options.getSubcommand();
        switch(subCommand) {
            case COMMAND_TYPE.voice:
                this._fromVoice(interaction);
                break;
            case COMMAND_TYPE.user:
                this._fromUser(interaction);
                break;
            case COMMAND_TYPE.text:
                this._fromText(interaction);
                break;
            default:
                const errorEmbed = new MessageEmbed({
                    title: "エラー",
                    description: "不正なコマンドです",
                });
                interaction.reply({embeds: [errorEmbed], ephemeral: true});
                break;
        }
    }

    private _fromVoice(interaction: CommandInteraction<CacheType>) {
        const member = interaction.member as GuildMember;
        if(!member) {
            const errorEmbed = new MessageEmbed({
                title: "エラー",
                description: "実行者情報を取得できませんでした",
            });
            interaction.reply({embeds: [errorEmbed], ephemeral: true});
            return;
        }
        const vc = member.voice.channel;
        if(!vc) {
            const errorEmbed = new MessageEmbed({
                title: "エラー",
                description: "VCに参加していません",
            });
            interaction.reply({embeds: [errorEmbed], ephemeral: true});
            return;
        }
        const count = interaction.options.getInteger("count") ?? 1;
        const exceptions = [
            interaction.options.getUser("exception-0"), 
            interaction.options.getUser("exception-1"),
            interaction.options.getUser("exception-2"), 
            interaction.options.getUser("exception-3"),
            interaction.options.getUser("exception-4"), 
        ];
        const members = vc.members.filter(member => !exceptions.includes(member.user));
        const picked = members.random(count);
        const embed = new MessageEmbed({
            title: "抽出結果",
            description: picked.join(","),
        });
        interaction.reply({embeds: [embed]});
    }

    private _fromUser(interaction: CommandInteraction<CacheType>) {
        const guild = interaction.guild;
        if(!guild) {
            const errorEmbed = new MessageEmbed({
                title: "エラー",
                description: "ギルド情報を取得できませんでした",
            });
            interaction.reply({embeds: [errorEmbed], ephemeral: true});
            return;
        }
        const count = interaction.options.getInteger("count") ?? 1;
        const targets = [
            interaction.options.getUser("target-0"),
            interaction.options.getUser("target-1"),
            interaction.options.getUser("target-2"),
            interaction.options.getUser("target-3"),
            interaction.options.getUser("target-4"),
        ];
        const members = targets.filter(target => target != null).map(target => guild.members.cache.get(target!.id));
        const picked = [];
        for(var i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * members.length);
            picked.push(members.at(index));
            members.splice(index, 1);
        }
        const embed = new MessageEmbed({
            title: "抽出結果",
            description: picked.join(","),
        });
        interaction.reply({ embeds: [embed] });
    }

    private _fromText(interaction: CommandInteraction<CacheType>) {
        const count = interaction.options.getInteger("count") ?? 1;
        const targets = [
            interaction.options.getString("target-0"),
            interaction.options.getString("target-1"),
            interaction.options.getString("target-2"),
            interaction.options.getString("target-3"),
            interaction.options.getString("target-4"),
        ];
        const texts = targets.filter(target => target != null && target);
        const picked = [];
        for(var i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * texts.length);
            picked.push(texts.at(index));
            texts.splice(index, 1);
        }
        const embed = new MessageEmbed({
            title: "抽出結果",
            description: picked.join(","),
        });
        interaction.reply({ embeds: [embed] });
    }

    toCommandData(): ApplicationCommandData {
        return {
            name: this.name,
            description: this.description,
            options: [
                {
                    type: "SUB_COMMAND",
                    name: COMMAND_TYPE.voice,
                    description: "VC参加メンバーから抽出",
                    options: [
                        {
                            type: "INTEGER",
                            name: "count",
                            description: "抽出する個数",
                            minValue: 1,
                        },
                        {
                            type: "USER",
                            name: "exception-0",
                            description: "除外メンバー",
                        },
                        {
                            type: "USER",
                            name: "exception-1",
                            description: "除外メンバー",
                        },
                        {
                            type: "USER",
                            name: "exception-2",
                            description: "除外メンバー",
                        },
                        {
                            type: "USER",
                            name: "exception-3",
                            description: "除外メンバー",
                        },
                        {
                            type: "USER",
                            name: "exception-4",
                            description: "除外メンバー",
                        }
                    ]
                },
                {
                    type: "SUB_COMMAND",
                    name: COMMAND_TYPE.user,
                    description: "指定したメンバーから抽出",
                    options: [
                        {
                            type: "INTEGER",
                            name: "count",
                            description: "抽出する個数",
                            minValue: 1,
                        }, 
                        {
                            type: "USER",
                            name: "target-0",
                            description: "対象メンバー",
                            required: true,
                        },
                        {
                            type: "USER",
                            name: "target-1",
                            description: "対象メンバー",
                        },
                        {
                            type: "USER",
                            name: "target-2",
                            description: "対象メンバー",
                        },
                        {
                            type: "USER",
                            name: "target-3",
                            description: "対象メンバー",
                        },
                        {
                            type: "USER",
                            name: "target-4",
                            description: "対象メンバー",
                        },
                    ]
                },
                {
                    type: "SUB_COMMAND",
                    name: COMMAND_TYPE.text,
                    description: "入力した要素から抽出",
                    options: [
                        {
                            type: "INTEGER",
                            name: "count",
                            description: "抽出する個数",
                            minValue: 1,
                        }, 
                        {
                            type: "STRING",
                            name: "target-0",
                            description: "要素名",
                            required: true,
                        },
                        {
                            type: "STRING",
                            name: "target-1",
                            description: "要素名",
                        },
                        {
                            type: "STRING",
                            name: "target-2",
                            description: "要素名",
                        },
                        {
                            type: "STRING",
                            name: "target-3",
                            description: "要素名",
                        },
                        {
                            type: "STRING",
                            name: "target-4",
                            description: "要素名",
                        },
                    ]
                }

            ]
        }
    }
}