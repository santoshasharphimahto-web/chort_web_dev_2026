
class InMemoryDB {
    _db = new Map();
    constructor() { }
    insert(data) {
        if (this._db.has(data.id))
            throw new Error("User already exists.");
        this._db.set(data.id, data);
        return data.id;
    }
    update(id, data) {
        if (!this._db.has(id))
            throw new Error("User does not exist.");
        this._db.set(id, { ...data, id });
        return true;
    }
    getUser(id) {
        if (!this._db.has(id))
            throw new Error("User does not exist.");
        return this._db.get(id);
    }
}
const db = new InMemoryDB();
db.insert({
    id: 1,
    name: "santosh",
    lastName: "mahto",
    mobile: { phone: "7667196334" },
    address: { city: "bihar", district: "muzzaaapur", pinCode: 843124 }
});
console.log("User insert ho gaya hai!!");
console.log(db.getUser(1));
