
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
    <div className="min-h-screen bg-gradient-to-bl from-violet-50 via-white to-blue-50 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl mx-auto space-y-4">
        <div className="text-center py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">Upload Documents</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Upload required documents for each section
          </p>
        </div>
        <div className="grid gap-4">
          {SECTIONS.map((section) => (
            <DocumentUploadSection key={section} label={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
