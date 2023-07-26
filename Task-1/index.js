const express = require("express");
const axios = require("axios");
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.get("/numbers", async (req, res) => {
  const t = req.query.url;
  var k = [];
  const call=
      t.map(async(p) => {
        await axios.get(p).then((d) => {
            
            k=k.concat(d.data.numbers);
            
          })
          .catch((err) => {
            // console.log(err)
          });
      ;
      })
    
    
    await Promise.all(call);
    console.log(k);
    const sortedResponse = new Set([...k].sort((a, b) => a - b));

res.json({"numbers":[...sortedResponse]});
    res.send("working");
})

app.listen(8008, () => {
  console.log("Running ");
});
