const { Telegraf } = require('telegraf')
require("dotenv").config()
const axios = require('axios')

const bot_token = process.env.token

const bot = new Telegraf(bot_token,);
bot.start((ctx) => ctx.reply('Hey this your covid bot,check the covid cases of the listed states'))
 bot.help((ctx) => ctx.reply("type the command /covid to get the covid cases of the listed states"))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('covid', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, "stats for corona",
        {
            reply_markup: {

                inline_keyboard: [
                    [{ text: "tamilnadu", callback_data: "TN" },{ text: "kerala", callback_data: "KL" }],
                    [{ text: "maharashtra", callback_data: "MH" },{ text: "karnataka", callback_data: "KA" }]

                ]
            }
        })

})

bot.action("TN",async(ctx)=>{
    ctx.deleteMessage();
   
    getdata(ctx.match[0])
    .then(result=>{
    ctx.telegram.sendMessage(ctx.chat.id, result,
        {
            reply_markup: {
    
                inline_keyboard: [
                    [{ text: "go-back", callback_data: "back-go" }]
                   
                ]
            }
        })
   })
   
})


bot.action("KL",async(ctx)=>{
    ctx.deleteMessage();
   
    getdata(ctx.match[0])
    .then(result=>{
    ctx.telegram.sendMessage(ctx.chat.id, result,
        {
            reply_markup: {
    
                inline_keyboard: [
                    [{ text: "go-back", callback_data: "back-go" }]
                   
                ]
            }
        })
   })
   
})

bot.action("MH",async(ctx)=>{
    ctx.deleteMessage();
   
    getdata(ctx.match[0])
    .then(result=>{
    ctx.telegram.sendMessage(ctx.chat.id, result,
        {
            reply_markup: {
    
                inline_keyboard: [
                    [{ text: "go-back", callback_data: "back-go" }]
                   
                ]
            }
        })
   })
   
})

bot.action("KA",async(ctx)=>{
    ctx.deleteMessage();
   
    getdata(ctx.match[0])
    .then(result=>{
    ctx.telegram.sendMessage(ctx.chat.id, result,
        {
            reply_markup: {
    
                inline_keyboard: [
                    [{ text: "go-back", callback_data: "back-go" }]
                   
                ]
            }
        })
   })
   
})


bot.action("back-go",(ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, "stats for corona",
        {
            reply_markup: {

                inline_keyboard: [
                    [{ text: "tamilnadu", callback_data: "TN" },{ text: "kerala", callback_data: "KL" }],
                    [{ text: "maharashtra", callback_data: "MH" },{ text: "karnataka", callback_data: "KA" }]

                ]
            }
        })

})

async function getdata(states){
    const url="https://api.covid19india.org/data.json"
    const res =await axios.get(url)

          const statearr=res.data.statewise;
          const specific=statearr.filter(res=> res.statecode==states)
           return `corona cases in ${specific[0].state}:-


number of confirmed cases: ${specific[0].confirmed}

number of active cases: ${specific[0].active}

number of recovered patients: ${specific[0].recovered}

number of deaths: ${specific[0].deaths}`
        // console.log(res.data.statewise)
    
}

bot.launch()
