import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "EN" | "DE";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  EN: {
    // Nav
    "nav.home": "Home",
    "nav.documents": "Documents",
    "nav.services": "Services",
    "nav.why": "Why Us",
    "nav.faq": "FAQ",
    "nav.usecases": "Use Cases",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.reviews": "Reviews",
    "nav.quote": "Get a Quote",

    // ISO badge titles & subtitles
    "iso.9001.t": "ISO 9001",
    "iso.27001.t": "ISO 27001",
    "iso.17100.t": "ISO 17100",

    // Process
    "process.kicker": "How it Works",
    "process.title.a": "Easy & Simple",
    "process.title.b": "3-Step",
    "process.title.c": "Process",
    "process.subtitle": "We've streamlined our process to get your certified translation as fast as possible without compromising on quality.",
    "process.s1.t": "Upload your document",
    "process.s1.d": "Scan or photo of your document — 100% GDPR-compliant transfer.",
    "process.s2.t": "Get fixed price & pay",
    "process.s2.d": "You receive an instant binding fixed price. Pay securely by SEPA, card or PayPal.",
    "process.s3.t": "Receive certified translation",
    "process.s3.d": "Digital PDF in 24 hours, original by registered post with stamp & signature.",
    "process.cta": "Get Translated Now",

    // Cant find
    "cantfind.title": "Can't find your document?",
    "cantfind.sub": "No problem. We translate all types of documents. Contact us and we will help you right away.",
    "cantfind.cta": "Contact Us",

    // Services
    "services.kicker": "Our Services",
    "services.title": "Our Services",
    "services.subtitle": "Professional translation solutions for every need.",
    "services.learn": "Learn more",
    "services.s1.t": "Certified Translation",
    "services.s1.d": "Professional certified translations accepted by all German authorities including Ausländerbehörde, Standesamt, BAMF and courts.",
    "services.s2.t": "Notarization",
    "services.s2.d": "Additional notarization service for documents requiring official notary stamp for legal proceedings.",
    "services.s3.t": "Express Translation",
    "services.s3.d": "24-hour and same-day certified translation for urgent deadlines and last-minute submissions.",
    "services.s4.t": "Hard Copy Delivery",
    "services.s4.d": "Physical certified translation delivered by post anywhere in Germany with tracking.",
    "services.s5.t": "Specialized Translation",
    "services.s5.d": "Expert translation for medical, legal, technical and academic documents requiring subject-matter expertise.",
    "services.s6.t": "Business Translation",
    "services.s6.d": "Bulk translation solutions for companies, law firms, HR departments and universities.",

    // Why choose
    "why.title": "Why Choose CertiLingua?",
    "why.subtitle": "We are not just another translation service. We are your trusted partner for official documents.",
    "why.cta": "Request Your Translation Now",
    "why.c1.t": "100% Acceptance Guarantee",
    "why.c1.d": "Our translations are accepted by all German authorities — or we redo it completely free of charge.",
    "why.c2.t": "24–48 Hour Delivery",
    "why.c2.d": "Fast, reliable delivery without compromising quality. Express and same-day orders available.",
    "why.c3.t": "Certified Translators",
    "why.c3.d": "All our translators are state-recognized, ISO 17100 certified with years of experience handling official documents.",
    "why.c4.t": "Maximum Data Security",
    "why.c4.d": "Your sensitive documents are protected with 256-bit encryption. ISO 27001 certified. All documents securely deleted after 30 days.",
    "why.c5.t": "Transparent Pricing",
    "why.c5.d": "No hidden fees. €24 per page, everything included. You know exactly what you pay before ordering.",
    "why.c6.t": "Personal Support",
    "why.c6.d": "Our team is reachable by email and WhatsApp. We respond within one hour and guide you through the entire process.",

    // Hero
    "hero.badge": "ISO 17100 · 100% Acceptance Guarantee",
    "hero.title.a": "Certified Translations",
    "hero.title.b": "Accepted",
    "hero.title.c": "by USCIS, Courts & Embassies",
    "hero.subtitle": "Sworn, ISO-certified translations delivered in as little as 24 hours — guaranteed accepted by USCIS, immigration authorities, courts, embassies, and universities worldwide. Or your money back.",
    "hero.cta": "Start your Certified Translation",
    "hero.cta.secondary": "Get an instant quote",
    "hero.trust.support": "Round-the-clock support",
    "hero.trust.physical": "Hard copy by post included",
    "hero.trust.confidential": "GDPR · NDA-protected",

    // TrustBar
    "trustbar.title": "Trusted by 12,000+ clients & accepted by official authorities worldwide",

    // Acceptance guarantee
    "guarantee.kicker": "Our promise",
    "guarantee.title": "100% Acceptance Guarantee",
    "guarantee.subtitle": "If your certified translation is rejected by USCIS, an embassy, court, or university for any reason related to its translation or certification, we revise it for free — or refund you in full. No questions asked.",
    "guarantee.point1.t": "Accepted or refunded",
    "guarantee.point1.d": "Full refund if your document is not accepted by the issuing authority.",
    "guarantee.point2.t": "ISO-certified linguists",
    "guarantee.point2.d": "Sworn, vetted translators specialised in legal, medical & academic fields.",
    "guarantee.point3.t": "Confidential by design",
    "guarantee.point3.d": "GDPR-compliant handling, encrypted storage, NDA on every project.",
    "guarantee.point4.t": "On-time, every time",
    "guarantee.point4.d": "Standard 24–48h delivery. Rush turnaround available in hours.",

    // Use Cases
    "uc.kicker": "Use cases",
    "uc.title": "Built for the documents that decide your future",
    "uc.subtitle": "Whether you're applying for a green card, enrolling at a university abroad, or filing in court — our certified translations meet the exact requirements of the receiving authority.",
    "uc.immigration.t": "Immigration & Visas",
    "uc.immigration.d": "USCIS, IRCC, UKVI, embassies. Birth & marriage certificates, passports, police records.",
    "uc.academic.t": "Academic & University",
    "uc.academic.d": "Diplomas, transcripts, recommendation letters — accepted by universities worldwide.",
    "uc.legal.t": "Legal & Court",
    "uc.legal.d": "Sworn translations for courts, contracts, powers of attorney, notarial deeds.",
    "uc.business.t": "Business & Corporate",
    "uc.business.d": "Articles of incorporation, financial statements, patents, compliance documents.",

    // CTA
    "cta.kicker": "Get Certified",
    "cta.title.a": "Order in minutes.",
    "cta.title.b": "Delivered on time.",
    "cta.subtitle": "Fast, accurate translations with no subscriptions & no hidden fees.",
    "cta.button": "Start your Certified Translation",

    // Reviews
    "reviews.badge": "Verified customer reviews",
    "reviews.title.a": "Trusted by clients in",
    "reviews.title.b": "120+ countries",
    "reviews.subtitle": "Independently rated for accuracy, speed, and acceptance by embassies, courts, and universities worldwide.",
    "reviews.basedOn": "Based on",
    "reviews.verifiedReviews": "verified reviews",
    "reviews.readAll": "Read all reviews on Trustpilot",
    "reviews.excellent": "Excellent",
    "reviews.latest": "Latest reviews",
    "reviews.verifiedFooter.title": "Independently verified on Trustpilot",
    "reviews.verifiedFooter.sub": "Reviews collected from real, paying customers — moderated for authenticity.",

    // Footer
    "footer.menu": "Menu",
    "footer.legal": "Legal",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.about": "ISO-certified translations accepted by USCIS, embassies, courts, and universities — delivered fast, with full confidentiality.",
    "footer.response": "Average response time: under 1 hour, 24/7.",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know before ordering. Can't find an answer? Our team replies within an hour, day or night.",
    "faq.q1": "Are your translations accepted by USCIS?",
    "faq.a1": "Yes. Every translation includes a signed Certificate of Translation Accuracy that meets USCIS, IRCC, UKVI, and embassy requirements. We back this with our 100% Acceptance Guarantee — if it's rejected, we refund you in full.",
    "faq.q2": "Do you offer notarized translations?",
    "faq.a2": "Yes. Notarization can be added at checkout. The translator's certificate is signed before a notary public and bears an official seal.",
    "faq.q3": "How will I receive my translation?",
    "faq.a3": "You'll receive a digital PDF (signed and stamped) by email, ready to print. A physical hard copy by tracked post is included on most orders or available as an add-on.",
    "faq.q4": "How do you handle confidentiality?",
    "faq.a4": "All documents are processed under NDA, on encrypted GDPR-compliant servers in the EU. Files are deleted within 90 days unless you request retention.",
    "faq.q5": "What's your turnaround time?",
    "faq.a5": "Standard delivery is 24–48 hours. Rush service can deliver in as little as 4–8 hours, depending on language and document type.",
    "faq.q6": "How much does a certified translation cost?",
    "faq.a6": "Pricing starts at €16.99 per page (≤250 words). Final cost depends on length, language pair, urgency, and add-ons such as notarization or hard copy delivery.",

    // Quote / multi-step
    "quote.title": "Get your instant quote",
    "quote.subtitle": "Four quick steps. No account needed. You'll see the price before you pay.",
    "quote.step": "Step",
    "quote.of": "of",
    "quote.next": "Continue",
    "quote.back": "Back",
    "quote.submit": "Get My Secure Quote",
    "quote.s1.title": "Upload your document",
    "quote.s1.sub": "PDF, JPG, or PNG. Encrypted upload, NDA-protected.",
    "quote.s1.drop": "Drop files here, or click to browse",
    "quote.s1.hint": "Up to 10 files · 20MB each",
    "quote.s1.pages": "Estimated pages",
    "quote.s2.title": "Choose your language pair",
    "quote.s2.from": "Translate from",
    "quote.s2.to": "Translate into",
    "quote.s3.title": "Select turnaround",
    "quote.s3.standard": "Standard",
    "quote.s3.standard.d": "24–48 hours · included",
    "quote.s3.rush": "Rush",
    "quote.s3.rush.d": "Same day · +50%",
    "quote.s3.express": "Express",
    "quote.s3.express.d": "Within 4 hours · +100%",
    "quote.s3.addons": "Add-ons",
    "quote.s3.notary": "Notarization (+€19)",
    "quote.s3.hardcopy": "Hard copy by tracked post (+€12)",
    "quote.s4.title": "Review & submit",
    "quote.s4.summary": "Estimated total",
    "quote.s4.contact": "Where should we send the quote?",
    "quote.s4.email": "Email address",
    "quote.s4.name": "Your name",
    "quote.success.title": "Request received — check your email",
    "quote.success.sub": "Our team will confirm your quote within 30 minutes (24/7). You'll receive a secure link to pay and track delivery.",
    "quote.success.cta": "Back to home",
    "quote.price.base": "Base price",
    "quote.price.urgency": "Urgency",
    "quote.price.notary": "Notarization",
    "quote.price.hardcopy": "Hard copy",

    // Trust Strip (sticky)
    "strip.guarantee": "100% USCIS Acceptance Guarantee",
    "strip.delivery": "Typical delivery: 24 hours",
    "strip.confidential": "Confidential & NDA-secured",
    "strip.experts": "ISO-certified expert translators",

    // Sample translation
    "sample.kicker": "What you'll receive",
    "sample.title": "A sample certified translation",
    "sample.subtitle": "Every order ships as a signed, stamped PDF with a Certificate of Translation Accuracy — formatted to meet USCIS, embassy, court, and university requirements.",
    "sample.bullet1": "Signed Certificate of Translation Accuracy",
    "sample.bullet2": "Official translator stamp & wet-ink signature",
    "sample.bullet3": "Mirror-formatted to your original document",
    "sample.bullet4": "Hard copy by tracked post available",
    "sample.cta": "View full-size sample",
    "sample.modal.title": "Sample Certified Translation",
    "sample.modal.note": "Personal data has been blurred to protect client confidentiality.",
    "sample.modal.close": "Close",

    // Microcopy
    "micro.secureQuote": "Get My Secure Quote",
    "micro.speakExpert": "Speak with a Translation Expert",
    "micro.deliveryHero": "Typical delivery: 24 hours · Rush from 4h",

    // Footer expanded
    "footer.why.title": "Why choose CertiLingua",
    "footer.why.body": "ISO 17100 certified. Sworn translators. NDA-protected. Trusted by 12,000+ clients across 120+ countries — with a 100% acceptance guarantee backed by full refund.",
    "footer.authorities": "Accepted by",
    "footer.auth.uscis": "USCIS · Immigration",
    "footer.auth.dmv": "DMV · State agencies",
    "footer.auth.courts": "Courts & tribunals",
    "footer.auth.embassies": "Embassies & consulates",
    "footer.auth.universities": "Universities worldwide",
    "footer.auth.notaries": "Notaries & law firms",
    "footer.legal.terms": "Terms of Service",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.cookies": "Cookie Policy",
    "footer.legal.gdpr": "GDPR Compliance",

    // Pricing
    "pricing.kicker": "Transparent pricing",
    "pricing.title": "One simple price. No hidden fees.",
    "pricing.subtitle": "Flat-rate certified translations starting at €24 per page (excl. VAT). Add notarization or hard-copy delivery only if you need them.",
    "pricing.bestValue": "Most popular",
    "pricing.card.title": "Certified Translation",
    "pricing.perPage": "per page",
    "pricing.pageDef": "1 page = up to 250 words of source text",
    "pricing.inc.1": "Signed Certificate of Translation Accuracy",
    "pricing.inc.2": "USCIS · embassy · court formatting",
    "pricing.inc.3": "Digital PDF delivered by email",
    "pricing.inc.4": "24–48h standard turnaround",
    "pricing.inc.5": "100% acceptance guarantee",
    "pricing.cta": "Upload Document & Get Quote",
    "pricing.reassure": "🔒 256-bit secure upload · No payment until you approve",
    "pricing.addons": "Optional add-ons",
    "pricing.addon.notary.t": "Notarization",
    "pricing.addon.notary.d": "Notary public seal — required for some courts and immigration filings.",
    "pricing.addon.hardcopy.t": "Hard copy by post",
    "pricing.addon.hardcopy.d": "Wet-ink signed original shipped via tracked mail worldwide.",
    "pricing.addon.rush.t": "Rush turnaround",
    "pricing.addon.rush.d": "Same-day delivery for urgent immigration or court deadlines.",
    "pricing.noHidden": "No subscriptions · No setup fees · Pay only for what you order",

    // Documents grid
    "docs.kicker": "Our Documents",
    "docs.subtitle": "All documents are certified by court-sworn translators.",

    // ISO badges
    "iso.9001.sub": "Quality Management",
    "iso.27001.sub": "Information Security",
    "iso.17100.sub": "Translation Services",

    // Order page
    "order.title": "Order your certified translation",
    "order.subtitle": "Fast 4-step checkout. No account needed.",
    "order.step": "Step",
    "order.next": "Continue",
    "order.back": "Back",
    "order.s1.title": "Document & Language",
    "order.s1.upload": "Upload your document(s)",
    "order.s1.uploadHint": "PDF, JPG or PNG · max 10MB per file",
    "order.s1.dropzone": "Drag files here or click to upload",
    "order.s1.from": "Source language",
    "order.s1.to": "Target language",
    "order.s1.notes": "Notes for the translator (optional)",
    "order.s2.title": "Service Options",
    "order.s2.turnaround": "Turnaround time",
    "order.s2.standard": "Standard (3–5 days)",
    "order.s2.express": "Express (24 hours)",
    "order.s2.rush": "Rush (8 hours)",
    "order.s2.pages": "Number of pages",
    "order.s2.addons": "Optional add-ons",
    "order.s2.notary": "Notarization",
    "order.s2.hardcopy": "Hard copy by post",
    "order.s2.summary": "Order summary",
    "order.s2.total": "Total",
    "order.s3.title": "Payment & Details",
    "order.s3.name": "Full name",
    "order.s3.email": "Email address",
    "order.s3.street": "Street & number",
    "order.s3.zip": "Postal code",
    "order.s3.city": "City",
    "order.s3.country": "Country",
    "order.s3.vat": "All prices excl. VAT",
    "order.s3.pay": "Pay now",
    "order.s4.title": "Order confirmed!",
    "order.s4.orderNo": "Order number",
    "order.s4.delivery": "Delivery in 24–48 hours",
    "order.s4.emailSent": "We have sent a confirmation to your email.",
    "order.s4.home": "Back to home",

    // Quote page extras
    "quote.page.title": "Request a quote",
    "quote.page.subtitle": "We'll get back to you within one hour.",
    "quote.page.docType": "Document type",
    "quote.page.pages": "Estimated number of pages",
    "quote.page.turnaround": "Turnaround preference",
    "quote.page.submit": "Request Quote",
    "quote.page.success": "Thank you! We will get back to you within one hour.",
  },
  DE: {
    // Nav
    "nav.home": "Startseite",
    "nav.services": "Leistungen",
    "nav.usecases": "Anwendungsfälle",
    "nav.blog": "Blog",
    "nav.contact": "Kontakt",
    "nav.reviews": "Bewertungen",
    "nav.quote": "Angebot anfordern",

    // Hero
    "hero.badge": "ISO 17100 · 100% Akzeptanzgarantie",
    "hero.title.a": "Staatlich anerkannte &",
    "hero.title.b": "beglaubigte",
    "hero.title.c": "Übersetzungen",
    "hero.subtitle": "Von vereidigten Übersetzern angefertigt und anerkannt von Standesämtern, Universitäten, Gerichten und Behörden in ganz Deutschland — sowie von USCIS und Botschaften weltweit. ISO 17100, DSGVO-konform, Lieferung in 24 Stunden.",
    "hero.cta": "Beglaubigte Übersetzung starten",
    "hero.cta.secondary": "Sofortangebot erhalten",
    "hero.trust.support": "Support rund um die Uhr",
    "hero.trust.physical": "Originaldokument per Post inklusive",
    "hero.trust.confidential": "DSGVO · NDA-geschützt",

    // TrustBar
    "trustbar.title": "12.000+ Kunden vertrauen uns — anerkannt von Behörden weltweit",

    // Acceptance guarantee
    "guarantee.kicker": "Unser Versprechen",
    "guarantee.title": "100% Akzeptanzgarantie",
    "guarantee.subtitle": "Sollte Ihre beglaubigte Übersetzung aus Gründen der Übersetzung oder Beglaubigung von USCIS, einer Botschaft, einem Gericht oder einer Universität abgelehnt werden, überarbeiten wir sie kostenlos — oder erstatten den vollen Betrag. Ohne Wenn und Aber.",
    "guarantee.point1.t": "Anerkannt oder Geld zurück",
    "guarantee.point1.d": "Volle Rückerstattung, falls Ihr Dokument von der Behörde nicht anerkannt wird.",
    "guarantee.point2.t": "ISO-zertifizierte Linguisten",
    "guarantee.point2.d": "Vereidigte, geprüfte Übersetzer mit juristischer, medizinischer & akademischer Spezialisierung.",
    "guarantee.point3.t": "Vertraulich by design",
    "guarantee.point3.d": "DSGVO-konforme Verarbeitung, verschlüsselte Speicherung, NDA bei jedem Projekt.",
    "guarantee.point4.t": "Pünktlich, immer",
    "guarantee.point4.d": "Standardlieferung 24–48 Std. Express-Lieferung innerhalb weniger Stunden möglich.",

    // Use Cases
    "uc.kicker": "Anwendungsfälle",
    "uc.title": "Für die Dokumente, die über Ihre Zukunft entscheiden",
    "uc.subtitle": "Ob Green-Card-Antrag, Einschreibung an einer Universität im Ausland oder Gerichtsverfahren — unsere beglaubigten Übersetzungen erfüllen die exakten Anforderungen der empfangenden Behörde.",
    "uc.immigration.t": "Einwanderung & Visa",
    "uc.immigration.d": "USCIS, IRCC, UKVI, Botschaften. Geburts- & Heiratsurkunden, Pässe, Führungszeugnisse.",
    "uc.academic.t": "Akademisch & Universität",
    "uc.academic.d": "Diplome, Notenspiegel, Empfehlungsschreiben — weltweit anerkannt.",
    "uc.legal.t": "Recht & Gericht",
    "uc.legal.d": "Vereidigte Übersetzungen für Gerichte, Verträge, Vollmachten, notarielle Urkunden.",
    "uc.business.t": "Business & Corporate",
    "uc.business.d": "Gründungsurkunden, Bilanzen, Patente, Compliance-Dokumente.",

    // CTA
    "cta.kicker": "Jetzt zertifizieren",
    "cta.title.a": "In Minuten bestellt.",
    "cta.title.b": "Pünktlich geliefert.",
    "cta.subtitle": "Schnelle, präzise Übersetzungen — ohne Abo, ohne versteckte Kosten.",
    "cta.button": "Beglaubigte Übersetzung starten",

    // Reviews
    "reviews.badge": "Verifizierte Kundenbewertungen",
    "reviews.title.a": "Vertraut von Kunden in",
    "reviews.title.b": "über 120 Ländern",
    "reviews.subtitle": "Unabhängig bewertet für Genauigkeit, Schnelligkeit und Akzeptanz bei Botschaften, Gerichten und Universitäten weltweit.",
    "reviews.basedOn": "Basierend auf",
    "reviews.verifiedReviews": "verifizierten Bewertungen",
    "reviews.readAll": "Alle Bewertungen auf Trustpilot lesen",
    "reviews.excellent": "Hervorragend",
    "reviews.latest": "Neueste Bewertungen",
    "reviews.verifiedFooter.title": "Unabhängig verifiziert auf Trustpilot",
    "reviews.verifiedFooter.sub": "Bewertungen von echten, zahlenden Kunden — auf Echtheit moderiert.",

    // Footer
    "footer.menu": "Menü",
    "footer.legal": "Rechtliches",
    "footer.terms": "AGB",
    "footer.privacy": "Datenschutz",
    "footer.contact": "Kontakt",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.about": "ISO-zertifizierte Übersetzungen, anerkannt von USCIS, Botschaften, Gerichten und Universitäten — schnell geliefert, absolut vertraulich.",
    "footer.response": "Durchschnittliche Antwortzeit: unter 1 Stunde, 24/7.",

    // FAQ
    "faq.title": "Häufig gestellte Fragen",
    "faq.subtitle": "Alles, was Sie vor der Bestellung wissen müssen. Antwort nicht dabei? Unser Team antwortet innerhalb einer Stunde — Tag und Nacht.",
    "faq.q1": "Werden Ihre Übersetzungen von USCIS anerkannt?",
    "faq.a1": "Ja. Jede Übersetzung enthält ein unterzeichnetes Certificate of Translation Accuracy, das die Anforderungen von USCIS, IRCC, UKVI und Botschaften erfüllt. Wir geben darauf unsere 100% Akzeptanzgarantie — bei Ablehnung erstatten wir den vollen Betrag.",
    "faq.q2": "Bieten Sie notariell beglaubigte Übersetzungen an?",
    "faq.a2": "Ja. Die notarielle Beglaubigung kann beim Checkout hinzugefügt werden. Die Bestätigung des Übersetzers wird vor einem Notar unterzeichnet und mit Amtssiegel versehen.",
    "faq.q3": "Wie erhalte ich meine Übersetzung?",
    "faq.a3": "Sie erhalten ein digitales PDF (unterschrieben & gestempelt) per E-Mail, druckfertig. Eine physische Kopie per nachverfolgtem Versand ist bei den meisten Bestellungen inklusive oder optional buchbar.",
    "faq.q4": "Wie gehen Sie mit Vertraulichkeit um?",
    "faq.a4": "Alle Dokumente werden unter NDA auf verschlüsselten, DSGVO-konformen Servern in der EU verarbeitet. Dateien werden nach 90 Tagen gelöscht, sofern Sie keine Aufbewahrung wünschen.",
    "faq.q5": "Wie lange dauert die Lieferung?",
    "faq.a5": "Standardlieferung: 24–48 Stunden. Express-Service: bereits ab 4–8 Stunden — abhängig von Sprache und Dokumenttyp.",
    "faq.q6": "Was kostet eine beglaubigte Übersetzung?",
    "faq.a6": "Ab €16,99 pro Seite (≤250 Wörter). Der Endpreis hängt von Umfang, Sprachpaar, Dringlichkeit und Zusatzleistungen wie notarieller Beglaubigung oder Postversand ab.",

    // Quote
    "quote.title": "Sofortangebot anfordern",
    "quote.subtitle": "Vier schnelle Schritte. Kein Konto nötig. Sie sehen den Preis, bevor Sie zahlen.",
    "quote.step": "Schritt",
    "quote.of": "von",
    "quote.next": "Weiter",
    "quote.back": "Zurück",
    "quote.submit": "Sicheres Angebot anfordern",
    "quote.s1.title": "Dokument hochladen",
    "quote.s1.sub": "PDF, JPG oder PNG. Verschlüsselter Upload, NDA-geschützt.",
    "quote.s1.drop": "Dateien hierher ziehen oder klicken zum Auswählen",
    "quote.s1.hint": "Bis zu 10 Dateien · je 20 MB",
    "quote.s1.pages": "Geschätzte Seitenzahl",
    "quote.s2.title": "Sprachpaar wählen",
    "quote.s2.from": "Übersetzen von",
    "quote.s2.to": "Übersetzen nach",
    "quote.s3.title": "Lieferzeit wählen",
    "quote.s3.standard": "Standard",
    "quote.s3.standard.d": "24–48 Stunden · inklusive",
    "quote.s3.rush": "Express",
    "quote.s3.rush.d": "Noch heute · +50%",
    "quote.s3.express": "Sofort",
    "quote.s3.express.d": "Innerhalb 4 Stunden · +100%",
    "quote.s3.addons": "Zusatzleistungen",
    "quote.s3.notary": "Notarielle Beglaubigung (+€19)",
    "quote.s3.hardcopy": "Originalkopie per Post (+€12)",
    "quote.s4.title": "Prüfen & absenden",
    "quote.s4.summary": "Geschätzter Gesamtpreis",
    "quote.s4.contact": "Wohin sollen wir das Angebot senden?",
    "quote.s4.email": "E-Mail-Adresse",
    "quote.s4.name": "Ihr Name",
    "quote.success.title": "Anfrage erhalten — bitte E-Mail prüfen",
    "quote.success.sub": "Unser Team bestätigt Ihr Angebot innerhalb von 30 Minuten (24/7). Sie erhalten einen sicheren Link zum Bezahlen und Verfolgen.",
    "quote.success.cta": "Zur Startseite",
    "quote.price.base": "Grundpreis",
    "quote.price.urgency": "Dringlichkeit",
    "quote.price.notary": "Notar",
    "quote.price.hardcopy": "Originalkopie",

    // Trust Strip
    "strip.guarantee": "100% USCIS-Akzeptanzgarantie",
    "strip.delivery": "Standardlieferung: 24 Stunden",
    "strip.confidential": "Vertraulich · NDA-geschützt",
    "strip.experts": "ISO-zertifizierte Fachübersetzer",

    // Sample translation
    "sample.kicker": "Was Sie erhalten",
    "sample.title": "Beispiel einer beglaubigten Übersetzung",
    "sample.subtitle": "Jede Bestellung wird als unterzeichnetes, gestempeltes PDF mit Certificate of Translation Accuracy geliefert — formatiert nach den Anforderungen von USCIS, Botschaften, Gerichten und Universitäten.",
    "sample.bullet1": "Unterzeichnetes Certificate of Translation Accuracy",
    "sample.bullet2": "Offizieller Übersetzerstempel & handschriftliche Unterschrift",
    "sample.bullet3": "Layout-getreue Wiedergabe Ihres Originals",
    "sample.bullet4": "Originalkopie per nachverfolgtem Versand verfügbar",
    "sample.cta": "Beispiel in voller Größe ansehen",
    "sample.modal.title": "Beispiel: Beglaubigte Übersetzung",
    "sample.modal.note": "Persönliche Daten wurden zum Schutz der Vertraulichkeit unkenntlich gemacht.",
    "sample.modal.close": "Schließen",

    // Microcopy
    "micro.secureQuote": "Sicheres Angebot anfordern",
    "micro.speakExpert": "Mit Übersetzungs-Experten sprechen",
    "micro.deliveryHero": "Standardlieferung: 24 Stunden · Express ab 4 Std.",

    // Footer expanded
    "footer.why.title": "Warum CertiLingua",
    "footer.why.body": "ISO 17100 zertifiziert. Vereidigte Übersetzer. NDA-geschützt. Über 12.000 Kunden in 120+ Ländern vertrauen uns — mit 100% Akzeptanzgarantie und voller Rückerstattung.",
    "footer.authorities": "Anerkannt von",
    "footer.auth.uscis": "USCIS · Einwanderung",
    "footer.auth.dmv": "DMV · Behörden",
    "footer.auth.courts": "Gerichte",
    "footer.auth.embassies": "Botschaften & Konsulate",
    "footer.auth.universities": "Universitäten weltweit",
    "footer.auth.notaries": "Notare & Kanzleien",
    "footer.legal.terms": "AGB",
    "footer.legal.privacy": "Datenschutz",
    "footer.legal.cookies": "Cookie-Richtlinie",
    "footer.legal.gdpr": "DSGVO-Konformität",

    // Pricing
    "pricing.kicker": "Transparente Preise",
    "pricing.title": "Ein einfacher Preis. Keine versteckten Kosten.",
    "pricing.subtitle": "Beglaubigte Übersetzungen zum Festpreis ab €24 pro Seite (zzgl. MwSt.). Notarielle Beglaubigung oder Postversand nur, wenn Sie diese benötigen.",
    "pricing.bestValue": "Am beliebtesten",
    "pricing.card.title": "Beglaubigte Übersetzung",
    "pricing.perPage": "pro Seite",
    "pricing.pageDef": "1 Seite = bis zu 250 Wörter des Originaltexts",
    "pricing.inc.1": "Unterzeichnetes Certificate of Translation Accuracy",
    "pricing.inc.2": "USCIS · Botschaft · Gericht — passendes Format",
    "pricing.inc.3": "Digitales PDF per E-Mail",
    "pricing.inc.4": "24–48 Std. Standardlieferung",
    "pricing.inc.5": "100% Akzeptanzgarantie",
    "pricing.cta": "Dokument hochladen & Angebot erhalten",
    "pricing.reassure": "🔒 256-Bit verschlüsselter Upload · Zahlung erst nach Ihrer Freigabe",
    "pricing.addons": "Optionale Zusatzleistungen",
    "pricing.addon.notary.t": "Notarielle Beglaubigung",
    "pricing.addon.notary.d": "Notarsiegel — erforderlich für manche Gerichte und Einwanderungsverfahren.",
    "pricing.addon.hardcopy.t": "Originalkopie per Post",
    "pricing.addon.hardcopy.d": "Original mit Unterschrift, weltweit per nachverfolgtem Versand.",
    "pricing.addon.rush.t": "Express-Lieferung",
    "pricing.addon.rush.d": "Lieferung am selben Tag — für dringende Termine bei Behörden oder Gerichten.",
    "pricing.noHidden": "Kein Abo · Keine Einrichtungsgebühr · Sie zahlen nur, was Sie bestellen",

    // Documents grid
    "docs.kicker": "Unsere Dokumente",
    "docs.subtitle": "Alle Dokumente werden von gerichtlich vereidigten Übersetzern beglaubigt.",

    // ISO badges
    "iso.9001.sub": "Qualitätsmanagement",
    "iso.27001.sub": "Informationssicherheit",
    "iso.17100.sub": "Übersetzungsdienstleistungen",

    // Order page
    "order.title": "Beglaubigte Übersetzung bestellen",
    "order.subtitle": "Schneller 4-Schritt-Bestellvorgang. Kein Konto nötig.",
    "order.step": "Schritt",
    "order.next": "Weiter",
    "order.back": "Zurück",
    "order.s1.title": "Dokument & Sprache",
    "order.s1.upload": "Dokument(e) hochladen",
    "order.s1.uploadHint": "PDF, JPG oder PNG · max. 10 MB pro Datei",
    "order.s1.dropzone": "Dateien hierher ziehen oder klicken zum Hochladen",
    "order.s1.from": "Ausgangssprache",
    "order.s1.to": "Zielsprache",
    "order.s1.notes": "Hinweise für den Übersetzer (optional)",
    "order.s2.title": "Service-Optionen",
    "order.s2.turnaround": "Lieferzeit",
    "order.s2.standard": "Standard (3–5 Tage)",
    "order.s2.express": "Express (24 Stunden)",
    "order.s2.rush": "Eilauftrag (8 Stunden)",
    "order.s2.pages": "Anzahl Seiten",
    "order.s2.addons": "Optionale Zusatzleistungen",
    "order.s2.notary": "Beglaubigung",
    "order.s2.hardcopy": "Gedruckte Kopie",
    "order.s2.summary": "Bestellübersicht",
    "order.s2.total": "Gesamt",
    "order.s3.title": "Zahlung & Daten",
    "order.s3.name": "Vollständiger Name",
    "order.s3.email": "E-Mail-Adresse",
    "order.s3.street": "Straße & Hausnummer",
    "order.s3.zip": "PLZ",
    "order.s3.city": "Stadt",
    "order.s3.country": "Land",
    "order.s3.vat": "Alle Preise zzgl. MwSt.",
    "order.s3.pay": "Jetzt bezahlen",
    "order.s4.title": "Bestellung bestätigt!",
    "order.s4.orderNo": "Bestellnummer",
    "order.s4.delivery": "Lieferung in 24–48 Stunden",
    "order.s4.emailSent": "Wir haben eine Bestätigung an Ihre E-Mail gesendet.",
    "order.s4.home": "Zurück zur Startseite",

    // Quote page extras
    "quote.page.title": "Angebot anfordern",
    "quote.page.subtitle": "Wir melden uns innerhalb einer Stunde bei Ihnen.",
    "quote.page.docType": "Dokumenttyp",
    "quote.page.pages": "Geschätzte Seitenzahl",
    "quote.page.turnaround": "Bevorzugte Lieferzeit",
    "quote.page.submit": "Angebot anfordern",
    "quote.page.success": "Vielen Dank! Wir melden uns innerhalb einer Stunde bei Ihnen.",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const I18nContext = createContext<Ctx>({ lang: "EN", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("DE");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("certilingua.lang") as Lang | null;
      if (stored === "EN" || stored === "DE") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("certilingua.lang", l); } catch {}
  };

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.EN[key] ?? key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Stable, locale-independent number formatting (safe for SSR). */
export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
