
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
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 via-white to-blue-100 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl mx-auto space-y-3">
        <div className="text-center py-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Upload Documents</h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Upload required documents for each section
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SECTIONS.map((section) => (
            <DocumentUploadSection key={section} label={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
