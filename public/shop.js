/* ===================== DATA ===================== */
let PRODUCTS = [
  {id:1,name:"খাঁটি সুন্দরবন মধু",nameEn:"Sundarban Honey",cat:"মধু",tag:"bestseller",price:850,origPrice:1100,unit:"500 গ্রাম",desc:"সুন্দরবনের বিশুদ্ধ ফুলের মধু। কোনো সংযোজন বা প্রক্রিয়াকরণ ছাড়াই সরাসরি মৌচাক থেকে আপনার ঘরে।",benefits:["রোগ প্রতিরোধ ক্ষমতা বাড়ায়","ঘুমের মান উন্নত করে","প্রদাহ কমায়"],img:"https://images.unsplash.com/photo-1587049352847-4d4b1263d508?auto=format&fit=crop&w=600&q=80",rating:4.9,reviews:128,sunnah:false},
  {id:2,name:"মরিঙ্গা পাউডার",nameEn:"Moringa Powder",cat:"সুপারফুড",tag:"organic",price:450,origPrice:null,unit:"250 গ্রাম",desc:"অর্গানিক মরিঙ্গা পাতার পাউডার। ভিটামিন, খনিজ ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ। 'অলৌকিক বৃক্ষ' নামে পরিচিত।",benefits:["ভিটামিন C সমৃদ্ধ","শক্তি বাড়ায়","ডায়াবেটিস নিয়ন্ত্রণে সহায়ক"],img:"https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&w=600&q=80",rating:4.7,reviews:89,sunnah:false},
  {id:3,name:"চিয়া সিড",nameEn:"Chia Seeds",cat:"সুপারফুড",tag:"organic",price:380,origPrice:480,unit:"250 গ্রাম",desc:"পুষ্টিগুণে ভরপুর চিয়া বীজ। ওমেগা-৩, ফাইবার ও প্রোটিনের চমৎকার উৎস।",benefits:["হজমশক্তি বাড়ায়","ওজন নিয়ন্ত্রণ করে","হার্ট ভালো রাখে"],img:"https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=80",rating:4.6,reviews:62,sunnah:false},
  {id:4,name:"কালোজিরার তেল",nameEn:"Black Seed Oil",cat:"তেল",tag:"sunnah",price:650,origPrice:800,unit:"200 মিলি",desc:"একশত ভাগ খাঁটি কালোজিরার তেল। সুন্নাহ অনুযায়ী ঠান্ডা প্রেসিং পদ্ধতিতে তৈরি।",benefits:["মৃত্যু ছাড়া সব রোগের ওষুধ","রোগ প্রতিরোধ শক্তি বৃদ্ধি","চুলের স্বাস্থ্য উন্নত করে"],img:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",rating:4.9,reviews:203,sunnah:true},
  {id:5,name:"ভার্জিন নারকেল তেল",nameEn:"Virgin Coconut Oil",cat:"তেল",tag:"organic",price:350,origPrice:null,unit:"500 মিলি",desc:"কোল্ড-প্রেসড ভার্জিন নারকেল তেল। রান্না ও ত্বকের যত্নে উপকারী।",benefits:["মেটাবলিজম বাড়ায়","ত্বক মসৃণ করে","চুলের পুষ্টি জোগায়"],img:"https://images.unsplash.com/photo-1526315600561-b580029b4de1?auto=format&fit=crop&w=600&q=80",rating:4.5,reviews:74,sunnah:false},
  {id:6,name:"অর্গানিক হলুদ গুঁড়া",nameEn:"Organic Turmeric",cat:"মশলা",tag:"organic",price:280,origPrice:null,unit:"200 গ্রাম",desc:"শতভাগ অর্গানিক কারকিউমিন সমৃদ্ধ হলুদ। অ্যান্টি-ইনফ্ল্যামেটরি গুণে ভরপুর।",benefits:["প্রদাহ কমায়","লিভার সুস্থ রাখে","ত্বকের উজ্জ্বলতা বাড়ায়"],img:"https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",rating:4.4,reviews:45,sunnah:false},
  {id:7,name:"খেজুর (মেডজুল)",nameEn:"Medjool Dates",cat:"সুন্নাহ",tag:"sunnah",price:720,origPrice:900,unit:"500 গ্রাম",desc:"প্রিমিয়াম মেডজুল খেজুর। সুন্নাহ অনুযায়ী প্রতিদিন ৭টি খেজুর খাওয়া উপকারী।",benefits:["প্রাকৃতিক শক্তির উৎস","আঁশ সমৃদ্ধ","পটাসিয়াম ও ম্যাগনেসিয়াম"],img:"https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",rating:4.8,reviews:156,sunnah:true},
  {id:8,name:"মেথি বীজ",nameEn:"Fenugreek Seeds",cat:"মশলা",tag:"new",price:180,origPrice:null,unit:"200 গ্রাম",desc:"প্রাকৃতিক মেথি বীজ। রক্তে শর্করার মাত্রা নিয়ন্ত্রণে ও পাচনতন্ত্র উন্নয়নে কার্যকর।",benefits:["রক্তে শর্করা নিয়ন্ত্রণ","বুকের দুধ বাড়ায়","কোলেস্টেরল কমায়"],img:"https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",rating:4.3,reviews:28,sunnah:false},
  {id:9,name:"জলপাইয়ের তেল",nameEn:"Olive Oil",cat:"তেল",tag:"sunnah",price:950,origPrice:1200,unit:"250 মিলি",desc:"এক্সট্রা ভার্জিন জলপাইয়ের তেল। কুরআনে উল্লেখিত বরকতময় তেল।",benefits:["হৃদরোগ প্রতিরোধ করে","অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ","মস্তিষ্কের কার্যক্ষমতা বাড়ায়"],img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",rating:4.8,reviews:91,sunnah:true},
  {id:10,name:"কালো মধু",nameEn:"Black Honey",cat:"মধু",tag:"premium",price:1250,origPrice:null,unit:"250 গ্রাম",desc:"দুর্লভ কালো ফুলের মধু। সর্বোচ্চ অ্যান্টিঅক্সিডেন্ট ঘনত্বের জন্য বিখ্যাত।",benefits:["শক্তিশালী অ্যান্টিঅক্সিডেন্ট","অ্যালার্জি কমায়","ক্ষত নিরাময়ে সহায়ক"],img:"https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=600&q=80",rating:5.0,reviews:39,sunnah:false},
  {id:11,name:"আদা গুঁড়া",nameEn:"Ginger Powder",cat:"মশলা",tag:"organic",price:250,origPrice:null,unit:"150 গ্রাম",desc:"তাজা আদার থেকে তৈরি শতভাগ অর্গানিক আদার গুঁড়া। বমিভাব ও হজমে উপকারী।",benefits:["বমিভাব দূর করে","প্রদাহ কমায়","হজম উন্নত করে"],img:"https://images.unsplash.com/photo-1615485500995-131f476a0d24?auto=format&fit=crop&w=600&q=80",rating:4.4,reviews:33,sunnah:false},
  {id:12,name:"তুলসী মধু",nameEn:"Tulsi Honey",cat:"মধু",tag:"new",price:680,origPrice:null,unit:"300 গ্রাম",desc:"তুলসী ফুলের বিশুদ্ধ মধু। সর্দি-কাশিতে অত্যন্ত কার্যকর।",benefits:["শ্বাসকষ্ট কমায়","অ্যান্টিব্যাকটেরিয়াল","জ্বর সারায়"],img:"https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",rating:4.6,reviews:51,sunnah:false}
];

const COMBOS = [
  {id:'c1',name:"সুন্নাহ ওয়েলনেস কম্বো",items:["কালোজিরার তেল (200ml)","খেজুর মেডজুল (500g)","খাঁটি মধু (250g)"],price:1850,origPrice:2220,save:370,img:"https://images.unsplash.com/photo-1587049352847-4d4b1263d508?auto=format&fit=crop&w=600&q=80",tag:"bestseller"},
  {id:'c2',name:"গ্রিন সুপারফুড প্যাক",items:["মরিঙ্গা পাউডার (250g)","চিয়া সিড (250g)","হলুদ গুঁড়া (200g)","মেথি বীজ (200g)"],price:1100,origPrice:1310,save:210,img:"https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",tag:"new"},
  {id:'c3',name:"প্রিমিয়াম হানি কালেকশন",items:["সুন্দরবন মধু (500g)","কালো মধু (250g)","তুলসী মধু (300g)"],price:2400,origPrice:2780,save:380,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",tag:"premium"},
  {id:'c4',name:"তেলের সংকলন",items:["কালোজিরার তেল (200ml)","ভার্জিন নারকেল তেল (500ml)","জলপাইয়ের তেল (250ml)"],price:1700,origPrice:1950,save:250,img:"https://images.unsplash.com/photo-1587049352847-4d4b1263d508?auto=format&fit=crop&w=600&q=80",tag:""},
  {id:'c5',name:"ইমিউনিটি বুস্টার প্যাক",items:["খাঁটি মধু (500g)","কালোজিরার তেল (200ml)","মরিঙ্গা পাউডার (250g)","আদা গুঁড়া (150g)"],price:2200,origPrice:2600,save:400,img:"https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",tag:"bestseller"},
  {id:'c6',name:"পারিবারিক ওয়েলনেস কিট",items:["খাঁটি মধু (500g)","মরিঙ্গা পাউডার (250g)","হলুদ গুঁড়া (200g)","খেজুর (500g)","নারকেল তেল (500ml)"],price:2800,origPrice:3430,save:630,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",tag:"value"}
];

/* ─── Stat Counters (single source of truth – update here to reflect site-wide) ─── */
const SITE_STATS = {
  customers:  '৫০০+',   // happy customers
  organicPct: '১০০%',  // organic certified
  deliveryHr: '৪৮ঘ'    // delivery speed
};

/* ─── Newsletter debounce handler ─── */
let _nlDebounce;
function handleNewsletter(e){
  e.preventDefault();
  clearTimeout(_nlDebounce);
  _nlDebounce = setTimeout(() => {
    const input = document.getElementById('newsletter-email');
    const msg   = document.getElementById('newsletter-msg');
    if (!input) return;
    if (!input.validity.valid) {
      if (msg) {
        msg.textContent = 'সঠিক ইমেইল ঠিকানা দিন।';
        msg.className = 'text-xs mt-2 text-error';
        msg.classList.remove('hidden');
      }
      input.focus();
      return;
    }
    showToast('সাবস্ক্রাইব সফল!', 'check_circle');
    if (msg) {
      msg.textContent = 'ধন্যবাদ! আপনাকে আমাদের তালিকায় যোগ করা হয়েছে।';
      msg.className = 'text-xs mt-2 text-secondary';
      msg.classList.remove('hidden');
    }
    input.value = '';
  }, 300);
}

/* ===================== STATE ===================== */
let cart = [];
let currentPage = '';
let lastPage = 'home';
let currentProduct = null;
let currentCategory = 'সব';
let orderInfo = {};
let placedOrders = [];

/* ===================== ROUTER ===================== */
function nav(page){
  if(!document.getElementById('page-'+page)) return;
  if(page===currentPage && page!=='product') return;
  lastPage = currentPage;
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+page);
  if(pg){ pg.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  if(location.hash.slice(1)!==page) history.replaceState(null, '', '#'+page);
  updateNavActive(page);
  if(page==='shop') renderShop();
  if(page==='home') renderHomeProducts();
  if(page==='cart') renderCartPage();
  if(page==='checkout') renderCheckout();
  if(page==='account') renderAccount();
  if(page==='combo') renderCombos();
  if(page==='sunnah') renderSunnah();
}

function navFromHash(){
  const page = location.hash.replace('#','') || 'home';
  if(document.getElementById('page-'+page)) nav(page);
}

window.addEventListener('hashchange', navFromHash);

function updateNavActive(page){
  document.querySelectorAll('.po-site-switcher a[aria-current="page"]').forEach(el=>el.removeAttribute('aria-current'));
  document.querySelectorAll(`.po-site-switcher a[data-route="${page}"]`).forEach(el=>el.setAttribute('aria-current','page'));
  document.querySelectorAll('[data-page]').forEach(el=>{
    el.classList.remove('active');
    if(el.dataset.page===page) el.classList.add('active');
  });
  // Header links
  document.querySelectorAll('nav .nav-link').forEach(el=>{
    el.style.color = el.dataset.page===page ? '#023625' : '';
    el.style.fontWeight = el.dataset.page===page ? '700' : '';
    el.style.borderBottom = el.dataset.page===page ? '2px solid #023625' : '';
  });
}

/* ===================== PRODUCT CARD ===================== */
function tagLabel(tag){
  const map = {bestseller:['বেস্টসেলার','bg-gold-light text-tertiary-container'],organic:['অর্গানিক','bg-secondary-container text-on-secondary-container'],sunnah:['সুন্নাহ','bg-primary text-white'],new:['নতুন','bg-surface-tint text-white'],premium:['প্রিমিয়াম','bg-tertiary text-white'],value:['ভ্যালু','bg-secondary text-white']};
  return map[tag]||null;
}

function renderStars(r){
  let s='';
  for(let i=1;i<=5;i++) s+=`<span style="color:${i<=Math.round(r)?'#C9971C':'#c0c9c2'};font-size:13px;">★</span>`;
  return s;
}

function productCard(p){
  const t=tagLabel(p.tag);
  const disc=p.origPrice?Math.round((1-p.price/p.origPrice)*100):0;
  const weightSelectId = `weight-select-${p.id}`;
  
  return `<article class="product-card bg-surface rounded-lg border border-border-sand overflow-hidden shadow-[0_4px_12px_rgba(31,77,58,0.04)] hover:shadow-[0_8px_24px_rgba(31,77,58,0.08)] transition-all duration-300 flex flex-col group relative" onclick="openProduct(${p.id})">
    <!-- Badges -->
    <div class="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
      ${t?`<span class="bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps px-2 py-0.5 rounded-sm shadow-sm text-[10px] md:text-xs tracking-wider">${t[0]}</span>`:''}
      ${p.id === 1 ? `<span class="bg-primary-container/90 text-[#bceed3] font-label-caps text-label-caps px-2 py-0.5 rounded backdrop-blur-sm border border-primary/20 text-[10px] hidden md:inline-block">COD Available</span>`:''}
    </div>
    ${disc>0?`
      <div class="absolute top-2 right-2 z-10">
        <span class="bg-error text-on-error font-label-caps text-label-caps px-2 py-0.5 rounded-sm shadow-sm animate-subtle-pulse text-[10px] md:text-xs">-${disc}%</span>
      </div>
    `:''}
    
    <!-- Image Area -->
    <div class="aspect-square bg-surface-container overflow-hidden p-3 md:p-4 flex items-center justify-center relative">
      <img alt="${p.name}" class="object-cover w-full h-full rounded-md group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" src="${p.img}">
    </div>
    
    <!-- Card Info Panel -->
    <div class="p-3 md:p-4 flex flex-col flex-grow bg-surface-cream">
      <div class="flex-grow">
        <span class="text-on-surface-variant font-body-sm text-body-sm text-xs mb-1 block md:hidden">${p.cat}</span>
        <h3 class="font-headline-sm text-headline-sm text-sm md:text-base lg:text-lg text-primary mb-1 line-clamp-2">${p.name}</h3>
        <p class="hidden md:block font-body-sm text-body-sm text-on-surface-variant line-clamp-2 md:text-xs min-h-[32px] mb-2 leading-relaxed opacity-85">${p.desc || ''}</p>
        <div class="flex items-center gap-1.5 mb-2">${renderStars(p.rating)}<span class="text-xs text-muted-gray">(${p.reviews})</span></div>
        
        <div class="flex items-baseline md:items-end gap-2 md:gap-3 mt-1 mb-2">
          <span class="font-body-md md:font-headline-sm md:text-headline-sm text-primary font-bold leading-none text-base md:text-lg">৳ ${p.price.toLocaleString('bn-BD')}</span>
          ${p.origPrice?`<span class="font-body-sm text-body-sm text-muted-gray line-through text-xs mb-[1px]">৳ ${p.origPrice.toLocaleString('bn-BD')}</span>`:''}
        </div>
      </div>
      
      <!-- Weight Selectors (desktop only, hidden on mobile) -->
      <div class="mb-3 w-full group relative hidden md:block" onclick="event.stopPropagation()">
        <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1 text-[11px]" for="${weightSelectId}">পরিমাণ বাছাই করুন:</label>
        <div class="relative">
          <select class="w-full appearance-none bg-surface-cream border border-border-sand text-primary font-body-sm text-body-sm rounded-lg py-1.5 px-3 pr-8 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-colors duration-200 hover:border-primary/50 text-[13px]" id="${weightSelectId}">
            <option value="100g">১০০ গ্রাম</option>
            <option value="250g">২৫০ গ্রাম</option>
            <option value="500g">৫০০ গ্রাম</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary transition-transform duration-200 group-hover:translate-y-1">
            <span class="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col gap-1.5 mt-auto" onclick="event.stopPropagation()">
        <button onclick="addToCartAnimated(this, ${p.id})" class="add-to-cart-btn w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary font-body-sm text-body-sm py-1.5 md:py-2 rounded-md transition-all active:scale-95 flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-[16px] md:text-[18px] icon">add_shopping_cart</span>
          <span class="text">কার্টে যোগ</span>
        </button>
        <button onclick="addToCart(${p.id}); nav('checkout')" class="w-full bg-primary text-on-primary hover:bg-[#1C4631] font-body-sm text-body-sm py-1.5 md:py-2 rounded-md transition-all active:scale-95 font-medium shadow-sm flex items-center justify-center">
          এখনই কিনুন
        </button>
      </div>
    </div>
  </article>`;
}

window.addToCartAnimated = function(btn, id) {
  addToCart(id, 1);
  const icon = btn.querySelector('.icon');
  const text = btn.querySelector('.text');
  if(!icon || !text) return;
  const origClass = btn.className;
  btn.className = "add-to-cart-btn w-full bg-primary text-on-primary border border-primary font-body-sm text-body-sm py-1.5 md:py-2 rounded-md transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm";
  icon.textContent = 'check_circle';
  text.textContent = 'যোগ করা হয়েছে';
  setTimeout(() => {
    btn.className = origClass;
    icon.textContent = 'add_shopping_cart';
    text.textContent = 'কার্টে যোগ';
  }, 2000);
};

/* ===================== PAGES RENDER ===================== */
function renderHomeProducts(){
  const grid = document.getElementById('home-products-grid');
  if(!grid) return;
  if(PRODUCTS.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-10"><div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div><p class="text-muted-gray text-sm mt-3">পণ্য লোড হচ্ছে...</p></div>`;
  } else {
    grid.innerHTML = PRODUCTS.slice(0,8).map(productCard).join('');
  }
}

function renderShop(){
  let prods = currentCategory==='সব' ? [...PRODUCTS] : PRODUCTS.filter(p=>p.cat===currentCategory);
  
  // Search text filtering
  const searchInput = document.getElementById('shop-search-input');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  if (query) {
    prods = prods.filter(p => 
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query)) ||
      (p.desc && p.desc.toLowerCase().includes(query)) ||
      (p.cat && p.cat.toLowerCase().includes(query))
    );
  }

  const sort = document.getElementById('sort-select')?.value||'default';
  if(sort==='price-asc') prods.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc') prods.sort((a,b)=>b.price-a.price);
  else if(sort==='popular') prods.sort((a,b)=>b.reviews-a.reviews);
  const grid = document.getElementById('shop-grid');
  if(grid) grid.innerHTML = prods.map(productCard).join('');
  const cnt = document.getElementById('shop-count');
  if(cnt) cnt.textContent = prods.length;
}

function renderCombos(){
  const g = document.getElementById('combo-grid');
  if(!g) return;
  g.innerHTML = COMBOS.map(c=>{
    const t=tagLabel(c.tag);
    return `<div class="bg-surface-cream rounded-2xl overflow-hidden border border-border-sand/60 card-shadow card-shadow-hover transition-all flex flex-col">
      <div class="relative h-48 overflow-hidden">
        <img src="${c.img}" alt="${c.name}" class="w-full h-full object-cover"/>
        ${t?`<span class="badge ${t[1]} absolute top-3 left-3">${t[0]}</span>`:''}
        <span class="badge bg-error text-white absolute top-3 right-3">৳ ${c.save} সাশ্রয়</span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="font-garamond font-semibold text-primary text-xl mb-2">${c.name}</h3>
        <ul class="flex flex-col gap-1 mb-4 flex-1">${c.items.map(i=>`<li class="flex items-center gap-2 text-xs text-muted-gray"><span class="mat text-secondary text-[14px]">check_circle</span>${i}</li>`).join('')}</ul>
        <div class="flex items-baseline gap-2 mb-3">
          <span class="font-bold text-primary text-xl">৳ ${c.price.toLocaleString('bn-BD')}</span>
          <span class="text-sm text-muted-gray line-through">৳ ${c.origPrice.toLocaleString('bn-BD')}</span>
        </div>
        <button onclick="addComboToCart('${c.id}')" class="btn-primary w-full justify-center"><span class="mat text-[18px]">shopping_bag</span> কার্টে যোগ করুন</button>
      </div>
    </div>`;
  }).join('');
}

function renderSunnah(){
  const g = document.getElementById('sunnah-grid');
  const prods = PRODUCTS.filter(p=>p.sunnah||p.cat==='সুন্নাহ');
  if(g) g.innerHTML = prods.map(productCard).join('');
}

function setCategory(el,cat){
  if (typeof el === 'string') {
    cat = el;
    el = null;
  }
  currentCategory = cat;

  // Sync Mobile Chips Active Styles
  document.querySelectorAll('.category-chip').forEach(c => {
    const isMatched = (cat === 'সব' && c.getAttribute('onclick')?.includes('সব')) ||
                      (c.getAttribute('onclick')?.includes(`'${cat}'`));
    if (isMatched) {
      c.className = "category-chip whitespace-nowrap px-4 py-2 rounded-full border border-primary bg-primary text-white font-body-sm text-body-sm flex items-center gap-1 shadow-sm transition-transform active:scale-95 active";
    } else {
      c.className = "category-chip whitespace-nowrap px-4 py-2 rounded-full border border-border-sand bg-surface hover:border-primary text-on-surface-variant font-body-sm text-body-sm flex items-center gap-1 transition-transform active:scale-95";
    }
  });

  // Sync Desktop Sidebar Active Styles
  document.querySelectorAll('.category-chip-desktop').forEach(c => {
    const isMatched = (cat === 'সব' && c.getAttribute('onclick')?.includes('সব')) ||
                      (c.getAttribute('onclick')?.includes(`'${cat}'`));
    if (isMatched) {
      c.className = "category-chip-desktop active w-full flex items-center justify-between p-2 rounded-lg text-primary bg-[#ede7e1] transition-colors font-body-md text-body-md category-link-hover text-left select-none font-bold";
    } else {
      c.className = "category-chip-desktop w-full flex items-center justify-between p-2 rounded-lg text-on-surface-variant hover:bg-[#ede7e1] transition-colors font-body-md text-body-md category-link-hover text-left select-none";
    }
  });

  renderShop();
}

function applySortFilter(){ renderShop(); }

function filterAndNav(cat){
  currentCategory = cat;
  nav('shop');
  setTimeout(()=>{
    setCategory(null, cat);
  },100);
}

/* ===================== PRODUCT DETAIL ===================== */
function openProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  currentProduct = p;
  const content = document.getElementById('product-detail-content');
  const disc = p.origPrice?Math.round((1-p.price/p.origPrice)*100):0;
  const t=tagLabel(p.tag);
  if (content) {
    content.innerHTML = `
      <div class="relative rounded-2xl overflow-hidden bg-surface-cream" style="aspect-ratio:1;max-height:520px;">
        <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover"/>
        ${t?`<span class="badge ${t[1]} absolute top-4 left-4 text-sm">${t[0]}</span>`:''}
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-gray mb-2">${p.cat} • ${p.unit}</div>
          <h1 class="font-garamond font-semibold text-primary text-3xl md:text-4xl leading-tight">${p.name}</h1>
          <div class="text-sm text-muted-gray font-medium mt-0.5">${p.nameEn}</div>
        </div>
        <div class="flex items-center gap-2">${renderStars(p.rating)}<span class="text-sm text-muted-gray font-semibold">${p.rating} (${p.reviews} রিভিউ)</span></div>
        <div class="flex items-baseline gap-3">
          <span class="font-bold text-primary text-3xl">৳ ${p.price.toLocaleString('bn-BD')}</span>
          ${p.origPrice?`<span class="text-lg text-muted-gray line-through">৳ ${p.origPrice}</span><span class="badge bg-error text-white">-${disc}%</span>`:''}
        </div>
        <p class="text-muted-gray text-sm leading-6">${p.desc}</p>
        <div>
          <h4 class="font-semibold text-on-surface text-sm mb-2">উপকারিতা</h4>
          <ul class="flex flex-col gap-1.5">${p.benefits.map(b=>`<li class="flex items-center gap-2 text-sm text-on-surface-variant"><span class="mat fill text-secondary text-[18px]">check_circle</span>${b}</li>`).join('')}</ul>
        </div>
        <!-- Quantity -->
        <div>
          <h4 class="font-semibold text-on-surface text-sm mb-2">পরিমাণ</h4>
          <div class="flex items-center gap-3">
            <div class="flex items-center border border-border-sand rounded-full bg-surface-cream">
              <button class="qty-btn" onclick="adjDetQty(-1)"><span class="mat text-[18px]">remove</span></button>
              <span id="det-qty" class="w-10 text-center font-bold text-on-surface">১</span>
              <button class="qty-btn" onclick="adjDetQty(1)"><span class="mat text-[18px]">add</span></button>
            </div>
            <span class="text-xs text-muted-gray">${p.unit} প্রতি প্যাক</span>
          </div>
        </div>
        <div class="flex gap-3 mt-2">
          <button onclick="addToCartFromDetail()" class="btn-primary flex-1 justify-center"><span class="mat text-[18px]">shopping_bag</span> কার্টে যোগ করুন</button>
          <button onclick="buyNow()" class="btn-outline flex-1 justify-center">এখনই কিনুন</button>
        </div>
        <div class="grid grid-cols-3 gap-3 mt-2">
          <div class="bg-surface-container-low rounded-xl p-3 text-center"><span class="mat fill text-secondary text-[22px]">verified</span><div class="text-xs font-semibold text-on-surface mt-1">১০০% খাঁটি</div></div>
          <div class="bg-surface-container-low rounded-xl p-3 text-center"><span class="mat fill text-secondary text-[22px]">local_shipping</span><div class="text-xs font-semibold text-on-surface mt-1">দ্রুত ডেলিভারি</div></div>
          <div class="bg-surface-container-low rounded-xl p-3 text-center"><span class="mat fill text-secondary text-[22px]">autorenew</span><div class="text-xs font-semibold text-on-surface mt-1">৭ দিনে রিটার্ন</div></div>
        </div>
      </div>`;
  }
  // Related
  const rel = PRODUCTS.filter(x=>x.id!==id&&(x.cat===p.cat||x.sunnah===p.sunnah)).slice(0,4);
  const relGrid = document.getElementById('related-products-grid');
  if (relGrid) relGrid.innerHTML = rel.map(productCard).join('');
  nav('product');
}

let detQty = 1;
function adjDetQty(d){ detQty=Math.max(1,detQty+d); const el=document.getElementById('det-qty'); if(el) el.textContent=detQty; }
function addToCartFromDetail(){ if(currentProduct) addToCart(currentProduct.id, detQty); detQty=1; }
function buyNow(){ addToCartFromDetail(); nav('checkout'); }

/* ===================== CART ===================== */
function addToCart(id, qty=1){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty+=qty; else cart.push({...p,qty});
  updateCartBadge();
  showCartToast(p);
  renderDrawer();
}

function addComboToCart(cid){
  const c = COMBOS.find(x=>x.id===cid);
  if(!c) return;
  // Add first product as proxy for combo
  const p = PRODUCTS[0];
  cart.push({id:'combo-'+cid, name:c.name, price:c.price, img:c.img, qty:1, unit:'১ সেট'});
  updateCartBadge();
  showCartToast(c);
  renderDrawer();
}

function removeFromCart(id){
  cart = cart.filter(c=>c.id!==id);
  updateCartBadge();
  renderDrawer();
  if(currentPage==='cart') renderCartPage();
  updateCheckoutSummary();
}

function changeQty(id, delta){
  const item = cart.find(c=>c.id===id);
  if(!item) return;
  item.qty = Math.max(1, item.qty+delta);
  renderDrawer();
  if(currentPage==='cart') renderCartPage();
  updateCheckoutSummary();
}

function clearCart(){ cart=[];updateCartBadge();renderDrawer(); }

function getSubtotal(){ return cart.reduce((s,c)=>s+c.price*c.qty,0); }
function getDelivery(){ return getSubtotal()>=750?0:60; }
function getTotal(){ return getSubtotal()+getDelivery(); }

function updateCartBadge(){
  const count = cart.reduce((s,c)=>s+c.qty,0);
  ['cart-badge','cart-badge-mobile'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    if(count>0){ el.classList.remove('hidden'); el.textContent=count>9?'9+':count; }
    else el.classList.add('hidden');
  });
  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = `কার্ট ${count.toLocaleString('bn-BD')}`;
}

