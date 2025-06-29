import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
    { q: "How many templates are available?", a: "We offer 20+ professionally designed templates out of the box." },
    { q: "How long does rendering take?", a: "Renders typically complete within 1–2 minutes depending on video length." },
    { q: "What formats are supported?", a: "Final videos are rendered in high-quality MP4 (H.264 codec)." },
];

export function FAQ() {
    return (
        <section className="py-16 px-4 bg-white">
            <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-4">
                {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger>{f.q}</AccordionTrigger>
                        <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
