const client = require('../lib/client');
const moment = require('moment');
const fetch = require('node-fetch');
require('dotenv').config();



const fetchWithError = async(url, options) => {
    
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
};

const getAllNags = async()=>{
    try {
        const result = await client.query(`
                SELECT *, users.id AS "deleteId",
                push_api_key AS "pushApiKey" 
                FROM users JOIN nags
                ON users.id = nags.user_id;
            `,)
            return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

//Z: unh2zo3h4yuxb3aws6e233q2bnygsd
//N: u69nib51wnv6m81d7nar3voyeaiuj1
const sendNags = async() => {
    //console.log(req.body);
    const allNags = await getAllNags();
    const filteredNags = allNags.forEach(async nag => {
        const now = moment().format("HH:mm");
        const nowTime = moment.utc(now, "HH:mm");
        const startTime = moment.utc(nag.start_time,"HH:mm:ss");
        const diff = moment.duration(nowTime.diff(startTime)).asMinutes();
        console.log("diff: " + diff);
        if(nag.pushApiKey && startTime.isBefore(nowTime) && 
        diff % nag.interval === 0){
            try{
                const url = `https://api.pushover.net/1/messages.json`;
                return await fetchWithError(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: process.env.PUSHOVER_TOKEN,
                        user: nag.pushApiKey,
                        message: nag.task,
                        url: `https://nagmeapp.herokuapp.com/api/delete/${nag.deleteId}`,
                        url_title: 'CLICK HERE to DELETE NAG'
                    })        
                });
            }
            catch (err) {
                console.log('error ' + err);
            }
        }
        
        //console.log(now);
        //console.log(startTime);
    });

    // try{
    //     const url = `https://api.pushover.net/1/messages.json`;
    //     return await fetchWithError(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: 'abgdzamuf2zhqkw1n7ga6gh47ed6cc',
    //             user: 'u69nib51wnv6m81d7nar3voyeaiuj1',
    //             message: 'ITS ALIVE!!!'
    //         })        
    //     });
    // }
    // catch (err) {
    //     console.log('error ' + err);
    // }
};
exports.sendNags = sendNags;
//exports.getAllNags = getAllNags;
