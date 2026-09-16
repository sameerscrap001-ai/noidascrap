const defaults={iron:42.5,copper:650,aluminium:160,electronic:85,plastic:18,batteries:90,vehicle:35};
const names={iron:'Iron & Steel',copper:'Copper',aluminium:'Aluminium',electronic:'Electronic Scrap',plastic:'Plastic',batteries:'Batteries',vehicle:'Vehicle Scrap'};
const ADMIN_USERNAME='admin';
const ADMIN_EMAIL='sameerscrap001@gmail.com';

const loginBox=document.getElementById('loginBox');
const adminBox=document.getElementById('adminBox');
const loginMsg=document.getElementById('loginMsg');
const ratesBox=document.getElementById('rates');

function renderRates(rates){
  ratesBox.innerHTML='';
  Object.keys(defaults).forEach(k=>{
    ratesBox.innerHTML+=`<div class="rate"><label>${names[k]}</label><input type="number" step="0.01" min="0" data-key="${k}" value="${Number(rates[k] ?? defaults[k])}"></div>`;
  });
}

async function loadRates(){
  try{
    const snap=await db.collection('settings').doc('rates').get();
    renderRates(snap.exists ? {...defaults,...snap.data()} : defaults);
  }catch(e){
    renderRates(defaults);
    document.getElementById('msg').textContent='Could not load online prices. Check Firestore rules.';
  }
}

document.getElementById('loginBtn').onclick=async()=>{
  const username=document.getElementById('username').value.trim();
  const password=document.getElementById('password').value;
  loginMsg.textContent='';
  if(username!==ADMIN_USERNAME){loginMsg.textContent='Wrong username.';return;}
  if(!password){loginMsg.textContent='Password daaliye.';return;}
  try{
    await auth.signInWithEmailAndPassword(ADMIN_EMAIL,password);
    loginBox.style.display='none';
    adminBox.style.display='block';
    await loadRates();
  }catch(e){
  console.error("FIREBASE LOGIN ERROR:", e);
  loginMsg.textContent = e.code + " — " + e.message;
}
};

document.getElementById('logout').onclick=()=>auth.signOut();

auth.onAuthStateChanged(async user=>{
  if(user && user.email===ADMIN_EMAIL){
    loginBox.style.display='none';
    adminBox.style.display='block';
    await loadRates();
  }else{
    if(user) await auth.signOut();
    loginBox.style.display='block';
    adminBox.style.display='none';
  }
});

document.getElementById('save').onclick=async()=>{
  const out={};
  document.querySelectorAll('input[data-key]').forEach(i=>out[i.dataset.key]=Number(i.value)||0);
  try{
    await db.collection('settings').doc('rates').set(out,{merge:true});
    document.getElementById('msg').textContent='Prices saved online. Sab users ko naya price dikhega.';
  }catch(e){
    document.getElementById('msg').textContent='Save failed: ' + (e.code || 'unknown-error') + ' — Firestore rules check karein.';
  }
};
