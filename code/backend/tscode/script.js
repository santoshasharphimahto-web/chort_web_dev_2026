"use strict";
class InMemoryDB {
    _db = new Map();
    constructor() { }
    insert(data) {
        if (this._db.has(data.id))
            throw new Error("user already exits!!");
        this._db.set(data.id, data);
        return data.id;
    }
    update(id, data) {
        if (!this._db.has(id))
            throw new Error("user already exits!!");
        this._db.set(id, { ...data, id });
        return true;
    }
    getUser(id) {
        if (!this._db.has(id))
            throw new Error("user already exits!!");
        return this._db.get(id);
    }
}
const insertFetture = new InMemoryDB();
insertFetture.insert({
    id: 1,
    name: "santosh",
    lastName: "mahto",
    mobile: { phone: "7667196334" },
    address: { city: "bihar", distic: "muzzaaapur", pinCode: 843124 }
});
console.log("user Inesrt ho gye hai !!");
console.log(insertFetture.getUser(1));
