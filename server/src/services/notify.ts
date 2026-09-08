type EnquiryNotice = { name: string; phone: string; message: string; createdAt: Date };

export async function notifyNewEnquiry(enquiry: EnquiryNotice) {
  const webhookUrl = process.env.ENQUIRY_NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "enquiry.created", enquiry }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error(`Enquiry notification failed with ${response.status}.`);
  } catch (error) {
    console.error("Enquiry notification failed:", error);
  }
}
