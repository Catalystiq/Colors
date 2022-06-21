const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs')
const sharp = require('sharp')
require('dotenv').config()
let idx = 5;
let takenColors = []

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createColor(){
    // const r = randomValue(74,74)
    // const g = randomValue(19,19)
    // const b = randomValue(3,3)
    const r = randomValue(0, 255)
    const g = randomValue(0, 255)
    const b = randomValue(0, 255)
    return [r,g,b]
}

async function svgToPng(name) {
    const src = `./out/${name}.svg`;
    const dest = `./out/${name}.png`;

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}

function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  }

function createImage(idx){
    const colorValues = createColor();
    const color = `rgb(${colorValues[0]},${colorValues[1]},${colorValues[2]})`

    if(searchForArray(takenColors, colorValues) >= 0){
        console.log('Color Already Taken!')
        createImage(idx)
    }else{
        takenColors.push(colorValues)
        
        const template = `
            <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" fill="${color}"/>
            </svg>
        `

        const meta = {
            name: `RGB Color Value: ${color}`,
            description: `An RGB Color Value of: ${color}`,
            image: `${idx}.png`,
            attributes: [
                { 
                    "trait_type": "Red",
                    "value": `${colorValues[0]}`
                },
                {
                    "trait_type": "Green",
                    "value": `${colorValues[1]}` 
                },
                {
                    "trait_type": "Blue",
                    "value": `${colorValues[2]}`
                }
            ]
        }
        writeFileSync(`./out/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./out/${idx}.svg`, template)
        svgToPng(idx)
    }

    
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