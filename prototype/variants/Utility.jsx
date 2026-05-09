// Direction B — Action-grid / utility-first homepage for Dev Nandini Hospital

(function () {
  const I = window.DNH_I18N;

  const UIcon = {
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
    bell: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 004 0"/>
      </svg>
    ),
  };

  function Header({lang, setLang}) {
    const u = I.utility[lang], n = I.nav[lang], b = I.brand[lang], cta = I.cta[lang];
    return (
      <header>
        <div style={{background:'var(--dnh-ink)', color:'#fff', fontSize:12}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'10px 40px', display:'flex', alignItems:'center', gap:24}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:8, color:'#fff', background:'var(--dnh-emergency)', padding:'5px 10px', borderRadius:3, fontWeight:600}}>{u[0]}</span>
            <nav style={{display:'flex', gap:18}}>
              {u.slice(1).map((x,i)=> <a key={i} href="#" style={{color:'rgba(255,255,255,.8)', textDecoration:'none'}}>{x}</a>)}
            </nav>
            <span style={{marginLeft:'auto', display:'flex', gap:14, alignItems:'center'}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, opacity:.7}}><UIcon.bell s={13}/> {lang==='en'?'2 alerts':'२ सूचनाएँ'}</span>
              <span style={{display:'inline-flex', background:'rgba(255,255,255,.12)', borderRadius:3, padding:2}}>
                <button onClick={()=>setLang('en')} style={langBtnB(lang==='en')}>EN</button>
                <button onClick={()=>setLang('hi')} style={langBtnB(lang==='hi')}>हिं</button>
              </span>
            </span>
          </div>
        </div>
        <div style={{background:'#fff', borderBottom:'1px solid var(--dnh-line-soft)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'18px 40px', display:'flex', alignItems:'center', gap:32}}>
            <a className="dnh-logo" href="#">
              <span className="dnh-logo-mark">द</span>
              <span className="dnh-logo-text">
                <span className="l1">{b.name}</span>
                <span className="l2">{lang==='en'?'Hospital · Medical College · Research':'अस्पताल · मेडिकल कॉलेज · अनुसंधान'}</span>
              </span>
            </a>
            <nav style={{display:'flex', gap:8, marginLeft:'auto'}}>
              {n.map((x,i)=>(
                <a key={i} href="#" style={{color:'var(--dnh-ink)', textDecoration:'none', fontSize:13.5, fontWeight:500, padding:'10px 14px', borderRadius:4, ...(i===0?{background:'var(--dnh-paper)'}:{})}}>{x}</a>
              ))}
            </nav>
            <button className="dnh-btn dnh-btn--primary dnh-btn--sq" style={{padding:'12px 16px'}}>{cta.book}</button>
          </div>
        </div>
      </header>
    );
  }

  const langBtnB = (on) => ({appearance:'none', border:0, padding:'5px 10px', borderRadius:3, font:'500 11px/1 var(--dnh-sans-en)', cursor:'pointer', background: on?'#fff':'transparent', color: on?'var(--dnh-ink)':'rgba(255,255,255,.7)'});

  function HeroAction({lang}) {
    const a = I.actions[lang], h = I.hero2[lang], cta = I.cta[lang];
    const colors = ['var(--dnh-emergency)', 'var(--dnh-deep)', 'var(--dnh-primary)', 'var(--dnh-ink)'];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'56px 0 0'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, alignItems:'end', marginBottom:40}}>
            <h1 style={{fontSize:60, lineHeight:1.04, fontWeight:700, margin:0, letterSpacing:'-0.02em', color:'var(--dnh-ink)', textWrap:'balance'}}>{h.title}</h1>
            <p style={{fontSize:16, lineHeight:1.55, color:'var(--dnh-ink-soft)', margin:0, paddingBottom:8}}>{h.sub}</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, border:'1px solid var(--dnh-line-soft)', background:'#fff', borderRadius:6, overflow:'hidden'}}>
            {a.map((x, i)=>(
              <a key={i} href="#" style={{
                display:'block', padding:'32px 28px 28px', position:'relative', minHeight:240, textDecoration:'none', color:'inherit',
                borderRight: i<3 ? '1px solid var(--dnh-line-soft)' : 'none',
                background: i===0 ? 'var(--dnh-emergency)' : i===2 ? 'var(--dnh-deep)' : '#fff',
                color: (i===0 || i===2) ? '#fff' : 'var(--dnh-ink)'
              }}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', opacity: (i===0||i===2)?.85:.6, marginBottom:24, textTransform:'uppercase'}}>0{i+1} / {lang==='en'?'GET STARTED':'शुरू करें'}</div>
                <div style={{fontSize:30, fontWeight:600, lineHeight:1.05, marginBottom:14, letterSpacing:'-0.01em'}}>{x.t}</div>
                <div style={{fontSize:14, lineHeight:1.45, opacity:(i===0||i===2)?.85:.7, marginBottom:18}}>{x.s}</div>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.06em', opacity:.7, paddingTop:18, borderTop:'1px solid '+((i===0||i===2)?'rgba(255,255,255,.18)':'var(--dnh-line-soft)')}}>{x.tag}</div>
                <span style={{position:'absolute', right:20, top:24}}><UIcon.arrow s={18}/></span>
              </a>
            ))}
          </div>
          {/* Search bar */}
          <div style={{marginTop:14, background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'8px 12px', display:'flex', alignItems:'center', gap:14}}>
            <UIcon.search/>
            <input placeholder={cta.search} style={{flex:1, border:0, outline:0, fontSize:15, padding:'10px 0', font:'400 15px var(--dnh-sans)', background:'transparent', color:'var(--dnh-ink)'}}/>
            <span style={{display:'flex', gap:6}}>
              {(lang==='en' ? ['Cardiology', 'Pregnancy', 'Diabetes', 'Knee', 'Cataract'] : ['हृदय रोग','गर्भावस्था','मधुमेह','घुटना','मोतियाबिंद']).map((c,i)=>(
                <button key={i} style={{appearance:'none', border:'1px solid var(--dnh-line-soft)', background:'var(--dnh-paper)', padding:'6px 10px', borderRadius:999, font:'500 11.5px var(--dnh-sans)', cursor:'pointer', color:'var(--dnh-ink-soft)'}}>{c}</button>
              ))}
            </span>
            <button className="dnh-btn dnh-btn--primary dnh-btn--sq" style={{padding:'10px 16px', fontSize:13}}>{cta.findDoc}</button>
          </div>
        </div>
      </section>
    );
  }

  function IAm({lang}) {
    const items = lang==='en'
      ? [
          ['Patient & family', 'Appointments, reports, billing, visiting hours, insurance.'],
          ['Medical student', 'MBBS curriculum, library, hostels, clinical rotations, faculty.'],
          ['Postgraduate / fellow', 'PG seats, thesis support, clinical fellowships, faculty mentors.'],
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
      <section style={{padding:'88px 0', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:18}}>{lang==='en'?'I AM A …':'मैं हूँ …'}</div>
          <h2 style={{fontSize:38, lineHeight:1.05, fontWeight:600, margin:'0 0 36px', letterSpacing:'-0.015em', maxWidth:760}}>{lang==='en'?'Six doors into Dev Nandini. Pick yours.':'देव नंदिनी में प्रवेश के छह द्वार। अपना चुनें।'}</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
            {items.map(([t, s], i)=>(
              <a key={i} href="#" style={{display:'block', padding:'22px 22px', background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:6, textDecoration:'none', color:'inherit', position:'relative', minHeight:148}}>
                <div style={{fontSize:17, fontWeight:600, marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.5, paddingRight:24}}>{s}</div>
                <span style={{position:'absolute', right:14, bottom:14, color:'var(--dnh-primary)'}}><UIcon.arrow s={16}/></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function DepartmentsCompact({lang}) {
    const list = I.departments[lang];
    return (
      <section style={{padding:'88px 0', background:'#fff', borderTop:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:32}}>
            <div>
              <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'CARE · 28 SPECIALTIES':'सेवाएँ · २८ विशेषज्ञताएँ'}</div>
              <h2 style={{fontSize:36, lineHeight:1.05, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Departments & centres of excellence':'विभाग एवं उत्कृष्टता केंद्र'}</h2>
            </div>
            <div style={{display:'flex', gap:8}}>
              {(lang==='en'?['All','Surgical','Medical','Diagnostic','Allied']:['सभी','शल्य','चिकित्सकीय','निदान','सहायक']).map((c,i)=>(
                <button key={i} style={{appearance:'none', border:'1px solid var(--dnh-line-soft)', background:i===0?'var(--dnh-deep)':'#fff', color:i===0?'#fff':'var(--dnh-ink-soft)', padding:'8px 14px', borderRadius:999, font:'500 12px var(--dnh-sans)', cursor:'pointer'}}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'var(--dnh-line-soft)', border:'1px solid var(--dnh-line-soft)'}}>
            {list.map(([t,s],i)=>(
              <a key={i} href="#" style={{padding:'20px 18px', background:'#fff', textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:108}}>
                <div>
                  <div style={{fontSize:15, fontWeight:600, marginBottom:4}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)', lineHeight:1.4}}>{s}</div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
                  <span className="dnh-mono" style={{fontSize:10, letterSpacing:'0.10em', color:'var(--dnh-primary)'}}>{String(i+1).padStart(2,'0')} / {lang==='en'?'24×7':'२४×७'}</span>
                  <span style={{color:'var(--dnh-primary)'}}><UIcon.arrow s={14}/></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
      <section style={{padding:'88px 0', background:'var(--dnh-paper-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
            <h2 style={{fontSize:36, lineHeight:1.05, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Plan your visit':'अपनी यात्रा की योजना बनाएँ'}</h2>
            <a href="#" className="dnh-link">{lang==='en'?'Full visitor guide':'संपूर्ण निर्देशिका'} →</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
            {items.map(([t,s], i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'24px 22px', minHeight:200}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:12, textTransform:'uppercase'}}>0{i+1}</div>
                <div style={{fontSize:18, fontWeight:600, marginBottom:14}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.6, whiteSpace:'pre-line'}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function ResearchEdu({lang}) {
    const r = lang==='en' ? [
      ['74', 'Active clinical trials'],
      ['1,184', 'Peer-reviewed papers · last 5 yrs'],
      ['₹38.4 Cr', 'Extramural research funding · 2025'],
      ['18', 'Patents filed · 6 granted'],
    ] : [
      ['७४', 'सक्रिय क्लिनिकल अध्ययन'],
      ['१,१८४', 'पीयर-समीक्षित शोध-पत्र · पिछले ५ वर्ष'],
      ['₹३८.४ करोड़', 'बाह्य अनुसंधान कोष · २०२५'],
      ['१८', 'पेटेंट दाखिल · ६ स्वीकृत'],
    ];
    const c = I.college[lang], cta = I.cta[lang];
    return (
      <section style={{padding:'88px 0', background:'var(--dnh-deep)', color:'#fff'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:48}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-accent)', marginBottom:18}}>{c.kicker.toUpperCase()}</div>
            <h2 style={{fontSize:42, lineHeight:1.08, fontWeight:600, margin:'0 0 20px', letterSpacing:'-0.015em', color:'#fff'}}>{c.title}</h2>
            <p style={{fontSize:15.5, lineHeight:1.6, opacity:.78, margin:'0 0 28px'}}>{c.body}</p>
            <div style={{display:'flex', gap:12}}>
              <button className="dnh-btn dnh-btn--accent">{cta.apply}</button>
              <button className="dnh-btn dnh-btn--ghost" style={{color:'#fff', borderColor:'rgba(255,255,255,.3)'}}>{lang==='en'?'Open day · 12 May':'खुला दिन · १२ मई'}</button>
            </div>
          </div>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-accent)', marginBottom:18}}>{lang==='en'?'RESEARCH · 2025':'अनुसंधान · २०२५'}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'rgba(255,255,255,.14)'}}>
              {r.map(([n,l],i)=>(
                <div key={i} style={{background:'var(--dnh-deep)', padding:'24px 20px', minHeight:120}}>
                  <div style={{fontSize:32, fontWeight:600, marginBottom:8, letterSpacing:'-0.015em'}}>{n}</div>
                  <div style={{fontSize:12.5, opacity:.7, lineHeight:1.4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  function NewsList({lang}) {
    const n = I.news[lang];
    return (
      <section style={{padding:'88px 0', background:'#fff'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:32}}>
            <h2 style={{fontSize:36, lineHeight:1, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Latest':'नवीनतम'}</h2>
            <a href="#" className="dnh-link">{I.cta[lang].all} →</a>
          </div>
          <div style={{borderTop:'1px solid var(--dnh-line-soft)'}}>
            {n.concat(n.slice(0,2)).map(([k,t,m],i)=>(
              <a key={i} href="#" style={{display:'grid', gridTemplateColumns:'140px 1fr 220px', gap:32, padding:'22px 0', borderBottom:'1px solid var(--dnh-line-soft)', textDecoration:'none', color:'inherit', alignItems:'center'}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--dnh-primary)', textTransform:'uppercase'}}>{k}</div>
                <div style={{fontSize:18, fontWeight:500, lineHeight:1.35}}>{t}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'var(--dnh-ink-soft)'}}>
                  <span>{m}</span>
                  <UIcon.arrow s={14}/>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function FooterB({lang}) {
    const f = I.footer[lang], b = I.brand[lang], n = I.nav[lang];
    return (
      <footer style={{background:'var(--dnh-ink)', color:'rgba(255,255,255,.78)', padding:'56px 0 28px'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:32, paddingBottom:32, borderBottom:'1px solid rgba(255,255,255,.14)'}}>
            <div>
              <a className="dnh-logo" href="#" style={{color:'#fff'}}>
                <span className="dnh-logo-mark" style={{background:'#fff', color:'var(--dnh-deep)'}}>द</span>
                <span className="dnh-logo-text">
                  <span className="l1" style={{color:'#fff'}}>{b.name}</span>
                  <span className="l2">{b.est}</span>
                </span>
              </a>
              <div style={{fontSize:13, lineHeight:1.6, opacity:.7, marginTop:18, maxWidth:300}}>{b.tagline}</div>
              <div style={{marginTop:18, display:'flex', gap:8}}>
                <button className="dnh-btn dnh-btn--accent" style={{padding:'8px 14px', fontSize:12}}>{lang==='en'?'Emergency':'आपातकाल'}</button>
                <button className="dnh-btn dnh-btn--ghost" style={{color:'#fff', borderColor:'rgba(255,255,255,.3)', padding:'8px 14px', fontSize:12}}>{I.cta[lang].virtual}</button>
              </div>
            </div>
            {[
              [n[0], n[1], lang==='en'?'Make a payment':'भुगतान', lang==='en'?'Insurance':'बीमा'],
              [n[2], lang==='en'?'Faculty':'शिक्षकगण', lang==='en'?'Library':'पुस्तकालय', lang==='en'?'Alumni':'पूर्व छात्र'],
              [n[3], lang==='en'?'Trials':'अध्ययन', lang==='en'?'Publications':'प्रकाशन', lang==='en'?'IRB':'आईआरबी'],
              [f.privacy, f.terms, f.access, f.grievance]
            ].map((col, c) => (
              <div key={c} style={{display:'flex', flexDirection:'column', gap:10}}>
                {col.map((x,i)=>(<a key={i} href="#" style={{color:'inherit', textDecoration:'none', fontSize:13}}>{x}</a>))}
              </div>
            ))}
          </div>
          <div style={{display:'flex', justifyContent:'space-between', paddingTop:22, fontSize:11, opacity:.55}}>
            <span>{f.rights}</span>
            <span>NABH · NABL · NMC · ISO 15189 · GDPR-aligned data handling</span>
          </div>
        </div>
      </footer>
    );
  }

  function Utility({lang, setLang}) {
    return (
      <div className="dnh-screen dnh-root" data-screen-label="B · Action grid">
        <Header lang={lang} setLang={setLang}/>
        <HeroAction lang={lang}/>
        <IAm lang={lang}/>
        <DepartmentsCompact lang={lang}/>
        <VisitInfo lang={lang}/>
        <ResearchEdu lang={lang}/>
        <NewsList lang={lang}/>
        <FooterB lang={lang}/>
      </div>
    );
  }

  window.DNH_Utility = Utility;
})();
