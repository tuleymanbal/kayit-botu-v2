const Discord = require('discord.js');
const client = new Discord.Client();
//tB
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');//tB
const { Client, Util } = require('discord.js');
const weather = require('weather-js')//tB//tB
const fs = require('fs');
const db = require('quick.db');//tB
const http = require('http');
const express = require('express');//tB
require('./util/eventLoader.js')(client);
const path = require('path');//tB
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();//tB
app.get("/", (request, response) => {
  console.log(Date.now() + " tB Youtube");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = process.env.prefix;

const log = message => {
    console.log(`${message}`);
};//tB

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });//tB
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === process.env.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
// (chalk.bgBlue.green(e.replace(regToken 'that was redacted')));
// }); 

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//---------------------------------KOMUTLAR---------------------------------\\


client.on('guildMemberAdd', async member => {
  await member.roles.add(`798885009372741644`) //id yazan yere verilecek rol (unregistered)
  await member.setNickname(`İsim | Yaş`) //yeni gelen kullanıcının adını değiştirme
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var tbzaman = [];
if(zaman < 604800000) {
tbzaman = ':x: Tehlikeli'
} else {
tbzaman = `<a:tamam:717296560765141075> Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`tbdbayar${member.guild.id}`)
 let message = member.guild.channels.cache.cache.find(x => x.id === `705494119895531714`) //id yazan kısma kanal id'si [orn: register-chat]
  const tb = new Discord.MessageEmbed()
 .setTitle(
     "tB public Hoş Geldin"
   )
   .setDescription(`<a:hogel:717781593132892303>**・** **Sunucumuza Hoş geldin** ${member} 
   
<a:supreme:720246535517896778>**・Seninle Beraber** ${message.guild.memberCount} **Kişiyiz**

<a:yn:692871968739033140>**・** **Kaydının Yapılması İçin İsmini ve Yaşını Yaz**

<a:elms:698240537978994728>**・**<@&705459476358234134> **Rolündeki Yetkililer Seninle İlgilenecektir**

<a:boost:692837267567542333>**・** **Sunucumuzun Sınırsız Davet Bağlantısı** https://discord.gg/XXXXXX


<a:ntro:692828377899597826>**・** **Hesap Açılalı** ${gecen} **Olmuş**
<a:elmas:692838040657461278>**・** **Bu Kullanıcı** **|** **${tbzaman}**
`)
.setColor('#6278c5')
message.send(tb)
 
         });