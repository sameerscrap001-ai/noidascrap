const DEFAULT_RATES = {
  iron: 42.5,
  copper: 650,
  aluminium: 160,
  electronic: 85,
  plastic: 18,
  batteries: 90,
  vehicle: 35
};

let CURRENT_RATES = { ...DEFAULT_RATES };

function getRates() {
  return { ...CURRENT_RATES };
}

function calculatePrice() {
  const typeSelect = document.getElementById('scrapType');
  const ratePerKg = parseFloat(typeSelect.value) || 0;
  const weight = parseFloat(document.getElementById('weightInput').value) || 0;
  const unitMultiplier = parseFloat(document.getElementById('unitSelect').value) || 1;
  const totalInKg = weight * unitMultiplier;
  const totalAmount = Math.round(ratePerKg * totalInKg);
  document.getElementById('totalPrice').innerText = '₹ ' + totalAmount.toLocaleString('en-IN') + ' /-';
}

function applySavedRates(rates = CURRENT_RATES) {
  CURRENT_RATES = { ...DEFAULT_RATES, ...rates };
  const select = document.getElementById('scrapType');
  if (!select) return;
  const options = [
    ['iron','Iron & Steel'], ['copper','Copper'], ['aluminium','Aluminium'],
    ['electronic','Electronic Scrap'], ['plastic','Plastic'], ['batteries','Batteries'], ['vehicle','Vehicle Scrap']
  ];
  options.forEach(([key,label],i)=>{
    const option=select.options[i];
    if(option){ option.value=CURRENT_RATES[key]; option.textContent=`${label} (₹${CURRENT_RATES[key]} / kg)`; }
  });
  calculatePrice();
}

function sendWhatsApp() {
  const typeSelect = document.getElementById('scrapType');
  const itemText = typeSelect.options[typeSelect.selectedIndex].text;
  const weight = document.getElementById('weightInput').value;
  const unitText = document.getElementById('unitSelect').options[document.getElementById('unitSelect').selectedIndex].text;
  const total = document.getElementById('totalPrice').innerText;
  const message = `Namaste Noida Scrap Kabaadi Wala, mujhe scrap bechna hai:\n- Item: ${itemText}\n- Weight: ${weight} ${unitText}\n- Estimated Price: ${total}\nKripya pickup arrange karein.`;
  window.open('https://wa.me/919355282014?text=' + encodeURIComponent(message), '_blank');
}

document.addEventListener('DOMContentLoaded', async () => {
  applySavedRates();
  try {
    const ref = db.collection('settings').doc('rates');
    ref.onSnapshot(snapshot => {
      if (snapshot.exists) applySavedRates(snapshot.data());
    }, error => console.warn('Live price sync error:', error));
  } catch (e) {
    console.warn('Firebase price sync unavailable:', e);
  }
});
