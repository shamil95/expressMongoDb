const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require('./../../models/toursModel');
const fs = require("fs");

dotenv.config({path: './.env'})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('Db is Connected')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


const importDataDb = async () => {
    try {
        await Tour.create(tours)
        console.log('Data is successfully loaded')
    } catch (err) {
        console.log(err)
    }
    process.exit()
};


const deleteDataDb = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data is successfully deleted')
    } catch (err) {
        console.log(err)
    }
    process.exit()
};

if (process.argv[2] === '--import') {
    importDataDb();
} else if (process.argv[2] === '--delete') {
    deleteDataDb();
}
