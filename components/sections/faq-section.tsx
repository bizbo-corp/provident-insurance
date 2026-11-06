import { Container } from "@/components/layout/container";
import { RichText } from "@/components/layout/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/types";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex bg-light-grey py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <h3 className="section-heading">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="col-span-2">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <RichText html={faq.answerHtml} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
