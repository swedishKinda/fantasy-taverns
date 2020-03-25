const sql = require('mssql');
const { poolPromise } = require('../data/db');

getAll = async function (req, res) {
    // format request

    let Taverns;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        Taverns = await pool
            .request()
            .input('TavernName', sql.VarChar, req.query.TavernName)
            .query(
                // eslint-disable-next-line quotes
                `select * from Taverns`,
            );
        Taverns = Taverns.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(Taverns);
};

module.exports.getAll = getAll;

getTavern = async function (req, res) {
    // format request

    let tavern;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;
    try {
        tavern = await pool
            .request()
            .input('UserId', sql.Int, req.user.ID)
            .input('RoomName', sql.VarChar, req.query.search)
            .query(
                // eslint-disable-next-line quotes
                `Select TavernName, Taverns.ID, RoomName, Rooms.ID, DailyRate FROM rooms r Join Taverns t on (t.ID = r.TavernID) Join Users u on (u.TavernID = t.ID)  Where u.ID = @UserId and RoomName Like '%' + @RoomName + '%'`
            );
        tavern = tavern.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(tavern);
};

module.exports.getTavern = getTavern;

const create = async function (req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;

    if (!body.Name) {
        return returnError(res, 'Please enter a tavern name', 422);
    }
    const pool = await poolPromise;
    let tavernID;

    try {
        tavernID = await pool
            .request()
            .input('ID', sql.Int, req.tavern.Id)
            .query(
                'select max(ID) as ID from Taverns where ID = @ID',
            );
        tavernID = tavernID.recordset.shift().Id;
    } catch (e) {
        returnError(res, e, 500);
    }

    // initialize if it's the very first tavernID
    tavernID = tavernID || tavernID === 0 ? tavernID + 1 : 0;
    try {
        tavern = await pool
            .request()
            .input('TavernName', sql.VarChar, body.TavernName)
            .query(
                'INSERT INTO Taverns ([TavernName]) OUTPUT inserted.* values (@TavernName)'
            );
        tavern = tavern.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, tavern, 201);
};

module.exports.create = create;