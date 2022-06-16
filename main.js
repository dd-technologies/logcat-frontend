const a = [
  { name: "1", age: "20" },
  { name: "1", age: "20" },
  { name: "1", age: "20" },
  { name: "1", age: "20" },
];

var product = "";
for (var i = 0; i < a.length; i++) {
  product += " " + a[i];

  product.map((element) => {
    console.log("element", element.name);
  });
}
