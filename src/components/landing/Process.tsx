import { ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import documentStampingImg from "@/assets/document-stamping.jpg";

// Custom icons matching the Figma design
function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="24" height="28" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
      <rect x="12" y="16" width="16" height="2" rx="1" fill="#F59E0B"/>
      <rect x="12" y="21" width="12" height="2" rx="1" fill="#F59E0B"/>
      <rect x="12" y="26" width="14" height="2" rx="1" fill="#F59E0B"/>
      <circle cx="32" cy="18" r="10" fill="#3B82F6"/>
      <path d="M32 13V18M32 18V23M32 18H27M32 18H37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 23L32 14L36 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TranslatorIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="28" height="24" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
      <rect x="10" y="18" width="8" height="2" rx="1" fill="#EF4444"/>
      <rect x="10" y="23" width="12" height="2" rx="1" fill="#EF4444"/>
      <rect x="10" y="28" width="10" height="2" rx="1" fill="#EF4444"/>
      <rect x="24" y="8" width="20" height="16" rx="2" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
      {/* A letter */}
      <path d="M30 18L32 12L34 18M30.5 16H33.5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Translation arrows */}
      <path d="M36 13H40M38 11V15" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 17L40 21" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="24" height="32" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5"/>
      <rect x="12" y="14" width="16" height="2" rx="1" fill="#9CA3AF"/>
      <rect x="12" y="19" width="12" height="2" rx="1" fill="#9CA3AF"/>
      <rect x="12" y="24" width="14" height="2" rx="1" fill="#9CA3AF"/>
      <rect x="12" y="29" width="10" height="2" rx="1" fill="#9CA3AF"/>
      <circle cx="34" cy="30" r="10" fill="white" stroke="#3B82F6" strokeWidth="2"/>
      <path d="M34 26V30H38" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="28" height="20" rx="2" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
      <path d="M4 18L18 28L32 18" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="24" y="8" width="20" height="26" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="28" y="14" width="12" height="2" rx="1" fill="#F59E0B"/>
      <rect x="28" y="19" width="10" height="2" rx="1" fill="#F59E0B"/>
      <rect x="28" y="24" width="8" height="2" rx="1" fill="#F59E0B"/>
      <circle cx="40" cy="30" r="4" fill="#3B82F6"/>
      <path d="M38.5 30L39.5 31L41.5 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const steps = [
  { 
    icon: UploadIcon, 
    title: "Upload your Document", 
    body: "Scan or take a photo of your document and upload it securely." 
  },
  { 
    icon: TranslatorIcon, 
    title: "Translator gets Assigned", 
    body: "Our certified human translators work on your documents immediately." 
  },
  { 
    icon: ReviewIcon, 
    title: "Review & Approve", 
    body: "Receive your translation, then provide feedback or approve for final delivery." 
  },
  { 
    icon: MailIcon, 
    title: "Receive Physical copy by Post OR by Email", 
    body: "Get your high-quality certified translation via email, usually within 48 hours, or get a physical copy by post." 
  },
];

export function Process() {
  return (
    <Section className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <span className="text-sm font-medium text-primary">How it Works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Easy &amp; Simple <span className="text-amber-400">4-Step</span> Process
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">
              We&apos;ve streamlined our process to get your certified translation to you as Fast as possible without compromising on quality
            </p>

            <ol className="mx-auto mt-10 grid max-w-md gap-6 lg:max-w-none">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                    <div className="shrink-0">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <a
              href="#quote-form"
              onClick={(e) => { e.preventDefault(); document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Upload Document &amp; Get Quote <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Right Column - Image with Stats Overlay */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={documentStampingImg}
                alt="Professional document stamping and certification process"
                className="h-auto w-full object-cover"
              />
              {/* Stats Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-navy/70 px-6 py-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white md:text-3xl">60+</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-white/80">Languages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white md:text-3xl">100%</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-white/80">Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white md:text-3xl">24/7</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-white/80">Avg. Turnaround</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
