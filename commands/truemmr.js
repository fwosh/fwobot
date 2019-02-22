module.exports = {
    name: 'truemmr',
    description: 'Displays your true mmr Kappa.',
    //cooldown: 5,
    aliases: ['mmr', 'mymmr', 'realmmr'],
    execute(message, args) {
        const ranks = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];
        const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
        const randomNumber = Math.floor(Math.random() * 7) + 1;
        const immortalNumber = Math.floor(Math.random() * 1000) + 1;


        if (randomRank == "Immortal") {
            return message.reply(`Your true MMR is Immortal ${immortalNumber} PogChamp`).then(function(message) {
                    message.react('👌');
                }).catch(function() {
                    //Something
                });
        } else if (randomRank.match(/^(Herald|Guardian|Crusader)$/)) {
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.stopTyping(true);
                message.reply(`Your true MMR is ${randomRank} ${randomNumber} LMAO get good`).then(function(message) {
                    message.react('💩');
                }).catch(function() {
                    //Something
                });
                return;
            }, 1200);

        } else {

            message.channel.startTyping();
            setTimeout(function() {
                message.channel.stopTyping(true);
                message.reply(`Your true mmr is ${randomRank} ${randomNumber}, not bad!`)
                return;
            }, 1200);    
        }

    },
};