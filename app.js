let tableS = [];
let keyS = "";
let msjS = "";
let code, key, msj;
Reveal.initialize({
  controls:false
});

Vue.component('create-table',{
  props:['chars'],
  template : '<div><input type="text" v-model="chars" placeholder="Write your characters"><div class="codeBlock"><span class="cx">Output code:</span><p class="ddt"><span class="l">let </span><span class="n">chars </span><span class="eq">= </span></p> <p class="code" id="codeT">{{ chars.split(", ") }}</p><button  class="btn" v-on:click="$emit(setTable()) ">Set Table</button></div></div>'
})
Vue.component('code-msg',{
  props:['keyu', 'msj'], 
  template : '<div id="form" class="chars"><input id="key" v-model="keyu" placeholder="Write Key"><label class="lbl" for="key">Write your keyword</label><input id="msj" v-model="msj" placeholder="Write msg"><label for="msj">Write your message</label><button class="btn" onclick="">Set keys</button></br></br></br><section class="codeBlock"><span class="cx">Output code</span><p>{{ codeMsg(keyu, msj) }} </p></section></div>'
})
Vue.component('decode-msg',{
  props:['keyu', 'msj'],
  template : '<div id="form" class="chars"><input id="key" v-model="keyu" placeholder="Write Key"><label class="lbl" for="key">Write your keyword</label><input id="msj" v-model="msj" placeholder="Write msg"><label for="msj">Write your message</label><button class="btn" onclick="">Set keys</button></br></br></br><section class="codeBlock"><span class="cx">Output code</span><p>{{ decodeMsg(keyu, msj) }} </p></section></div>'
})
var setChars = new Vue({
  el:"#chars",
  data: {
    chars:""
  },
});
function setTable(){
  code = document.getElementById("codeT");
  tableS = setTables(eval(code.textContent)) 
  Reveal.next()
  console.log (tableS);
}
function codeMsg(k, m){
  let ky = k.split("");
  let my = m.split("");
  const l = ky.length;
  let c = - 1;
  let pp = [];
  for(let i = 0;i<my.length;i++){
    c++;
    pp.push(getLetter(tableS, ky[c], my[i]).letter);
    if(c == l-1){
      c=-1;
    }
  }
  return pp.join("");
}
function decodeMsg(k, m){
  let ky = k.split("");
  let my = m.split("");
  const l = ky.length;
  let c = - 1;
  let pp = [];
  for(let i = 0;i<my.length;i++){
    c++;
    tableS.map((e, s) =>{
      if(getLetter(tableS, ky[c], e[0]).letter == my[i]){
        pp.push(e[0]);
      }
    })
   
    if(c == l-1){
      c=-1;
    }
  }
  return pp.join("");
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register("./sw.js")
  .then(e => console.log(e))
 .catch(er => alert(er));
}
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted E3 prompt');
        } else {
          console.log('User dismissed the E3 prompt');
        }
        deferredPrompt = null;
      });
  });
});
