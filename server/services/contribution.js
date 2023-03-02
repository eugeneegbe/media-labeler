const db = require('./db');
const config = require('../config');

function getMultiple(page = 1) {
    const offset = (page - 1) * config.listPerPage;
    const data = db.query(`SELECT * FROM contribution  LIMIT ?,?`, [offset, config.listPerPage]);
    const meta = { page };

    return {
        data,
        meta
    }
}

function addContribution(contribtion_object){
    const {filename, track, response, username} = contribtion_object;
    const feed = db.run('INSERT INTO contribution(filename, track, response, username) VALUES(@filename, @track, @response, @username)',
                        {filename, track, response, username});
    let res = {}
    if (feed.changes) {
        res.status = 'success';
        res.message = 'Contribution saved successfully'
    }
    return res;
}

module.exports = {
    getMultiple,
    addContribution
}