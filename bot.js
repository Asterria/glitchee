const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Rowine 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};


client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: '◬ P Y R M İ D',
            type: "STREAMING",
            url: "https://www.twitch.tv/pyrmid"
        }
    });
});


//------Loglar--------\\
const açılankanal_koruma_log = "748352359389724764"
const silinenrol_log = "748352356281745409"
const silinenoda_log = "748352361155526677"
const güncellenenrol_log = "748352357770854431"
const cezalı_rol_id = "748352239634219128"
const oluşturulanrol_log ="748352355136831598"
const şüpheli_rol = "748352240254976161"
//--------Kanal Oluşturma Koruma------\\
 client.on('channelCreate', async (channel,member) => {

const fetch = await channel.guild.fetchAuditLogs ({type: "CHANNEL_CREATE	"}).then(log => log.entries.first())
  let yapanad = fetch.executor;
    
    if(yapanad.id== client.user.id)  return;
const embed = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapanad.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ METİN KANALI OLUŞTURMA__**`)
.addField(`Oluşturmaya Çalışan Kullanıcı`,`<@${yapanad.id}>`)
.addField(`**__Açılmaya  Çalışılan Metin Kanalı__**`,`${channel.name}`)
.addField (`**__UYGULANAN İŞLEM__**`,`<@${yapanad.id}> Kullanıcısının Oluşturduğu Kanalı Sildim Ve <@${yapanad.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolunu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)
const embed2 = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapanad.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ SES KANALI OLUŞTURMA__**`)
.addField(`Oluşturmaya Çalışan Kullanıcı`,`<@${yapanad.id}>`)
.addField(`**__Açılmaya  Çalışılan Ses Kanalı__**`,`${channel.name}`)
.addField (`**__UYGULANAN İŞLEM__**`,`<@${yapanad.id}> Kullanıcısının Oluşturduğu Ses Kanalını Sildim Ve <@${yapanad.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolunu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)

			if (channel.type === "text") {
channel.delete()
      channel.guild.members.get(yapanad.id).removeRoles(channel.guild.members.get(yapanad.id).roles.filter(r=> r.name !== "#"))
        setTimeout(()=>{ channel.members.get(yapanad.id).addRole(cezalı_rol_id) },3000)
    //channel.guild.owner.send(`**${client.user.username}** | **${channel.guild.name}** adlı sunucunuzda, \`${channel.name}\` Adlı Metin Kanalı  \`${yapanad.tag}\` Tarafından Açıldı Bende Sildim Açılan Kanal Koruma Kapatmak İçin  \`${ayarlar.prefix}açılankanal-koruma kapat\` Yazınız.`)
client.channels.get(açılankanal_koruma_log).send(embed)//(`**${client.user.username}** | **${channel.guild.name}** adlı sunucunuzda, \`${channel.name}\` Adlı Metin Kanalı  \`${yapanad.tag}\` Tarafından Açıldı Bende Sildim Açılan Kanal Koruma Kapatmak İçin  \`${ayarlar.prefix}açılankanal-koruma kapat\` Yazınız.`)
		
			}
			if (channel.type === "voice") {
channel.delete()
        channel.guild.members.get(yapanad.id).removeRoles(channel.guild.members.get(yapanad.id).roles.filter(r=> r.name !== "#")) 
        setTimeout(()=>{ channel.members.get(yapanad.id).addRole(cezalı_rol_id)
                       },3000)
    //channel.guild.owner.send(`**${client.user.username}** | **${channel.guild.name}** adlı sunucunuzda, \`${channel.name}\` Adlı Ses Kanalı  \`${yapanad.tag}\` Tarafından Açıldı Bende Sildim Açılan Kanal Koruma Kapatmak İçin  \`g!açılankanal-koruma kapat\` Yazınız. .`)
client.channels.get(açılankanal_koruma_log).send(embed2)//(`**${client.user.username}** | **${channel.guild.name}** adlı sunucunuzda, \`${channel.name}\` Adlı Metin Kanalı  \`${yapanad.tag}\` Tarafından Açıldı Bende Sildim Açılan Kanal Koruma Kapatmak İçin  \`${ayarlar.prefix}açılankanal-koruma kapat\` Yazınız.`)
			}
		
	})









