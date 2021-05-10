const express = require("express"), // set up everything
      app = express(),
      Database = require("@replit/database"),
      db = new Database(); // get replit database

app.use(express.static("public"));

app.get("/getscore", (req, res) => {
  console.log("getting score");
  db.get("score").then(value => {
    res.send(JSON.stringify({res: value})); // efficient
  });
})


/*
UPDATE SCORE ROUTE
Go to $REPL_SLUG.repl.co/updatescore?score=5 to try
*/
app.get("/updatescore", (req, res) => {
  db.set('reserveScore', db.get('score'));
  console.log("updating");
  console.log(req.query);
  if(parseInt(req.query.score) > 50000 || parseInt(req.query.score) % 10000 === 0){
    db.set('score', db.get('reserveScore'));
    db.set('hsName', db.get('reserveName'));
  console.log('hacker'); 
  }
  else{
  db.set("score", req.query.score).then(() => {
    res.send("Success");
    console.log("success");
  });}
  
});

app.get("/updateName", (req, res) => {
  db.set('reserveName', db.get('hsName'));
  console.log("updating name");
  console.log(req.query);
  db.set("hsName", req.query.name).then(() => {
    res.send("Success");
    console.log("success");
  });
});

app.get("/getName", (req, res) => {
  console.log("getting name");
  db.get("hsName").then(value => {
    res.send(JSON.stringify({res: value}));
  });
});
app.listen(3000, () => console.log("server running"));
publi