import docPassport from "@/assets/doc-passport.jpg";
import docInvoice from "@/assets/doc-invoice.jpg";
import docBirth from "@/assets/doc-birth.jpg";
import docPolice from "@/assets/doc-police.jpg";
import docDiploma from "@/assets/doc-diploma.jpg";
import docLicense from "@/assets/doc-license.jpg";
import docSchool from "@/assets/doc-school.jpg";
import docNamechange from "@/assets/doc-namechange.jpg";

export type FAQItem = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  price: number;
  reviews: number;
  rating: number;
  image: string;
  gallery: string[];
  category: string;
  short: string;
  description: string[];
  features: string[];
  faqs?: FAQItem[];
};

const COMMON_FAQS: FAQItem[] = [
  {
    q: "Wird meine Übersetzung von Behörden in Deutschland anerkannt?",
    a: "Ja. Alle Übersetzungen werden von in Deutschland öffentlich bestellten und beeidigten Übersetzern angefertigt und sind bei sämtlichen Behörden, Ämtern und Gerichten anerkannt.",
  },
  {
    q: "Wie erhalte ich meine Übersetzung?",
    a: "Sie erhalten die digitale beglaubigte Übersetzung als PDF per E-Mail. Auf Wunsch senden wir Ihnen das Original zusätzlich per Post (DHL) zu.",
  },
  {
    q: "Wie lange dauert die Bearbeitung?",
    a: "Standardlieferung erfolgt innerhalb von 24–48 Stunden. Mit Express-Option reduziert sich die Bearbeitungszeit um bis zu 75 %.",
  },
  {
    q: "Wie kann ich bezahlen?",
    a: "Wir akzeptieren Kreditkarte, PayPal, SEPA-Lastschrift, Klarna und Sofortüberweisung. Alle Zahlungen sind SSL-verschlüsselt.",
  },
];


