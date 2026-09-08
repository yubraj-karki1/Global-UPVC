import { LegalPage } from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Website Terms | Global UPVC" };

export default function TermsPage() {
  return <LegalPage title="Website terms" updated="7 September 2026"><h2>Website information</h2><p>This website provides general information about UPVC, glass, hardware, consultation and prefab services. It is not a final quotation or construction agreement.</p><h2>Quotations</h2><p>Pricing, specifications, availability and timelines depend on confirmed measurements, site conditions, material selections and an agreed scope. A website enquiry does not create a contract.</p><h2>Images</h2><p>Images identified as illustrative show the general type of service offered and are not representations of completed client projects.</p><h2>Measurements and site conditions</h2><p>Customers should not rely on website examples as final measurements or structural advice. Relevant dimensions and project requirements must be confirmed before fabrication or construction.</p><h2>External links</h2><p>We are not responsible for the availability or content of third-party websites linked from this website.</p><h2>Contact</h2><p>Questions about these terms can be discussed with Global Hardware and Prefab Pvt. Ltd. using the contact details on the website.</p></LegalPage>;
}
