// Direction C — Modern minimal / calm homepage for Dev Nandini Hospital

(function () {
  const I = window.DNH_I18N;

  const MIcon = {
    arrow: (p) => (
      <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
  };

  function Header({lang, setLang}) {
    const n = I.nav[lang], b = I.brand[lang], cta = I.cta[lang];
    return (
      <header style={{background:'var(--dnh-paper)', position:'sticky', top:0, zIndex:5}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'28px 56px', display:'flex', alignItems:'center', gap:48}}>
          <a className="dnh-logo" href="#">
            <span className="dnh-logo-mark" style={{background:'transparent', color:'var(--dnh-deep)', border:'1px solid var(--dnh-deep)', fontFamily:'var(--dnh-serif-en)'}}>द</span>
            <span className="dnh-logo-text">
              <span className="l1" style={{fontFamily:'var(--dnh-serif)', fontWeight:500, fontSize:17, letterSpacing:0}}>{b.name}</span>
            </span>
          </a>
          <nav style={{display:'flex', gap:28, marginLeft:'auto'}}>
            {n.map((x,i)=>(
              <a key={i} href="#" style={{color:'var(--dnh-ink-soft)', textDecoration:'none', fontSize:13, fontWeight:400}}>{x}</a>
            ))}
          </nav>
          <span style={{display:'flex', gap:0, fontSize:12, color:'var(--dnh-ink-soft)'}}>
            <button onClick={()=>setLang('en')} style={{appearance:'none', border:0, background:'transparent', cursor:'pointer', padding:'4px 8px', font:'inherit', color: lang==='en'?'var(--dnh-ink)':'var(--dnh-ink-soft)', textDecoration: lang==='en'?'underline':'none', textUnderlineOffset:3}}>EN</button>
            <span style={{padding:'4px 0', opacity:.4}}>/</span>
            <button onClick={()=>setLang('hi')} style={{appearance:'none', border:0, background:'transparent', cursor:'pointer', padding:'4px 8px', font:'inherit', color: lang==='hi'?'var(--dnh-ink)':'var(--dnh-ink-soft)', textDecoration: lang==='hi'?'underline':'none', textUnderlineOffset:3}}>हिं</button>
          </span>
          <a href="#" className="dnh-link" style={{fontSize:13, borderBottomStyle:'solid'}}>{cta.book}</a>
        </div>
        <hr className="dnh-hr"/>
      </header>
    );
  }

  function HeroM({lang}) {
    const h = I.hero3[lang], b = I.brand[lang];
    return (
      <section style={{background:'var(--dnh-paper)', padding:'140px 56px 120px'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:48, textTransform:'uppercase'}}>{b.est}</div>
          <h1 className="dnh-serif" style={{fontSize:96, lineHeight:1.0, fontWeight:300, margin:'0 0 36px', letterSpacing:'-0.025em', color:'var(--dnh-deep)', maxWidth:980}}>
            {h.title}
          </h1>
          <p style={{fontSize:21, lineHeight:1.5, color:'var(--dnh-ink-soft)', margin:'0 0 80px', maxWidth:540, fontWeight:300}}>{h.sub}</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, max-content)', gap:48, alignItems:'baseline'}}>
            {[
              [I.cta[lang].book,        '/ ' + (lang==='en'?'opens 14 days ahead':'१४ दिन पहले')],
              [I.cta[lang].findDoc,     '/ ' + (lang==='en'?'412 consultants':'४१२ परामर्शदाता')],
              [I.cta[lang].emergency,   '/ ' + (lang==='en'?'call 1066':'कॉल १०६६')],
              [I.cta[lang].virtual,     '/ ' + (lang==='en'?'video OPD':'वीडियो ओपीडी')]
            ].map(([t, s], i)=>(
              <a key={i} href="#" style={{textDecoration:'none', color:'inherit', borderTop:'1px solid var(--dnh-deep)', paddingTop:14, minWidth:160}}>
                <div style={{fontSize:16, fontWeight:500, marginBottom:4}}>{t}</div>
                <div className="dnh-mono" style={{fontSize:11, color:'var(--dnh-ink-soft)', letterSpacing:'0.06em'}}>{s}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function GlimpseM({lang}) {
    return (
      <section style={{padding:'0 56px 120px', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div className="dnh-img" style={{aspectRatio:'21/9', width:'100%'}}>
            <div className="dnh-img-label">{lang==='en'?'EDITORIAL · 06:42 IST · WARD 4 CORRIDOR · DR. BHATNAGAR ON ROUNDS · ONE FRAME, NO ARRANGEMENT':'संपादकीय · ०६:४२ · वार्ड ४ · डॉ. भटनागर की राउंड · एक फ़्रेम, कोई व्यवस्थापन नहीं'}</div>
          </div>
          <div className="dnh-mono" style={{marginTop:18, fontSize:11, color:'var(--dnh-ink-soft)', letterSpacing:'0.06em', textAlign:'right'}}>
            {lang==='en'?'01 / 04 · A glimpse inside Dev Nandini':'०१ / ०४ · देव नंदिनी की एक झलक'}
          </div>
        </div>
      </section>
    );
  }

  function StoryM({lang}) {
    const s = I.story[lang];
    return (
      <section style={{padding:'0 56px 120px', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:760, margin:'0 auto'}}>
          <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:24, textTransform:'uppercase'}}>{s.kicker}</div>
          <h2 className="dnh-serif" style={{fontSize:48, lineHeight:1.1, fontWeight:300, margin:'0 0 28px', letterSpacing:'-0.02em', color:'var(--dnh-deep)'}}>{s.title}</h2>
          <p style={{fontSize:18, lineHeight:1.7, color:'var(--dnh-ink-soft)', margin:'0 0 28px', fontWeight:300}}>{s.dek}</p>
          <a href="#" className="dnh-link" style={{fontSize:14}}>{I.cta[lang].more} →</a>
        </div>
      </section>
    );
  }

  function DepartmentsListM({lang}) {
    const list = I.departments[lang];
    return (
      <section style={{padding:'120px 56px', background:'var(--dnh-white)', borderTop:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:64, marginBottom:48, alignItems:'baseline'}}>
            <div>
              <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:14, textTransform:'uppercase'}}>{lang==='en'?'CARE':'सेवाएँ'}</div>
              <h2 className="dnh-serif" style={{fontSize:38, lineHeight:1.1, fontWeight:300, margin:0, letterSpacing:'-0.02em'}}>{lang==='en'?'Twenty-eight specialties.':'अट्ठाईस विशेषज्ञताएँ।'}</h2>
            </div>
            <p style={{fontSize:15, lineHeight:1.65, color:'var(--dnh-ink-soft)', margin:0, maxWidth:560, fontWeight:300}}>{lang==='en'?'A short, deliberate list. Each department is led by a consultant who teaches in the medical college on the same campus, the same week.':'एक छोटी, सोची-समझी सूची। प्रत्येक विभाग का नेतृत्व एक ऐसे परामर्शदाता द्वारा किया जाता है जो उसी सप्ताह, उसी परिसर के मेडिकल कॉलेज में पढ़ाते भी हैं।'}</p>
          </div>
          <div style={{borderTop:'1px solid var(--dnh-line-soft)'}}>
            {list.map(([t,s],i)=>(
              <a key={i} href="#" style={{display:'grid', gridTemplateColumns:'56px 1fr 1fr 24px', gap:32, padding:'18px 0', borderBottom:'1px solid var(--dnh-line-soft)', textDecoration:'none', color:'inherit', alignItems:'baseline', transition:'padding .2s'}}
                 onMouseOver={(e)=>{e.currentTarget.style.paddingLeft='12px'; e.currentTarget.style.background='var(--dnh-paper)';}}
                 onMouseOut={(e)=>{e.currentTarget.style.paddingLeft='0'; e.currentTarget.style.background='transparent';}}>
                <div className="dnh-mono" style={{fontSize:11, color:'var(--dnh-primary)', letterSpacing:'0.10em'}}>{String(i+1).padStart(2,'0')}</div>
                <div className="dnh-serif" style={{fontSize:22, fontWeight:400, letterSpacing:'-0.005em'}}>{t}</div>
                <div style={{fontSize:13.5, color:'var(--dnh-ink-soft)'}}>{s}</div>
                <div style={{color:'var(--dnh-primary)', textAlign:'right'}}><MIcon.arrow s={14}/></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function CollegeM({lang}) {
    const c = I.college[lang];
    return (
      <section style={{padding:'140px 56px', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1180, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:96, alignItems:'center'}}>
          <div>
            <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:18, textTransform:'uppercase'}}>{c.kicker}</div>
            <h2 className="dnh-serif" style={{fontSize:56, lineHeight:1.05, fontWeight:300, margin:'0 0 32px', letterSpacing:'-0.022em', color:'var(--dnh-deep)'}}>{c.title}</h2>
            <p style={{fontSize:17, lineHeight:1.65, color:'var(--dnh-ink-soft)', margin:'0 0 32px', fontWeight:300, maxWidth:480}}>{c.body}</p>
            <a href="#" className="dnh-link" style={{fontSize:14}}>{I.cta[lang].apply} →</a>
          </div>
          <div style={{borderTop:'1px solid var(--dnh-deep)', paddingTop:32}}>
            {[['MBBS', '150', lang==='en'?'seats / yr':'सीटें / वर्ष'], ['PG', '84', lang==='en'?'seats across 21 specialties':'सीटें · २१ विशेषज्ञताएँ'], [lang==='en'?'Faculty':'शिक्षक', '186', lang==='en'?'consultants who teach':'अध्यापन करने वाले परामर्शदाता'], [lang==='en'?'Ratio':'अनुपात', '1 : 8', lang==='en'?'faculty to student':'शिक्षक : छात्र']].map(([k,n,l],i)=>(
              <div key={i} style={{display:'grid', gridTemplateColumns:'120px 120px 1fr', gap:24, padding:'18px 0', borderBottom:'1px solid var(--dnh-line-soft)', alignItems:'baseline'}}>
                <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.10em', color:'var(--dnh-ink-soft)', textTransform:'uppercase'}}>{k}</div>
                <div className="dnh-serif" style={{fontSize:36, fontWeight:300, letterSpacing:'-0.02em'}}>{n}</div>
                <div style={{fontSize:13, color:'var(--dnh-ink-soft)'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function NewsM({lang}) {
    const n = I.news[lang];
    return (
      <section style={{padding:'120px 56px', background:'var(--dnh-white)', borderTop:'1px solid var(--dnh-line-soft)'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:32}}>
            <h2 className="dnh-serif" style={{fontSize:32, fontWeight:300, margin:0, letterSpacing:'-0.02em'}}>{lang==='en'?'Recently':'हाल ही में'}</h2>
            <a href="#" className="dnh-link" style={{fontSize:13}}>{I.cta[lang].all} →</a>
          </div>
          <div style={{borderTop:'1px solid var(--dnh-line-soft)'}}>
            {n.map(([k,t,m],i)=>(
              <a key={i} href="#" style={{display:'grid', gridTemplateColumns:'120px 1fr 180px', gap:32, padding:'24px 0', borderBottom:'1px solid var(--dnh-line-soft)', textDecoration:'none', color:'inherit', alignItems:'baseline'}}>
                <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--dnh-primary)', textTransform:'uppercase'}}>{k}</div>
                <div className="dnh-serif" style={{fontSize:20, fontWeight:400, lineHeight:1.35}}>{t}</div>
                <div style={{fontSize:12, color:'var(--dnh-ink-soft)', textAlign:'right'}}>{m}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function LocationsM({lang}) {
    const l = I.locations[lang];
    return (
      <section style={{padding:'120px 56px', background:'var(--dnh-paper)'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color:'var(--dnh-primary)', marginBottom:24, textTransform:'uppercase'}}>{lang==='en'?'NETWORK':'नेटवर्क'}</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', columnGap:64, rowGap:36}}>
            {l.map(([t, s], i)=>(
              <div key={i} style={{borderTop:'1px solid var(--dnh-deep)', paddingTop:18}}>
                <div className="dnh-serif" style={{fontSize:24, fontWeight:400, marginBottom:8, letterSpacing:'-0.01em'}}>{t}</div>
                <div style={{fontSize:14, color:'var(--dnh-ink-soft)', lineHeight:1.6}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function FooterM({lang}) {
    const f = I.footer[lang], b = I.brand[lang];
    return (
      <footer style={{background:'var(--dnh-paper)', borderTop:'1px solid var(--dnh-line-soft)', padding:'60px 56px 36px'}}>
        <div style={{maxWidth:1180, margin:'0 auto'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48}}>
            <div className="dnh-serif" style={{fontSize:42, fontWeight:300, letterSpacing:'-0.02em', color:'var(--dnh-deep)', maxWidth:560, lineHeight:1.05}}>
              {b.tagline}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
              <a href="#" className="dnh-link" style={{fontSize:13}}>{I.cta[lang].book} →</a>
              <a href="#" className="dnh-link" style={{fontSize:13}}>{I.cta[lang].emergency} →</a>
              <a href="#" className="dnh-link" style={{fontSize:13}}>{lang==='en'?'Donate':'दान करें'} →</a>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingTop:18, borderTop:'1px solid var(--dnh-line-soft)', fontSize:11, color:'var(--dnh-ink-soft)'}}>
            <div style={{display:'flex', gap:18}}>
              <a href="#" style={{color:'inherit', textDecoration:'none'}}>{f.privacy}</a>
              <a href="#" style={{color:'inherit', textDecoration:'none'}}>{f.terms}</a>
              <a href="#" style={{color:'inherit', textDecoration:'none'}}>{f.access}</a>
              <a href="#" style={{color:'inherit', textDecoration:'none'}}>{f.grievance}</a>
            </div>
            <span>{f.rights}</span>
          </div>
        </div>
      </footer>
    );
  }

  function Minimal({lang, setLang}) {
    return (
      <div className="dnh-screen dnh-root" data-screen-label="C · Minimal" style={{background:'var(--dnh-paper)'}}>
        <Header lang={lang} setLang={setLang}/>
        <HeroM lang={lang}/>
        <GlimpseM lang={lang}/>
        <StoryM lang={lang}/>
        <DepartmentsListM lang={lang}/>
        <CollegeM lang={lang}/>
        <NewsM lang={lang}/>
        <LocationsM lang={lang}/>
        <FooterM lang={lang}/>
      </div>
    );
  }

  window.DNH_Minimal = Minimal;
})();
