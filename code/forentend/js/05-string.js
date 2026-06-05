const codeName = "shadow fox";
// const backupName =  new string("Night owl");
// console.log(backupName)

const stringtemplet = ` khuuga ${codeName} kasye ho`;
console.log(codeName,stringtemplet);
const num= 123;
// console.log(string(num));clear

// string are immmutable 

let intcode="hello";
 intcode[0]="j";
 console.log(intcode); 
//string ka methow
 const secrtCode = "oMAH-7"
 console.log(secrtCode.length)
  
 console.log(secrtCode.charAt(1));
 console.log(secrtCode.charAt(99))// empty string
 console.log(secrtCode.charAt[99])// undefinded

console.log(secrtCode.at(-1)) // both sam chatat and at bit at have negative indexing in reverse
console.log(secrtCode.at(-2));


const rawTransmission = "the egal has landed "
console.log(rawTransmission.toUpperCase());
console.log(rawTransmission.toLowerCase());
console.log(rawTransmission)


const myName = "my name is mulkula";
console.log(myName.slice(4,9))// retuns portion of the string

const Anshu ="  bawal mal hai,sdddd     ";

console.log(Anshu)
console.log(Anshu.trim()) // remove the space from the beging and the starting


// serching methodds of the string 
const petName = "dog name is buluka pet ";
console.log(petName.includes("buluka"));// retuns true when oarts bof the strin match


let games = "frefires ,kills them"
console.log(games.split("f"))// it returns the arrary containg the splitsting , number of items decid matched valule



const order = "move_north|had-postion|extract up"
orderlist = order.split("|");

console.log("split:",orderlist)

const fruit=["apple", "bannan","mango"]
const singlefruit = fruit.join();
console.log(singlefruit)

//  replacing string 

const petreplace = "mukaa is a goood pet "
console.log(petreplace.replace("mukaa","slooo"))/// it repce the withe given string


// repeat() methos

const repeateName = "kakaka";
console.log(repeateName.repeat(3))//repeat the string on the specific numver

// indexof

const indexname= "indaxa kandi"
console.log(indexname.indexOf("x"))//it ruturns the index of the string

// demolashing a memorey 

let generalStore={
    name:"kirna",
    goodes:"2"
}
console.log(generalStore)
generalStore =null
console.log(generalStore);
