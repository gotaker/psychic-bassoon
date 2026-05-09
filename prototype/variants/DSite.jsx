// Direction D — Site shell: Hybrid homepage + 3 interior pages.
// Hash routing: #/, #/find, #/cardiology, #/book.
// Adds sticky Book/Emergency CTA bar across all pages.

(function () {
  const I = window.DNH_I18N;
  const { useState, useEffect, useMemo } = React;

  // ---------- shared atoms ----------

  const Mono = ({children, color}) => (
    <div className="dnh-mono" style={{fontSize:11, letterSpacing:'0.18em', color: color||'var(--dnh-primary)', textTransform:'uppercase'}}>{children}</div>
  );

  const Icon = {
    arrow: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
    search: (p={}) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>,
    pin: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/></svg>,
    phone: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>,
    cal: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
    check: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>,
    chev: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
    back: (p={}) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>,
    star: (p={}) => <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="currentColor"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.7 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z"/></svg>
  };

  // ---------- routing ----------

  function useRoute() {
    const get = () => (window.location.hash.replace(/^#\/?/, '') || 'home');
    const [r, setR] = useState(get());
    useEffect(() => {
      const onHash = () => { setR(get()); window.scrollTo(0, 0); };
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);
    return r;
  }

  const go = (route) => { window.location.hash = '#/' + (route === 'home' ? '' : route); };

  // ---------- site sub-nav (shows context: "you are inside D site demo") ----------

  function SiteRibbon({lang, route}) {
    const items = [
      {id:'home', en:'Home', hi:'होम'},
      {id:'find', en:'Find a doctor', hi:'चिकित्सक खोजें'},
      {id:'cardiology', en:'Cardiology', hi:'हृदय विज्ञान'},
      {id:'book', en:'Book appointment', hi:'अपॉइंटमेंट'}
    ];
    return (
      <div style={{background:'var(--dnh-deep)', color:'rgba(255,255,255,.85)', borderBottom:'1px solid rgba(255,255,255,.08)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', gap:24, height:36, fontSize:12}}>
          <span style={{font:'500 10px/1 var(--dnh-mono)', letterSpacing:'0.18em', opacity:.55, textTransform:'uppercase'}}>D · Site demo</span>
          <span style={{width:1, height:14, background:'rgba(255,255,255,.16)'}}/>
          <nav style={{display:'flex', alignItems:'center', gap:18}}>
            {items.map(it => (
              <a key={it.id} href={'#/' + (it.id==='home'?'':it.id)}
                 style={{color: route===it.id ? '#fff' : 'rgba(255,255,255,.7)', textDecoration:'none', fontSize:12, fontWeight: route===it.id ? 600 : 500, letterSpacing:'-0.005em', display:'flex', alignItems:'center', gap:6}}>
                {route===it.id && <span style={{width:5, height:5, borderRadius:'50%', background:'var(--dnh-accent)'}}/>}
                {lang==='en' ? it.en : it.hi}
              </a>
            ))}
          </nav>
          <span style={{marginLeft:'auto', opacity:.55, fontSize:11, letterSpacing:'0.04em'}}>{lang==='en' ? 'Three interior pages linked from the homepage.' : 'मुख्य पृष्ठ से जुड़े तीन आंतरिक पृष्ठ।'}</span>
        </div>
      </div>
    );
  }

  // ---------- sticky CTA bar ----------

  function StickyBar({lang}) {
    return (
      <div style={{position:'fixed', bottom:0, left:0, right:0, zIndex:50, padding:'14px 24px', pointerEvents:'none'}}>
        <div style={{maxWidth:1100, margin:'0 auto', background:'rgba(14,31,34,0.96)', color:'#fff', borderRadius:999, boxShadow:'0 16px 40px rgba(14,31,34,.28), 0 2px 8px rgba(0,0,0,.16)', display:'flex', alignItems:'center', padding:'8px 8px 8px 22px', gap:14, pointerEvents:'auto', backdropFilter:'blur(8px)'}}>
          <span style={{display:'flex', alignItems:'center', gap:10, fontSize:13.5, fontWeight:500}}>
            <span style={{width:8, height:8, borderRadius:'50%', background:'#7be29a', boxShadow:'0 0 0 3px rgba(123,226,154,.25)'}}/>
            {lang==='en' ? 'OPD open · 27 doctors taking appointments today' : 'ओपीडी खुली · आज २७ चिकित्सक उपलब्ध'}
          </span>
          <span style={{flex:1}}/>
          <a href="tel:102" style={{display:'inline-flex', alignItems:'center', gap:8, padding:'10px 16px', borderRadius:999, background:'var(--dnh-emergency)', color:'#fff', textDecoration:'none', font:'600 13px var(--dnh-sans)', letterSpacing:'-0.005em'}}>
            <Icon.phone s={13}/> {lang==='en' ? 'Emergency · 102' : 'आपात · १०२'}
          </a>
          <a href="#/book" style={{display:'inline-flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:999, background:'#fff', color:'var(--dnh-deep)', textDecoration:'none', font:'600 13px var(--dnh-sans)', letterSpacing:'-0.005em'}}>
            {lang==='en' ? 'Book appointment' : 'अपॉइंटमेंट लें'} <Icon.arrow s={13}/>
          </a>
        </div>
      </div>
    );
  }

  // ---------- interior page chrome ----------

  function PageHeader({lang, setLang, route}) {
    const links = [
      {id:'find', en:'Find a doctor', hi:'चिकित्सक खोजें'},
      {id:'cardiology', en:'Departments', hi:'विभाग'},
      {id:'book', en:'Book', hi:'अपॉइंटमेंट'}
    ];
    return (
      <header style={{borderBottom:'1px solid var(--dnh-line-soft)', background:'#fff', position:'sticky', top:0, zIndex:30}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', height:72, display:'flex', alignItems:'center', gap:32}}>
          <a href="#/" style={{display:'flex', alignItems:'center', gap:14, textDecoration:'none', color:'var(--dnh-deep)'}}>
            <div style={{width:36, height:36, borderRadius:'50%', background:'var(--dnh-deep)', color:'#fff', display:'grid', placeItems:'center', font:'600 14px/1 var(--dnh-sans-en)'}}>द</div>
            <div style={{lineHeight:1.1}}>
              <div className="dnh-serif" style={{fontSize:18, fontWeight:500, letterSpacing:'-0.01em'}}>{lang==='en' ? 'Dev Nandini Hospital' : 'देव नंदिनी अस्पताल'}</div>
              <div className="dnh-mono" style={{fontSize:9.5, letterSpacing:'0.16em', color:'var(--dnh-ink-soft)', marginTop:3}}>EST. 1958 · HAPUR</div>
            </div>
          </a>
          <nav style={{display:'flex', alignItems:'center', gap:28, marginLeft:24}}>
            {links.map(l=>(
              <a key={l.id} href={'#/'+l.id} style={{color: route===l.id ? 'var(--dnh-deep)' : 'var(--dnh-ink-soft)', textDecoration:'none', fontSize:13.5, fontWeight: route===l.id ? 600 : 500, position:'relative', paddingBottom:4, borderBottom: route===l.id ? '2px solid var(--dnh-primary)' : '2px solid transparent'}}>{lang==='en'?l.en:l.hi}</a>
            ))}
          </nav>
          <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:12}}>
            <div style={{display:'inline-flex', background:'var(--dnh-paper)', borderRadius:999, padding:3}}>
              {['en','hi'].map(L=>(
                <button key={L} onClick={()=>setLang(L)} style={{appearance:'none', border:0, background: lang===L ? 'var(--dnh-deep)' : 'transparent', color: lang===L ? '#fff' : 'var(--dnh-ink-soft)', font:'500 11px/1 var(--dnh-sans-en)', padding:'7px 11px', borderRadius:999, cursor:'pointer'}}>{L==='en'?'EN':'हिंदी'}</button>
              ))}
            </div>
            <a href="#/book" className="dnh-btn dnh-btn--primary" style={{padding:'10px 18px', font:'600 13px var(--dnh-sans)'}}>{lang==='en'?'Book':'अपॉइंटमेंट'}</a>
          </div>
        </div>
      </header>
    );
  }

  function SimpleFooter({lang}) {
    return (
      <footer style={{padding:'48px 0 110px', background:'var(--dnh-paper-2)', borderTop:'1px solid var(--dnh-line-soft)', color:'var(--dnh-ink-soft)', fontSize:12}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'flex', justifyContent:'space-between', gap:24, flexWrap:'wrap'}}>
          <span>© {new Date().getFullYear()} Dev Nandini Hospital · NABH · NMC · NABL · ISO 15189</span>
          <span>{lang==='en' ? 'Hapur · Uttar Pradesh · India · +91 80 4422 0099' : 'हापुड़ · उत्तर प्रदेश · भारत · +९१ ८० ४४२२ ००९९'}</span>
        </div>
      </footer>
    );
  }

  // ---------- doctor data ----------

  const DOCTORS_EN = [
    {id:'kapoor', name:'Dr. Anjali Kapoor', spec:'Cardiology · Interventional', bio:'1,800+ angioplasties. AIIMS New Delhi, Cleveland Clinic fellowship.', exp:24, lang:'EN · HI · PA', loc:'Hapur main', next:'Tomorrow 09:30', tone:'#5a7a82'},
    {id:'desai',  name:'Dr. Rohan Desai',   spec:'Cardiology · Electrophysiology', bio:'Pacemaker, ablation, ICD. PGI Chandigarh, Toronto General.', exp:18, lang:'EN · HI · GU', loc:'Hapur main', next:'Today 16:15', tone:'#3a5e6a'},
    {id:'iyer',   name:'Dr. Meera Iyer',    spec:'Pediatrics · Neonatology', bio:'Level-III NICU. CMC Vellore, Great Ormond Street.', exp:21, lang:'EN · HI · TA', loc:'Hapur main', next:'Today 11:00', tone:'#8a7355'},
    {id:'nair',   name:'Dr. Suresh Nair',   spec:'Orthopedics · Joint replacement', bio:'4,000+ knee & hip arthroplasties. Apollo, Mumbai.', exp:26, lang:'EN · HI · ML', loc:'Annexe', next:'Tomorrow 14:00', tone:'#6a5a3a'},
    {id:'sharma', name:'Dr. Priya Sharma',  spec:'Obstetrics & Gynecology', bio:'High-risk pregnancy, fetal medicine. KEM Mumbai.', exp:19, lang:'EN · HI · MR', loc:'Hapur main', next:'Today 12:30', tone:'#7a8868'},
    {id:'khan',   name:'Dr. Imran Khan',    spec:'Neurology · Stroke', bio:'Door-to-needle 28 min. AIIMS, NHS Birmingham.', exp:17, lang:'EN · HI · UR', loc:'Hapur main', next:'Tomorrow 10:45', tone:'#5a4a5a'},
    {id:'rao',    name:'Dr. Lakshmi Rao',   spec:'Oncology · Medical', bio:'Solid tumors, clinical trials. Tata Memorial, MD Anderson.', exp:22, lang:'EN · HI · TE', loc:'Cancer wing', next:'Wed 09:00', tone:'#7a4a4a'},
    {id:'mehta',  name:'Dr. Vinod Mehta',   spec:'Gastroenterology', bio:'IBD, hepatology, ERCP. PGI Chandigarh, Mayo Clinic.', exp:20, lang:'EN · HI · PA', loc:'Hapur main', next:'Tomorrow 15:30', tone:'#5a6a4a'}
  ];
  const DOCTORS_HI = [
    {id:'kapoor', name:'डॉ. अंजलि कपूर', spec:'हृदय विज्ञान · इंटरवेंशनल', bio:'१,८००+ एंजियोप्लास्टी। एम्स दिल्ली, क्लीवलैंड फेलोशिप।', exp:24, lang:'अं · हिं · पं', loc:'मुख्य परिसर', next:'कल ०९:३०', tone:'#5a7a82'},
    {id:'desai',  name:'डॉ. रोहन देसाई',   spec:'हृदय विज्ञान · इलेक्ट्रोफिज़ियोलॉजी', bio:'पेसमेकर, एब्लेशन, आईसीडी। पीजीआई, टोरंटो जनरल।', exp:18, lang:'अं · हिं · गु', loc:'मुख्य परिसर', next:'आज १६:१५', tone:'#3a5e6a'},
    {id:'iyer',   name:'डॉ. मीरा अय्यर',  spec:'बाल चिकित्सा · नवजात', bio:'लेवल-III एनआईसीयू। सीएमसी वेल्लोर, ग्रेट ऑरमंड स्ट्रीट।', exp:21, lang:'अं · हिं · ता', loc:'मुख्य परिसर', next:'आज ११:००', tone:'#8a7355'},
    {id:'nair',   name:'डॉ. सुरेश नायर',  spec:'अस्थि रोग · जोड़ प्रत्यारोपण', bio:'४,०००+ घुटना व कूल्हा प्रत्यारोपण। अपोलो, मुंबई।', exp:26, lang:'अं · हिं · मल', loc:'अनुलग्नक', next:'कल १४:००', tone:'#6a5a3a'},
    {id:'sharma', name:'डॉ. प्रिया शर्मा', spec:'प्रसूति एवं स्त्री रोग', bio:'उच्च-जोखिम गर्भधारण, भ्रूण चिकित्सा। केईएम मुंबई।', exp:19, lang:'अं · हिं · मरा', loc:'मुख्य परिसर', next:'आज १२:३०', tone:'#7a8868'},
    {id:'khan',   name:'डॉ. इमरान खान',   spec:'न्यूरोलॉजी · स्ट्रोक', bio:'डोर-टू-नीडल २८ मिनट। एम्स, NHS बर्मिंघम।', exp:17, lang:'अं · हिं · उर्दू', loc:'मुख्य परिसर', next:'कल १०:४५', tone:'#5a4a5a'},
    {id:'rao',    name:'डॉ. लक्ष्मी राव', spec:'ऑन्कोलॉजी · चिकित्सकीय', bio:'सॉलिड ट्यूमर, क्लिनिकल ट्रायल। टाटा मेमोरियल।', exp:22, lang:'अं · हिं · ते', loc:'कैंसर विंग', next:'बुध ०९:००', tone:'#7a4a4a'},
    {id:'mehta',  name:'डॉ. विनोद मेहता',  spec:'गैस्ट्रो एंटरोलॉजी', bio:'आईबीडी, हेपेटोलॉजी, ईआरसीपी। पीजीआई, मेयो।', exp:20, lang:'अं · हिं · पं', loc:'मुख्य परिसर', next:'कल १५:३०', tone:'#5a6a4a'}
  ];

  function DocAvatar({tone, initials, size=64}) {
    return (
      <div style={{width:size, height:size, borderRadius:'50%', background:`linear-gradient(135deg, ${tone}, ${tone}99 60%, #1d2528)`, color:'rgba(255,255,255,.92)', display:'grid', placeItems:'center', font:`500 ${size/3}px/1 var(--dnh-serif)`, letterSpacing:'-0.01em', flexShrink:0, boxShadow:'inset 0 -8px 24px rgba(0,0,0,.18)'}}>{initials}</div>
    );
  }

  // ---------- FIND A DOCTOR ----------

  function FindDoctor({lang}) {
    const all = lang==='en' ? DOCTORS_EN : DOCTORS_HI;
    const specs = lang==='en'
      ? ['All', 'Cardiology', 'Pediatrics', 'Orthopedics', 'OB-GYN', 'Neurology', 'Oncology', 'Gastro']
      : ['सभी', 'हृदय', 'बाल', 'अस्थि', 'स्त्री रोग', 'न्यूरो', 'ऑन्को', 'गैस्ट्रो'];
    const days = lang==='en' ? ['Any day', 'Today', 'Tomorrow', 'This week'] : ['किसी भी दिन', 'आज', 'कल', 'इस सप्ताह'];
    const [q, setQ] = useState('');
    const [spec, setSpec] = useState(0);
    const [day, setDay] = useState(0);
    const filtered = useMemo(() => {
      return all.filter((d, i) => {
        if (q && !(d.name.toLowerCase()+' '+d.spec.toLowerCase()).includes(q.toLowerCase())) return false;
        if (spec > 0) {
          const map = {1:'card', 2:lang==='en'?'pediat':'बाल', 3:lang==='en'?'ortho':'अस्थि', 4:lang==='en'?'ob':'स्त्री', 5:lang==='en'?'neuro':'न्यूरो', 6:lang==='en'?'onco':'ऑन्को', 7:lang==='en'?'gastro':'गैस्ट्रो'};
          if (!d.spec.toLowerCase().includes(map[spec].toLowerCase())) return false;
        }
        if (day === 1 && !d.next.toLowerCase().includes(lang==='en'?'today':'आज')) return false;
        if (day === 2 && !d.next.toLowerCase().includes(lang==='en'?'tomorrow':'कल')) return false;
        return true;
      });
    }, [all, q, spec, day, lang]);

    return (
      <main style={{background:'var(--dnh-paper)', minHeight:'100vh'}}>
        <section style={{background:'#fff', borderBottom:'1px solid var(--dnh-line-soft)', padding:'56px 0 40px'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--dnh-ink-soft)', marginBottom:18}}>
              <a href="#/" style={{color:'inherit', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6}}><Icon.back s={12}/>{lang==='en'?'Home':'होम'}</a>
              <span>·</span><span>{lang==='en'?'Find a doctor':'चिकित्सक खोजें'}</span>
            </div>
            <Mono>{lang==='en'?'CONSULTANTS · 184 PHYSICIANS · 28 SPECIALTIES':'चिकित्सक · १८४ · २८ विशेषज्ञताएँ'}</Mono>
            <h1 className="dnh-serif" style={{fontSize:64, lineHeight:1.02, fontWeight:400, margin:'14px 0 32px', letterSpacing:'-0.02em', maxWidth:880}}>{lang==='en'?'Find a doctor by name, specialty, or the day you can come.':'नाम, विशेषज्ञता या उपलब्ध दिन से चिकित्सक खोजें।'}</h1>
            <div style={{background:'var(--dnh-paper)', border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'8px 8px 8px 20px', display:'flex', alignItems:'center', gap:16, maxWidth:880}}>
              <Icon.search s={18}/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder={lang==='en'?'e.g. Anjali Kapoor, cardiology, pacemaker':'उदा. अंजलि कपूर, हृदय रोग, पेसमेकर'} style={{flex:1, appearance:'none', border:0, background:'transparent', font:'500 16px/1.2 var(--dnh-sans)', padding:'14px 0', color:'var(--dnh-ink)', outline:'none'}}/>
              <button className="dnh-btn dnh-btn--primary" style={{padding:'12px 20px'}}>{lang==='en'?'Search':'खोजें'}</button>
            </div>
            <div style={{display:'flex', gap:14, marginTop:22, flexWrap:'wrap'}}>
              <FilterGroup label={lang==='en'?'Specialty':'विशेषज्ञता'} options={specs} value={spec} onChange={setSpec}/>
              <FilterGroup label={lang==='en'?'Available':'उपलब्ध'} options={days} value={day} onChange={setDay}/>
            </div>
          </div>
        </section>

        <section style={{padding:'48px 0 80px'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:28}}>
              <div style={{fontSize:14, color:'var(--dnh-ink-soft)'}}>{lang==='en' ? <><strong style={{color:'var(--dnh-ink)'}}>{filtered.length}</strong> consultants match your filters</> : <><strong style={{color:'var(--dnh-ink)'}}>{filtered.length}</strong> चिकित्सक मिले</>}</div>
              <div style={{fontSize:12, color:'var(--dnh-ink-soft)'}}>{lang==='en'?'Sort: Soonest available':'क्रम: निकटतम'}</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18}}>
              {filtered.map(d => (
                <article key={d.id} style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'24px 26px', display:'grid', gridTemplateColumns:'80px 1fr', gap:20}}>
                  <DocAvatar tone={d.tone} initials={d.name.split(' ').slice(-2).map(s=>s[0]).join('')} size={72}/>
                  <div>
                    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:12, marginBottom:4}}>
                      <h3 className="dnh-serif" style={{fontSize:22, fontWeight:500, margin:0, letterSpacing:'-0.015em'}}>{d.name}</h3>
                      <span className="dnh-mono" style={{fontSize:10, color:'var(--dnh-primary)', letterSpacing:'0.12em', whiteSpace:'nowrap'}}>{d.exp}Y · EXP</span>
                    </div>
                    <div style={{fontSize:13.5, color:'var(--dnh-primary)', marginBottom:10, fontWeight:500}}>{d.spec}</div>
                    <p style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.55, margin:'0 0 14px'}}>{d.bio}</p>
                    <div style={{display:'flex', gap:18, fontSize:11.5, color:'var(--dnh-ink-soft)', marginBottom:16, flexWrap:'wrap'}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:5}}><Icon.pin s={11}/> {d.loc}</span>
                      <span>{d.lang}</span>
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, paddingTop:14, borderTop:'1px solid var(--dnh-line-soft)'}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:12.5}}>
                        <span style={{width:7, height:7, borderRadius:'50%', background:'#3a9b65'}}/>
                        <span style={{color:'var(--dnh-ink-soft)'}}>{lang==='en'?'Next slot':'अगला समय'}</span>
                        <strong style={{color:'var(--dnh-ink)'}}>{d.next}</strong>
                      </span>
                      <a href="#/book" className="dnh-btn dnh-btn--primary" style={{padding:'8px 14px', fontSize:12.5}}>{lang==='en'?'Book':'बुक'} <Icon.arrow s={12}/></a>
                    </div>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && (
                <div style={{gridColumn:'span 2', padding:'48px', textAlign:'center', color:'var(--dnh-ink-soft)', border:'1px dashed var(--dnh-line-soft)', borderRadius:8}}>{lang==='en'?'No matches. Try a different filter.':'कोई परिणाम नहीं। दूसरा फ़िल्टर आज़माएँ।'}</div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  function FilterGroup({label, options, value, onChange}) {
    return (
      <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'4px 4px 4px 16px', background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:999}}>
        <span style={{fontSize:11.5, color:'var(--dnh-ink-soft)', letterSpacing:'0.04em', fontWeight:500}}>{label}</span>
        <div style={{display:'flex', gap:4}}>
          {options.map((o, i) => (
            <button key={i} onClick={()=>onChange(i)} style={{appearance:'none', border:0, background: value===i ? 'var(--dnh-deep)' : 'transparent', color: value===i ? '#fff' : 'var(--dnh-ink-soft)', font:'500 12px var(--dnh-sans)', padding:'7px 12px', borderRadius:999, cursor:'pointer', whiteSpace:'nowrap'}}>{o}</button>
          ))}
        </div>
      </div>
    );
  }

  // ---------- CARDIOLOGY DEPARTMENT ----------

  function Cardiology({lang}) {
    const team = (lang==='en' ? DOCTORS_EN : DOCTORS_HI).filter(d => d.spec.toLowerCase().includes(lang==='en'?'card':'हृदय'));
    const procedures = lang==='en' ? [
      ['Coronary angioplasty', '1,800 / year', 'Stents, drug-eluting and bioresorbable. Radial-first protocol since 2019.'],
      ['Pacemaker & ICD', '420 / year', 'Single, dual, and CRT-D devices. Same-day discharge in 60% of cases.'],
      ['Electrophysiology & ablation', '180 / year', 'AF, AVNRT, VT mapping with 3D EnSite. Cryo and RF ablation.'],
      ['CABG (open heart)', '240 / year', 'Beating-heart and minimally-invasive approaches. ICU 2.4 days median.'],
      ['Structural heart', '95 / year', 'TAVR, MitraClip, ASD/VSD device closure. Hybrid OR.'],
      ['Heart-failure clinic', '2,400 visits', 'Multidisciplinary, with rehab, dietetics, and home-monitoring.']
    ] : [
      ['कोरोनरी एंजियोप्लास्टी', '१,८०० / वर्ष', 'स्टेंट — ड्रग-एल्यूटिंग व बायोरिज़ॉर्बेबल। २०१९ से रेडियल-प्रथम।'],
      ['पेसमेकर व आईसीडी', '४२० / वर्ष', 'एकल, द्वि-कक्षीय, सीआरटी-डी। ६०% मामलों में सेम-डे डिस्चार्ज।'],
      ['इलेक्ट्रोफिज़ियोलॉजी व एब्लेशन', '१८० / वर्ष', 'AF, AVNRT, VT — 3D EnSite मैपिंग। क्रायो व RF।'],
      ['CABG (ओपन हार्ट)', '२४० / वर्ष', 'बीटिंग-हार्ट व मिनिमली-इनवेसिव। मध्यम ICU २.४ दिन।'],
      ['स्ट्रक्चरल हार्ट', '९५ / वर्ष', 'TAVR, MitraClip, ASD/VSD क्लोज़र। हाइब्रिड OR।'],
      ['हृदय-विफलता क्लिनिक', '२,४०० विज़िट', 'पुनर्वास, आहार, होम-मॉनिटरिंग।']
    ];
    const outcomes = lang==='en' ? [
      ['Door-to-balloon', '38 min', 'Median time from arrival to angioplasty for STEMI patients.', '< 90 min target'],
      ['30-day mortality', '1.7%', 'For elective coronary intervention. Risk-adjusted.', 'Indian benchmark · 2.4%'],
      ['Same-day discharge', '60%', 'Of pacemaker implants. National-leading rate.', 'Average · 28%'],
      ['Patient-reported outcomes', '94%', 'Would recommend the cath-lab team to family.', 'Survey n = 1,240']
    ] : [
      ['डोर-टू-बलून', '३८ मिनट', 'STEMI रोगियों हेतु मध्यम समय।', '< ९० मिनट लक्ष्य'],
      ['३० दिन मृत्यु दर', '१.७%', 'इलेक्टिव कोरोनरी प्रक्रिया। जोखिम-समायोजित।', 'भारतीय बेंचमार्क · २.४%'],
      ['सेम-डे डिस्चार्ज', '६०%', 'पेसमेकर इम्प्लांट का। राष्ट्रीय अग्रणी।', 'औसत · २८%'],
      ['रोगी संतुष्टि', '९४%', 'कैथ-लैब टीम की अनुशंसा करेंगे।', 'सर्वे n = १,२४०']
    ];
    return (
      <main style={{background:'var(--dnh-paper)', minHeight:'100vh'}}>
        {/* Hero */}
        <section style={{background:'#fff', borderBottom:'1px solid var(--dnh-line-soft)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--dnh-ink-soft)', padding:'24px 0 0'}}>
              <a href="#/" style={{color:'inherit', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6}}><Icon.back s={12}/>{lang==='en'?'Home':'होम'}</a>
              <span>·</span><span>{lang==='en'?'Departments':'विभाग'}</span><span>·</span><span style={{color:'var(--dnh-ink)'}}>{lang==='en'?'Cardiology':'हृदय विज्ञान'}</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, padding:'48px 0 72px', alignItems:'center'}}>
              <div>
                <Mono>{lang==='en'?'DEPARTMENT — 12 / 28':'विभाग — १२ / २८'}</Mono>
                <h1 className="dnh-serif" style={{fontSize:84, lineHeight:0.98, fontWeight:400, margin:'18px 0 24px', letterSpacing:'-0.025em'}}>{lang==='en'?'Cardiology.':'हृदय विज्ञान।'}</h1>
                <p style={{fontSize:19, lineHeight:1.5, color:'var(--dnh-ink-soft)', margin:'0 0 28px', maxWidth:520, letterSpacing:'-0.005em'}}>{lang==='en'
                  ? 'Twenty-three consultants, three cath-labs, a hybrid OR, and a 24-hour STEMI line. Door-to-balloon time of 38 minutes — among the fastest in north India.'
                  : 'तेईस चिकित्सक, तीन कैथ-लैब, हाइब्रिड OR, २४ घंटे की STEMI लाइन। डोर-टू-बलून समय ३८ मिनट — उत्तर भारत में अग्रणी।'}</p>
                <div style={{display:'flex', gap:12}}>
                  <a href="#/book" className="dnh-btn dnh-btn--primary" style={{padding:'14px 22px'}}>{lang==='en'?'Book a consultation':'परामर्श बुक करें'} <Icon.arrow/></a>
                  <a href="#/find" className="dnh-btn dnh-btn--ghost" style={{padding:'14px 22px'}}>{lang==='en'?'See all 23 doctors':'सभी २३ चिकित्सक'} →</a>
                </div>
              </div>
              <div style={{aspectRatio:'4/5', background:'linear-gradient(155deg, #e6c8a8 0%, #b88a5e 35%, #4a3520 100%)', borderRadius:6, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', inset:0, background:'radial-gradient(70% 50% at 70% 30%, rgba(255,255,255,.18), transparent 60%)'}}/>
                <div style={{position:'absolute', left:24, top:24, color:'rgba(255,255,255,.78)', font:'500 10px/1 var(--dnh-mono)', letterSpacing:'0.16em'}}>CATH-LAB TWO · 06:42</div>
                <div style={{position:'absolute', left:28, bottom:28, right:28, color:'rgba(255,255,255,.95)'}}>
                  <div className="dnh-serif" style={{fontSize:34, lineHeight:1.05, fontWeight:400, letterSpacing:'-0.015em', maxWidth:420}}>{lang==='en'?'The first case of the day, before the lights come up.':'दिन का पहला मामला, रोशनी से पहले।'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Procedures */}
        <section style={{padding:'88px 0', background:'var(--dnh-paper)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36, gap:48}}>
              <div>
                <Mono>{lang==='en'?'WHAT WE DO':'हमारा कार्य'}</Mono>
                <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:'14px 0 0', letterSpacing:'-0.015em'}}>{lang==='en'?'Six procedural lines, all under one roof.':'छह प्रक्रिया-धाराएँ, एक छत के नीचे।'}</h2>
              </div>
              <a href="#" className="dnh-link">{lang==='en'?'Treatment guide (PDF)':'उपचार गाइड (PDF)'} →</a>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', borderTop:'1px solid var(--dnh-line-soft)', borderLeft:'1px solid var(--dnh-line-soft)', background:'#fff'}}>
              {procedures.map(([t, n, d], i) => (
                <div key={i} style={{padding:'28px 26px', borderRight:'1px solid var(--dnh-line-soft)', borderBottom:'1px solid var(--dnh-line-soft)', minHeight:200}}>
                  <div className="dnh-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--dnh-primary)', marginBottom:14}}>{String(i+1).padStart(2,'0')}</div>
                  <div style={{fontSize:18, fontWeight:600, lineHeight:1.2, marginBottom:8}}>{t}</div>
                  <div className="dnh-serif" style={{fontSize:24, lineHeight:1, color:'var(--dnh-deep)', margin:'12px 0 14px', letterSpacing:'-0.01em'}}>{n}</div>
                  <div style={{fontSize:13, color:'var(--dnh-ink-soft)', lineHeight:1.55}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section style={{padding:'88px 0', background:'var(--dnh-deep)', color:'#fff'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:40, gap:48}}>
              <div>
                <Mono color="var(--dnh-accent)">{lang==='en'?'OUTCOMES — APRIL 2025 → MARCH 2026':'परिणाम — अप्रैल २०२५ → मार्च २०२६'}</Mono>
                <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:'14px 0 0', letterSpacing:'-0.015em'}}>{lang==='en'?'We publish what we measure.':'हम जो मापते हैं, उसे प्रकाशित करते हैं।'}</h2>
              </div>
              <a href="#" style={{color:'rgba(255,255,255,.8)', textDecoration:'none', borderBottom:'1px solid rgba(255,255,255,.4)', paddingBottom:2, fontSize:13}}>{lang==='en'?'Annual report':'वार्षिक रिपोर्ट'} →</a>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, borderTop:'1px solid rgba(255,255,255,.18)'}}>
              {outcomes.map(([k, v, d, b], i) => (
                <div key={i} style={{padding:'28px 24px 28px', borderRight: i<3 ? '1px solid rgba(255,255,255,.18)' : 'none', borderBottom:'1px solid rgba(255,255,255,.18)'}}>
                  <div style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', opacity:.6, marginBottom:14}}>{k}</div>
                  <div className="dnh-serif" style={{fontSize:64, lineHeight:0.95, fontWeight:400, margin:'0 0 18px', letterSpacing:'-0.025em'}}>{v}</div>
                  <div style={{fontSize:13, opacity:.85, lineHeight:1.5, marginBottom:12}}>{d}</div>
                  <div style={{fontSize:11, opacity:.5, fontStyle:'italic'}}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{padding:'88px 0', background:'#fff'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px'}}>
            <Mono>{lang==='en'?'CONSULTANTS — 23 IN CARDIOLOGY':'चिकित्सक — हृदय में २३'}</Mono>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:36, gap:48}}>
              <h2 className="dnh-serif" style={{fontSize:46, lineHeight:1.05, fontWeight:400, margin:'14px 0 0', letterSpacing:'-0.015em'}}>{lang==='en'?'Two consultants you can see this week.':'इस सप्ताह उपलब्ध दो चिकित्सक।'}</h2>
              <a href="#/find" className="dnh-link">{lang==='en'?'See full team':'पूरी टीम'} →</a>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18}}>
              {team.slice(0, 2).map(d => (
                <article key={d.id} style={{border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'28px 30px', display:'grid', gridTemplateColumns:'90px 1fr', gap:24}}>
                  <DocAvatar tone={d.tone} initials={d.name.split(' ').slice(-2).map(s=>s[0]).join('')} size={84}/>
                  <div>
                    <h3 className="dnh-serif" style={{fontSize:24, fontWeight:500, margin:'0 0 4px', letterSpacing:'-0.015em'}}>{d.name}</h3>
                    <div style={{fontSize:13.5, color:'var(--dnh-primary)', marginBottom:12, fontWeight:500}}>{d.spec}</div>
                    <p style={{fontSize:13.5, color:'var(--dnh-ink-soft)', lineHeight:1.55, margin:'0 0 18px'}}>{d.bio}</p>
                    <a href="#/book" className="dnh-btn dnh-btn--primary" style={{padding:'9px 16px', fontSize:13}}>{lang==='en'?'Book with':'बुक करें'} {d.name.split(' ').slice(-1)[0]} <Icon.arrow s={12}/></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* When to come */}
        <section style={{padding:'88px 0', background:'var(--dnh-paper-2)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80}}>
            <div>
              <Mono>{lang==='en'?'WHEN TO COME':'कब आएँ'}</Mono>
              <h2 className="dnh-serif" style={{fontSize:42, lineHeight:1.05, fontWeight:400, margin:'14px 0 0', letterSpacing:'-0.015em'}}>{lang==='en'?'If any of these are true, come the same day.':'इनमें से कोई भी हो — उसी दिन आएँ।'}</h2>
            </div>
            <ul style={{listStyle:'none', padding:0, margin:0, borderTop:'1px solid var(--dnh-line-soft)'}}>
              {(lang==='en' ? [
                'Chest pain or pressure lasting more than a few minutes',
                'Sudden shortness of breath, especially at rest or while lying flat',
                'Fainting, near-fainting, or palpitations that won\u2019t settle',
                'Swelling of legs that has worsened over days',
                'A heart-attack survivor needing follow-up or second opinion'
              ] : [
                'कुछ मिनटों से अधिक चलने वाला सीने में दर्द या दबाव',
                'अचानक साँस फूलना — विशेषकर आराम में या लेटने पर',
                'बेहोशी, चक्कर, या न रुकने वाली धड़कन',
                'पैरों में लगातार बढ़ती सूजन',
                'हृदयाघात के बाद फॉलो-अप या दूसरी राय हेतु'
              ]).map((s, i) => (
                <li key={i} style={{display:'flex', gap:18, padding:'18px 0', borderBottom:'1px solid var(--dnh-line-soft)', alignItems:'flex-start'}}>
                  <span style={{color:'var(--dnh-primary)', flexShrink:0, marginTop:2}}><Icon.check s={16}/></span>
                  <span style={{fontSize:16, lineHeight:1.45, color:'var(--dnh-ink)', letterSpacing:'-0.005em'}}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    );
  }

  // ---------- BOOKING FLOW ----------

  function Booking({lang}) {
    const [step, setStep] = useState(1);
    const [dept, setDept] = useState(null);
    const [docId, setDocId] = useState(null);
    const [slot, setSlot] = useState(null);
    const [form, setForm] = useState({name:'', phone:'', notes:''});

    const depts = lang==='en' ? [
      ['Cardiology', '23 doctors', '#5a7a82'],
      ['Pediatrics', '14 doctors', '#8a7355'],
      ['Orthopedics', '11 doctors', '#6a5a3a'],
      ['OB-GYN', '12 doctors', '#7a8868'],
      ['Neurology', '7 doctors', '#5a4a5a'],
      ['Oncology', '9 doctors', '#7a4a4a']
    ] : [
      ['हृदय विज्ञान', '२३ चिकित्सक', '#5a7a82'],
      ['बाल चिकित्सा', '१४ चिकित्सक', '#8a7355'],
      ['अस्थि रोग', '११ चिकित्सक', '#6a5a3a'],
      ['स्त्री रोग', '१२ चिकित्सक', '#7a8868'],
      ['न्यूरोलॉजी', '७ चिकित्सक', '#5a4a5a'],
      ['ऑन्कोलॉजी', '९ चिकित्सक', '#7a4a4a']
    ];

    const all = lang==='en' ? DOCTORS_EN : DOCTORS_HI;
    const docs = dept !== null
      ? all.filter(d => {
          const map = lang==='en' ? ['Cardiology','Pediatrics','Orthopedics','OB-GYN','Neurology','Oncology']
                                  : ['हृदय','बाल','अस्थि','स्त्री','न्यूरो','ऑन्को'];
          return d.spec.toLowerCase().includes(map[dept].toLowerCase());
        })
      : [];

    const slots = lang==='en'
      ? [['Today','Wed 7 May'], ['Tomorrow','Thu 8 May'], ['Friday','9 May'], ['Saturday','10 May']]
      : [['आज','बुध ७ मई'], ['कल','गुरु ८ मई'], ['शुक्र','९ मई'], ['शनि','१० मई']];
    const times = ['09:30', '10:15', '11:00', '11:45', '14:00', '14:45', '15:30', '16:15'];

    const stepLabels = lang==='en' ? ['Department', 'Doctor & time', 'Your details', 'Done'] : ['विभाग', 'चिकित्सक व समय', 'आपका विवरण', 'पूर्ण'];

    return (
      <main style={{background:'var(--dnh-paper)', minHeight:'100vh'}}>
        <section style={{background:'#fff', borderBottom:'1px solid var(--dnh-line-soft)'}}>
          <div style={{maxWidth:980, margin:'0 auto', padding:'48px 40px 36px'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--dnh-ink-soft)', marginBottom:18}}>
              <a href="#/" style={{color:'inherit', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6}}><Icon.back s={12}/>{lang==='en'?'Home':'होम'}</a>
              <span>·</span><span>{lang==='en'?'Book appointment':'अपॉइंटमेंट'}</span>
            </div>
            <Mono>{lang==='en'?'BOOK · NO LOGIN REQUIRED':'बुकिंग · लॉगिन आवश्यक नहीं'}</Mono>
            <h1 className="dnh-serif" style={{fontSize:56, lineHeight:1.02, fontWeight:400, margin:'14px 0 32px', letterSpacing:'-0.02em'}}>{lang==='en'?'Three short steps. Free cancellation up to two hours.':'तीन छोटे चरण। दो घंटे पूर्व निःशुल्क रद्दीकरण।'}</h1>
            <Stepper labels={stepLabels} step={step}/>
          </div>
        </section>

        <section style={{padding:'56px 0 100px'}}>
          <div style={{maxWidth:980, margin:'0 auto', padding:'0 40px'}}>

            {step === 1 && (
              <div>
                <h2 className="dnh-serif" style={{fontSize:30, fontWeight:400, margin:'0 0 24px', letterSpacing:'-0.015em'}}>{lang==='en'?'1 · Which department?':'१ · कौन-सा विभाग?'}</h2>
                <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
                  {depts.map(([n, c, tone], i) => (
                    <button key={i} onClick={()=>{setDept(i); setStep(2);}} style={{appearance:'none', textAlign:'left', cursor:'pointer', background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'24px 22px', minHeight:160, position:'relative', font:'inherit', color:'inherit'}}>
                      <div style={{width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg, ${tone}, ${tone}99)`, marginBottom:18}}/>
                      <div style={{fontSize:18, fontWeight:600, marginBottom:6, letterSpacing:'-0.005em'}}>{n}</div>
                      <div style={{fontSize:13, color:'var(--dnh-ink-soft)'}}>{c}</div>
                      <span style={{position:'absolute', right:18, bottom:18, color:'var(--dnh-primary)'}}><Icon.chev s={16}/></span>
                    </button>
                  ))}
                </div>
                <p style={{fontSize:13, color:'var(--dnh-ink-soft)', marginTop:24}}>{lang==='en'?'Don\u2019t see your specialty?':'आपका विभाग नहीं दिख रहा?'} <a href="#/find" className="dnh-link">{lang==='en'?'See all 28':'सभी २८ देखें'} →</a></p>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
                  <h2 className="dnh-serif" style={{fontSize:30, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'2 · Pick a doctor & time':'२ · चिकित्सक व समय चुनें'}</h2>
                  <button onClick={()=>{setStep(1); setDept(null); setDocId(null); setSlot(null);}} style={{appearance:'none', border:0, background:'transparent', cursor:'pointer', font:'500 13px var(--dnh-sans)', color:'var(--dnh-ink-soft)'}}><Icon.back s={12}/> {lang==='en'?'Change department':'विभाग बदलें'}</button>
                </div>
                <div style={{fontSize:14, color:'var(--dnh-ink-soft)', marginBottom:20}}>{lang==='en'?'Department':'विभाग'} · <strong style={{color:'var(--dnh-ink)'}}>{depts[dept][0]}</strong></div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:32}}>
                  {(docs.length ? docs : all.slice(0,2)).map(d => (
                    <button key={d.id} onClick={()=>setDocId(d.id)} style={{appearance:'none', textAlign:'left', cursor:'pointer', font:'inherit', color:'inherit', background:'#fff', border: docId===d.id ? '2px solid var(--dnh-deep)' : '1px solid var(--dnh-line-soft)', borderRadius:8, padding: docId===d.id ? '23px 25px' : '24px 26px', display:'grid', gridTemplateColumns:'64px 1fr', gap:18, position:'relative'}}>
                      <DocAvatar tone={d.tone} initials={d.name.split(' ').slice(-2).map(s=>s[0]).join('')} size={56}/>
                      <div>
                        <div className="dnh-serif" style={{fontSize:18, fontWeight:500, letterSpacing:'-0.01em', marginBottom:2}}>{d.name}</div>
                        <div style={{fontSize:12.5, color:'var(--dnh-primary)', fontWeight:500, marginBottom:8}}>{d.spec}</div>
                        <div style={{fontSize:11.5, color:'var(--dnh-ink-soft)'}}>{d.exp}{lang==='en'?'y · ':'व · '}{d.lang}</div>
                      </div>
                      {docId===d.id && <span style={{position:'absolute', right:14, top:14, width:22, height:22, borderRadius:'50%', background:'var(--dnh-deep)', color:'#fff', display:'grid', placeItems:'center'}}><Icon.check s={12}/></span>}
                    </button>
                  ))}
                </div>

                {docId && (
                  <div style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'28px 30px'}}>
                    <div style={{fontSize:13, color:'var(--dnh-ink-soft)', marginBottom:16, fontWeight:500, letterSpacing:'-0.005em'}}>{lang==='en'?'Choose a day':'दिन चुनें'}</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:24}}>
                      {slots.map(([d1, d2], i) => (
                        <button key={i} onClick={()=>setSlot({day:i, time:null})} style={{appearance:'none', textAlign:'left', cursor:'pointer', font:'inherit', color:'inherit', padding:'14px 16px', border: slot?.day===i ? '2px solid var(--dnh-deep)' : '1px solid var(--dnh-line-soft)', borderRadius:6, background:'#fff'}}>
                          <div style={{fontSize:14, fontWeight:600, marginBottom:2}}>{d1}</div>
                          <div style={{fontSize:11.5, color:'var(--dnh-ink-soft)'}}>{d2}</div>
                        </button>
                      ))}
                    </div>
                    {slot && (
                      <>
                        <div style={{fontSize:13, color:'var(--dnh-ink-soft)', marginBottom:16, fontWeight:500, letterSpacing:'-0.005em'}}>{lang==='en'?'Choose a time':'समय चुनें'}</div>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:8, marginBottom:24}}>
                          {times.map((t, i) => {
                            const taken = i===2 || i===5;
                            const sel = slot?.time === t;
                            return (
                              <button key={t} disabled={taken} onClick={()=>setSlot({...slot, time:t})} style={{appearance:'none', cursor: taken?'not-allowed':'pointer', font:'500 13px var(--dnh-sans-en)', color: sel?'#fff':taken?'var(--dnh-ink-soft)':'var(--dnh-ink)', padding:'10px 0', border: sel ? '2px solid var(--dnh-deep)' : '1px solid var(--dnh-line-soft)', borderRadius:6, background: sel ? 'var(--dnh-deep)' : taken ? 'var(--dnh-paper-2)' : '#fff', textDecoration: taken ? 'line-through' : 'none', opacity: taken?.5:1}}>{t}</button>
                            );
                          })}
                        </div>
                        {slot.time && (
                          <button onClick={()=>setStep(3)} className="dnh-btn dnh-btn--primary" style={{padding:'14px 22px'}}>{lang==='en'?'Continue':'आगे बढ़ें'} <Icon.arrow/></button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
                  <h2 className="dnh-serif" style={{fontSize:30, fontWeight:400, margin:0, letterSpacing:'-0.015em'}}>{lang==='en'?'3 · Your details':'३ · आपका विवरण'}</h2>
                  <button onClick={()=>setStep(2)} style={{appearance:'none', border:0, background:'transparent', cursor:'pointer', font:'500 13px var(--dnh-sans)', color:'var(--dnh-ink-soft)'}}><Icon.back s={12}/> {lang==='en'?'Back':'पीछे'}</button>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:32}}>
                  <div style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:8, padding:'28px 30px', display:'flex', flexDirection:'column', gap:18}}>
                    <Field label={lang==='en'?'Patient name':'रोगी का नाम'} value={form.name} onChange={v=>setForm({...form, name:v})} placeholder={lang==='en'?'Full name as on ID':'पहचान-पत्र अनुसार पूरा नाम'}/>
                    <Field label={lang==='en'?'Mobile (for OTP)':'मोबाइल (OTP हेतु)'} value={form.phone} onChange={v=>setForm({...form, phone:v})} placeholder="+91 9X XXXXX XXXX"/>
                    <Field label={lang==='en'?'Reason / symptoms (optional)':'कारण / लक्षण (वैकल्पिक)'} value={form.notes} onChange={v=>setForm({...form, notes:v})} placeholder={lang==='en'?'A short description helps the doctor prepare':'एक संक्षिप्त विवरण से चिकित्सक तैयारी कर सकें'} multi/>
                    <button onClick={()=>setStep(4)} disabled={!form.name || !form.phone} className="dnh-btn dnh-btn--primary" style={{padding:'14px 22px', alignSelf:'flex-start', opacity: (!form.name || !form.phone) ? .4 : 1}}>{lang==='en'?'Confirm appointment':'अपॉइंटमेंट पक्की करें'} <Icon.arrow/></button>
                  </div>
                  <Summary lang={lang} dept={depts[dept]} doc={all.find(d=>d.id===docId)} slot={slot} slots={slots}/>
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{background:'#fff', border:'1px solid var(--dnh-line-soft)', borderRadius:10, padding:'56px 48px', maxWidth:720}}>
                <div style={{width:64, height:64, borderRadius:'50%', background:'var(--dnh-deep)', color:'#fff', display:'grid', placeItems:'center', marginBottom:24}}><Icon.check s={28}/></div>
                <Mono>{lang==='en'?'CONFIRMED · REF #DNH-48211':'पुष्टि · संदर्भ #DNH-४८२११'}</Mono>
                <h2 className="dnh-serif" style={{fontSize:44, lineHeight:1.05, fontWeight:400, margin:'14px 0 18px', letterSpacing:'-0.02em'}}>{lang==='en'?'You\u2019re booked, '+(form.name||'').split(' ')[0]+'.':(form.name||'').split(' ')[0]+', आप बुक हैं।'}</h2>
                <p style={{fontSize:16, lineHeight:1.55, color:'var(--dnh-ink-soft)', maxWidth:520, margin:'0 0 28px'}}>{lang==='en' ? 'A confirmation SMS is on its way. Please bring a photo ID and any prior reports. The hospital is on NH-9 — free shuttle from Hapur Junction every 30 minutes.' : 'पुष्टि एसएमएस भेजा जा रहा है। कृपया फोटो पहचान-पत्र और पुरानी रिपोर्ट लाएँ। NH-9 पर — हापुड़ जंक्शन से प्रत्येक ३० मिनट में निःशुल्क शटल।'}</p>
                <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
                  <a href="#/" className="dnh-btn dnh-btn--primary" style={{padding:'12px 20px'}}>{lang==='en'?'Back to home':'होम पर वापस'}</a>
                  <button onClick={()=>{setStep(1); setDept(null); setDocId(null); setSlot(null); setForm({name:'',phone:'',notes:''});}} className="dnh-btn dnh-btn--ghost" style={{padding:'12px 20px'}}>{lang==='en'?'Book another':'दूसरी बुकिंग'}</button>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
    );
  }

  function Stepper({labels, step}) {
    return (
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        {labels.map((l, i) => {
          const n = i+1;
          const done = step > n;
          const active = step === n;
          return (
            <React.Fragment key={i}>
              <div style={{display:'flex', alignItems:'center', gap:10, opacity: (done||active) ? 1 : .5}}>
                <span style={{width:26, height:26, borderRadius:'50%', background: done?'var(--dnh-deep)':active?'var(--dnh-deep)':'var(--dnh-paper-2)', color: (done||active)?'#fff':'var(--dnh-ink-soft)', display:'grid', placeItems:'center', font:'600 12px var(--dnh-sans-en)'}}>{done?<Icon.check s={12}/>:n}</span>
                <span style={{fontSize:13, fontWeight: active?600:500, color: active?'var(--dnh-ink)':'var(--dnh-ink-soft)'}}>{l}</span>
              </div>
              {i<labels.length-1 && <span style={{flex:1, height:1, background:'var(--dnh-line-soft)', maxWidth:48}}/>}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  function Field({label, value, onChange, placeholder, multi}) {
    const Tag = multi ? 'textarea' : 'input';
    return (
      <label style={{display:'flex', flexDirection:'column', gap:8}}>
        <span style={{fontSize:12, color:'var(--dnh-ink-soft)', fontWeight:500, letterSpacing:'0.02em', textTransform:'uppercase'}}>{label}</span>
        <Tag value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={multi?3:undefined} style={{appearance:'none', border:'1px solid var(--dnh-line-soft)', borderRadius:6, padding:'12px 14px', font:'500 15px/1.4 var(--dnh-sans)', color:'var(--dnh-ink)', background:'var(--dnh-paper)', resize:'vertical', outline:'none'}} onFocus={e=>e.target.style.borderColor='var(--dnh-deep)'} onBlur={e=>e.target.style.borderColor='var(--dnh-line-soft)'}/>
      </label>
    );
  }

  function Summary({lang, dept, doc, slot, slots}) {
    if (!dept || !doc || !slot) return null;
    return (
      <aside style={{background:'var(--dnh-deep)', color:'#fff', borderRadius:8, padding:'28px 30px', alignSelf:'flex-start', position:'sticky', top:96}}>
        <div style={{font:'500 10px/1 var(--dnh-mono)', letterSpacing:'0.16em', color:'var(--dnh-accent)', marginBottom:18}}>{lang==='en'?'YOUR APPOINTMENT':'आपकी अपॉइंटमेंट'}</div>
        <SumRow label={lang==='en'?'Department':'विभाग'} value={dept[0]}/>
        <SumRow label={lang==='en'?'Doctor':'चिकित्सक'} value={doc.name}/>
        <SumRow label={lang==='en'?'Day':'दिन'} value={slots[slot.day][0]+' · '+slots[slot.day][1]}/>
        <SumRow label={lang==='en'?'Time':'समय'} value={slot.time}/>
        <SumRow label={lang==='en'?'Location':'स्थान'} value={doc.loc} last/>
        <div style={{borderTop:'1px solid rgba(255,255,255,.18)', marginTop:18, paddingTop:18, fontSize:11.5, opacity:.7, lineHeight:1.5}}>{lang==='en'?'Consultation fee billed after visit. Cashless insurance accepted at the desk.':'परामर्श शुल्क विज़िट के बाद। कैशलेस बीमा डेस्क पर।'}</div>
      </aside>
    );
  }

  function SumRow({label, value, last}) {
    return (
      <div style={{display:'flex', justifyContent:'space-between', gap:16, padding:'12px 0', borderBottom: last ? 'none' : '1px solid rgba(255,255,255,.12)', alignItems:'baseline'}}>
        <span style={{fontSize:11.5, opacity:.6, letterSpacing:'0.04em', textTransform:'uppercase'}}>{label}</span>
        <span style={{fontSize:14, fontWeight:500, textAlign:'right'}}>{value}</span>
      </div>
    );
  }

  // ---------- main DSite app ----------

  function DSite() {
    const [lang, setLang] = useState(() => document.documentElement.getAttribute('data-dnh-lang') || 'en');
    const route = useRoute();
    useEffect(() => { document.documentElement.setAttribute('data-dnh-lang', lang); }, [lang]);

    return (
      <div className="dnh-root" style={{minHeight:'100vh'}}>
        <SiteRibbon lang={lang} route={route}/>
        {route === 'home' && (() => {
          const Hybrid = window.DNH_Hybrid;
          return <Hybrid lang={lang} setLang={setLang}/>;
        })()}
        {route === 'find' && (
          <>
            <PageHeader lang={lang} setLang={setLang} route="find"/>
            <FindDoctor lang={lang}/>
            <SimpleFooter lang={lang}/>
          </>
        )}
        {route === 'cardiology' && (
          <>
            <PageHeader lang={lang} setLang={setLang} route="cardiology"/>
            <Cardiology lang={lang}/>
            <SimpleFooter lang={lang}/>
          </>
        )}
        {route === 'book' && (
          <>
            <PageHeader lang={lang} setLang={setLang} route="book"/>
            <Booking lang={lang}/>
            <SimpleFooter lang={lang}/>
          </>
        )}
        <StickyBar lang={lang}/>
      </div>
    );
  }

  window.DNH_DSite = DSite;
})();
