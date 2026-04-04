import { useState, useRef, useEffect } from "react";
import assets from '../assets/assets';

const COUNTRIES = [
  { code: "mg", name: "Madagascar",    dial: "+261" },
  { code: "fr", name: "France",        dial: "+33"  },
  { code: "gb", name: "Royaume-Uni",   dial: "+44"  },
  { code: "us", name: "États-Unis",    dial: "+1"   },
  { code: "it", name: "Italie",        dial: "+39"  },
  { code: "de", name: "Allemagne",     dial: "+49"  },
  { code: "es", name: "Espagne",       dial: "+34"  },
  { code: "be", name: "Belgique",      dial: "+32"  },
  { code: "ch", name: "Suisse",        dial: "+41"  },
  { code: "ca", name: "Canada",        dial: "+1"   },
  { code: "re", name: "La Réunion",    dial: "+262" },
  { code: "mu", name: "Maurice",       dial: "+230" },
  { code: "cm", name: "Cameroun",      dial: "+237" },
  { code: "sn", name: "Sénégal",       dial: "+221" },
  { code: "ci", name: "Côte d'Ivoire", dial: "+225" },
  { code: "ma", name: "Maroc",         dial: "+212" },
  { code: "tn", name: "Tunisie",       dial: "+216" },
  { code: "dz", name: "Algérie",       dial: "+213" },
  { code: "pt", name: "Portugal",      dial: "+351" },
  { code: "nl", name: "Pays-Bas",      dial: "+31"  },
  { code: "au", name: "Australie",     dial: "+61"  },
  { code: "jp", name: "Japon",         dial: "+81"  },
  { code: "cn", name: "Chine",         dial: "+86"  },
  { code: "in", name: "Inde",          dial: "+91"  },
  { code: "br", name: "Brésil",        dial: "+55"  },
];

const Flag = ({ code, size = 20 }) => {
  const emoji = code.toUpperCase().split('').map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('');
  return <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", flexShrink: 0 }}>{emoji}</span>;
};

const SERVICES = [
  { id: "relation_client",    label: "Relation client",    icon: "💬", desc: "Support, SAV, hotline" },
  { id: "back_office",        label: "Back Office",        icon: "📊", desc: "Saisie, gestion, traitement" },
  { id: "ventes_marketing",   label: "Ventes & Marketing", icon: "📈", desc: "Prospection, lead gen, CRM" },
  { id: "fonctions_supports", label: "Fonctions supports", icon: "🎙️", desc: "RH, compta, IT, juridique" },
];

const TAILLES = [
  { id: "1-10",    label: "1–10",    sub: "employés" },
  { id: "11-50",   label: "11–50",   sub: "employés" },
  { id: "51-200",  label: "51–200",  sub: "employés" },
  { id: "201-500", label: "201–500", sub: "employés" },
  { id: "500+",    label: "500+",    sub: "employés"  },
];

const BUDGETS = [
  { id: "moins_1k", label: "< 1 000 €/mois"   },
  { id: "1k_5k",    label: "1 000 – 5 000 €"  },
  { id: "5k_15k",   label: "5 000 – 15 000 €" },
  { id: "15k_plus", label: "+ 15 000 €/mois"  },
];

const DELAIS = [
  { id: "immediat",    label: "⚡ Immédiat",   sub: "Dès maintenant"  },
  { id: "1_mois",      label: "📅 1 mois",     sub: "Sous 30 jours"   },
  { id: "3_mois",      label: "🗓️ 3 mois",     sub: "Sous 90 jours"   },
  { id: "exploration", label: "🔭 Exploration", sub: "Je me renseigne" },
];

