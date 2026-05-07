import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "./Section";
import blogDriving from "@/assets/blog-driving.jpg";
import blogUscis from "@/assets/blog-uscis.jpg";
import blogCost from "@/assets/blog-cost.jpg";

const posts = [
  {
    image: blogDriving,
    title:
      "How to Convert South African Drivers Licence to UK: Complete Step-by-Step Guide",
    excerpt:
      "Did you move to the UK from South Africa and want to know if you can keep driving with your local licence? Well, the answer is yes. You can drive with your South African licence for up to 12 mont...",
  },
  {
    image: blogUscis,
    title: "Can I Translate My Own Birth Certificate for USCIS?",
    excerpt:
      "Many people preparing immigration documents ask the same question: \"Can I translate my own birth certificate for USCIS?\" It feels like a reasonable option, especially if you speak both languages…",
  },
  {
    image: blogCost,
    title: "How Much Does Certified Translation Cost for Different Document Types",
    excerpt:
      "Certified translation costs typically range from $18 to $70 per page or $0.10 to $0.16 per word in 2025. The exact rate depends on factors such as the document type, language pair, and certification…",
  },
];

export function Blog() {
  return (
    <Section className="bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Our Blog
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            Blog &amp; Articles
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We&apos;ve streamlined our process to get your certified translation to you as Fast as
            possible without compromising on quality
          </p>
        </div>

        <div className="relative mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-base font-semibold leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <button className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 -left-2 hidden items-center md:flex">
            <button
              aria-label="Previous"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-border bg-background shadow-sm hover:border-primary/40"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 -right-2 hidden items-center md:flex">
            <button
              aria-label="Next"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-border bg-background shadow-sm hover:border-primary/40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