export const products: Product[] = [
  {
    slug: "passport-translation",
    name: "Passport Translation",
    price: 16.99,
    reviews: 845,
    rating: 4.8,
    image: docPassport,
    gallery: [docPassport, docInvoice, docBirth],
    category: "Personal",
    short: "Certified passport translation accepted by USCIS, embassies, and authorities worldwide.",
    description: [
      "Whether for visa applications, registering at the registry office or applying for a job: with our certified passport translation you are always on the safe side – officially recognized, delivered precisely and quickly.",
      "All translations are made after ISO 9:1995 standard to ensure maximum accuracy and legal certainty.",
    ],
    features: ["Officially Recognized", "ISO Certified", "48h Turnaround"],
    faqs: [
      {
        q: "Wird meine übersetzte Reisepass-Kopie von Botschaften und USCIS akzeptiert?",
        a: "Ja. Unsere beglaubigten Reisepass-Übersetzungen werden weltweit von Botschaften, Konsulaten, USCIS und Einwanderungsbehörden anerkannt.",
      },
      {
        q: "Welche Seiten meines Reisepasses muss ich übersetzen lassen?",
        a: "In der Regel reicht die Datenseite mit Foto. Für bestimmte Visa-Anträge können auch Stempelseiten erforderlich sein – wir beraten Sie gerne.",
      },
      {
        q: "Muss ich den Originalpass einsenden?",
        a: "Nein. Ein klares Scan oder Foto in guter Qualität (PDF, JPG, PNG) reicht für die beglaubigte Übersetzung vollständig aus.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "invoice-translation",
    name: "Invoice Translation",
    price: 19.5,
    reviews: 412,
    rating: 4.7,
    image: docInvoice,
    gallery: [docInvoice, docPassport, docBirth],
    category: "Business",
    short: "Accurate, certified invoice translations for tax authorities and customs offices.",
    description: [
      "Our certified invoice translations are accepted by all financial authorities, customs offices and consulates.",
      "Precise terminology and formatting ensure your invoices comply with international standards.",
    ],
    features: ["Tax-Authority Accepted", "ISO Certified", "Fast Delivery"],
    faqs: [
      {
        q: "Werden Ihre Rechnungsübersetzungen vom Finanzamt und Zoll akzeptiert?",
        a: "Ja. Alle beglaubigten Übersetzungen entsprechen den Anforderungen deutscher Finanzbehörden, Zollämter und internationaler Konsulate.",
      },
      {
        q: "Können Sie mehrere Rechnungen gleichzeitig übersetzen?",
        a: "Ja, wir übernehmen einzelne Rechnungen ebenso wie umfangreiche Stapel mit Mengenrabatten für Geschäftskunden.",
      },
      {
        q: "Bleiben Tabellen und Layout der Originalrechnung erhalten?",
        a: "Ja, das ursprüngliche Layout, Tabellen und Beträge werden originalgetreu übernommen, damit die Übersetzung 1:1 zur Rechnung passt.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "birth-certificate",
    name: "Birth Certificate",
    price: 24.0,
    reviews: 980,
    rating: 4.9,
    image: docBirth,
    gallery: [docBirth, docPassport, docPolice],
    category: "Personal",
    short: "Certified birth certificate translation for visas, marriage, and family law.",
    description: [
      "Whether for registering at the registry office, applying for a visa or starting school: with our certified translation of your birth certificate you are always on the safe side – officially recognized, delivered precisely and quickly.",
      "Our certified translations of birth certificates are accepted by all authorities, courts, consulates and educational institutions.",
      "Whether for visa applications, passport applications or family law evidence – your birth certificate certified translation meets all formal requirements and is legally binding.",
    ],
    features: ["Officially Recognized", "Legally Valid", "ISO 9:1995 Standard"],
    faqs: [
      {
        q: "Wird die Übersetzung meiner Geburtsurkunde vom Standesamt anerkannt?",
        a: "Ja. Unsere beglaubigten Übersetzungen werden von allen deutschen Standesämtern, Behörden und Gerichten akzeptiert – auch für Eheschließungen und Visa-Anträge.",
      },
      {
        q: "Brauche ich eine Apostille zusätzlich zur Übersetzung?",
        a: "Die Apostille wird vom Ausstellungsland des Originals erteilt. Wir übersetzen die Urkunde inkl. Apostille, sofern diese vorliegt.",
      },
      {
        q: "Wird die Transliteration der Namen nach ISO-Norm vorgenommen?",
        a: "Ja, Namen werden nach ISO 9:1995 transliteriert – das ist Pflicht für Standesämter und alle deutschen Behörden.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "police-certificate",
    name: "Police Certificate of Good Conduct",
    price: 24.8,
    reviews: 560,
    rating: 4.8,
    image: docPolice,
    gallery: [docPolice, docPassport, docBirth],
    category: "Legal",
    short: "Certified police certificate translation accepted internationally.",
    description: [
      "Required for visa, immigration and employment applications. Our certified translation is accepted by USCIS, embassies and authorities worldwide.",
    ],
    features: ["USCIS Accepted", "ISO Certified", "Sworn Translation"],
    faqs: [
      {
        q: "Wird das übersetzte Führungszeugnis im Ausland anerkannt?",
        a: "Ja. Unsere beglaubigten Übersetzungen des polizeilichen Führungszeugnisses werden von Botschaften, USCIS und ausländischen Arbeitgebern weltweit akzeptiert.",
      },
      {
        q: "Wie aktuell muss mein Führungszeugnis sein?",
        a: "Die meisten Behörden verlangen ein Führungszeugnis, das nicht älter als 3–6 Monate ist. Bitte prüfen Sie die Anforderung der Zielbehörde.",
      },
      {
        q: "Übersetzen Sie auch Führungszeugnisse aus dem Ausland?",
        a: "Ja, wir übersetzen Führungszeugnisse aus über 60 Ländern ins Deutsche oder in jede andere Zielsprache.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "diploma-translation",
    name: "Diploma Translation",
    price: 34.5,
    reviews: 765,
    rating: 4.8,
    image: docDiploma,
    gallery: [docDiploma, docSchool, docPassport],
    category: "Academic",
    short: "Certified diploma translations for universities and employers.",
    description: [
      "Accepted by universities, colleges and employers around the world. Our team translates your diploma with the highest accuracy and full legal certification.",
    ],
    features: ["University Accepted", "ISO Certified", "Sworn Translator"],
    faqs: [
      {
        q: "Wird die Diplom-Übersetzung von Universitäten und Arbeitgebern akzeptiert?",
        a: "Ja. Unsere beglaubigten Übersetzungen werden von Universitäten, Fachhochschulen, der ZAB und Arbeitgebern weltweit anerkannt.",
      },
      {
        q: "Übersetzen Sie auch das Diploma Supplement und Notenübersicht?",
        a: "Ja, wir übersetzen Diplom, Diploma Supplement, Transcript of Records und alle akademischen Anlagen als Komplettpaket.",
      },
      {
        q: "Werden Noten und ECTS-Punkte korrekt übertragen?",
        a: "Ja, Noten bleiben im Original erhalten und werden mit einer Erläuterung des deutschen Notensystems versehen, sofern erforderlich.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "driver-license",
    name: "Driver License Translation",
    price: 34.5,
    reviews: 380,
    rating: 4.7,
    image: docLicense,
    gallery: [docLicense, docPassport, docBirth],
    category: "Personal",
    short: "Certified driver license translation for international use.",
    description: [
      "Drive abroad with confidence. Our certified driver license translations are accepted by traffic authorities and rental agencies worldwide.",
    ],
    features: ["Globally Accepted", "ISO Certified", "Fast Turnaround"],
    faqs: [
      {
        q: "Wird die übersetzte Fahrerlaubnis von Führerscheinstellen anerkannt?",
        a: "Ja. Unsere beglaubigten Übersetzungen werden von deutschen Führerscheinstellen, Verkehrsbehörden und internationalen Mietwagenfirmen akzeptiert.",
      },
      {
        q: "Brauche ich zusätzlich einen internationalen Führerschein?",
        a: "Für viele Länder ist die beglaubigte Übersetzung ausreichend. Für längere Aufenthalte kann zusätzlich ein internationaler Führerschein nötig sein.",
      },
      {
        q: "Welche Führerscheinklassen werden übersetzt?",
        a: "Wir übersetzen alle EU- und internationalen Führerscheinklassen einschließlich Vermerken, Ablaufdatum und Beschränkungen.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "school-certificate",
    name: "School Certificate Translation",
    price: 34.0,
    reviews: 290,
    rating: 4.8,
    image: docSchool,
    gallery: [docSchool, docDiploma, docPassport],
    category: "Academic",
    short: "Certified school certificate translation for academic admissions.",
    description: [
      "Required for school enrollments, university admissions and scholarship applications. Officially recognized worldwide.",
    ],
    features: ["School Accepted", "ISO Certified", "Sworn Translation"],
    faqs: [
      {
        q: "Wird mein Schulzeugnis von deutschen Schulen und Universitäten anerkannt?",
        a: "Ja. Unsere beglaubigten Übersetzungen werden von Schulen, Hochschulen, der ZAB und Stipendienorganisationen anerkannt.",
      },
      {
        q: "Können Sie Abiturzeugnisse, Reifezeugnisse und Halbjahreszeugnisse übersetzen?",
        a: "Ja, wir übersetzen alle Arten von Schulzeugnissen – vom Grundschulzeugnis bis zum Abiturzeugnis – beglaubigt und originalgetreu.",
      },
      {
        q: "Werden Schulnoten in das deutsche System umgerechnet?",
        a: "Wir behalten die Originalnoten bei und ergänzen auf Wunsch eine Erläuterung des Notensystems für die Anerkennung in Deutschland.",
      },
      ...COMMON_FAQS,
    ],
  },
  {
    slug: "name-change",
    name: "Name change - Certified translation",
    price: 19.0,
    reviews: 651,
    rating: 4.8,
    image: docNamechange,
    gallery: [docNamechange, docPassport, docBirth],
    category: "Legal",
    short: "Certified name change document translation, legally binding.",
    description: [
      "Necessary for marriage, naturalization or court records. Delivered with full certification and legal validity.",
    ],
    features: ["Court Accepted", "ISO Certified", "Legally Binding"],
    faqs: [
      {
        q: "Wird die Namensänderungsurkunde vom Standesamt anerkannt?",
        a: "Ja. Unsere beglaubigte Übersetzung ist bei Standesämtern, Gerichten und Einbürgerungsbehörden in Deutschland und international anerkannt.",
      },
      {
        q: "Brauche ich die Übersetzung für die Einbürgerung?",
        a: "Ja, bei Einbürgerungsverfahren wird in der Regel eine beglaubigte Übersetzung der Namensänderungsurkunde verlangt.",
      },
      {
        q: "Werden auch Heiratsurkunden mit Namensänderung übersetzt?",
        a: "Ja, wir übersetzen Heiratsurkunden, Scheidungsurteile und gerichtliche Namensänderungen – jeweils beglaubigt und rechtskräftig.",
      },
      ...COMMON_FAQS,
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
