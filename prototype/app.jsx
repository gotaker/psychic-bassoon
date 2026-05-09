// Dev Nandini Hospital — App shell: design canvas + tweaks panel

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "palette": "teal",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = t.lang || 'en';
  const setLang = (v) => setTweak('lang', v);

  // Apply palette + density + lang to documentElement so CSS vars cascade
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.dnhLang = lang;
    root.dataset.dnhPalette = t.palette || 'teal';
    root.dataset.dnhDensity = t.density || 'regular';
  }, [lang, t.palette, t.density]);

  const Editorial = window.DNH_Editorial;
  const Utility   = window.DNH_Utility;
  const Minimal   = window.DNH_Minimal;
  const Hybrid    = window.DNH_Hybrid;

  const langLabel = lang==='en' ? 'EN' : 'हिं';

  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection
          id="home"
          title={lang==='en' ? "Dev Nandini Hospital — Homepage Directions" : "देव नंदिनी अस्पताल — होमपेज विकल्प"}
          subtitle={lang==='en' ? "Three approaches for the hospital + medical college site. Bilingual EN / हिंदी. Toggle palette, language, and density in Tweaks." : "अस्पताल + मेडिकल कॉलेज की वेबसाइट के तीन विकल्प। द्विभाषी EN / हिंदी। ट्वीक्स में पैलेट, भाषा व घनत्व बदलें।"}
        >
          <DCArtboard id="d" label={(lang==='en'?"D · Hybrid · A × B (recommended)":"D · हाइब्रिड · A × B (अनुशंसित)") + " · " + langLabel} width={1280} height={6700}>
            <Hybrid lang={lang} setLang={setLang} />
          </DCArtboard>
          <DCArtboard id="a" label={(lang==='en'?"A · Editorial · story-led":"A · संपादकीय · कहानी-केंद्रित") + " · " + langLabel} width={1280} height={5450}>
            <Editorial lang={lang} setLang={setLang} />
          </DCArtboard>
          <DCArtboard id="b" label={(lang==='en'?"B · Action grid · utility-first":"B · ऐक्शन ग्रिड · उपयोगिता-केंद्रित") + " · " + langLabel} width={1280} height={3850}>
            <Utility lang={lang} setLang={setLang} />
          </DCArtboard>
          <DCArtboard id="c" label={(lang==='en'?"C · Minimal · calm":"C · मिनिमल · शांत") + " · " + langLabel} width={1280} height={4500}>
            <Minimal lang={lang} setLang={setLang} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang==='en'?"Language":"भाषा"} />
        <TweakRadio label={lang==='en'?"Site language":"साइट भाषा"} value={lang}
                    options={[{value:'en', label:'English'}, {value:'hi', label:'हिंदी'}]}
                    onChange={(v)=>setTweak('lang', v)}/>

        <TweakSection label={lang==='en'?"Palette":"पैलेट"} />
        <TweakSelect label={lang==='en'?"Brand palette":"ब्रांड पैलेट"} value={t.palette}
                     options={[
                       {value:'teal',     label: lang==='en'?'Teal · clinical':'टील · क्लीनिकल'},
                       {value:'forest',   label: lang==='en'?'Forest · wellness':'हरा · कल्याण'},
                       {value:'burgundy', label: lang==='en'?'Burgundy · academic':'बरगंडी · शैक्षणिक'},
                       {value:'navy',     label: lang==='en'?'Navy · institutional':'नेवी · संस्थागत'}
                     ]}
                     onChange={(v)=>setTweak('palette', v)}/>

        <TweakSection label={lang==='en'?"Density":"घनत्व"} />
        <TweakRadio label={lang==='en'?"Section spacing":"खंड अंतर"} value={t.density}
                    options={['compact','regular','spacious']}
                    onChange={(v)=>setTweak('density', v)}/>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
