import { Client, MessageEmbed } from "discord.js-selfbot-v13";
import config from "./config.json" assert { type: "json" };
import Enmap from "enmap";

const client = new Client({
  restTimeOffset: 0,
  ws: {
    properties: {
      os: "Windows",
      browser: "Discord Client",
    },
  },
  checkUpdate: false,
});

const cooldowns = new Map();
const COOLDOWN_SECONDS = 5; // Change this to your desired cooldown time in seconds

const db = new Enmap({
  name: "db",
  dataDir: "./db",
});
db.ensure("totalmessages", 0);
db.ensure("totalcharacters", 0);
db.ensure("1totalmessages", 0);
db.ensure("1totalcharacters", 0);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}.`);
});

client.on("messageCreate", (message) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function abbreviate(count, withAbbr = true, decimals = 2) {
    if (String(count)[0] === "0") {
      if (count === 0) return "0";
      else return count.toFixed(decimals);
    }
  
    let neg = false;
    if (String(count)[0] == "-") {
      neg = true;
      count = ~Number(count) + 1;
    }
  
    const COUNT_ABBRS = ["", "K", "M", "B"];
    const i = count === 0 ? count : Math.floor(Math.log(count) / Math.log(1000));
    let result = parseFloat(
      (count / Math.pow(1000, i)).toFixed(decimals)
    ).toString();
    if (withAbbr) result += `${COUNT_ABBRS[i]}`;
    if (neg) result = `-${result}`;
    return result;
  }   

  function convertToLevels(xp) {
    return Math.floor(Math.sqrt(xp / 100));
  }

  const arg = message.content.trim().split(/ +/g);
  const cmd = message.content.split(' ').slice(1).join(' ');

  if (message.channel.id === config.groupId) {
    db.ensure(message.author.id, {
      messages: 0,
      characters: 0,
      xp: 0,
      level: 0
    });

    const yablength = message.content.length;
    const xpGain = Math.floor(Math.random() * 10) + 15; // Random XP between 15-24

    db.math("totalmessages", "+", 1);
    db.math(message.author.id, "+", 1, "messages");
    db.math(message.author.id, "+", yablength, "characters");
    db.math(message.author.id, "+", xpGain, "xp");

    const currentXP = db.get(message.author.id).xp;
    const currentLevel = db.get(message.author.id).level;
    const newLevel = convertToLevels(currentXP);

    if (newLevel > currentLevel) {
      db.set(message.author.id, newLevel, "level");
      message.channel.send(`<@${message.author.id}> has reached level ${newLevel}!`);
    }

    db.math("totalcharacters", "+", yablength);
  }

  if (message.channel.id === config.groupI3d) {

    db.ensure(message.author.id, {
      amessages: 0,
      acharacters: 0,
      axp: 0,
      alevel: 0
    });

    const ayablength = message.content.length;
    const axpGain = Math.floor(Math.random() * 10) + 15; // Random XP between 15-24

    console.log(db.get(message.author.id).acharacters)
    db.math("1totalmessages", "+", 1);
    db.math(message.author.id, "+", 1, "amessages")
    db.math(message.author.id, "+", ayablength, "acharacters");
    db.math(message.author.id, "+", axpGain, "axp");
    console.log(db.get(message.author.id))
    db.set(message.author.id, aconvertToLevels(xp), "alevel")
    if (newLevel > currentLevel) {
      db.set(message.author.id, newLevel, "level");
      message.channel.send(`<@${message.author.id}> has reached level ${newLevel}!`);
    }
    db.math("1totalcharacters", "+", ayablength);
  }
  if (message.channelId === config.groupId && message.content.toLowerCase().startsWith("ify!stats")) {
    var subcount;
    var cid;
    var channelname;
    var handle;
    var gains;
    var avg;
    var url;
    var pfp;
    var url2;
    var api;
    var views;

    const now = Date.now();
    const userCooldown = cooldowns.get(message.author.id) || 0;

    if (now < userCooldown) {
      return; // Skip command execution without sending a message
    }

    cooldowns.set(message.author.id, now + COOLDOWN_SECONDS * 1000);

    if (!arg[1]) return;

    fetch(`https://api.communitrics.com/youtube/api?channel=${cmd}`)
      .then((res) => res.json())
      .then((data1) => {
        cid = data1.channelId;
        url = `https://api.communitrics.com/${cid}`;
        console.log(cid);
        fetch(`https://united-api.mixerno.space/youtube/channel?id=${cid}`)
          .then((res) => res.json())
          .then((data2) => {
            url2 = `https://united-api.mixerno.space/youtube/channel?id=${cid}`;
            fetch(`https://api.communitrics.com/${cid}`)
              .catch(error => {
                console.error('Error fetching data:', error);
              })
              .then((res) => res.json())
              .then((data3) => {
                fetch(`https://studio.nia-statistics.com/api/channel/${cid}`)
                  .then((res) => res.json())
                  .then((data4) => {
                    var url3 = `https://studio.nia-statistics.com/api/channel/${cid}`;
                    if (Array.isArray(data3.data) && data3.data.length > 0) {
                      const lastObject = data3.data[data3.data.length - 1];
                      const lastUpdate = lastObject.last_updated;
      
                      if (lastUpdate) {
                        let [datePar1t, timePar1t] = lastUpdate.split('T');
                        let [yea1r, mont1h, da1y] = datePar1t.split('-');
                        let [hou1r, minut1e, secon1d] = timePar1t.replace('Z', '').split(':');
                        secon1d = secon1d.trim();
                        if (/^[1-9]$/.test(secon1d)) {
                          secon1d = "0" + secon1d;
                        } else {
                          secon1d = Math.floor(Number(secon1d));
                        }
                        
                        let formattedTim1e = `${hou1r}:${minut1e}:${secon1d}`;
                        let formattedDat1e = `${mont1h}/${da1y}/${yea1r}`;
                        var creatio1n = `### 🕔 Last API: ${formattedTim1e} | ${formattedDat1e} MM/DD/YYYY`;
      
                        console.log(creatio1n);
                      } else {
                        console.log('No valid latest_Update found.');
                        var creatio1n = " ";
                      }
                    } else {
                      console.log('No Data Available.');
                      var creatio1n = " ";
                    }
                    var estyab = "Estimated";
                    var estya1b = "Estimated";
                    if (cid === "UC-lHJZR3Gqxm24_Vd_AJ5Yw") {
                      subcount = numberWithCommas(data3.channelDetails.linearEstSubscriberCount);
                      views = numberWithCommas(data2.views);
                      var provided = `Data is provided by [United API](${url2}) and [Communitrics API](${url})`;
                    } else if (data4.success === false) {
                      subcount = numberWithCommas(data2.subscribers);
                      views = numberWithCommas(data2.views);
                      var provided = `Data is provided by [United API](${url2}) and [Communitrics API](${url})`;
                    } else if (data4.success === false && cid === "UCX6OQ3DkcsbYNE6H8uQQuVA") {
                      var textyab = "Estimated";
                      var idkyab = textyab.replace(/Estimated/gi, "Studio");
                      estyab = idkyab;
                      subcount = numberWithCommas(data2.subscribers);
                      views = numberWithCommas(data2.views);
                      var provided = `Data is provided by [United API](${url2}) and [Communitrics API](${url})`;
                    } else {
                      subcount = numberWithCommas(data4.channels.counts[2].count);
                      views = numberWithCommas(data4.channels.counts[1].count);
                      var textyab = "Estimated";
                      var idkyab = textyab.replace(/Estimated/gi, "Studio");
                      estyab = idkyab;
                      var textya1b = "Estimated";
                      var idkya1b = textya1b.replace(/Estimated/gi, "Studio");
                      estya1b = idkya1b;
                      var provided = `Data is provided by [Nia's Studio System](${url3}), [United API](${url2}) and [Communitrics API](${url})`;
                    }
                    const yturl = `https://youtube.com/channel/${cid}`;
                    const viewsapi = numberWithCommas(data2.views_api);
                    const videos = data2.videos;
                    let timestamp = data2.channelCreationTime;
                    let [datePart, timePart] = timestamp.split('T');
                    let [year, month, day] = datePart.split('-');
                    let [hour, minute, second] = timePart.replace('Z', '').split(':');
                    second = Math.floor(Number(second));
                    let formattedTime = `${hour}:${minute}:${second}`;
                    let formattedDate = `${month}/${day}/${year}`;
                    let creation = `${formattedTime} | ${formattedDate} MM/DD/YYYY`;
                    api = abbreviate(data2.subscribers_api);
                    channelname = data2.title;
                    handle = data2.handle;
                    gains = data3.channelDetails.mostRecentAverage;
                    avg = numberWithCommas(parseFloat(data3.channelDetails.mostRecentAverage.toFixed(0)));
                    if (avg.charAt(0) !== "-") {
                      avg = "+" + avg;
                    }
                    message.reply(`## 📊 Channel Stats for [${channelname} (${handle})](<${yturl}>)
                      
                    ### 📈 Subscribers (${estyab}): ${subcount} (${avg}/Day AVG)
                    ### 🔨 API: ${api}
                    ### 👀 Views: ${views} (${estya1b}) | ${viewsapi} (API)
                    ### 🎥 Videos: ${videos}
                    ### 📅 Created: ${creation}
                    ${creatio1n}
                    
                    
        ${provided}`);
                    console.log(subcount);
                  });
              });
          });
      });
  }

  if (message.channelId === config.groupId && message.content.toLowerCase().startsWith("ify!ping")) {
    const now = Date.now();
    const userCooldown = cooldowns.get(message.author.id) || 0;

    if (now < userCooldown) {
      return;
    }

    message.reply(`My ping is ${Math.abs(client.ws.ping)}ms`);

    cooldowns.set(message.author.id, now + COOLDOWN_SECONDS * 1000);
  }

  if (message.channelId === config.groupId && message.content.toLowerCase().startsWith("ify!info")) {
    var userxp = db.get(message.author.id).xp;
    var userlevel = db.get(message.author.id).level;
    var usermessages = db.get(message.author.id).messages;
    var usercharacters = db.get(message.author.id).characters;
    message.reply(`You have ${userxp} XP and are on level ${userlevel}! You also have ${usermessages} messages and ${usercharacters} characters sent.`);
  }
    if (message.channelId === config.groupI3d && message.content.toLocaleLowerCase().startsWith("ify!info")) {
    var auserxp = db.get(message.author.id).xp
    var auserlevel = db.get(message.author.id).level
    var ausermessages = db.get(message.author.id).messages
    var ausercharacters = db.get(message.author.id).characters
    message.reply(`You have ${auserxp} XP and are on level ${auserlevel}! You also do have ${ausermessages} messages and ${ausercharacters} characters sent.`)
  }

});

client.login(config.token);
