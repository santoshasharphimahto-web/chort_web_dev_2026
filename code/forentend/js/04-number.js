const crewMember = 45;

const fultnk = 143.3;
const lighSpeed = 299_888_999;

console.log(crewMember,fultnk,lighSpeed)

// specialNumber in javascript for the dsa;

const infiniteRange = Infinity;
const negetiveinfinite = -Infinity;
console.log(infiniteRange,negetiveinfinite)
console.log(1/0)
console.log(-1/0)
// NAN (not a number in js )
const notNumber=NaN;
console.log("type of nan:",typeof NaN);
console.log(notNumber);

const num="5";
const stri="deepak";
console.log(NaN===NaN);
console.log(parseInt(num));
console.log(parseInt(stri))

console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)
console.log(Number.EPSILON);

console.log(Number.isInteger(stri))
console.log(Number.isInteger(num))
console.log(Number.isInteger(5))

console.log(Number.isFinite(isFinite))
console.log(Number.isFinite(num))
console.log(Number.isFinite(4))

console.log(Number.isNaN(5))
console.log(Number.isNaN(parseInt("aavvgvgh")))

console.log(parseInt("57341"))
console.log(parseInt("avdc"))
console.log(parseInt("0x7667"))

console.log(parseFloat("57341.54"))
console.log(parseFloat("avdc"))
console.log(parseFloat("0x766"))

// math.methods

const thrustforce = 4.567;
console.log(Math.round(thrustforce))
console.log(Math.floor(thrustforce))
console.log(Math.ceil(thrustforce))
console.log(Math.trunc(thrustforce))

console.log(Math.floor(566.66))//566
console.log(Math.round(345.67))//346
console.log(Math.ceil(344.3))//345
console.log(Math.trunc(233.333))//233

const temps =  [-120,43,56,-23];
console.log(Math.min(...temps));


console.log(Math.max(...temps))
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3)// ......strict checking .....

function almostEqual(a,b){

   return Math.abs(a-b)<Number.EPSILON

}
console.log(almostEqual(0.1+0.2,0.3))