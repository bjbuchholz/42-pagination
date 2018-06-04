'use strict';

require('dotenv').config();

const fs = require('fs');

const Rain = require('../models/rainy');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


Rain.remove({})
    .then(() => {
        return new Promise((resolve, reject) => {
            fs.readFile('./seattleWeather_1984-2017.csv', 'utf-8', (err, data) => {
                let lines = data.split('\n');
                let saves = lines.map(line => {
                    let [_, year, ...title] = line.split(',');
                    title = title.join(',');
                    return Rain.create({title, year});
                });

                Promise.all(saves)
                    .then(() => {
                        console.log('resolved', saves.length);
                        resolve();
                    })
                    .catch(() => {
                        console.log('rejected');
                        reject();
                    });
            });
        });
    })
    .then(() => {
        return Rain.find({});
    })
    .then(movies => {
        console.log('queried:', movies.length);
    })
    .then(() => {
        console.log('disconnected');
        mongoose.disconnect();
    });
