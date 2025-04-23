
// Beautiful document upload screen for 5 sections

import { DocumentUploadSection } from "@/components/DocumentUploadSection";

const SECTIONS = [
  "Offer Letter",
  "Cost Sheet",
  "Payment Schedule",
  "KYC Details",
  "Scheme Details",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-violet-100 via-white to-blue-100 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-violet-800 drop-shadow mb-2">Upload Project Documents</h1>
          <p className="text-gray-500 text-base md:text-lg">
            Please upload the required documents for each section. You can view or delete any uploaded file.
          </p>
        </div>
        <div className="grid gap-8">
          {SECTIONS.map((section) => (
            <DocumentUploadSection key={section} label={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