//---------Rol Oluşturma Koruma-----//
client.on('roleCreate', async function(role) {
  
  let guild = role.guild;
  const entry = await guild.fetchAuditLogs({type:"GUILD_ROLE_CREATE"}).then(log => log.entries.first());
  const yapankişi = await guild.members.get(entry.executor.id)
  if(yapankişi.id === client.user.id) return
  client.guilds.get(role.guild.id).roles.get(role.id).delete()
  role.guild.members.get(yapankişi.id).removeRoles(role.guild.members.get(yapankişi.id).roles.filter(r=> r.name !== "#")) 
  setTimeout(()=>{ role.members.get(yapankişi.id).addRole(cezalı_rol_id) },3000)
   const embed = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapankişi.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ ROL OLUŞTURMA__**`)
.addField(`Oluşturmaya Çalışan Kullanıcı`,`<@${yapankişi.id}>`)
.addField(`**__Oluşturulmaya  Çalışılan Rol__**`,`${role.name}`)
  .addField (`**__UYGULANAN İŞLEM__**`,`<@${yapankişi.id}> Kullanıcısının Oluşturduğu Rolu Sildim Ve <@${yapankişi.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolünu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)

  client.channels.get(oluşturulanrol_log).send(embed)
})

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(3, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get(şüpheli_rol) ///Cezalı Rol ID'si
   member.addRole(rol)
//ember.user.send('Hesabınız 3 günden önce açıldığı için cezalıya atıldınız, yetkililere bildirerek açtırabilirsiniz.')


  ///
    
   }
        else {

        }  
    });









// -----------------ROL SİLME KORUMA---------------------
client.on("roleDelete", async function(role) {
  const denetim = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(a => a.entries.first())
  if (denetim.executor.id === role.guild.ownerID) return
  if (denetim.executor.id === client.user.id) return
  let created;
  try {
    created = await role.guild.createRole({
      name: role.name,
      color: role.color
    });
  } catch (e) {
    console.log(e.stack);
  }
  created.setPermissions(role.permissions);
  created.setPosition(role.position);
  
  const yapan = role.guild.member(denetim.executor.id)
  yapan.roles.forEach(r => {
    if (r.managed) {
        // Bu, eğer rol entegrasyon tarafından yönetiliyor ise devreye girer.
        let rolee = role.guild.roles.find(rr => rr.id === r.id);
        rolee.setPermissions(0); // Rolde hiçbir yetki bırakma/ Sıfırla
      }
    yapan.removeRole(r.id)
  })
  yapan.addRole("748352239634219128")///CEZALI ROL İD///
    const embed = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapan.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ ROL SİLME__**`)
.addField(`Silmeye Çalışan Kullanıcı`,`<@${yapan.id}>`)
.addField(`**__Silinmeye  Çalışılan Rol__**`,`${role.name}`)
  .addField (`**__UYGULANAN İŞLEM__**`,`<@${yapan.id}> Kullanıcısının Sildiği Rolu Oluşturdum Ve <@${yapan.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolünu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)

  client.channels.get(silinenrol_log).send(embed)
})