/* ── Country Selector ── */
function CountrySelector({ selected, onSelect, hasError }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(v => !v)} style={{
        display: "flex", alignItems: "center", gap: "7px",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${hasError ? "rgba(220,38,38,0.65)" : open ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "10px", padding: "0 12px", cursor: "pointer", color: "#fff",
        fontFamily: "inherit", fontSize: "13px", whiteSpace: "nowrap", flexShrink: 0,
        boxSizing: "border-box", height: "44px",
        boxShadow: open ? "0 0 0 3px rgba(96,165,250,0.08)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}>
        <Flag code={selected.code} size={22} />
        <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{selected.dial}</span>
        <span style={{
          width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
          borderTop: `5px solid rgba(255,255,255,${open ? "0.7" : "0.35"})`, display: "inline-block",
          transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "#0f1929", border: "1px solid rgba(96,165,250,0.2)",
          borderRadius: "12px", zIndex: 99999, width: "255px", maxHeight: "270px",
          display: "flex", flexDirection: "column",
          boxShadow: "0 16px 48px rgba(0,0,0,0.7)", overflow: "hidden", animation: "fadeDown 0.18s ease",
        }}>
          <div style={{ padding: "8px 8px 4px" }}>
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un pays..."
              style={{
                width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 10px",
                fontSize: "13px", color: "#fff", fontFamily: "inherit", outline: "none",
              }} />
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "14px", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Aucun résultat</div>
            ) : filtered.map(c => (
              <button key={c.code} type="button"
                onClick={() => { onSelect(c); setOpen(false); setSearch(""); }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "9px 12px",
                  background: selected.code === c.code ? "rgba(37,99,235,0.22)" : "transparent",
                  border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(96,165,250,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = selected.code === c.code ? "rgba(37,99,235,0.22)" : "transparent"; }}
              >
                <Flag code={c.code} size={22} />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{c.dial}</span>
                {selected.code === c.code && <span style={{ color: "#60a5fa", fontSize: "13px", flexShrink: 0 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   ÉTAPE 2 — Page BPO
══════════════════════════════════════════ */
function BpoPage({ prenom, onSubmit }) {
  const [bpo, setBpo] = useState({ services: [], taille: "", budget: "", delai: "", besoin: "" });
  const [errors, setErrors] = useState({});

  const toggleService = (id) => {
    setBpo(b => ({ ...b, services: b.services.includes(id) ? b.services.filter(s => s !== id) : [...b.services, id] }));
    setErrors(e => ({ ...e, services: false }));
  };

  const select = (field, val) => {
    setBpo(b => ({ ...b, [field]: val }));
    setErrors(e => ({ ...e, [field]: false }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (bpo.services.length === 0) errs.services = true;
    if (!bpo.taille) errs.taille = true;
    if (!bpo.budget) errs.budget = true;
    if (!bpo.delai)  errs.delai  = true;
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(bpo);
  };

  return (
    <div className="sf-view">
      <div style={{
        background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(96,165,250,0.05) 100%)",
        border: "1px solid rgba(37,99,235,0.25)", borderRadius: "14px", padding: "18px 20px", marginBottom: "24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontSize: "22px" }}>🏢</span>
          <h2 style={{ margin: 0, fontSize: "16px", color: "#fff", fontWeight: 700 }}>Bienvenue, {prenom} !</h2>
        </div>
        <p style={{ margin: 0, fontSize: "12.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
          Dites-nous en plus sur votre projet BPO. Nos experts à Madagascar vous proposeront une solution sur mesure.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
        <div style={stepDot(true)}>1</div>
        <div style={stepLine(true)} />
        <div style={stepDot(true)}>2</div>
        <div style={stepLine(false)} />
        <div style={stepDot(false)}>✓</div>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginLeft: "6px" }}>Votre projet BPO</span>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <Label>
          Services BPO souhaités{" "}
          <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— plusieurs choix possibles</span>
          {errors.services && <Err />}
        </Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          {SERVICES.map(s => {
            const active = bpo.services.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggleService(s.id)} style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", padding: "12px 13px",
                background: active ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${errors.services && !active ? "rgba(220,38,38,0.4)" : active ? "rgba(96,165,250,0.55)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "11px", cursor: "pointer", transition: "all 0.18s ease", textAlign: "left", fontFamily: "inherit", position: "relative",
              }}>
                <span style={{ fontSize: "20px" }}>{s.icon}</span>
                <span style={{ fontSize: "12.5px", fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.6)" }}>{s.label}</span>
                <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.28)", lineHeight: 1.3 }}>{s.desc}</span>
                {active && <span style={{ position: "absolute", top: "8px", right: "10px", color: "#60a5fa", fontSize: "14px" }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <Label>Nombre d'employés dans votre entreprise {errors.taille && <Err />}</Label>
        <div style={{ display: "flex", gap: "7px", marginTop: "10px", flexWrap: "wrap" }}>
          {TAILLES.map(t => {
            const active = bpo.taille === t.id;
            return (
              <button key={t.id} onClick={() => select("taille", t.id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 14px", flex: 1, minWidth: "58px",
                background: active ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${errors.taille && !active ? "rgba(220,38,38,0.5)" : active ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s ease",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.55)" }}>{t.label}</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)" }}>{t.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <Label>Budget mensuel envisagé {errors.budget && <Err />}</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          {BUDGETS.map(b => {
            const active = bpo.budget === b.id;
            return (
              <button key={b.id} onClick={() => select("budget", b.id)} style={{
                padding: "11px 14px", background: active ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${errors.budget && !active ? "rgba(220,38,38,0.5)" : active ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "10px", cursor: "pointer", fontFamily: "inherit",
                fontSize: "12.5px", fontWeight: active ? 600 : 400, color: active ? "#fff" : "rgba(255,255,255,0.5)",
                transition: "all 0.18s ease", textAlign: "center",
              }}>
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <Label>Quand souhaitez-vous démarrer ? {errors.delai && <Err />}</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          {DELAIS.map(d => {
            const active = bpo.delai === d.id;
            return (
              <button key={d.id} onClick={() => select("delai", d.id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 10px",
                background: active ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${errors.delai && !active ? "rgba(220,38,38,0.5)" : active ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s ease", gap: "2px",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.55)" }}>{d.label}</span>
                <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.28)" }}>{d.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: "26px" }}>
        <Label>
          Décrivez votre besoin{" "}
          <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optionnel</span>
        </Label>
        <textarea value={bpo.besoin} onChange={e => setBpo(b => ({ ...b, besoin: e.target.value }))}
          placeholder="Ex : Nous cherchons 5 agents bilingues pour la gestion de tickets clients..." rows={3}
          style={{
            marginTop: "8px", width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "11px 14px",
            fontSize: "13px", color: "#fff", fontFamily: "inherit", resize: "vertical", outline: "none", transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.6)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
        />
      </div>

      <button className="sf-submit" onClick={handleSubmit} style={{
        width: "100%", padding: "13px", background: "#2563eb", border: "none", borderRadius: "11px",
        color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
      }}>
        Envoyer ma demande →
      </button>
      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: "10px" }}>
        🔒 Vos données sont confidentielles et sécurisées
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   ÉTAPE 3 — Succès + redirection login
══════════════════════════════════════════ */
function SuccessRegisterPage({ prenom, nom, email, telephone, selectedCountry, onGoLogin }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); onGoLogin(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sf-view" style={{ textAlign: "center", paddingTop: "0.5rem" }}>
      <div style={{ ...styles.successIcon, animation: "checkPop 0.4s ease" }}>✓</div>
      <h3 style={styles.successTitle}>Inscription réussie !</h3>
      <p style={{ ...styles.successText, marginBottom: "16px" }}>
        Merci <strong style={{ color: "#60a5fa" }}>{prenom} {nom}</strong> !<br />
        Votre dossier BPO a bien été reçu.<br />
        <span style={{ color: "rgba(255,255,255,0.35)" }}>
          Notre équipe vous contactera sous <strong style={{ color: "#60a5fa" }}>48h</strong>.
        </span>
      </p>

      <div style={{
        background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)",
        borderRadius: "10px", padding: "12px 16px", marginBottom: "22px",
        fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, textAlign: "left",
      }}>
        📧 Confirmation envoyée à <span style={{ color: "#60a5fa" }}>{email}</span><br />
        📞 Via {selectedCountry?.dial} {telephone}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>PROCHAINE ÉTAPE</span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>

      <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", lineHeight: 1.6 }}>
        Connectez-vous pour suivre votre dossier et consulter la réponse de notre équipe sous 2 jours.
      </p>

      <button className="sf-submit" onClick={onGoLogin} style={{
        width: "100%", padding: "13px", background: "#2563eb", border: "none", borderRadius: "11px",
        color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
      }}>
        <span>Se connecter maintenant</span>
        <span style={{
          background: "rgba(255,255,255,0.2)", borderRadius: "20px",
          padding: "2px 10px", fontSize: "12px", fontWeight: 700, minWidth: "24px",
        }}>
          {countdown}s
        </span>
      </button>
      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "10px" }}>
        Redirection automatique dans {countdown} seconde{countdown > 1 ? "s" : ""}…
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE RÉPONSE — après connexion
══════════════════════════════════════════ */
function ReponsePage({ user, onClose }) {
  const serviceLabels = {
    relation_client: "Relation client", back_office: "Back Office",
    ventes_marketing: "Ventes & Marketing", fonctions_supports: "Fonctions supports",
  };
  const budgetLabels = {
    moins_1k: "< 1 000 €/mois", "1k_5k": "1 000–5 000 €", "5k_15k": "5 000–15 000 €", "15k_plus": "+ 15 000 €/mois",
  };
  const delaiLabels = {
    immediat: "Immédiat", "1_mois": "Sous 1 mois", "3_mois": "Sous 3 mois", exploration: "En exploration",
  };

  const responseDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const dateStr = responseDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="sf-view">

      {/* Badge nouveau message */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.05) 100%)",
        border: "1px solid rgba(16,185,129,0.3)", borderRadius: "14px", padding: "16px 18px", marginBottom: "18px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <span style={{ fontSize: "26px" }}>📬</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Réponse de SmartFlow</div>
          <div style={{ fontSize: "11px", color: "rgba(16,185,129,0.85)", fontWeight: 600, marginTop: "2px" }}>
            ● Nouveau message · reçu le {dateStr}
          </div>
        </div>
      </div>

      {/* Corps du message */}
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px", padding: "20px", marginBottom: "14px",
      }}>
        {/* Expéditeur */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px",
          paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 800, color: "#fff", letterSpacing: "0.5px",
          }}>
            SF
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Équipe SmartFlow Outsourcing</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>contact@smartflow-outsourcing.com</div>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", flexShrink: 0 }}>{dateStr}</div>
        </div>

        {/* Corps */}
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.85 }}>
          <p style={{ margin: "0 0 10px" }}>
            Bonjour <strong style={{ color: "#fff" }}>{user.prenom} {user.nom}</strong>,
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Nous avons bien reçu et analysé votre demande de partenariat BPO. Nous vous remercions de la confiance accordée à{" "}
            <strong style={{ color: "#60a5fa" }}>SmartFlow Outsourcing</strong>.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            Après étude approfondie de votre dossier, nous avons le plaisir de vous confirmer que votre projet correspond parfaitement à notre cœur de métier. Voici le récapitulatif de votre demande :
          </p>

          {/* Récap dossier */}
          {user.bpoData && (
            <div style={{
              background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)",
              borderRadius: "10px", padding: "14px 16px", margin: "0 0 16px",
            }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: "10px" }}>
                Récapitulatif de votre dossier
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {user.bpoData.services?.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "120px", flexShrink: 0 }}>Services :</span>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{user.bpoData.services.map(s => serviceLabels[s] || s).join(", ")}</span>
                  </div>
                )}
                {user.bpoData.taille && (
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "120px", flexShrink: 0 }}>Taille :</span>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{user.bpoData.taille} employés</span>
                  </div>
                )}
                {user.bpoData.budget && (
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "120px", flexShrink: 0 }}>Budget :</span>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{budgetLabels[user.bpoData.budget]}</span>
                  </div>
                )}
                {user.bpoData.delai && (
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "120px", flexShrink: 0 }}>Délai :</span>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{delaiLabels[user.bpoData.delai]}</span>
                  </div>
                )}
                {user.bpoData.besoin && (
                  <div style={{ display: "flex", gap: "8px", fontSize: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "120px", flexShrink: 0 }}>Besoin :</span>
                    <span style={{ color: "rgba(255,255,255,0.65)", fontStyle: "italic" }}>"{user.bpoData.besoin}"</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <p style={{ margin: "0 0 10px" }}>
            Un consultant dédié a été assigné à votre compte et vous contactera dans les <strong style={{ color: "#60a5fa" }}>24 heures</strong> aux coordonnées suivantes :
          </p>

          <div style={{
            background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: "10px", padding: "12px 16px", margin: "0 0 14px",
            fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 2,
          }}>
            📧 <span style={{ color: "#60a5fa" }}>{user.email}</span><br />
            📞 <span style={{ color: "rgba(255,255,255,0.65)" }}>{user.pays?.dial} {user.telephone}</span>
          </div>

          <p style={{ margin: "0", fontSize: "12.5px", color: "rgba(255,255,255,0.45)" }}>
            Cordialement,<br />
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>L'équipe SmartFlow Outsourcing</strong><br />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>Madagascar · Antsiranana</span>
          </p>
        </div>
      </div>

      {/* Statut */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: "10px", padding: "13px 16px", marginBottom: "18px",
      }}>
        <span style={{ fontSize: "22px" }}>✅</span>
        <div>
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "rgba(16,185,129,0.9)" }}>Dossier accepté</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>Un consultant vous contacte sous 24h</div>
        </div>
      </div>

      <button className="sf-submit" onClick={onClose} style={{
        width: "100%", padding: "13px", background: "#2563eb", border: "none", borderRadius: "11px",
        color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
      }}>
        Fermer
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   Helpers
══════════════════════════════════════════ */
const stepDot = (done) => ({
  width: "22px", height: "22px", borderRadius: "50%",
  background: done ? "#2563eb" : "rgba(255,255,255,0.08)",
  border: `1px solid ${done ? "#3b82f6" : "rgba(255,255,255,0.12)"}`,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: "10px", fontWeight: 700, color: done ? "#fff" : "rgba(255,255,255,0.25)", flexShrink: 0,
});

const stepLine = (done) => ({
  flex: 1, height: "1px", background: done ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)",
});

/* ══════════════════════════════════════════
   MODAL PRINCIPAL
══════════════════════════════════════════ */

// Base utilisateurs persistante
const globalUsers = [];

export default function CandidatureModal({ isOpen, onClose }) {
  const [view, setView]     = useState("register"); // "register" | "login" | "reponse"
  const [step, setStep]     = useState(1);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword]         = useState(false);
  const [selectedCountry, setSelectedCountry]   = useState(COUNTRIES[0]);
  const [form, setForm]     = useState({ nom: "", prenom: "", telephone: "", email: "", password: "" });

  const [loginForm, setLoginForm]               = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors]           = useState({});
  const [loginGlobalError, setLoginGlobalError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [connectedUser, setConnectedUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: false }));
  };

  /* Étape 1 → 2 */
  const handleSubmitStep1 = () => {
    const newErrors = {};
    if (!form.nom.trim())       newErrors.nom = true;
    if (!form.prenom.trim())    newErrors.prenom = true;
    if (!form.telephone.trim()) newErrors.telephone = true;
    if (!form.email.trim())     newErrors.email = true;
    if (!form.password.trim())  newErrors.password = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    if (globalUsers.find(u => u.email === form.email.trim().toLowerCase())) {
      setErrors(er => ({ ...er, email: true }));
      setLoginErrors({ emailExists: true });
      return;
    }

    globalUsers.push({
      nom: form.nom.trim(), prenom: form.prenom.trim(),
      telephone: form.telephone.trim(), email: form.email.trim().toLowerCase(),
      password: form.password, pays: selectedCountry, bpoData: null,
    });
    setStep(2);
  };

  /* Étape 2 → 3 : sauvegarde BPO */
  const handleSubmitStep2 = (bpoData) => {
    const idx = globalUsers.findIndex(u => u.email === form.email.trim().toLowerCase());
    if (idx !== -1) globalUsers[idx].bpoData = bpoData;
    setStep(3);
  };

  /* ✅ Succès → vers login avec email pré-rempli */
  const goToLogin = () => {
    setLoginForm({ email: form.email, password: "" });
    setLoginErrors({});
    setLoginGlobalError("");
    setView("login");
    setStep(1);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(f => ({ ...f, [name]: value }));
    setLoginErrors(er => ({ ...er, [name]: false }));
    setLoginGlobalError("");
  };

  /* ✅ Connexion → page réponse si dossier soumis, sinon page BPO */
  const handleLogin = () => {
    const newErrors = {};
    if (!loginForm.email.trim())    newErrors.email = true;
    if (!loginForm.password.trim()) newErrors.password = true;
    if (Object.keys(newErrors).length > 0) { setLoginErrors(newErrors); return; }

    const matchedUser = globalUsers.find(
      u => u.email === loginForm.email.trim().toLowerCase() && u.password === loginForm.password
    );

    if (!matchedUser) {
      setLoginGlobalError("Email ou mot de passe incorrect.");
      setLoginErrors({ email: true, password: true });
      return;
    }

    setForm({ nom: matchedUser.nom, prenom: matchedUser.prenom, telephone: matchedUser.telephone, email: matchedUser.email, password: matchedUser.password });
    setSelectedCountry(matchedUser.pays);
    setConnectedUser(matchedUser);

    if (matchedUser.bpoData) {
      setView("reponse");  // ✅ Dossier soumis → page réponse
    } else {
      setView("register"); // Pas encore de dossier → page BPO
      setStep(2);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView("register"); setStep(1); setConnectedUser(null);
      setForm({ nom: "", prenom: "", telephone: "", email: "", password: "" });
      setLoginForm({ email: "", password: "" });
      setErrors({}); setLoginErrors({}); setLoginGlobalError("");
      setSelectedCountry(COUNTRIES[0]);
      setShowPassword(false); setShowLoginPassword(false);
    }, 300);
  };

  const switchToLogin    = () => { setView("login");    setErrors({}); setLoginGlobalError(""); };
  const switchToRegister = () => { setView("register"); setLoginErrors({}); setLoginGlobalError(""); };

  if (!isOpen) return null;

  const showTabs = step === 1 && view !== "reponse";

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes checkPop { 0% { transform:scale(0); opacity:0; } 70% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
        .sf-modal::-webkit-scrollbar { width:4px; }
        .sf-modal::-webkit-scrollbar-track { background:transparent; }
        .sf-modal::-webkit-scrollbar-thumb { background:rgba(96,165,250,0.3); border-radius:4px; }
        .sf-input { transition:border-color 0.2s, box-shadow 0.2s; }
        .sf-input:focus { border-color:rgba(96,165,250,0.6) !important; box-shadow:0 0 0 3px rgba(96,165,250,0.08); outline:none; }
        .sf-submit { transition:all 0.2s ease !important; }
        .sf-submit:hover { background:#1d4ed8 !important; transform:translateY(-1px); box-shadow:0 6px 20px rgba(37,99,235,0.35); }
        .sf-submit:active { transform:translateY(0) !important; }
        .sf-view { animation:slideIn 0.25s ease; }
        .sf-tab { flex:1; padding:9px; border:none; cursor:pointer; font-family:inherit; font-size:13px; font-weight:500; border-radius:8px; transition:all 0.2s; }
        .sf-tab.active { background:rgba(37,99,235,0.25); color:#60a5fa; }
        .sf-tab.inactive { background:transparent; color:rgba(255,255,255,0.35); }
        .sf-tab.inactive:hover { color:rgba(255,255,255,0.6); }
        .sf-closeBtn:hover { background:rgba(255,255,255,0.12) !important; }
      `}</style>

      <div onClick={handleClose} style={styles.overlay}>
        <div className="sf-modal" onClick={e => e.stopPropagation()} style={styles.modal}>

          <button className="sf-closeBtn" onClick={handleClose} style={styles.closeBtn}>✕</button>

          <div style={styles.logoRow}>
            <img src={assets.smartflow_logo} alt="SmartFlow Outsourcing"
              style={{ height: "102px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>

          {showTabs && (
            <div style={styles.tabBar}>
              <button className={`sf-tab ${view === "register" ? "active" : "inactive"}`} onClick={switchToRegister}>Créer un compte</button>
              <button className={`sf-tab ${view === "login" ? "active" : "inactive"}`} onClick={switchToLogin}>Se connecter</button>
            </div>
          )}

          {/* ════ REGISTER étape 1 ════ */}
          {view === "register" && step === 1 && (
            <div className="sf-view">
              <p style={styles.sub}>Rejoignez la plateforme BPO de référence à Madagascar</p>

              {loginErrors.emailExists && (
                <div style={alertBox("red")}>
                  ⚠️ Cet email est déjà utilisé.{" "}
                  <button onClick={switchToLogin} style={{ background:"none", border:"none", color:"#60a5fa", cursor:"pointer", fontFamily:"inherit", fontSize:"12.5px", padding:0, fontWeight:600, textDecoration:"underline" }}>Se connecter →</button>
                </div>
              )}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"14px" }}>
                {[{ name:"nom", label:"Nom", ph:"Rakoto" }, { name:"prenom", label:"Prénom", ph:"Jean" }].map(({ name, label, ph }) => (
                  <div key={name} style={styles.field}>
                    <Label>{label}</Label>
                    <input className="sf-input" name={name} value={form[name]} onChange={handleChange} placeholder={ph} style={inputStyle(errors[name])} />
                  </div>
                ))}
              </div>

              <div style={{ ...styles.field, marginBottom:"14px" }}>
                <Label>Numéro de téléphone</Label>
                <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                  <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} hasError={errors.telephone} />
                  <input className="sf-input" name="telephone" type="tel" value={form.telephone} onChange={handleChange} placeholder="34 00 000 00" style={{ ...inputStyle(errors.telephone), flex:1 }} />
                </div>
                <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.22)", marginTop:"2px" }}>{selectedCountry.name} · {selectedCountry.dial}</span>
              </div>

              <div style={{ ...styles.field, marginBottom:"14px" }}>
                <Label>Adresse e-mail</Label>
                <input className="sf-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jean.rakoto@email.com" style={inputStyle(errors.email)} />
              </div>

              <div style={{ ...styles.field, marginBottom:"24px" }}>
                <Label>Mot de passe</Label>
                <div style={{ position:"relative" }}>
                  <input className="sf-input" name="password" type={showPassword?"text":"password"} value={form.password} onChange={handleChange} placeholder="••••••••" style={{ ...inputStyle(errors.password), paddingRight:"44px" }} />
                  <button onClick={() => setShowPassword(v=>!v)} style={styles.eyeBtn}>{showPassword?"🙈":"👁️"}</button>
                </div>
              </div>

              <button className="sf-submit" onClick={handleSubmitStep1} style={styles.submitBtn}>S'inscrire →</button>
              <p style={styles.terms}>
                En vous inscrivant, vous acceptez nos <a href="#" style={styles.link}>Conditions d'utilisation</a> et notre <a href="#" style={styles.link}>Politique de confidentialité</a>.
              </p>
            </div>
          )}

          {/* ════ BPO étape 2 ════ */}
          {view === "register" && step === 2 && (
            <BpoPage prenom={form.prenom} nom={form.nom} onSubmit={handleSubmitStep2} />
          )}

          {/* ════ SUCCÈS + redirect login ════ */}
          {view === "register" && step === 3 && (
            <SuccessRegisterPage
              prenom={form.prenom} nom={form.nom}
              email={form.email} telephone={form.telephone}
              selectedCountry={selectedCountry}
              onGoLogin={goToLogin}
            />
          )}

          {/* ════ LOGIN ════ */}
          {view === "login" && step === 1 && (
            <div className="sf-view">
              <p style={styles.sub}>Accédez à votre espace SmartFlow</p>

              {loginGlobalError && <div style={alertBox("red")}>⚠️ {loginGlobalError}</div>}

              <div style={{ ...styles.field, marginBottom:"16px" }}>
                <Label>Adresse e-mail</Label>
                <input className="sf-input" name="email" type="email" value={loginForm.email} onChange={handleLoginChange} placeholder="jean.rakoto@email.com" style={inputStyle(loginErrors.email)} />
              </div>
              <div style={{ ...styles.field, marginBottom:"10px" }}>
                <Label>Mot de passe</Label>
                <div style={{ position:"relative" }}>
                  <input className="sf-input" name="password" type={showLoginPassword?"text":"password"} value={loginForm.password} onChange={handleLoginChange} placeholder="••••••••" style={{ ...inputStyle(loginErrors.password), paddingRight:"44px" }} />
                  <button onClick={() => setShowLoginPassword(v=>!v)} style={styles.eyeBtn}>{showLoginPassword?"🙈":"👁️"}</button>
                </div>
              </div>
              <div style={{ textAlign:"right", marginBottom:"24px" }}>
                <a href="#" style={{ ...styles.link, fontSize:"12px" }}>Mot de passe oublié ?</a>
              </div>
              <button className="sf-submit" onClick={handleLogin} style={styles.submitBtn}>Se connecter →</button>
              <p style={styles.terms}>
                Pas encore de compte ?{" "}
                <a href="#" style={styles.link} onClick={e => { e.preventDefault(); switchToRegister(); }}>Créer un compte</a>
              </p>
            </div>
          )}

          {/* ════ PAGE RÉPONSE ════ */}
          {view === "reponse" && connectedUser && (
            <ReponsePage user={connectedUser} onClose={handleClose} />
          )}

        </div>
      </div>
    </>
  );
}

const Label = ({ children }) => (
  <span style={{ fontSize:"11px", fontWeight:"500", color:"rgba(255,255,255,0.45)", letterSpacing:"0.5px", textTransform:"uppercase", display:"block", marginBottom:"2px" }}>
    {children}
  </span>
);

const Err = () => (
  <span style={{ color:"rgba(220,38,38,0.8)", marginLeft:"6px", fontWeight:"600", fontSize:"10px", textTransform:"none", letterSpacing:0 }}>* requis</span>
);

const alertBox = (color) => ({
  background: color === "red" ? "rgba(220,38,38,0.1)" : "rgba(16,185,129,0.1)",
  border: `1px solid ${color === "red" ? "rgba(220,38,38,0.3)" : "rgba(16,185,129,0.3)"}`,
  borderRadius:"10px", padding:"10px 14px", marginBottom:"16px",
  fontSize:"12.5px", color: color === "red" ? "rgba(255,100,100,0.9)" : "rgba(100,255,180,0.9)",
  display:"flex", alignItems:"center", gap:"8px",
});

const inputStyle = (hasError) => ({
  background:"rgba(255,255,255,0.05)",
  border:`1px solid ${hasError?"rgba(220,38,38,0.65)":"rgba(255,255,255,0.09)"}`,
  borderRadius:"10px", padding:"11px 14px", fontSize:"14px", color:"#fff",
  width:"100%", fontFamily:"inherit", boxSizing:"border-box",
});

const styles = {
  overlay:      { position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999, padding:"1rem" },
  modal:        { background:"#0c1220", border:"1px solid rgba(37,99,235,0.22)", borderRadius:"22px", padding:"2.5rem 2rem 2rem", width:"100%", maxWidth:"480px", maxHeight:"90vh", overflowY:"auto", position:"relative", animation:"fadeUp 0.35s ease", boxShadow:"0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(96,165,250,0.06) inset" },
  closeBtn:     { position:"absolute", top:"1rem", right:"1rem", background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.45)", width:"30px", height:"30px", borderRadius:"50%", cursor:"pointer", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" },
  logoRow:      { display:"flex", alignItems:"center", justifyContent:"center", gap:"9px", marginBottom:"1.4rem" },
  tabBar:       { display:"flex", gap:"4px", background:"rgba(255,255,255,0.04)", padding:"4px", borderRadius:"10px", marginBottom:"1.6rem" },
  sub:          { textAlign:"center", fontSize:"13px", color:"rgba(255,255,255,0.38)", marginBottom:"1.6rem", lineHeight:"1.5" },
  field:        { display:"flex", flexDirection:"column", gap:"6px" },
  eyeBtn:       { position:"absolute", right:"13px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.35)", fontSize:"16px", lineHeight:1, display:"flex", alignItems:"center" },
  submitBtn:    { width:"100%", padding:"13px", background:"#2563eb", border:"none", borderRadius:"11px", color:"#fff", fontSize:"14px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit" },
  terms:        { fontSize:"11px", color:"rgba(255,255,255,0.22)", textAlign:"center", marginTop:"1rem", lineHeight:"1.6" },
  link:         { color:"#60a5fa", textDecoration:"none", fontWeight:"500" },
  successIcon:  { width:"64px", height:"64px", background:"rgba(37,99,235,0.12)", border:"1px solid rgba(37,99,235,0.4)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", fontSize:"28px", color:"#60a5fa" },
  successTitle: { color:"#fff", fontSize:"19px", marginBottom:"0.75rem" },
  successText:  { color:"rgba(255,255,255,0.42)", fontSize:"13px", lineHeight:"1.9" },
};
