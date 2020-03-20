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
                `select * from Taverns where TavernName LIKE '%' + @TavernName + '%' order by ID ASC`,
            );
        Taverns = Taverns.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(Taverns);
};

module.exports.getAll = getAll;

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