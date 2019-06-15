import SQLite, {ResultSet} from "react-native-sqlite-storage";
import {Card} from "./Card";

export interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;

    close(): Promise<void>;

    getFirstXCards(numCardsToGet: number): Promise<Array<Card>>;
    getCardsByString(query: string): Promise<Array<Card>>;

    testDB(): Promise<void>;
}

class MTGDatabaseImpl implements Database {
    private dbName = 'AllSets.sqlite';
    private database: SQLite.SQLiteDatabase | undefined;

    private tablesCommand: string =
        "SELECT name FROM sqlite_master WHERE type='table'ORDER BY name;";
    private timeCommand: string = "SELECT date('now')";
    private cardNameQueryCommand = (query: string) => `SELECT * FROM cards WHERE name LIKE '%${query}%' LIMIT 50`

    public open(): Promise<SQLite.SQLiteDatabase> {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        try {
            let db = SQLite.openDatabase(
                {
                    name: 'AllSets.sqlite',
                    createFromLocation: "~www/AllSets.sqlite",
                    location: 'Library'
                }
                , () => {
                    console.log("db connection opened");
                }, (err: any) => {
                    console.log("Error opening db: ", err);
                });

            return Promise.resolve(db);
        } catch (err) {
            console.log("Error opening the db: ", err);
            return Promise.reject(new Error("no db connection"));
        }
    }

    public close(): Promise<void> {
        if (this.database === undefined) {
            return Promise.reject("[db] Database was not open; unable to close.");
        }
        return this.database.close().then(status => {
            console.log("[db] Database closed.");
            this.database = undefined;
        });
    }

    public async testDB(): Promise<void> {
        try {
            const db = await this.getDatabase();
            const [results]: [ResultSet] = await db.executeSql(this.tablesCommand);
            console.log("RESULTS: ", results);
            if (results === null) {
                console.log("nothing in rows");
            } else {
                let data = results.rows.item(0);
                console.log(data);
            }
        } catch (err) {
            console.log("error: ", err);
        }
    }

    public async getCardsByString(query: string): Promise<Card[]> {
        try {
            const db = await this.getDatabase();

            const [results]: [ResultSet] =
                await db.executeSql(this.cardNameQueryCommand(query));

            if (results === undefined) {
                return [];
            }
            const cardList: Card[] = [];

            for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);
                cardList.push({name: row.name});
            }
            return cardList;
        } catch (err) {
            console.log("got an error in renderSql ", err);
            return Promise.resolve([]);
        }
    }

    public async getFirstXCards(numCardsToGet: number): Promise<Card[]> {
        try {
            const db = await this.getDatabase();

            const [results]: [ResultSet] =
                await db.executeSql(
                        `SELECT *
                         FROM cards LIMIT ${numCardsToGet}`);

            if (results === undefined) {
                return [];
            }
            const cardList: Card[] = [];

            for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);
                cardList.push({name: row.name});
            }
            return cardList;

        } catch (err) {
            console.log("got an error in renderSql ", err);
            return Promise.resolve([]);
        }
    }

    private async getDatabase(): Promise<SQLite.SQLiteDatabase> {
        if (this.database !== undefined) {
            return Promise.resolve(this.database);
        }
        // otherwise: open the database first
        return await this.open();
    }

}

export const database: Database = new MTGDatabaseImpl();