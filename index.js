const express =require('express')
const { Expo } = require('expo-server-sdk');
const cors=require('cors')

let expo = new Expo();
const expressServer=express()


expressServer.use(cors())

expressServer.listen(process.env.PORT||3000,()=>{
    console.log("servidor corriendo en el puerto: "+(process.env.PORT||3000))
    expressServer.get("/",function(req,res){
        const  token=req.query.token;
        if(!Expo.isExpoPushToken(token)){
            console.log("Token invalido")
            res.send({err:"Token invalido"})
        }else{
            let messages=[
                {to:token,
                sound:"default",
                body:"Notification test",
                data:{test:"asdasdop"}
                }    
            ]
            expo.sendPushNotificationsAsync(messages).then(ticket=>{
                res.send({ticket:ticket})
            }).catch(
                err=>{
                    console.log("erorr")
                    res.send({err:"erroe"})
                }
            )
        }
    })
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))