// Direction D — Hybrid: editorial story-led × action-grid utility
// Combines A's serif editorial hero, magazine story, departments grid, marquee
// with B's action tiles, "I am a..." doors, visit-info bento, dark research panel.

(function () {
  const I = window.DNH_I18N;

  const HIcon = {
    arrow: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
    search: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="11" cy="11" r="6" /><path d="M20 20l-4-4" />
      </svg>
    ),
    pin: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/>
      </svg>
    ),
    plus: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    ),
    bell: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 004 0"/>
      </svg>
    ),
    dot: (p) => <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background: p.color||'currentColor'}} />
  };

  const langPillH = {appearance:'none', border:0, background:'transparent', color:'rgba(255,255,255,.7)', font:'500 11px/1 var(--dnh-sans-en)', padding:'6px 10px', borderRadius:999, cursor:'pointer'};
  const langOnH = {background:'#fff', color:'var(--dnh-deep)'};
  const monoH = {font:'500 9.5px/1 var(--dnh-mono)', color:'var(--dnh-primary)', letterSpacing:'0.10em', marginBottom:6, textTransform:'uppercase'};

  function Header({lang, setLang}) {
    const u = I.utility[lang], n = I.nav[lang], b = I.brand[lang], cta = I.cta[lang];
    return (
      <header>
        {/* Utility ribbon — A's structure with B's emergency pill */}
        <div style={{background:'var(--dnh-deep)', color:'rgba(255,255,255,.78)', fontSize:12, lineHeight:1}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'10px 40px', display:'flex', alignItems:'center', gap:24}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:8, color:'#fff', background:'var(--dnh-emergency)', padding:'5px 10px', borderRadius:3, fontWeight:600}}>{u[0]}</span>
            <nav style={{display:'flex', gap:18}}>
              {u.slice(1).map((x,i)=> <a key={i} href="#" style={{color:'rgba(255,255,255,.85)', textDecoration:'none'}}>{x}</a>)}
            </nav>
            <span style={{marginLeft:'auto', display:'flex', gap:14, alignItems:'center'}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, opacity:.78}}><HIcon.bell s={13}/> {lang==='en'?'2 alerts':'२ सूचनाएँ'}</span>
              <span style={{display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,.10)', borderRadius:999, padding:2}}>
                <button onClick={()=>setLang('en')} style={{...langPillH, ...(lang==='en'?langOnH:{})}}>EN</button>
                <button onClick={()=>setLang('hi')} style={{...langPillH, ...(lang==='hi'?langOnH:{})}}>हिं</button>
              </span>
            </span>
          </div>
        </div>
        {/* Main nav — A's logo + serif treatment */}
        <div style={{background:'var(--dnh-paper)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'20px 40px', display:'flex', alignItems:'center', gap:32}}>
            <a className="dnh-logo" href="#">
              <span className="dnh-logo-mark">द</span>
              <span className="dnh-logo-text">
                <span className="l1">{b.name}</span>
                <span className="l2">{lang==='en'?'Hospital · Medical College · Research':'अस्पताल · मेडिकल कॉलेज · अनुसंधान'}</span>
              </span>
            </a>
            <nav style={{display:'flex', gap:24, marginLeft:24}}>
              {n.map((x,i)=>(
                <a key={i} href="#" style={{color:'var(--dnh-ink)', textDecoration:'none', fontSize:14, fontWeight:500, paddingBottom:6, ...(i===0?{borderBottom:'2px solid var(--dnh-deep)'}:{})}}>{x}</a>
              ))}
            </nav>
            <div style={{marginLeft:'auto', display:'flex', gap:10, alignItems:'center'}}>
              <button className="dnh-btn dnh-btn--ghost" style={{padding:'10px 14px'}}><HIcon.search/> {cta.findDoc}</button>
              <button className="dnh-btn dnh-btn--primary"><HIcon.plus/> {cta.book}</button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Hero — A's split editorial layout
  function Hero({lang}) {
    const h = I.hero[lang], cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper)', paddingTop:64, paddingBottom:0}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:56, alignItems:'end', minHeight:540}}>
          <div style={{paddingBottom:64}}>
            <div className="dnh-tag" style={{marginBottom:28}}><HIcon.dot color="var(--dnh-primary)"/>{h.eyebrow}</div>
            <h1 className="dnh-serif" style={{fontSize:72, lineHeight:1.02, letterSpacing:'-0.02em', fontWeight:400, margin:'0 0 28px', color:'var(--dnh-ink)', textWrap:'balance'}}>
              {h.title}
            </h1>
            <p style={{fontSize:18, lineHeight:1.55, maxWidth:520, color:'var(--dnh-ink-soft)', margin:'0 0 28px'}}>{h.sub}</p>
            <div style={{display:'flex', gap:32, fontSize:11, color:'var(--dnh-ink-soft)', textTransform:'uppercase', letterSpacing:'0.10em'}}>
              <span>NABH · NABL accredited</span>
              <span>JCI-aligned protocols</span>
            </div>
          </div>
          <div style={{position:'relative', height:540, marginRight:-40}}>
            <div className="dnh-img dark" style={{position:'absolute', inset:0, borderRadius:'4px 0 0 4px'}}>
              <div className="dnh-img-label">{h.photoLabel}</div>
            </div>
            <div style={{position:'absolute', left:-32, top:32, background:'var(--dnh-paper)', padding:'14px 18px', border:'1px solid var(--dnh-line-soft)', maxWidth:260, fontSize:12, lineHeight:1.5, color:'var(--dnh-ink-soft)'}}>
              <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--dnh-primary)', marginBottom:6}}>NOW · {lang==='en'?'live':'अभी'}</div>
              {lang==='en'
                ? <>3 surgeries in progress · <strong>14 beds</strong> available in General ICU · ER wait <strong>~6 min</strong></>
                : <>३ शल्य चल रहे · सामान्य आईसीयू में <strong>१४ बिस्तर</strong> उपलब्ध · ईआर प्रतीक्षा <strong>~६ मि</strong></>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Action tiles strip — B's hero tiles, compressed and slid under A's hero
  function ActionStrip({lang}) {
    const a = I.actions[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'40px 0 0'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, border:'1px solid var(--dnh-line-soft)', background:'#fff', borderRadius:6, overflow:'hidden', boxShadow:'0 16px 40px -24px rgba(14,31,34,.25)'}}>
            {a.map((x, i)=>(
              <a key={i} href="#" style={{
                display:'block', padding:'24px 24px 22px', position:'relative', minHeight:184, textDecoration:'none',
                borderRight: i<3 ? '1px solid var(--dnh-line-soft)' : 'none',
                background: i===0 ? 'var(--dnh-emergency)' : i===2 ? 'var(--dnh-deep)' : '#fff',
                color: (i===0 || i===2) ? '#fff' : 'var(--dnh-ink)'
              }}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', opacity: (i===0||i===2)?.85:.6, marginBottom:18, textTransform:'uppercase'}}>0{i+1} / {lang==='en'?'GET STARTED':'शुरू करें'}</div>
                <div style={{fontSize:24, fontWeight:600, lineHeight:1.05, marginBottom:10, letterSpacing:'-0.01em'}}>{x.t}</div>
                <div style={{fontSize:13, lineHeight:1.45, opacity:(i===0||i===2)?.85:.7, marginBottom:14}}>{x.s}</div>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.06em', opacity:.7, paddingTop:14, borderTop:'1px solid '+((i===0||i===2)?'rgba(255,255,255,.18)':'var(--dnh-line-soft)')}}>{x.tag}</div>
                <span style={{position:'absolute', right:18, top:20}}><HIcon.arrow s={16}/></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function FindDoctor({lang}) {
    const cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'24px 0 0'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{background:'var(--dnh-white)', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'8px 10px', display:'grid', gridTemplateColumns:'auto 1.5fr 1fr 1fr auto', alignItems:'stretch'}}>
            <div style={{display:'flex', alignItems:'center', padding:'12px 14px', color:'var(--dnh-primary)', borderRight:'1px solid var(--dnh-line-soft)'}}><HIcon.search s={18}/></div>
            <div style={{padding:'8px 14px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={monoH}>{lang==='en'?'CONDITION OR SPECIALTY':'रोग या विशेषज्ञता'}</div>
              <div style={{fontSize:14, color:'var(--dnh-ink-soft)'}}>{cta.search}</div>
            </div>
            <div style={{padding:'8px 14px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={monoH}>{lang==='en'?'LOCATION':'स्थान'}</div>
              <div style={{fontSize:14}}>{lang==='en'?'Hapur · Main campus':'हापुड़ · मुख्य परिसर'}</div>
            </div>
            <div style={{padding:'8px 14px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={monoH}>{lang==='en'?'WHEN':'कब'}</div>
              <div style={{fontSize:14}}>{lang==='en'?'Earliest available':'जल्द से जल्द'}</div>
            </div>
            <button className="dnh-btn dnh-btn--primary dnh-btn--sq" style={{margin:6, padding:'0 22px'}}>{cta.findDoc}</button>
          </div>
          <div style={{display:'flex', gap:18, marginTop:14, fontSize:12, color:'var(--dnh-ink-soft)', alignItems:'center'}}>
            <span>{lang==='en'?'Popular:':'लोकप्रिय:'}</span>
            {(lang==='en'
              ? ['Cardiology','Knee replacement','Pregnancy care','Diabetes','Cataract','Stroke']
              : ['हृदय रोग','घुटना प्रत्यारोपण','गर्भावस्था','मधुमेह','मोतियाबिंद','पक्षाघात']
            ).map((x,i)=>(<a key={i} href="#" className="dnh-link" style={{borderBottomStyle:'dotted'}}>{x}</a>))}
          </div>
        </div>
      </section>
    );
  }

  function Ticker({lang}) {
    const items = lang==='en'
      ? ['ALERT · Free cataract screening camp · Bulandshahr · May 11', 'OPENING · 24-station haemodialysis unit · Block C', 'GRAND ROUNDS · Friday 07:30 · Auditorium A · Open to all', 'RESEARCH · Two-drug stroke trial published in Lancet SE Asia']
      : ['सूचना · निःशुल्क मोतियाबिंद शिविर · बुलंदशहर · ११ मई', 'उद्घाटन · २४-स्टेशन हीमोडायलिसिस इकाई · ब्लॉक सी', 'ग्रैंड राउंड · शुक्रवार ०७:३० · ऑडिटोरियम ए · सभी आमंत्रित', 'अनुसंधान · दो-दवा पक्षाघात अध्ययन Lancet SE Asia में प्रकाशित'];
    const all = [...items, ...items];
    return (
      <div style={{background:'var(--dnh-deep)', color:'#fff', overflow:'hidden', marginTop:64}}>
        <div className="dnh-marquee-track" style={{padding:'14px 0'}}>
          {all.map((x,i)=>(
            <span key={i} style={{display:'inline-flex', alignItems:'center', gap:14, fontSize:13}}>
              <HIcon.dot color="var(--dnh-accent)"/>
              <span style={{whiteSpace:'nowrap'}}>{x}</span>
              <span style={{opacity:.4, marginLeft:32}}>◆</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  function FeaturedStory({lang}) {
    const s = I.story[lang], cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'104px 0'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'center'}}>
          <div className="dnh-img" style={{aspectRatio:'4 / 5', height:580}}>
            <div className="dnh-img-label">EDITORIAL · 06:42 IST · ICU CORRIDOR · DAY ONE OF FOLLOW</div>
          </div>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:24}}>{s.kicker}</div>
            <h2 className="dnh-serif" style={{fontSize:50, lineHeight:1.05, letterSpacing:'-0.015em', fontWeight:400, margin:'0 0 24px'}}>{s.title}</h2>
            <p style={{fontSize:17, lineHeight:1.6, color:'var(--dnh-ink-soft)', margin:'0 0 24px'}}>{s.dek}</p>
            <p className="dnh-mono" style={{fontSize:11, letterSpacing:'0.06em', color:'var(--dnh-ink-soft)', textTransform:'uppercase', margin:'0 0 28px'}}>{s.byline}</p>
            <button className="dnh-btn dnh-btn--ghost">{cta.more} <HIcon.arrow/></button>
          </div>
        </div>
      </section>
    );
  }

  // Photo strip — replaces dense "I am a" doors with editorial photography
  function PhotoStrip({lang}) {
    const captions = lang==='en' ? [
      ['No. 04 / Pediatrics', 'A morning round in the pediatric ward. The hospital admits 14,000 children every year.'],
      ['No. 12 / Cardiology', 'Cath-lab two, before the first case. DNH performs 1,800 angioplasties annually.'],
      ['No. 19 / Hapur grounds', 'The cloister between the old block and the new tower, planted in 1958.']
    ] : [
      ['क्र. ०४ / बाल चिकित्सा', 'बाल वार्ड में सुबह का राउंड। प्रति वर्ष १४,००० बच्चों का उपचार।'],
      ['क्र. १२ / हृदय विज्ञान', 'कैथ-लैब दो, पहले मामले से पहले। प्रति वर्ष १,८०० एंजियोप्लास्टी।'],
      ['क्र. १९ / हापुड़ परिसर', 'पुराने और नए ब्लॉक के बीच का प्रांगण, १९५८ में लगाया गया।']
    ];
    const photos = [
      {bg:'radial-gradient(110% 80% at 30% 30%, #d9c9a8, #8a7355 60%, #4a3a28 100%)', glyph:'pediatrics'},
      {bg:'radial-gradient(120% 90% at 70% 40%, #b8c8c8, #5a7a82 55%, #1d3438 100%)', glyph:'catheter'},
      {bg:'radial-gradient(120% 90% at 50% 70%, #c8b89a, #7a8868 50%, #2e3a28 100%)', glyph:'courtyard'}
    ];
    return (
      <section style={{padding:'104px 0', background:'var(--dnh-paper-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:36, gap:48}}>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)'}}>{lang==='en'?'PORTFOLIO — A WEEK INSIDE DNH':'चित्रावली — डीएनएच में एक सप्ताह'}</div>
            <a href="#" className="dnh-link" style={{whiteSpace:'nowrap'}}>{lang==='en'?'See full photo essay':'संपूर्ण चित्र निबंध'} →</a>
          </div>
          <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:'0 0 44px', letterSpacing:'-0.015em', maxWidth:780}}>{lang==='en'?'A hospital is, before everything else, a place.':'अस्पताल सबसे पहले एक स्थान है।'}</h2>
          <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr', gap:18}}>
            {photos.map((p, i) => (
              <figure key={i} style={{margin:0}}>
                <div style={{aspectRatio: i===0 ? '4/3' : '3/4', background: p.bg, borderRadius:4, position:'relative', overflow:'hidden'}}>
                  <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.35))'}}/>
                  <div style={{position:'absolute', left:18, bottom:14, color:'rgba(255,255,255,.85)', font:'500 10px/1 var(--dnh-mono)', letterSpacing:'0.14em'}}>{captions[i][0].toUpperCase()}</div>
                </div>
                <figcaption style={{marginTop:14, fontSize:13.5, color:'var(--dnh-ink-soft)', lineHeight:1.55, paddingRight:8}}>{captions[i][1]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // I-am-a doors from B (kept available for ref but no longer rendered in Hybrid main flow)
  function IAm({lang}) {
    const items = lang==='en'
      ? [
          ['Patient & family', 'Appointments, reports, billing, visiting hours, insurance.'],
          ['Medical student', 'MBBS curriculum, library, hostels, clinical rotations, faculty.'],
          ['Postgraduate / fellow', 'PG seats, thesis support, fellowships, faculty mentors.'],
          ['Researcher', 'Active trials, IRB, biobank, faculty leads, funding.'],
          ['Donor / alumnus', 'Giving programs, alumni network, impact reports.'],
          ['Health worker / referrer', 'PHC referrals, tele-OPD, district network, training.']
        ]
      : [
          ['रोगी एवं परिजन', 'अपॉइंटमेंट, रिपोर्ट, बिल, मिलने का समय, बीमा।'],
          ['एमबीबीएस छात्र', 'पाठ्यक्रम, पुस्तकालय, छात्रावास, क्लीनिकल रोटेशन, शिक्षकगण।'],
          ['पीजी / फेलो', 'पीजी सीटें, थीसिस सहायता, फेलोशिप, मार्गदर्शक।'],
          ['अनुसंधानकर्ता', 'सक्रिय अध्ययन, आईआरबी, बायोबैंक, शोध दल, वित्तपोषण।'],
          ['दानदाता / पूर्व छात्र', 'दान कार्यक्रम, पूर्व छात्र संघ, प्रभाव रिपोर्ट।'],
          ['स्वास्थ्य कार्यकर्ता / रेफर करने वाले', 'पीएचसी रेफरल, टेली-ओपीडी, ज़िला नेटवर्क, प्रशिक्षण।']
        ];
    return (
      <section style={{padding:'104px 0', background:'var(--dnh-paper-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:36, gap:48}}>
            <div>
              <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:18}}>{lang==='en'?'I AM A …':'मैं हूँ …'}</div>
              <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em', maxWidth:760}}>{lang==='en'?'Six doors into Dev Nandini. Pick yours.':'देव नंदिनी में प्रवेश के छह द्वार। अपना चुनें।'}</h2>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
            {items.map(([t, s], i)=>(
              <a key={i} href="#" style={{display:'block', padding:'24px 22px', background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:6, textDecoration:'none', color:'inherit', position:'relative', minHeight:148}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:12, textTransform:'uppercase'}}>0{i+1}</div>
                <div style={{fontSize:18, fontWeight:600, marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.5, paddingRight:24}}>{s}</div>
                <span style={{position:'absolute', right:16, bottom:16, color:'var(--dnh-primary)'}}><HIcon.arrow s={16}/></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Departments — A's hover grid
  function Departments({lang}) {
    const list = I.departments[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'104px 0', borderTop:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:40, gap:48}}>
            <div>
              <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'CARE — 28 SPECIALTIES':'सेवाएँ — २८ विशेषज्ञताएँ'}</div>
              <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>
                {lang==='en'?'Where would you like to start?':'आप कहाँ से शुरू करना चाहेंगे?'}
              </h2>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              {(lang==='en'?['All','Surgical','Medical','Diagnostic']:['सभी','शल्य','चिकित्सकीय','निदान']).map((c,i)=>(
                <button key={i} style={{appearance:'none', border:'1px solid var(--dnh-line-soft)', background:i===0?'var(--dnh-deep)':'#fff', color:i===0?'#fff':'var(--dnh-ink-soft)', padding:'8px 14px', borderRadius:999, font:'500 12px var(--dnh-sans)', cursor:'pointer'}}>{c}</button>
              ))}
              <a href="#" className="dnh-link" style={{whiteSpace:'nowrap', marginLeft:12}}>{I.cta[lang].all} →</a>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', borderTop:'1px solid var(--dnh-line-soft)', borderLeft:'1px solid var(--dnh-line-soft)'}}>
            {list.map(([t, s], i) => (
              <a key={i} href="#" style={{display:'block', padding:'28px 24px', borderRight:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)', textDecoration:'none', color:'inherit', minHeight:160, position:'relative', transition:'background .2s'}} onMouseOver={(e)=>e.currentTarget.style.background='var(--dnh-paper)'} onMouseOut={(e)=>e.currentTarget.style.background='transparent'}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:14}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{fontSize:17, fontWeight:600, lineHeight:1.2, marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.4}}>{s}</div>
                <span style={{position:'absolute', right:16, bottom:16, color:'var(--dnh-primary)'}}><HIcon.arrow s={16}/></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Stats — A's serif treatment on dark
  function Stats({lang}) {
    const list = I.stats[lang];
    return (
      <section style={{background:'var(--dnh-deep)', color:'#fff', padding:'72px 0'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:24}}>
          {list.map(([n, l], i)=>(
            <div key={i} style={{borderLeft:'1px solid rgba(255,255,255,.18)', paddingLeft:18}}>
              <div className="dnh-serif" style={{fontSize:42, lineHeight:1, fontWeight:400, marginBottom:12, letterSpacing:'-0.01em'}}>{n}</div>
              <div style={{fontSize:12, opacity:.75, lineHeight:1.4}}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Visit visual — photo-led, simpler than the bento
  function VisitVisual({lang}) {
    const items = lang==='en' ? [
      ['Visiting hours', 'Wards 16:00–19:00 · ICU 12:00 & 18:30 · NICU on request'],
      ['Cashless insurance', '38 networks — CGHS, ECHS, Star, HDFC Ergo, Bajaj Allianz'],
      ['International patients', 'Visa support · airport pick-up · 14-language coordinators'],
      ['How to reach', '38 km from Ghaziabad · NH-9 · free shuttle from Hapur Junction']
    ] : [
      ['मिलने का समय', 'वार्ड १६:००–१९:०० · आईसीयू १२:०० व १८:३० · एनआईसीयू निवेदन पर'],
      ['कैशलेस बीमा', '३८ नेटवर्क — CGHS, ECHS, Star, HDFC Ergo, Bajaj Allianz'],
      ['अंतरराष्ट्रीय रोगी', 'वीज़ा सहायता · हवाई अड्डा सेवा · १४ भाषा समन्वयक'],
      ['कैसे पहुँचें', 'गाज़ियाबाद से ३८ किमी · NH-9 · हापुड़ जं. से निःशुल्क शटल']
    ];
    return (
      <section style={{padding:'104px 0', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:64, alignItems:'stretch'}}>
          <div style={{aspectRatio:'4/5', background:'linear-gradient(155deg, #b3a283 0%, #6e5d44 45%, #2c2418 100%)', borderRadius:4, position:'relative', overflow:'hidden', minHeight:520}}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(60% 50% at 30% 30%, rgba(255,240,210,.25), transparent 60%)'}}/>
            <div style={{position:'absolute', left:24, top:24, color:'rgba(255,255,255,.78)', font:'500 10px/1 var(--dnh-mono)', letterSpacing:'0.14em'}}>EXTERIOR · WEST WING · 06:42</div>
            <div style={{position:'absolute', left:24, bottom:24, right:24, color:'rgba(255,255,255,.92)'}}>
              <div className="dnh-serif" style={{fontSize:30, lineHeight:1.1, fontWeight:400, letterSpacing:'-0.01em', maxWidth:380}}>{lang==='en'?'Open at the hour the city wakes.':'जब शहर जागता है, हम खुले होते हैं।'}</div>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'PLAN YOUR VISIT':'अपनी यात्रा'}</div>
            <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1.05, fontWeight:400, margin:'0 0 28px', letterSpacing:'-0.015em'}}>{lang==='en'?'Everything you need before you arrive.':'पहुँचने से पहले की हर जानकारी।'}</h2>
            <div style={{borderTop:'1px solid var(--dnh-line-soft)'}}>
              {items.map(([t,s], i)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'180px 1fr', gap:24, padding:'20px 0', borderBottom:'1px solid var(--dnh-line-soft)'}}>
                  <div style={{fontSize:14, fontWeight:600, letterSpacing:'-0.005em'}}>{t}</div>
                  <div style={{fontSize:14, color:'var(--dnh-ink-soft)', lineHeight:1.5}}>{s}</div>
                </div>
              ))}
            </div>
            <a href="#" className="dnh-link" style={{marginTop:28, alignSelf:'flex-start'}}>{lang==='en'?'Full visitor guide':'संपूर्ण निर्देशिका'} →</a>
          </div>
        </div>
      </section>
    );
  }

  // Visit info — B's bento, restyled with A's mono kickers (kept available for ref but no longer rendered in Hybrid main flow)
  function VisitInfo({lang}) {
    const items = lang==='en' ? [
      ['Visiting hours', 'General ward · 16:00–19:00\nICU · 12:00–12:30, 18:30–19:00\nNICU · by clinical request'],
      ['Cashless insurance', '38 networks accepted incl.\nCGHS · ECHS · Star · HDFC Ergo · Bajaj Allianz'],
      ['International patients', 'Visa support · airport pick-up\nMedical co-ordinator · 14 languages\n+91 80 4422 0099'],
      ['How to reach', '38 km from Ghaziabad · 76 km from Delhi\nNH-9 · Hapur Bypass\nFree shuttle from Hapur Junction']
    ] : [
      ['मिलने का समय', 'सामान्य वार्ड · १६:००–१९:००\nआईसीयू · १२:००–१२:३०, १८:३०–१९:००\nएनआईसीयू · चिकित्सकीय निवेदन पर'],
      ['कैशलेस बीमा', '३८ नेटवर्क स्वीकृत:\nCGHS · ECHS · Star · HDFC Ergo · Bajaj Allianz'],
      ['अंतरराष्ट्रीय रोगी', 'वीज़ा सहायता · हवाई अड्डे से लाना-ले जाना\nचिकित्सा समन्वयक · १४ भाषाएँ\n+९१ ८० ४४२२ ००९९'],
      ['कैसे पहुँचें', 'गाज़ियाबाद से ३८ किमी · दिल्ली से ७६ किमी\nNH-9 · हापुड़ बाईपास\nहापुड़ जंक्शन से निःशुल्क शटल']
    ];
    return (
      <section style={{padding:'104px 0', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:32}}>
            <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Plan your visit':'अपनी यात्रा की योजना बनाएँ'}</h2>
            <a href="#" className="dnh-link">{lang==='en'?'Full visitor guide':'संपूर्ण निर्देशिका'} →</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
            {items.map(([t,s], i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'22px 22px', minHeight:200}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:12, textTransform:'uppercase'}}>0{i+1}</div>
                <div style={{fontSize:17, fontWeight:600, marginBottom:12}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.6, whiteSpace:'pre-line'}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // College — A's editorial split with B's stats grid
  function College({lang}) {
    const c = I.college[lang], cta = I.cta[lang];
    const r = lang==='en' ? [
      ['74', 'Active clinical trials'],
      ['1,184', 'Peer-reviewed papers · last 5 yrs'],
      ['₹38.4 Cr', 'Extramural research funding'],
      ['18', 'Patents filed · 6 granted'],
    ] : [
      ['७४', 'सक्रिय क्लिनिकल अध्ययन'],
      ['१,१८४', 'पीयर-समीक्षित शोध-पत्र'],
      ['₹३८.४ करोड़', 'बाह्य अनुसंधान कोष'],
      ['१८', 'पेटेंट दाखिल · ६ स्वीकृत'],
    ];
    return (
      <section style={{padding:'104px 0', background:'var(--dnh-paper-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:18}}>{c.kicker.toUpperCase()}</div>
            <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:'0 0 24px', letterSpacing:'-0.015em'}}>{c.title}</h2>
            <p style={{fontSize:16, lineHeight:1.6, color:'var(--dnh-ink-soft)', margin:'0 0 28px'}}>{c.body}</p>
            <div style={{display:'flex', gap:12, marginBottom:32}}>
              <button className="dnh-btn dnh-btn--primary">{cta.apply} <HIcon.arrow/></button>
              <button className="dnh-btn dnh-btn--ghost">{lang==='en'?'Open day · 12 May':'खुला दिन · १२ मई'}</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', borderTop:'1px solid var(--dnh-line-soft)', paddingTop:22, gap:16}}>
              {[['150', lang==='en'?'MBBS seats':'एमबीबीएस सीटें'], ['1:8', lang==='en'?'Faculty ratio':'शिक्षक अनुपात'], ['21', lang==='en'?'PG specialties':'पीजी विशेषज्ञताएँ']].map(([n,l],i)=>(
                <div key={i}>
                  <div className="dnh-serif" style={{fontSize:30, lineHeight:1, marginBottom:6}}>{n}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="dnh-img" style={{aspectRatio:'5 / 4', marginBottom:14}}>
              <div className="dnh-img-label">EDITORIAL · LECTURE THEATRE 1 · YR 2 ANATOMY · 09:14 IST</div>
            </div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', margin:'18px 0 12px'}}>{lang==='en'?'RESEARCH · 2025':'अनुसंधान · २०२५'}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'var(--dnh-line-soft)', border:'1px solid var(--dnh-line-soft)'}}>
              {r.map(([n,l],i)=>(
                <div key={i} style={{background:'var(--dnh-paper)', padding:'18px 18px'}}>
                  <div style={{fontSize:24, fontWeight:600, marginBottom:6, letterSpacing:'-0.015em'}}>{n}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)', lineHeight:1.4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // News — A's grid layout
  function NewsGrid({lang}) {
    const n = I.news[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'104px 0', borderTop:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:40}}>
            <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'News & stories':'समाचार एवं कहानियाँ'}</h2>
            <a href="#" className="dnh-link">{I.cta[lang].all} →</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:32}}>
            <a href="#" style={{textDecoration:'none', color:'inherit', display:'block'}}>
              <div className="dnh-img" style={{aspectRatio:'16/10', marginBottom:18}}>
                <div className="dnh-img-label">RESEARCH · LAB B · DR. KAUR & TEAM</div>
              </div>
              <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:10}}>{n[0][0].toUpperCase()}</div>
              <div className="dnh-serif" style={{fontSize:26, lineHeight:1.2, marginBottom:10, fontWeight:400, letterSpacing:'-0.01em'}}>{n[0][1]}</div>
              <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{n[0][2]}</div>
            </a>
            <div style={{display:'flex', flexDirection:'column', gap:24}}>
              {n.slice(1,3).map(([k,t,m],i)=>(
                <a key={i} href="#" style={{textDecoration:'none', color:'inherit', borderBottom:'1px solid var(--dnh-line-soft)', paddingBottom:24}}>
                  <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:8}}>{k.toUpperCase()}</div>
                  <div className="dnh-serif" style={{fontSize:20, lineHeight:1.3, marginBottom:8, fontWeight:400}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{m}</div>
                </a>
              ))}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:24}}>
              {n.slice(3).map(([k,t,m],i)=>(
                <a key={i} href="#" style={{textDecoration:'none', color:'inherit', borderBottom:'1px solid var(--dnh-line-soft)', paddingBottom:24}}>
                  <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:8}}>{k.toUpperCase()}</div>
                  <div className="dnh-serif" style={{fontSize:20, lineHeight:1.3, marginBottom:8, fontWeight:400}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{m}</div>
                </a>
              ))}
              <div style={{padding:'20px 22px', background:'var(--dnh-paper)', borderRadius:4}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--dnh-primary)', marginBottom:10}}>{lang==='en'?'NEWSLETTER':'न्यूज़लेटर'}</div>
                <div style={{fontSize:14, lineHeight:1.4, marginBottom:14}}>{lang==='en'?'A monthly letter from the Director\u2019s desk. No marketing.':'निदेशक की मेज़ से मासिक पत्र। कोई विज्ञापन नहीं।'}</div>
                <div style={{display:'flex', gap:8}}>
                  <input placeholder={lang==='en'?'you@example.com':'आप@उदाहरण.com'} style={{flex:1, padding:'10px 12px', border:'1px solid var(--dnh-line-soft)', background:'#fff', borderRadius:4, font:'14px var(--dnh-sans)'}}/>
                  <button className="dnh-btn dnh-btn--primary dnh-btn--sq" style={{padding:'10px 14px', fontSize:13}}>{lang==='en'?'Subscribe':'जुड़ें'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Quote({lang}) {
    const t = I.testimonial[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'104px 0'}}>
        <div style={{maxWidth:1000, margin:'0 auto', padding:'0 40px'}}>
          <div className="dnh-serif" style={{fontSize:64, lineHeight:1, color:'var(--dnh-accent)'}}>“</div>
          <blockquote className="dnh-serif" style={{fontSize:34, lineHeight:1.25, fontWeight:400, fontStyle:'italic', margin:'0 0 24px', letterSpacing:'-0.01em'}}>{t.quote}</blockquote>
          <div className="dnh-mono" style={{fontSize:12, letterSpacing:'0.06em', color:'var(--dnh-ink-soft)'}}>{t.who}</div>
        </div>
      </section>
    );
  }

  function Locations({lang}) {
    const l = I.locations[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'88px 0', borderTop:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 2.4fr', gap:48}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.16em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'NETWORK':'नेटवर्क'}</div>
            <h2 className="dnh-serif" style={{fontSize:36, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Four ways to find us.':'हम तक पहुँचने के चार रास्ते।'}</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid var(--dnh-line-soft)', borderLeft:'1px solid var(--dnh-line-soft)'}}>
            {l.map(([t, s], i)=>(
              <div key={i} style={{padding:'22px 22px', borderRight:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12, color:'var(--dnh-primary)'}}><HIcon.pin/><span className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase'}}>{['MAIN','OPD','SAT','TELE'][i]}</span></div>
                <div style={{fontSize:17, fontWeight:600, marginBottom:6}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.5}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Footer({lang}) {
    const f = I.footer[lang], b = I.brand[lang], n = I.nav[lang];
    return (
      <footer style={{background:'var(--dnh-deep)', color:'rgba(255,255,255,.78)', padding:'64px 0 28px'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:32, paddingBottom:40, borderBottom:'1px solid rgba(255,255,255,.14)'}}>
            <div>
              <div className="dnh-serif" style={{fontSize:24, color:'#fff', marginBottom:14}}>{b.name}</div>
              <div style={{fontSize:13, lineHeight:1.6, opacity:.7, marginBottom:18}}>{b.tagline}</div>
              <div style={{fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', opacity:.5}}>{b.est}</div>
            </div>
            {[
              n.slice(0,2).concat([lang==='en'?'Make a payment':'भुगतान', lang==='en'?'Insurance':'बीमा', lang==='en'?'International patients':'अंतरराष्ट्रीय रोगी']),
              n.slice(2,4).concat([lang==='en'?'Faculty':'शिक्षकगण', lang==='en'?'Library':'पुस्तकालय', lang==='en'?'Alumni':'पूर्व छात्र']),
              [lang==='en'?'Careers':'करियर', lang==='en'?'Press':'प्रेस', lang==='en'?'Events':'कार्यक्रम', lang==='en'?'Contact':'संपर्क'],
              [f.privacy, f.terms, f.access, f.grievance]
            ].map((col, c) => (
              <div key={c} style={{display:'flex', flexDirection:'column', gap:10}}>
                {col.map((x,i)=>(<a key={i} href="#" style={{color:'inherit', textDecoration:'none', fontSize:13}}>{x}</a>))}
              </div>
            ))}
          </div>
          <div style={{display:'flex', justifyContent:'space-between', paddingTop:24, fontSize:11, opacity:.6}}>
            <span>{f.rights}</span>
            <span>NABH · NABL · NMC · ISO 15189</span>
          </div>
        </div>
      </footer>
    );
  }

  function Hybrid({lang, setLang}) {
    return (
      <div className="dnh-screen dnh-root" data-screen-label="D · Hybrid (A + B)">
        <Header lang={lang} setLang={setLang}/>
        <Hero lang={lang}/>
        <ActionStrip lang={lang}/>
        <FindDoctor lang={lang}/>
        <Ticker lang={lang}/>
        <FeaturedStory lang={lang}/>
        <PhotoStrip lang={lang}/>
        <Departments lang={lang}/>
        <Stats lang={lang}/>
        <VisitVisual lang={lang}/>
        <College lang={lang}/>
        <NewsGrid lang={lang}/>
        <Quote lang={lang}/>
        <Locations lang={lang}/>
        <Footer lang={lang}/>
      </div>
    );
  }

  window.DNH_Hybrid = Hybrid;
})();
