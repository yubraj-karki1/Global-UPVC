import { LegalPage } from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | Global UPVC" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" updated="7 September 2026"><h2>Information we collect</h2><p>When you submit an enquiry, we collect the name, phone number, project details and location information you choose to provide.</p><h2>How we use it</h2><p>We use enquiry information to understand your request, contact you, arrange site visits, prepare quotations and manage follow-up communication.</p><h2>Storage and access</h2><p>Enquiries are stored in the website database. Access is limited to authorised administrators. We do not sell enquiry information.</p><h2>Retention and deletion</h2><p>We retain enquiries while they are useful for customer service and business records. You may ask us to correct or delete your information by calling the numbers shown on the contact page.</p><h2>External services</h2><p>Links to Facebook, Instagram, WhatsApp and Google Maps take you to services with their own privacy policies.</p><h2>Contact</h2><p>For privacy questions, contact Global Hardware and Prefab Pvt. Ltd. in Gwarko, Lalitpur at 9803058200 or 9851217930.</p></LegalPage>;
}
