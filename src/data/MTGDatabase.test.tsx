import React from 'react';
import {database} from "./MTGDatabase";
import {SQLiteDatabase} from "react-native-sqlite-storage";

jest.setTimeout(30000);

describe('MTGDatabase tests', function () {
    it('should open database correctly', async (done) => {
        const db: SQLiteDatabase = await database.open();
        const response = await db.executeSql("SELECT date('now');");

        if (response) {
            expect(response).toEqual(Date.now());
            done();
        }
    });
});