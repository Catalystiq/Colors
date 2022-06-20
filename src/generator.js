const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs')
const sharp = require('sharp')
//const mongoose = require('mongoose')
require('dotenv').config()
let idx = 0;

// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })

// const colorSchema = new mongoose.Schema({
//     color: {
//         type: String,
//         required: true
//     }
// }, {timestamps: true})

// const Color = mongoose.model('colors', colorSchema)

function createImage(idx){
    const template = `
        <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="256" height="256" fill="rgb(0,0,0)"/>
        </svg>
    `

    const meta = {
        name: `rgb(0,0,0)`,
        description: `rgb(0,0,0)`,
        image: `${idx}.png`,
        attributes: [
            { }
        ]
    }
    writeFileSync(`./out/${idx}.json`, JSON.stringify(meta))
    writeFileSync(`./out/${idx}.svg`, template)
    //svgToPng(idx)
}


// Create dir if not exists
if (!existsSync('./out')){
    mkdirSync('./out');
}

// Cleanup dir before each run
readdirSync('./out').forEach(f => rmSync(`./out/${f}`));


do {
    createImage(idx);
    idx--;
  } while (idx >= 0);








// function rgb(r, g, b){
//     return `rgb(${r}, ${g}, ${b})`
// }

