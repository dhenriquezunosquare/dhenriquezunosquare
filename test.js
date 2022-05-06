var homework = {
    topic: "JS",
    fecha:"hoy"
};
var otherHomework = Object.create(homework);

otherHomework.topic = "Math";

console.log(homework);
console.log(otherHomework);