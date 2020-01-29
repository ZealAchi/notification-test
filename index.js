const express = require("express");
const { Expo } = require("expo-server-sdk");
const cors = require("cors");

let expo = new Expo();
const expressServer = express();

expressServer.use(cors());

expressServer.listen(process.env.PORT || 3000, () => {
  console.log("servidor corriendo en el puerto: " + (process.env.PORT || 3000));
  expressServer.get("/", function(req, res) {
    const token = req.query.token;
    if (!Expo.isExpoPushToken(token)) {
      console.log("Token invalido");
      res.send({ err: "Token invalido" });
    } else {
    //   let messages=req.query.data
    const Data=JSON.parse(req.query.data)
    
      let messages = [
        {
          to: token,
          sound: "default",
          body: Data.data[0].texto,
          data: Data.data[0]
          ,
        },
      ];
      expo
        .sendPushNotificationsAsync(messages)
        .then(ticket => {
          res.send({ ticket: ticket });
        })
        .catch(err => {
          console.log("erorr");
          res.send({ err: "erroe" });
        });
    }
  });
});
