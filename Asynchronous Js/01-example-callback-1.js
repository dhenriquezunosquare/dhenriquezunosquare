

////////////////////////////////EXAMLPE 1
// setTimeout(function(){
//     console.log("the function was called back");
// },3000);    
////////////////////////////////

////////////////////////////////EXAMLPE 2
let students= [
    {name:"Jhon",score:100,school:"East"},
    {name:"Pablo",score:200,school:"East"},
    {name:"Juan",score:300,school:"West"},
    {name:"David",score:400,school:"West"},   
];

let proceduresStudents= function(data,callback){
    for(let i=0;i<data.length;i++){
        if(data[i].school.toLowerCase()==="east"){
            if(typeof callback==="function"){
                callback(data[i]);

            }
        }
    }
}

//proceduresStudents(students,(data)=>{console.log(data)})
// or 
// proceduresStudents(students,function(data){
//     console.log(data);
// })

console.log("before determinateTotal")

let determinateTotal=  function(){
    let total=0; 
    let count = 0;

    proceduresStudents(students,(data)=>{
        total=total+data.score
        count++;
    })

    console.log("total: "+ total +"- count: "+count);
}

setTimeout(function(){
    determinateTotal();
},3000);

console.log("end of code");

////////////////////////////////
