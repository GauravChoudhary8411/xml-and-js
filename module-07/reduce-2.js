const pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels",
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire",
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire",
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels",
  },
];

console.log(`Source:`);
console.log(pilots);

console.log(`-----------`);
console.log(`2 arrays`);
console.log(`-----------`);

console.log(`using .filter()`);
const rebels_1 = pilots.filter((pilot) => pilot.faction === "Rebels");
const empire_1 = pilots.filter((pilot) => pilot.faction === "Empire");

console.log(rebels_1);
console.log(empire_1);

console.log(`using .reduce()`);

const { rebels, empire } = pilots.reduce(
  (accum, pilot) => {
    let type;
    if (pilot.faction === "Rebels") {
      //accum.rebels.push(pilot);
      type = 'rebels'
    }
    else if (pilot.faction === "Empire") {
      type = "empire"
    }

    if (accum[type].length > 0) {
      accum[type] = accum[type] + ", " + pilot.name;
    }
    else {
      accum[type] = pilot.name;
    }


    // accum.empire.push(pilot);


    return accum;
  },
  { rebels: "", empire: "" }
);

console.log(rebels);
console.log(empire);

