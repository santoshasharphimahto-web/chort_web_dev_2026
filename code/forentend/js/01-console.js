const clue1="muddy footprint hai";
console.log("clue found:",clue1);

// camel case :_ reperstation 
const suspactName ="depawli";
const suspactAge = 14;

console.log("supsacted: " ,suspactName, "| Age: ", suspactAge );

//console.warn

console.warn("fingeprint: evidance deetced")

const evedancelo = [
    {id:1,name:"kaslal",location:"home"},
    {id:2,name:"john",location:"work"},
    {id:3,name:"jane",location:"office"}
]

console.table(evedancelo);


//console.group()
console.group("group started")
console.log("my log 1")
console.log("my log 2")
console.log("my log 3 ")
console.groupEnd()

//console.time("")

console.time("Totale time it takes")
let dnaMatch = 0;

for(let i=0;i<1_00_000;i++){

    dnaMatch++;
}

console.timeEnd("Totale time it takes");

console.count("chaiaurcode")
console.count("chaiaurcode")

console.count("chaiaurcode")


// variables:-

