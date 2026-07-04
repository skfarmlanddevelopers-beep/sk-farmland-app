import { motion } from 'motion/react';
import { ShieldCheck, FileText, Scale, Landmark } from 'lucide-react';

interface LegalProps {
  viewType: 'terms' | 'privacy' | 'disclaimer';
}

export default function LegalPages({ viewType }: LegalProps) {
  return (
    <motion.div
      id={`legal-page-${viewType}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-4 py-12 space-y-10"
    >
            {/* 1. Terms & Conditions View */}
      {viewType === 'terms' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <span className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-500">
              <Scale size={24} />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Terms & Conditions</h1>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">SK Farmland Developers</p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <p className="font-semibold text-zinc-200">
              Welcome to SK Farmland Developers. By accessing our website or engaging with our services, you agree to the following terms and conditions:
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-tight">1. Property Information</h3>
              <p>
                SK Farmland Developers provides details of farmland properties for sale. While we aim to keep all information accurate and updated, we do not guarantee completeness or accuracy. Buyers are advised to verify all details independently before making any decision.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">2. Property Purchase</h3>
              <p>
                Interested buyers must follow the official purchase process, including submission of accurate personal and financial details. SK Farmland Developers reserves the right to accept or reject any booking or purchase request at its sole discretion.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">3. Pricing & Payments</h3>
              <p>
                All property prices are subject to change without prior notice. Payments must be made as per the agreed schedule. Delay or failure in payment may lead to cancellation of booking and applicable charges.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">4. Property Registration & Transfer</h3>
              <p>
                Ownership of the property will be transferred to the buyer only after full payment is completed. All registration charges, stamp duty, legal expenses, and government fees shall be borne by the buyer.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">5. Land Usage</h3>
              <p>
                The purchased farmland is intended for agricultural and related purposes as per applicable government rules. Any other use must comply with local laws and regulations. SK Farmland Developers is not responsible for misuse of the land.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">6. Legal Compliance</h3>
              <p>
                Buyers are responsible for complying with all applicable local, state, and central government laws, including land use, agricultural regulations, and environmental norms.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">7. Maintenance Responsibility</h3>
              <p>
                After purchase, the maintenance, development, and upkeep of the land is the sole responsibility of the buyer. SK Farmland Developers may provide guidance but holds no obligation for ongoing maintenance.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">8. Additional Charges (If Applicable)</h3>
              <p>
                Charges will apply for the following services:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Water usage for farmhouse construction will be charged separately</li>
                <li>Cleaning of land, including removal of unwanted plants, bushes, or debris, will be charged extra</li>
                <li>Any additional services or work beyond the standard scope will be charged as applicable</li>
              </ul>
              <p className="text-zinc-500 font-mono text-[10px] italic">
                Note: All such charges will be clearly communicated to the buyer in advance.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">9. Cancellation & Refund Policy</h3>
              <p>
                Cancellation and refund terms will be governed by the individual sale agreement. Generally, booking amounts are non-refundable unless otherwise agreed in writing.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">10. Limitation of Liability</h3>
              <p>
                SK Farmland Developers shall not be held liable for any direct or indirect loss, damages, or issues arising from the use of the property or reliance on the information provided.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">11. Changes to Terms</h3>
              <p>
                SK Farmland Developers reserves the right to modify or update these terms at any time without prior notice. Continued use of our services implies acceptance of the updated terms.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">12. Governing Law</h3>
              <p>
                All transactions and agreements are subject to the jurisdiction of the location where the property is situated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Privacy Policy View */}
      {viewType === 'privacy' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <span className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-500">
              <ShieldCheck size={24} />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">SK Farmland Developers</p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <p className="font-semibold text-zinc-200">
              SK Farmland Developers respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-tight">1. Information We Collect</h3>
              <p>
                We may collect the following details when you interact with us: Name, Phone number, Email address, Location details & Any information shared through enquiry forms, WhatsApp, or calls.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">2. How We Use Your Information</h3>
              <p>Your information is used for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Responding to your enquiries</li>
                <li>Providing property details and project updates</li>
                <li>Assisting in property purchase process</li>
                <li>Sending offers, updates, or promotional messages</li>
              </ul>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">3. Sharing of Information</h3>
              <p>
                We do not sell or rent your personal information. Your data may be shared only:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>With internal team members for business purposes</li>
                <li>When required by law or legal authorities</li>
              </ul>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">4. Data Security</h3>
              <p>
                We take reasonable steps to protect your personal information from unauthorized access, misuse, or disclosure. However, we cannot guarantee complete security of data shared online.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">5. Cookies & Website Usage</h3>
              <p>
                Our website may use cookies to improve user experience and analyze website traffic. You can choose to disable cookies through your browser settings.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">6. Third-Party Links</h3>
              <p>
                Our website may contain links to external websites (such as maps or social media). We are not responsible for the privacy practices of those websites.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">7. Your Consent</h3>
              <p>
                By using our website or sharing your details, you agree to this Privacy Policy.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">8. Updates to Policy</h3>
              <p>
                SK Farmland Developers may update this Privacy Policy from time to time without prior notice.
              </p>

              <h3 className="text-sm font-bold text-white tracking-tight pt-1">9. Contact Us</h3>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 text-xs space-y-1.5 font-mono max-w-md">
                <p className="font-bold text-zinc-300">SK Farmland Developers</p>
                <p>📞 Phone: 74111-31002</p>
                <p>📧 Email: info@skfarmlanddevelopers.com</p>
                <p>🌐 Website: www.skfarmlanddevelopers.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Disclaimer View */}
      {viewType === 'disclaimer' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <span className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-500">
              <FileText size={24} />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Disclaimer</h1>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">SK Farmland Developers</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <p className="font-semibold text-zinc-200">
              The information provided on this website is for general informational purposes only.
            </p>
            <p>
              All project details, including land size, pricing, availability, and location, are subject to change without prior notice.
            </p>
            <p>
              Images used on the website are for representation purposes only and may not reflect the exact property.
            </p>
            <p>
              Distances and travel times mentioned are approximate and may vary.
            </p>
            <p className="border-l-2 border-orange-500 pl-3 py-0.5 text-zinc-300 font-medium">
              Buyers are advised to independently verify all documents, approvals, and property details before making any purchase decision.
            </p>
            <p>
              SK Farmland Developers does not guarantee any fixed returns, appreciation, or income from the property.
            </p>
            <p>
              Any development shown (roads, fencing, plantations, etc.) depends on project-specific commitments and may vary.
            </p>
            <p>
              By using this website, you agree that SK Farmland Developers is not liable for any loss or damages arising from reliance on the information provided.
            </p>
            <p className="pt-2 text-zinc-300 font-semibold font-mono text-xs">
              For accurate and updated details, please contact us directly.
            </p>
          </div>
        </div>
      )}

     </motion.div>
  );
}
