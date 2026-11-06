/** Renders trusted HTML scraped from the live CMS. Never pass user input to this. */
export function RichText({ html }: { html: string }) {
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />;
}
