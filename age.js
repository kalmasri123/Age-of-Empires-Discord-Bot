const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
var guilds = {}
var games = {
  age2: {
    path: './taunts/',
    max: 42
  },
  age3: {
    path: './age3taunts/',
    max: 33
  }
}
client.on('ready', () => {
  client.guilds.forEach(function(guild) {
    guilds[guild.id] = {}
    guilds[guild.id]["Age_2"] = true
    guilds[guild.id]["enabled"] = true
  })

})
client.on('message', message => {
  message.content = message.content.toLowerCase()
  if (message.content == "%toggle") guilds[message.guild.id].enabled = !guilds[message.guild.id].enabled
  if (message.content == "%leave") {
    if (message.guild.me.voiceChannel) return message.guild.me.voiceChannel.leave()
  }
  if (message.content == "%switchage") {
    let game1 = (guilds[message.guild.id]["Age_2"]) ? "Age of Empires 2 Taunts" : "Age of Empires 3 Taunts"
    let game2 = (!guilds[message.guild.id]["Age_2"]) ? "Age of Empires 2 Taunts" : "Age of Empires 3 Taunts"
    guilds[message.guild.id]["Age_2"] = !guilds[message.guild.id]["Age_2"]


    message.channel.send("Switched from " + game1 + " to " + game2)
  }
  var args = message.content.split(" ")
  if (args.length == 1) {
    if (!isNaN(message.content)) {
      if (!guilds[message.guild.id].enabled) return
      let max = (guilds[message.guild.id].Age_2) ? games.age2.max : games.age3.max;
      if (parseInt(args[0]) >= 1 && parseInt(args[0]) <= max) {
        let path = (guilds[message.guild.id].Age_2) ? games.age2.path : games.age3.path
        let vc = message.member.voiceChannel;
        console.log(path, max)
        if (vc) {
          console.log(vc)
          vc.join().then(connection => {
            let dispatcher = connection.playFile(path + args[0] + '.mp3').on('end', () => {


            })
          })
        }
      }
    }
  }
})
client.login(process.env.TOKEN)