/* ===================== DRAWER ===================== */
function openCart(){ document.getElementById('cart-drawer').classList.add('open'); document.getElementById('cart-overlay').classList.add('show'); renderDrawer(); }
function closeCart(){ document.getElementById('cart-drawer').classList.remove('open'); document.getElementById('cart-overlay').classList.remove('show'); }

function renderDrawer(){
  const items=document.getElementById('drawer-items');
  const footer=document.getElementById('drawer-footer');
  if(!items) return;
  if(cart.length===0){
    items.innerHTML=`<div class="flex flex-col items-center justify-center h-full text-center py-10">
      <span class="mat text-[64px] text-border-sand">shopping_bag</span>
      <div class="font-garamond font-semibold text-primary text-2xl mt-4">কার্ট খালি</div>
      <p class="text-muted-gray text-sm mt-2">কেনাকাটা শুরু করুন!</p>
      <button onclick="closeCart();nav('shop')" class="btn-primary mt-5">শপ করুন</button>
    </div>`;
    footer.style.display='none';
  } else {
    items.innerHTML = cart.map(item=>`<div class="flex gap-3 py-3 border-b border-border-sand">
      <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0"/>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm text-on-surface truncate">${item.name}</div>
        <div class="text-xs text-muted-gray">${item.unit||''}</div>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center border border-border-sand rounded-full">
            <button class="qty-btn" onclick="changeQty(${JSON.stringify(item.id)},-1)"><span class="mat text-[16px]">remove</span></button>
            <span class="w-8 text-center text-sm font-bold">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${JSON.stringify(item.id)},1)"><span class="mat text-[16px]">add</span></button>
          </div>
          <span class="font-bold text-primary text-sm">৳ ${(item.price*item.qty).toLocaleString('bn-BD')}</span>
        </div>
      </div>
      <button onclick="removeFromCart(${JSON.stringify(item.id)})" class="text-muted-gray hover:text-error transition-colors self-start mt-1"><span class="mat text-[18px]">delete_outline</span></button>
    </div>`).join('');
    footer.style.display='block';
    const subtotalEl = document.getElementById('drawer-subtotal');
    if (subtotalEl) subtotalEl.textContent = `৳ ${getSubtotal().toLocaleString('bn-BD')}`;
    const deliveryEl = document.getElementById('drawer-delivery');
    if (deliveryEl) deliveryEl.textContent = `৳ ${getDelivery()}`;
    const totalEl = document.getElementById('drawer-total');
    if (totalEl) totalEl.textContent = `৳ ${getTotal().toLocaleString('bn-BD')}`;
  }
}

