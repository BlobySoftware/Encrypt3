function setTables(letters){
let table = [];

for(let i=0;i<letters.length;i++){ 
  let newRow = [];
  letters.map(e => newRow.push(e));
  let comp=newRow.slice(i,letters.length)
  let delta = letters.length-comp.length;
  for(let k =0;k<delta;k++){
    comp.push(letters[k]);
  }
  table.push(comp);
}
return table;

} 
const getLetter = (table, a, b) =>{
  let x, y, l;
  for(let i = 0;i<table.length;i++){
    if(table[i][0] == b){
      for(let j =0;j<table[i].length;j++){
        if(table[0][j] == a){
          x = j;
          y = i;
          l = table[i][j];
        }
      }
    }
  }
  return {
    coords:[x, y],
    letter:l
  }
}
