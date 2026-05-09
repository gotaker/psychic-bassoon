// Direction A — Editorial / story-led homepage for Dev Nandini Hospital

(function () {
  const I = window.DNH_I18N;

  // --- tiny svg icons (geometric only) ---
  const Ico = {
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
    cross: () => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
    dot: (p) => <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background: p.color||'currentColor'}} />
  };

  function Header({lang, setLang}) {
    const u = I.utility[lang], n = I.nav[lang], b = I.brand[lang], cta = I.cta[lang];
    return (
      <header style={{position:'relative'}}>
        {/* Utility ribbon */}
        <div style={{background:'var(--dnh-deep)', color:'rgba(255,255,255,.78)', fontSize:12, lineHeight:1}}>
          <div style={{maxWidth:1180, margin:'0 auto', padding:'10px 40px', display:'flex', alignItems:'center', gap:24}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:8, color:'#fff'}}>
              <span style={{display:'inline-block', width:8, height:8, borderRadius:'50%', background:'var(--dnh-emergency)'}} />
              <strong style={{fontWeight:600}}>{u[0]}</strong>
            </span>
            <nav style={{display:'flex', gap:18, marginLeft:16}}>
              {u.slice(1).map((x,i)=> <a key={i} href="#" style={{color:'inherit', textDecoration:'none'}}>{x}</a>)}
            </nav>
            <span style={{marginLeft:'auto', display:'inline-flex', gap:0, alignItems:'center', background:'rgba(255,255,255,.08)', borderRadius:999, padding:2}}>
              <button onClick={()=>setLang('en')} style={{...langPill, ...(lang==='en'?langOn:{})}}>EN</button>
              <button onClick={()=>setLang('hi')} style={{...langPill, ...(lang==='hi'?langOn:{})}}>हिं</button>
            </span>
          </div>
        </div>
        {/* Main nav */}
        <div style={{background:'var(--dnh-paper)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
          <div style={{maxWidth:1180, margin:'0 auto', padding:'22px 40px', display:'flex', alignItems:'center', gap:36}}>
            <a className="dnh-logo" href="#">
              <span className="dnh-logo-mark">द</span>
              <span className="dnh-logo-text">
                <span className="l1">{b.name}</span>
                <span className="l2">{b.est}</span>
              </span>
            </a>
            <nav style={{display:'flex', gap:24, marginLeft:24}}>
              {n.map((x,i)=>(
                <a key={i} href="#" style={{color:'var(--dnh-ink)', textDecoration:'none', fontSize:14, fontWeight:500, position:'relative', paddingBottom:6, ...(i===0?{borderBottom:'2px solid var(--dnh-deep)'}:{})}}>{x}</a>
              ))}
            </nav>
            <div style={{marginLeft:'auto', display:'flex', gap:10, alignItems:'center'}}>
              <button className="dnh-btn dnh-btn--ghost" style={{padding:'10px 14px'}}><Ico.search/> {cta.findDoc}</button>
              <button className="dnh-btn dnh-btn--primary"><Ico.plus/> {cta.book}</button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const langPill = {appearance:'none', border:0, background:'transparent', color:'rgba(255,255,255,.7)', font:'500 11px/1 var(--dnh-sans-en)', padding:'6px 10px', borderRadius:999, cursor:'pointer'};
  const langOn = {background:'#fff', color:'var(--dnh-deep)'};

  function Hero({lang}) {
    const h = I.hero[lang], cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper)', paddingTop:64, paddingBottom:0}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:56, alignItems:'end', minHeight:560}}>
          <div style={{paddingBottom:80}}>
            <div className="dnh-tag" style={{marginBottom:28}}><Ico.dot color="var(--dnh-primary)"/>{h.eyebrow}</div>
            <h1 className="dnh-serif" style={{fontSize:72, lineHeight:1.02, letterSpacing:'-0.02em', fontWeight:400, margin:'0 0 28px', color:'var(--dnh-ink)', textWrap:'balance'}}>
              {h.title}
            </h1>
            <p style={{fontSize:18, lineHeight:1.55, maxWidth:520, color:'var(--dnh-ink-soft)', margin:'0 0 36px'}}>{h.sub}</p>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <button className="dnh-btn dnh-btn--primary" style={{padding:'14px 22px', fontSize:14}}>{cta.book} <Ico.arrow/></button>
              <button className="dnh-btn dnh-btn--ghost" style={{padding:'14px 22px', fontSize:14}}>{cta.explore}</button>
            </div>
            <div style={{marginTop:48, display:'flex', gap:32, fontSize:12, color:'var(--dnh-ink-soft)', textTransform:'uppercase', letterSpacing:'0.10em'}}>
              <span>NABH · NABL accredited</span>
              <span>JCI-aligned protocols</span>
              <span>Member · AIIMS academic council</span>
            </div>
          </div>
          <div style={{position:'relative', height:560, marginRight:-40}}>
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

  function FindDoctor({lang}) {
    const cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'48px 0 0'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px'}}>
          <div style={{background:'var(--dnh-white)', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'10px 12px', display:'grid', gridTemplateColumns:'auto 1.5fr 1fr 1fr auto', gap:0, alignItems:'stretch', boxShadow:'0 8px 32px -16px rgba(14,31,34,.18)'}}>
            <div style={{display:'flex', alignItems:'center', padding:'14px 16px', color:'var(--dnh-primary)', borderRight:'1px solid var(--dnh-line-soft)'}}><Ico.search s={18}/></div>
            <div style={{padding:'10px 16px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={mono}>{lang==='en'?'CONDITION OR SPECIALTY':'रोग या विशेषज्ञता'}</div>
              <div style={{fontSize:15, color:'var(--dnh-ink-soft)'}}>{cta.search}</div>
            </div>
            <div style={{padding:'10px 16px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={mono}>{lang==='en'?'LOCATION':'स्थान'}</div>
              <div style={{fontSize:15}}>{lang==='en'?'Hapur · Main campus':'हापुड़ · मुख्य परिसर'}</div>
            </div>
            <div style={{padding:'10px 16px', borderRight:'1px solid var(--dnh-line-soft)'}}>
              <div className="dnh-mono" style={mono}>{lang==='en'?'WHEN':'कब'}</div>
              <div style={{fontSize:15}}>{lang==='en'?'Earliest available':'जल्द से जल्द'}</div>
            </div>
            <button className="dnh-btn dnh-btn--primary dnh-btn--sq" style={{margin:6, padding:'0 22px'}}>{cta.findDoc}</button>
          </div>
          <div style={{display:'flex', gap:24, marginTop:14, fontSize:12, color:'var(--dnh-ink-soft)'}}>
            <span>{lang==='en'?'Popular:':'लोकप्रिय:'}</span>
            {(lang==='en'
              ? ['Cardiology','Knee replacement','Pregnancy care','Diabetes','Cataract']
              : ['हृदय रोग','घुटना प्रत्यारोपण','गर्भावस्था','मधुमेह','मोतियाबिंद']
            ).map((x,i)=>(<a key={i} href="#" className="dnh-link" style={{borderBottomStyle:'dotted'}}>{x}</a>))}
          </div>
        </div>
      </section>
    );
  }
  const mono = {font:'500 9.5px/1 var(--dnh-mono)', color:'var(--dnh-primary)', letterSpacing:'0.10em', marginBottom:6, textTransform:'uppercase'};

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
              <Ico.dot color="var(--dnh-accent)"/>
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
      <section style={{background:'var(--dnh-paper)', padding:'120px 0'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'center'}}>
          <div className="dnh-img" style={{aspectRatio:'4 / 5', height:600}}>
            <div className="dnh-img-label">EDITORIAL · 06:42 IST · ICU CORRIDOR · DAY ONE OF FOLLOW</div>
          </div>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:24}}>{s.kicker}</div>
            <h2 className="dnh-serif" style={{fontSize:54, lineHeight:1.05, letterSpacing:'-0.015em', fontWeight:400, margin:'0 0 24px'}}>{s.title}</h2>
            <p style={{fontSize:18, lineHeight:1.6, color:'var(--dnh-ink-soft)', margin:'0 0 28px'}}>{s.dek}</p>
            <p className="dnh-mono" style={{fontSize:11, letterSpacing:'0.06em', color:'var(--dnh-ink-soft)', textTransform:'uppercase', margin:'0 0 36px'}}>{s.byline}</p>
            <button className="dnh-btn dnh-btn--ghost">{cta.more} <Ico.arrow/></button>

            <div style={{marginTop:56, paddingTop:28, borderTop:'1px solid var(--dnh-line-soft)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
              <a href="#" style={{textDecoration:'none', color:'inherit'}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--dnh-primary)', marginBottom:8}}>{lang==='en'?'NEXT IN INSIDE DNH':'अगला अंक'}</div>
                <div className="dnh-serif" style={{fontSize:18, lineHeight:1.3}}>{lang==='en'?'The night the rural ambulance ran out of oxygen — and what we changed.':'जिस रात ग्रामीण एम्बुलेंस में ऑक्सीजन खत्म हुआ — और हमने क्या बदला।'}</div>
              </a>
              <a href="#" style={{textDecoration:'none', color:'inherit'}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--dnh-primary)', marginBottom:8}}>{lang==='en'?'AUDIO · 24 MIN':'श्रव्य · २४ मि'}</div>
                <div className="dnh-serif" style={{fontSize:18, lineHeight:1.3}}>{lang==='en'?'Three first-year MBBS students on their first night on call.':'तीन प्रथम-वर्ष एमबीबीएस छात्रों की पहली रात ऑन-कॉल।'}</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Departments({lang}) {
    const list = I.departments[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'120px 0', borderTop:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48, gap:48}}>
            <div>
              <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'CARE — 28 SPECIALTIES':'सेवाएँ — २८ विशेषज्ञताएँ'}</div>
              <h2 className="dnh-serif" style={{fontSize:48, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>
                {lang==='en'?'Where would you like to start?':'आप कहाँ से शुरू करना चाहेंगे?'}
              </h2>
            </div>
            <a href="#" className="dnh-link" style={{whiteSpace:'nowrap'}}>{I.cta[lang].all} →</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', borderTop:'1px solid var(--dnh-line-soft)', borderLeft:'1px solid var(--dnh-line-soft)'}}>
            {list.map(([t, s], i) => (
              <a key={i} href="#" style={{display:'block', padding:'28px 24px', borderRight:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)', textDecoration:'none', color:'inherit', minHeight:170, position:'relative', transition:'background .2s'}} onMouseOver={(e)=>e.currentTarget.style.background='var(--dnh-paper)'} onMouseOut={(e)=>e.currentTarget.style.background='transparent'}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:14}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{fontSize:17, fontWeight:600, lineHeight:1.2, marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.4}}>{s}</div>
                <span style={{position:'absolute', right:16, bottom:16, color:'var(--dnh-primary)'}}><Ico.arrow s={16}/></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Stats({lang}) {
    const list = I.stats[lang];
    return (
      <section style={{background:'var(--dnh-deep)', color:'#fff', padding:'80px 0'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:24}}>
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

  function College({lang}) {
    const c = I.college[lang], cta = I.cta[lang];
    return (
      <section style={{background:'var(--dnh-paper-2)', padding:'120px 0'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:18}}>{c.kicker.toUpperCase()}</div>
            <h2 className="dnh-serif" style={{fontSize:48, lineHeight:1.05, fontWeight:400, margin:'0 0 24px', letterSpacing:'-0.015em'}}>{c.title}</h2>
            <p style={{fontSize:17, lineHeight:1.6, color:'var(--dnh-ink-soft)', margin:'0 0 32px'}}>{c.body}</p>
            <div style={{display:'flex', gap:12, marginBottom:36}}>
              <button className="dnh-btn dnh-btn--primary">{cta.apply} <Ico.arrow/></button>
              <button className="dnh-btn dnh-btn--ghost">{lang==='en'?'Curriculum & seats':'पाठ्यक्रम एवं सीटें'}</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', borderTop:'1px solid var(--dnh-line-soft)', paddingTop:28, gap:24}}>
              {[['150', lang==='en'?'MBBS seats':'एमबीबीएस सीटें'], ['1:8', lang==='en'?'Faculty ratio':'शिक्षक अनुपात'], ['21', lang==='en'?'PG specialties':'पीजी विशेषज्ञताएँ']].map(([n,l],i)=>(
                <div key={i}>
                  <div className="dnh-serif" style={{fontSize:32, lineHeight:1, marginBottom:6}}>{n}</div>
                  <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dnh-img" style={{aspectRatio:'4 / 5'}}>
            <div className="dnh-img-label">EDITORIAL · LECTURE THEATRE 1 · YR 2 ANATOMY · 09:14 IST</div>
          </div>
        </div>
      </section>
    );
  }

  function NewsGrid({lang}) {
    const n = I.news[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'120px 0', borderTop:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:48}}>
            <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'News & stories':'समाचार एवं कहानियाँ'}</h2>
            <a href="#" className="dnh-link">{I.cta[lang].all} →</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:32}}>
            <a href="#" style={{textDecoration:'none', color:'inherit', display:'block'}}>
              <div className="dnh-img" style={{aspectRatio:'16/10', marginBottom:18}}>
                <div className="dnh-img-label">RESEARCH · LAB B · DR. KAUR & TEAM</div>
              </div>
              <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:10}}>{n[0][0].toUpperCase()}</div>
              <div className="dnh-serif" style={{fontSize:28, lineHeight:1.2, marginBottom:10, fontWeight:400, letterSpacing:'-0.01em'}}>{n[0][1]}</div>
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
      <section style={{background:'var(--dnh-paper)', padding:'120px 0'}}>
        <div style={{maxWidth:1000, margin:'0 auto', padding:'0 40px', textAlign:'left'}}>
          <div className="dnh-serif" style={{fontSize:64, lineHeight:1, color:'var(--dnh-accent)', marginBottom:0}}>“</div>
          <blockquote className="dnh-serif" style={{fontSize:36, lineHeight:1.25, fontWeight:400, fontStyle:'italic', margin:'0 0 28px', letterSpacing:'-0.01em'}}>{t.quote}</blockquote>
          <div className="dnh-mono" style={{fontSize:12, letterSpacing:'0.06em', color:'var(--dnh-ink-soft)'}}>{t.who}</div>
        </div>
      </section>
    );
  }

  function Locations({lang}) {
    const l = I.locations[lang];
    return (
      <section style={{background:'var(--dnh-white)', padding:'100px 0', borderTop:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 2.4fr', gap:48}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.16em', color:'var(--dnh-primary)', marginBottom:14}}>{lang==='en'?'NETWORK':'नेटवर्क'}</div>
            <h2 className="dnh-serif" style={{fontSize:38, lineHeight:1.05, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'Four ways to find us.':'हम तक पहुँचने के चार रास्ते।'}</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'1px solid var(--dnh-line-soft)', borderLeft:'1px solid var(--dnh-line-soft)'}}>
            {l.map(([t, s], i)=>(
              <div key={i} style={{padding:'24px 24px', borderRight:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12, color:'var(--dnh-primary)'}}><Ico.pin/><span className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase'}}>{['MAIN','OPD','SAT','TELE'][i]}</span></div>
                <div style={{fontSize:18, fontWeight:600, marginBottom:6}}>{t}</div>
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
      <footer style={{background:'var(--dnh-deep)', color:'rgba(255,255,255,.78)', padding:'72px 0 32px'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 40px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:32, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,.14)'}}>
            <div>
              <div className="dnh-serif" style={{fontSize:24, color:'#fff', marginBottom:14}}>{b.name}</div>
              <div style={{fontSize:13, lineHeight:1.6, opacity:.7, marginBottom:24}}>{b.tagline}</div>
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
          <div style={{display:'flex', justifyContent:'space-between', paddingTop:28, fontSize:11, opacity:.6}}>
            <span>{f.rights}</span>
            <span>NABH · NABL · NMC · ISO 15189</span>
          </div>
        </div>
      </footer>
    );
  }

  function Editorial({lang, setLang}) {
    return (
      <div className="dnh-screen dnh-root" data-screen-label="A · Editorial">
        <Header lang={lang} setLang={setLang}/>
        <Hero lang={lang}/>
        <FindDoctor lang={lang}/>
        <Ticker lang={lang}/>
        <FeaturedStory lang={lang}/>
        <Departments lang={lang}/>
        <Stats lang={lang}/>
        <College lang={lang}/>
        <NewsGrid lang={lang}/>
        <Quote lang={lang}/>
        <Locations lang={lang}/>
        <Footer lang={lang}/>
      </div>
    );
  }

  window.DNH_Editorial = Editorial;
})();
