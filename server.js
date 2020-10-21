const express = require('express')
const app = express()
const port = 4000
const puppeteer = require('puppeteer');

app.get('/clicked', async (req, res) => {
    try{
        const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // await page.goto('https://paymath-official.net/auth/mathematics-solving.php');

    const [el] = await page.$x('//*[@id="a"]');
    // const [el] = await page.$x('//*[@id="ans1"]');
    const txt = await el.getProperty('textContent');
    const ans1 = await txt.jsonValue();

    // const [el1] = await page.$x('//*[@id="ans2"]');
    const [el1] = await page.$x('//*[@id="c"]');
    const txt1 = await el1.getProperty('textContent');
    const ans2 = await txt1.jsonValue();

    // const [el2] = await page.$x('//*[@id="ans3"]');
    const [el2] = await page.$x('//*[@id="b"]');
    const txt2 = await el2.getProperty('textContent');
    const ans3 = await txt2.jsonValue();

    if(ans2=='Addition By'){
        var aw = parseInt(ans1) + parseInt(ans3);
    }else if(ans2=='Substract By'){
        var aw = parseInt(ans1) - parseInt(ans3);
    }else if(ans2=='Multiply By'){
        var aw = parseInt(ans1) * parseInt(ans3);
    }else{
        var aw = parseInt(ans1) / parseInt(ans3);
    }
    console.log({ans2});
    browser.close();
    res.send({ans1: ans1, ans2: ans2, ans3: ans3, value: aw})
//   res.json({data:aw});
    }
    catch(e) {
        console.log('Catch an error: ', e)
      }
})

// serve files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
