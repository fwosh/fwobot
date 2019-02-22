module.exports = {
    name: 'love',
    description: 'Shows your compatability with your crush.',
    //cooldown: 5,
    aliases: ['truelove'],
    execute(message, args, client) {
        const lovePercent = Math.floor(Math.random() * 100);
        let loveEmotion = '';
        let loveRemark = '';

        const fwoshFeels = client.emojis.get('284220907608866817');
        const ayy = client.emojis.get("305818615712579584");
        //fwoshFeels.requiresColons = true;
        const loveTarget = args[0];

        if (lovePercent > 90) {
            loveRemark = 'O-oh gosh! ';
            loveEmotion = '❤';
        } else

        if (lovePercent < 10) {
            loveRemark = 'Oh no... ';
            loveEmotion = '💔';
        } else

        if (lovePercent == 69 || lovePercent == 100) {
            loveEmotion = '( ͡° ͜ʖ ͡°)';
        }

        if (!args.length) {
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.stopTyping();
                return message.reply(`${loveRemark}You have a ${lovePercent}% chance of finding love today! ${loveEmotion} `);
            }, 900);

        } else {
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.stopTyping();
                return message.reply(`${loveRemark} There's a ${lovePercent}% chance of love between you and ${loveTarget} today ${loveEmotion}`);
            }, 900);

        }
    },
};