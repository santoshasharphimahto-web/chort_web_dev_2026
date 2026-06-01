const fs=require("fs");
const path=require("path")
const Os=require("os")

console.log("node: ", process.versions.node)
console.log("v8: ", process.versions.v8)
console.log("live:", process.versions.uv)
console.log("===============")
console.log("plate:",process.versions.plateForm)
console.log("cup:",Os.cpus().length)