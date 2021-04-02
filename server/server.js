const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('./login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "48945f951a3d4be094ed47247dffa94c",
        clientSecret: '0baa5327e1fb40f4b456ca1bac440b4f'
    })

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refresh_token: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
                .catch((err) => {
                    console.log(err)
                    res.sendStatus(400)
                })
        })
})

app.listen(3001)