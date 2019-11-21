require('dotenv').config();
const client = require('../lib/client');
const moment = require('moment');
const fetch = require('node-fetch');

const fetchWithError = async(url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) return data;
    else throw data.error;
};

const getAllNags = async()=>{
    try {
        const result = await client.query(`
            SELECT *, users.id AS "deleteId",
            push_api_key AS "pushApiKey" 
            FROM users JOIN nags
            ON users.id = nags.user_id;
        `,);
        return result.rows;
    }
    catch (err) console.log(err);
}

//1-7 where 1 is Monday and 7 is Sunday
const isDayOfWeek = dayNumsArr => dayNumsArr.includes(moment().isoWeekday());

const isTimeForNag = (startTime, endTime = -1, dayNumsArr = [], snoozed = false) => {
    const now = moment().format("HH:mm");
    const nowTime = moment.utc(now, "HH:mm");
    const startTime = moment.utc(nag.start_time,"HH:mm:ss");
    const diff = moment.duration(nowTime.diff(startTime)).asMinutes();
    return (                                                // return true if:
        !snoozed &&                                         // nag is not snoozed
        nowTime.isAfter(startTime) &&                       // and it is after start time
        (endTime > -1 && nowTime.isBefore(endTime)) &&      // and if there is an end time and we haven't exceeded it
        (dayNumsArr && isDayOfWeek) &&                      // and there are days selected and this is one of them
        (
            diff % nag.interval === 0 ||                    // and this is one of the regularly recurring time intervals of a requested nag
            moment().minutes() === minutesAfterTheHour      // or it is one of the number of minutes after the hour
        )
    );
};

const sendNags = async() => {
    const allNags = await getAllNags();
    allNags.forEach(async nag => {
        const startTime = moment.utc(nag.start_time,"HH:mm");
        if (
            nag.pushApiKey &&
            nag.pushApiKey.length === 30 &&
            isTimeForNag(startTime) === 0)
            {
            try {
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
            catch (err) console.log('error ' + err);
        }
        
    });

};
exports.sendNags = sendNags;
