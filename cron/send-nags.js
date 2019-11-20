const fetchWithError = async(url, options) => {
    
    const fetch = require("node-fetch");
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
};
//Z: unh2zo3h4yuxb3aws6e233q2bnygsd
//N: u69nib51wnv6m81d7nar3voyeaiuj1
const pushMessage = async(message) => {
    //console.log(req.body);
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
};
module.exports=pushMessage;