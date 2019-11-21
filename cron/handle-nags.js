const client = require('../lib/client');
const moment = require('moment');
const fetch = require('node-fetch');

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
                SELECT * 
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
const sendNags = async(message) => {
    //console.log(req.body);
    
    const allNags = await getAllNags();
    const filteredNags = allNags.forE(nag => {
        const now = moment();
        console.log('now: '+now);
        console.log(nag);
        //const diff = 
    });

    try{
        const url = `https://api.pushover.net/1/messages.json`;
        return await fetchWithError(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: 'abgdzamuf2zhqkw1n7ga6gh47ed6cc',
                user: 'u69nib51wnv6m81d7nar3voyeaiuj1',
                message: 'ITS ALIVE!!!'
            })        
        });
    }
    catch (err) {
        console.log('error ' + err);
    }
};
exports.sendNags = sendNags;
//exports.getAllNags = getAllNags;
