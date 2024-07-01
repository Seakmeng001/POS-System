


var name ="Meng";
var gender ="gender";
var tel ="09999999";
var age = 21;
var salary =49.2;
var objProduct = {}

var personInfo = name+ " "+gender+" "+tel+" "+age+" "+salary

console.log(personInfo);

console.log("============Personal info============");
var message = " "
for(var i=0; i<10; i++){
    // console.log((i+1)+"."+personInfo);
   message += (i+1)+"."+personInfo+"\n" //10 record
   message = (i+1)+"."+personInfo+"\n" //the last record

}
console.log(message);
console.log(personInfo);
console.log("============End info============");

