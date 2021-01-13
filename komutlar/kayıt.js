const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.cache.find(r => r.id === "798884881517117491"); //buraya kayıtlı rolünüzün id'sini koyun
  const misafir = message.guild.roles.cache.find(r => r.id === "798885009372741644"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.cache.find(c => c.id === "798884159182602302"); //buraya kayıt log id koyun
  const tag = "tB  ";
  if(!message.member.roles.array().filter(r => r.id === "798884914618826753")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("Bu işlemi sadece Ayarlanmış Kayıt Sorumluları gerçekleştirebilir.");
  } else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    c.roles.add(kayıtlı)
    c.roles.remove(misafir)
    c.setNickname(`${tag} ${nick} | ${yas}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Kayıt Yapıldı")
    .addField(`Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`Yeni isim\n`, `${tag} ${nick} , ${yas}`)
    .setFooter("Kayıt Sistemi")
    .setColor("#6278c5")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt"],
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "k",
  usage: "k"
};