/* ===================== CART PAGE ===================== */
function renderCartPage(){
  const el = document.getElementById('cart-page-content');
  if(!el) return;
  if(cart.length===0){
    el.innerHTML=`<div class="flex-grow flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop py-16 px-6 w-full animate-fade-in">
      <div class="bg-surface-cream rounded-2xl shadow-[0_8px_24px_rgba(31,77,58,0.08)] md:p-16 max-w-2xl w-full text-center flex flex-col items-center border border-border-sand/50 p-6">
        <!-- Illustration / Icon -->
        <div class="w-32 h-32 bg-surface-container-high rounded-full flex items-center justify-center mb-8 shadow-inner relative overflow-hidden shrink-0">
          <span class="material-symbols-outlined text-[64px] text-outline-variant select-none cursor-default" data-icon="shopping_bag" data-weight="fill">shopping_bag</span>
          <!-- Subtle organic decorative elements -->
          <div class="absolute -top-4 -right-4 w-16 h-16 bg-secondary-container rounded-full opacity-50 blur-xl"></div>
          <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-primary-container rounded-full opacity-10 blur-xl"></div>
        </div>
        <!-- Empty State Message -->
        <h2 class="font-headline-md text-headline-md text-primary mb-6 font-bold leading-relaxed max-w-lg mx-auto text-[28px]">
          আপনার কার্ট বর্তমানে খালি আছে
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
          সেরা মূল্যে স্বাস্থ্যকর পণ্যের বান্ডিল এবং অফারগুলো দেখতে আমাদের শপ ভিজিট করুন।
        </p>
        <!-- Call to Action -->
        <button onclick="nav('shop')" class="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-body-md text-body-md font-bold hover:bg-surface-tint transition-all shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">storefront</span>
          কেনাকাটা শুরু করুন
        </button>
        <!-- Suggestion / Helpful Links -->
        <div class="mt-12 pt-8 border-t border-border-sand w-full">
          <p class="font-label-caps text-label-caps text-muted-gray mb-4 uppercase tracking-wider">জনপ্রিয় ক্যাটাগরি</p>
          <div class="flex flex-col md:flex-row flex-wrap justify-center gap-3">
            <button onclick="filterAndNav('মধু')" class="px-4 py-2 bg-surface rounded-full text-primary font-body-sm text-body-sm border border-border-sand hover:border-primary transition-colors text-center cursor-pointer">মধু (Honey)</button>
            <button onclick="filterAndNav('সুপারফুড')" class="px-4 py-2 bg-surface rounded-full text-primary font-body-sm text-body-sm border border-border-sand hover:border-primary transition-colors text-center cursor-pointer">সুপারফুড (Superfood)</button>
            <button onclick="nav('combo')" class="px-4 py-2 bg-surface rounded-full text-primary font-body-sm text-body-sm border border-border-sand hover:border-primary transition-colors text-center cursor-pointer">কম্বো অফার (Combos)</button>
          </div>
        </div>
      </div>
    </div>`;
    return;
  }
  el.innerHTML=`<div class="flex flex-col lg:flex-row gap-8">
    <div class="flex-1 flex flex-col gap-4">
      ${cart.map(item=>`<div class="bg-surface-cream rounded-2xl p-4 border border-border-sand/60 card-shadow flex gap-4 items-center">
        <img src="${item.img}" alt="${item.name}" class="w-20 h-20 md:w-28 md:h-28 rounded-xl object-cover flex-shrink-0"/>
        <div class="flex-1 min-w-0">
          <div class="text-xs text-muted-gray font-semibold uppercase tracking-wider">${item.cat||'পণ্য'}</div>
          <div class="font-garamond font-semibold text-primary text-lg">${item.name}</div>
          <div class="text-xs text-muted-gray">${item.unit||''}</div>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center border border-border-sand rounded-full">
              <button class="qty-btn w-9 h-9" onclick="changeQty(${JSON.stringify(item.id)},-1)"><span class="mat text-[18px]">remove</span></button>
              <span class="w-10 text-center font-bold">${item.qty}</span>
              <button class="qty-btn w-9 h-9" onclick="changeQty(${JSON.stringify(item.id)},1)"><span class="mat text-[18px]">add</span></button>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-bold text-primary text-lg">৳ ${(item.price*item.qty).toLocaleString('bn-BD')}</span>
              <button onclick="removeFromCart(${JSON.stringify(item.id)})" class="text-muted-gray hover:text-error transition-colors"><span class="mat text-[20px]">delete_outline</span></button>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
    <div class="lg:w-80">
      <div class="bg-surface-cream rounded-2xl p-5 border border-border-sand/60 card-shadow sticky top-24">
        <h3 class="font-garamond font-semibold text-primary text-xl mb-4">অর্ডার সারসংক্ষেপ</h3>
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between text-muted-gray"><span>সাবটোটাল</span><span>৳ ${getSubtotal().toLocaleString('bn-BD')}</span></div>
          <div class="flex justify-between text-muted-gray"><span>ডেলিভারি</span><span>৳ ${getDelivery()}</span></div>
          ${getSubtotal()>=750?`<div class="text-xs text-secondary flex items-center gap-1"><span class="mat text-[14px]">local_shipping</span>ঢাকায় ফ্রি ডেলিভারি!</div>`:'<div class="text-xs text-muted-gray">৳ '+Math.max(0,750-getSubtotal())+' টাকার কেনাকাটা করলে ফ্রি ডেলিভারি পাবেন</div>'}
          <div class="flex justify-between font-bold text-primary text-base pt-3 border-t border-border-sand mt-1"><span>মোট</span><span>৳ ${getTotal().toLocaleString('bn-BD')}</span></div>
        </div>
        <button onclick="nav('checkout')" class="btn-primary w-full justify-center mt-4">চেকআউট <span class="mat text-[18px]">arrow_forward</span></button>
        <button onclick="nav('shop')" class="btn-outline w-full justify-center mt-2 text-sm">কেনাকাটা চালিয়ে যান</button>
      </div>
    </div>
  </div>`;
}

/* ===================== CHECKOUT ===================== */
let checkoutStep = 1;

function renderCheckout(){
  if(cart.length===0){ nav('cart');return; }
  checkoutStep=1;
  showStep(1);
  updateCheckoutSummary();
}

function showStep(s){
  checkoutStep=s;
  document.getElementById('checkout-step-1').classList.toggle('hidden',s!==1);
  document.getElementById('checkout-step-1').classList.toggle('flex',s===1);
  document.getElementById('checkout-step-2').classList.toggle('hidden',s!==2);
  document.getElementById('checkout-step-2').classList.toggle('flex',s===2);
  // Update progress dots
  for(let i=1;i<=3;i++){
    const dot=document.getElementById('step-dot-'+i);
    if(!dot) continue;
    if(i<s){ dot.className='progress-dot bg-secondary text-white'; dot.innerHTML='<span class="mat text-[16px]">check</span>'; }
    else if(i===s){ dot.className='progress-dot bg-primary text-white'; dot.textContent=i; }
    else { dot.className='progress-dot bg-surface-container-highest text-muted-gray'; dot.textContent=i; }
  }
}

function updateCheckoutSummary(){
  const list=document.getElementById('checkout-items-list');
  if(list) list.innerHTML=cart.map(i=>`<div class="flex items-center gap-3"><img src="${i.img}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0"/><div class="flex-1 min-w-0"><div class="text-sm font-semibold text-on-surface truncate">${i.name}</div><div class="text-xs text-muted-gray">×${i.qty}</div></div><span class="font-bold text-sm text-primary">৳ ${(i.price*i.qty).toLocaleString('bn-BD')}</span></div>`).join('');
  const sub=getSubtotal(), del=getDelivery(), tot=getTotal();
  const f=n=>`৳ ${n.toLocaleString('bn-BD')}`;
  setEl('co-subtotal',f(sub));
  setEl('co-delivery','৳ '+del);
  setEl('co-total',f(tot));
}

function setEl(id,v){ const e=document.getElementById(id); if(e) e.textContent=v; }

function goToPaymentStep(){
  const name=document.getElementById('co-name')?.value.trim();
  const phone=document.getElementById('co-phone')?.value.trim();
  const address=document.getElementById('co-address')?.value.trim();
  const city=document.getElementById('co-city')?.value;
  if(!name){showToast('নাম লিখুন','error');return;}
  if(!phone||phone.length<10){showToast('সঠিক মোবাইল নম্বর দিন','error');return;}
  if(!address){showToast('ঠিকানা লিখুন','error');return;}
  if(!city){showToast('শহর নির্বাচন করুন','error');return;}
  orderInfo = {name,phone,address,city,area:document.getElementById('co-area')?.value||'',note:document.getElementById('co-note')?.value||''};
  showStep(2);
}

function backToDeliveryStep(){ showStep(1); }

async function placeOrder(){
  const payEl = document.querySelector('input[name="pay"]:checked');
  const payment = payEl?payEl.value:'cod';
  const orderId = 'PO-'+Math.floor(100000+Math.random()*900000);
  const order = {id:orderId,items:[...cart],info:{...orderInfo},payment,total:getTotal(),subtotal:getSubtotal(),date:new Date()};

  // Show loading state on button
  const btn = document.querySelector('#checkout-step-2 .btn-primary');
  const originalBtnHtml = btn ? btn.innerHTML : 'অর্ডার সম্পন্ন করুন';
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="mat text-[18px]">hourglass_top</span> সেভ হচ্ছে...'; }

  // Try to save order to Firestore via backend
  try {
    const cartItems = cart.map(i=>({
      productId: String(i.id),
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.qty)
    }));

    let paymentMethod = "COD";
    if (payment && payment.toLowerCase() === "bkash") paymentMethod = "Bkash";
    else if (payment && payment.toLowerCase() === "nagad") paymentMethod = "Nagad";

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        customerName: orderInfo.name,
        phone: orderInfo.phone,
        address: orderInfo.address,
        area: orderInfo.area,
        city: orderInfo.city,
        note: orderInfo.note,
        customerInfo: {
          name: orderInfo.name,
          phone: orderInfo.phone,
          address: `${orderInfo.address}, ${orderInfo.area || ''}`.trim(),
          city: orderInfo.city
        },
        items: cartItems,
        payment,
        paymentMethod: paymentMethod,
        subtotal: getSubtotal(),
        deliveryCharge: getDelivery(),
        total: getTotal(),
        totalAmount: getTotal()
      })
    });
    if(!res.ok) {
      const errText = await res.text();
      console.error('Failed to save order to DB:', errText);
      throw new Error('Server error: ' + errText);
    }
    const resData = await res.json();
    if (resData && resData.orderId) {
      order.id = resData.orderId;
    }
  } catch(err) {
    console.warn('Could not save order to database:', err.message);
    showToast('অর্ডার সাবমিট করতে সমস্যা হয়েছে, দয়া করে আবার চেষ্টা করুন।', 'error');
    if(btn){ btn.disabled=false; btn.innerHTML=originalBtnHtml; }
    return;
  }

  showStep(3);
  placedOrders.unshift(order);
  localStorage.setItem('po_orders', JSON.stringify(placedOrders));
  renderSuccess(order);
  cart=[];
  updateCartBadge();
  nav('success');

  // Reset button state for any subsequent purchases
  if(btn){ btn.disabled=false; btn.innerHTML=originalBtnHtml; }
}

function renderSuccess(order){
  setEl('success-order-id','#'+order.id);
  const list=document.getElementById('success-items-list');
  if(list) list.innerHTML=order.items.map(i=>`<div class="flex justify-between text-sm"><span class="text-muted-gray">${i.name} ×${i.qty}</span><span class="font-semibold text-on-surface">৳ ${(i.price*i.qty).toLocaleString('bn-BD')}</span></div>`).join('');
  setEl('success-subtotal',`৳ ${order.subtotal.toLocaleString('bn-BD')}`);
  setEl('success-total',`৳ ${order.total.toLocaleString('bn-BD')}`);
  const addr=document.getElementById('success-address');
  if(addr) addr.textContent=`${order.info.name} • ${order.info.phone}\n${order.info.address}, ${order.info.area}, ${order.info.city}`;
}

/* ===================== ORDER TRACKING ===================== */
function trackOrder(){
  const val = document.getElementById('track-input')?.value.trim();
  if(!val){ showToast('অর্ডার আইডি লিখুন','error'); return; }
  const found = placedOrders.find(o=>o.id===val||val==='PO-123456');
  document.getElementById('tracking-result').classList.remove('hidden');
  document.getElementById('track-order-id').textContent = '#'+(found?found.id:val);
  document.getElementById('track-status-badge').textContent = found?'প্রক্রিয়াধীন':'নিশ্চিত';
  showToast('অর্ডার তথ্য পাওয়া গেছে','location_on');
}

/* ===================== ACCOUNT ===================== */
function renderAccount(){
  const orders = placedOrders;
  const list = document.getElementById('account-orders-list');
  if(!list) return;
  if(orders.length===0){
    list.innerHTML=`<div class="text-center py-8"><span class="mat text-[48px] text-border-sand">receipt_long</span><p class="text-muted-gray text-sm mt-3">এখনো কোনো অর্ডার নেই।</p><button onclick="nav('shop')" class="btn-primary mt-4">কেনাকাটা শুরু করুন</button></div>`;
  } else {
    list.innerHTML=orders.map(o=>`<div class="border border-border-sand rounded-xl p-4 mb-3 flex items-center justify-between gap-3">
      <div><div class="font-semibold text-sm text-on-surface">#${o.id}</div><div class="text-xs text-muted-gray mt-0.5">${o.items.length}টি পণ্য • ৳ ${o.total.toLocaleString('bn-BD')}</div></div>
      <div class="flex items-center gap-2"><span class="badge bg-secondary-container text-on-secondary-container">প্রক্রিয়াধীন</span><button onclick="nav('tracking');document.getElementById('track-input').value='${o.id}';trackOrder()" class="text-primary hover:underline text-xs font-semibold">ট্র্যাক করুন</button></div>
    </div>`).join('');
  }
}

function showAccountTab(tab){
  ['orders','profile','addresses'].forEach(t=>{
    const panel = document.getElementById('account-tab-'+t);
    if (panel) panel.classList.toggle('hidden', t !== tab);
  });
  document.querySelectorAll('.account-tab-btn').forEach(b=>{
    const active = b.dataset.tab === tab;
    b.classList.toggle('text-primary', active);
    b.classList.toggle('bg-surface-container-low', active);
    b.classList.toggle('text-muted-gray', !active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

/* ===================== LOGIN ===================== */
function loginUser(){
  const phone=document.getElementById('login-phone')?.value.trim();
  const pass=document.getElementById('login-pass')?.value.trim();
  if(!phone||!pass){ showToast('নম্বর ও পাসওয়ার্ড দিন','error'); return; }
  document.getElementById('otp-phone-display').textContent=phone;
  nav('otp');
  startOtpTimer();
}

function signInWithGoogle() {
  showToast('গুগল লগইন শীঘ্রই আসছে', 'info');
}

function logoutGoogle() {
  showToast('লগআউট সফল', 'check_circle');
  const accName = document.getElementById('account-name');
  if (accName) accName.textContent = 'অতিথি';
  const accPhone = document.getElementById('account-phone');
  if (accPhone) accPhone.textContent = 'লগইন করুন';
  nav('home');
}

function togglePass(id){ const el=document.getElementById(id); if(el) el.type=el.type==='password'?'text':'password'; }
function toggleMobileMenu(){
  const m   = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  const willOpen = m.classList.contains('hidden');
  m.classList.toggle('hidden', !willOpen);
  m.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
  if (btn) btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  document.getElementById('menu-icon').textContent = willOpen ? 'close' : 'menu';
}
function toggleSearch(){ showToast('সার্চ ফিচার শীঘ্রই আসছে','search'); }

/* ===================== OTP ===================== */
let otpTimer;
function startOtpTimer(){
  let secs=300;
  clearInterval(otpTimer);
  otpTimer=setInterval(()=>{
    secs--;
    const el=document.getElementById('otp-countdown');
    if(el) el.textContent=Math.floor(secs/60)+':'+(secs%60).toString().padStart(2,'0');
    if(secs<=0){ clearInterval(otpTimer); if(el) el.textContent='মেয়াদ শেষ'; }
  },1000);
}

function otpMove(el, idx){
  if(el.value.length===1){
    const inputs=document.querySelectorAll('.otp-input');
    if(idx<5) inputs[idx+1].focus();
  }
}

function verifyOtp(){
  const inputs=[...document.querySelectorAll('.otp-input')].map(i=>i.value);
  if(inputs.some(v=>!v)){ showToast('সম্পূর্ণ কোড দিন','error'); return; }
  clearInterval(otpTimer);
  showToast('লগইন সফল!','check_circle');
  const accName = document.getElementById('account-name');
  if (accName) accName.textContent='ফারহান আহমেদ';
  const accPhone = document.getElementById('account-phone');
  if (accPhone) accPhone.textContent='01712-345678';
  nav('account');
}

function resendOtp(){ showToast('নতুন কোড পাঠানো হয়েছে','send'); startOtpTimer(); }

/* ===================== TOAST & CART MODALS ===================== */
let toastTimeout;
function showToast(msg, icon='check_circle'){
  const t=document.getElementById('toast');
  const im=document.getElementById('toast-icon');
  const tm=document.getElementById('toast-msg');
  if(!t) return;
  if(im) im.textContent=icon;
  if(tm) tm.textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>t.classList.remove('show'),2800);
}

let cartToastTimeout;
window.showCartToast = function(item){
  // Fill data for desktop
  const dImg = document.getElementById('desktop-toast-img');
  const dName = document.getElementById('desktop-toast-name');
  const dPrice = document.getElementById('desktop-toast-price');
  if(dImg) dImg.src = item.img || '';
  if(dName) dName.textContent = item.name || '';
  if(dPrice) dPrice.textContent = '৳ ' + (item.price || 0).toLocaleString('bn-BD');

  // Fill data for mobile
  const mImg = document.getElementById('mobile-toast-img');
  const mName = document.getElementById('mobile-toast-name');
  const mPrice = document.getElementById('mobile-toast-price');
  if(mImg) mImg.src = item.img || '';
  if(mName) mName.textContent = item.name || '';
  if(mPrice) mPrice.textContent = '৳ ' + (item.price || 0).toLocaleString('bn-BD');

  // Show both
  const dToast = document.getElementById('desktop-toast');
  const mToast = document.getElementById('mobile-toast');
  const mOverlay = document.getElementById('mobile-toast-overlay');

  if(dToast) {
    dToast.classList.remove('opacity-0', 'pointer-events-none');
    dToast.classList.add('opacity-100');
    const dCard = document.getElementById('desktop-toast-card');
    if(dCard) {
      dCard.classList.remove('translate-y-4');
      dCard.classList.add('translate-y-0');
    }
  }

  if(mToast && mOverlay) {
    mOverlay.classList.remove('opacity-0', 'pointer-events-none');
    mOverlay.classList.add('opacity-100', 'pointer-events-auto');
    mToast.classList.remove('translate-y-full');
    mToast.classList.add('translate-y-0');
  }

  clearTimeout(cartToastTimeout);
  cartToastTimeout = setTimeout(hideToast, 4000);
};

window.hideToast = function(){
  const dToast = document.getElementById('desktop-toast');
  const mToast = document.getElementById('mobile-toast');
  const mOverlay = document.getElementById('mobile-toast-overlay');

  if(dToast) {
    dToast.classList.remove('opacity-100');
    dToast.classList.add('opacity-0', 'pointer-events-none');
    const dCard = document.getElementById('desktop-toast-card');
    if(dCard) {
      dCard.classList.remove('translate-y-0');
      dCard.classList.add('translate-y-4');
    }
  }

  if(mToast && mOverlay) {
    mOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    mOverlay.classList.add('opacity-0', 'pointer-events-none');
    mToast.classList.remove('translate-y-0');
    mToast.classList.add('translate-y-full');
  }
};

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', async ()=>{
  renderHomeProducts(); // show spinner first
  navFromHash();

  // Populate stat counters from SITE_STATS (issue #5 – single source of truth)
  const statMap = { customers: SITE_STATS.customers, organic: SITE_STATS.organicPct, delivery: SITE_STATS.deliveryHr };
  Object.entries(statMap).forEach(([key, val]) => {
    const el = document.getElementById('stat-' + key);
    if (el) el.textContent = val;
  });

  // Fetch products from Firestore backend
  try {
    const res = await fetch('/api/products');
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data) && data.length > 0){
        // Map Firestore product fields to the shape the UI expects
        const mapped = data.map((p, i) => ({
          id: p.id || (i+1),
          name: p.name || 'পণ্য',
          nameEn: p.nameEn || p.name || '',
          cat: p.category || p.cat || 'অন্যান্য',
          tag: p.tag || '',
          price: Number(p.price) || 0,
          origPrice: p.origPrice ? Number(p.origPrice) : null,
          unit: p.unit || '',
          desc: p.desc || p.description || '',
          benefits: Array.isArray(p.benefits) ? p.benefits : [],
          img: p.image || p.img || '',
          rating: Number(p.rating) || 4.5,
          reviews: Number(p.reviews) || 0,
          sunnah: p.sunnah || p.cat === 'সুন্নাহ' || false
        }));
        PRODUCTS = mapped;
      }
    }
  } catch(err) {
    console.warn('Could not load products from backend, using local data:', err.message);
  }

  // Re-render with fresh data (or keep local fallback)
  renderHomeProducts();
  const page = location.hash.replace('#','') || 'home';
  if(page==='shop') renderShop();
  if(page==='sunnah') renderSunnah();
});

window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  if(!menu) return;
  const isHidden = menu.classList.contains('hidden');
  if(isHidden) {
    menu.classList.remove('hidden');
    if(icon) icon.textContent = 'close';
  } else {
    menu.classList.add('hidden');
    if(icon) icon.textContent = 'menu';
  }
};

window.toggleSearch = function() {
  nav('shop');
  setTimeout(() => {
    const sInput = document.getElementById('shop-search-input');
    if(sInput) sInput.focus();
  }, 100);
};