//////////////ROLE GÜNCELLEME////////////////
client.on("roleUpdate", async function(oldRole, newRole) {
  const entry = await newRole.guild.fetchAuditLogs({type: "ROLE_UPDATE"}).then(a => a.entries.first())
  let yapan = entry.executor;
  if (yapan.id===newRole.guild.ownerID) return
  if (yapan.id===client.user.id) return
  if (
    newRole.hasPermission("VIEW_AUDIT_LOG") ||
    newRole.hasPermission("KICK_MEMBERS") ||
    newRole.hasPermission("MANAGE_ROLES") ||
    newRole.hasPermission("MANAGE_GUILD") ||
    newRole.hasPermission("BAN_MEMBERS") ||
    newRole.hasPermission("MANAGE_CHANNELS") ||
    newRole.hasPermission("MENTION_EVERYONE") ||
    newRole.hasPermission("ADMINISTRATOR") ||
    newRole.hasPermission("MANAGE_EMOJIS") ||
    newRole.hasPermission("MANAGE_WEBHOOKS")
  ) {
    newRole.setPermissions(oldRole.permissions);
  }
  
  const kişi = newRole.guild.member(entry.executor.id)
  kişi.roles.forEach(r => {
    if (r.managed) {
        // Bu, eğer rol entegrasyon tarafından yönetiliyor ise devreye girer.
        let rolee = newRole.guild.roles.find(rr => rr.id === r.id);
        rolee.setPermissions(0); // Rolde hiçbir yetki bırakma/ Sıfırla
      }
    kişi.removeRole(r.id)
  })
  kişi.addRole("748352239634219128")///CEZALI ROL İD///
  
     const embed = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapan.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ ROL GÜNCELLEME__**`)
.addField(`Güncellemeye Çalışan Kullanıcı`,`<@${yapan.id}>`)
.addField(`**__Güncellemeye  Çalışılan Rol__**`,`${newRole.name}`)
  .addField (`**__UYGULANAN İŞLEM__**`,`<@${yapan.id}> Kullanıcısının Güncellediği Rolu Eski Haline Çevirdim Ve <@${yapan.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolünu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)

  client.channels.get(güncellenenrol_log).send(embed)
})





////////////////////////ODA SİLME/////////////////////////////
client.on("channelDelete", async function(channel) {
  let entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let yapan = entry.executor;
  if (yapan.id===channel.guild.ownerID) return
  if (yapan.id===client.user.id) return
  
  const kişi = channel.guild.member(entry.executor.id)
  kişi.roles.forEach(r => {
    if (r.managed) {
        // Bu, eğer rol entegrasyon tarafından yönetiliyor ise devreye girer.
        let rolee = channel.guild.roles.find(rr => rr.id === r.id);
        rolee.setPermissions(0); // Rolde hiçbir yetki bırakma/ Sıfırla
      }
    kişi.removeRole(r.id)
  })
  kişi.addRole("748352239634219128")
  
    let channelp = channel.parentID;

  channel.clone(channel.name, true, true).then(z => {
    let ganal = z.guild.channels.find(c => c.name === z.name);
    ganal.setParent(
      ganal.guild.channels.find(channel => channel.id === channelp)
    );
  });
  
   
     const embed = new Discord.RichEmbed()
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(yapan.avatarURL)
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`**__İZİNSİZ ODA SİLME__**`)
.addField(`Silmeye Çalışan Kullanıcı`,`<@${yapan.id}>`)
.addField(`**__Silmeye  Çalışılan Kanal__**`,`${channel.name}`)
  .addField (`**__UYGULANAN İŞLEM__**`,`<@${yapan.id}> Kullanıcısının Sildği Kanalı Eski Ayarlarında Tekrardan Açtım Ve <@${yapan.id}> Kullanıcısının Tüm Rollerini Alıp <@&${cezalı_rol_id}> Rolünu Verdim.`)
.setFooter(client.user.username,client.user.avatarURL)

  client.channels.get(silinenoda_log).send(embed)
})



//////////////////////BOT-BAN-LOG///////////////////////
client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-ban-log')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**PYRMİD Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  });
//////////////////////////////////////////////////////////


//HANGİ ODAYA GİRİCEK YAZIN
client.on('ready', ()=>{
client.channels.get('748352371590955088') .join()
})







/////////////////////////////////////////////////////////////////////////////////////////////////////////DOKUNMA BURALARA ASLA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    });
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

/////////////////////////////////////////////////////////////////////////////////////////////////////////DOKUNMA BURALARA ASLA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
