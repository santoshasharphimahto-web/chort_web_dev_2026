// in memory db Desgin
type UserId=number
interface User{
id:UserId;
name:string;
lastName:string;
mobile:{phone:string};
address:{
    city:string;
    distic:string;
    pinCode:number;
}

}

class InMemoryDB{
  private _db=new Map<UserId,User>()  
  constructor(){}
  public insert(data:User):UserId{
    if(this._db.has(data.id)) throw  new Error("user already exits!!")
        this._db.set(data.id,data)
    return  data.id

  }
  public update(id:UserId,data:Omit<User,"id">):boolean{
    if(!this._db.has(id)) throw  new Error("user already exits!!")
    this._db.set(id,{...data,id})        
return true;

  }
 public getUser(id:UserId):User{
    if(!this._db.has(id)) throw  new Error("user already exits!!")
         return this._db.get(id)!

 }



}


const insertFetture=new InMemoryDB()
insertFetture.insert({
    id:1,
    name:"santosh",
    lastName:"mahto",
    mobile:{phone:"7667196334"},
    address:{city:"bihar",distic:"muzzaaapur",pinCode:843124}
})
console.log("user Inesrt ho gye hai !!")
console.log(insertFetture.getUser(1))


