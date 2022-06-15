const a = [
  { name: "1", age: "20" },
  { name: "1", age: "20" },
  { name: "1", age: "20" },
  { name: "1", age: "20" },
];

var product = "";
for (var i = 0; i < a.length; i++) {
  product += " " + i;
  console.log("product i", product);
}
