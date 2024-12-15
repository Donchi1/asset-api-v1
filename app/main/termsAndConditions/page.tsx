// components/TermsAndConditions.tsx
"use client";
import React, { useState } from 'react';

interface Section {
  id: number;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: 1,
    title: 'Eligibility',
    content: `You agree to be of legal age in your country to participate in this program. The minimum age requirement is 18 years.
      Asset-Api is a private platform available only to qualified members and their personally invited guests. Public access is not permitted.`,
  },
  {
    id: 2,
    title: 'Private Transactions',
    content: `All deposits made to Asset-Api are considered private transactions between the platform and its members.
      As a private program, Asset-Api is exempt from the US Securities Act of 1933, the US Securities Exchange Act of 1934,
      and the US Investment Company Act of 1940. Asset-Api is not FDIC insured and is neither a licensed bank nor a security firm.`,
  },
  {
    id: 3,
    title: 'Confidentiality',
    content: `All information, communications, and materials from Asset-Api are unsolicited, private, and confidential.
      Such materials are not intended to be considered as investment advice or solicitation in jurisdictions where such offers are unlawful.
      Member data provided to Asset-Api will remain confidential and will not be shared with third parties.`,
  },
  {
    id: 4,
    title: 'Disclaimer of Liability',
    content: `You agree to invest at your own risk and understand that past performance does not guarantee future results.
      Asset-Api is not responsible for any damages, losses, or costs resulting from violations of these terms or misuse of the platform.
      Members must ensure compliance with local, national, and international laws when using the platform.`,
  },
  {
    id: 5,
    title: 'Platform Rules',
    content: `Asset-Api reserves the right to modify program rules, commissions, and rates at any time without prior notice.
      Members are responsible for reviewing the latest terms and conditions.
      Members must not post negative reviews on public forums or rating sites without first contacting our support team to resolve any issues.`,
  },
  {
    id: 6,
    title: 'Anti-Spam Policy',
    content: `Asset-Api maintains a strict anti-SPAM policy. Members found engaging in spam or unsolicited commercial emails (UCE) will be permanently banned from the platform.`,
  },
  {
    id: 7,
    title: 'Membership Discretion',
    content: `Asset-Api reserves the right to accept or decline membership applications without explanation.`,
  },
  {
    id: 8,
    title: 'Technical Issues',
    content: `In case of technical issues, please contact our support team before taking any public action.`,
  },
  {
    id: 9,
    title: 'Acknowledgment',
    content: `By using Asset-Api, you agree to these terms and hold all principals and members harmless of any liability. If you disagree with any part of this disclaimer, you must immediately stop using our services.`,
  },
];

const TermsAndConditions: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    );
  };

  const handleAccept = () => {
    alert('Thank you for accepting the terms and conditions.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>
      {sections.map(({ id, title, content }) => (
        <div key={id} className="mb-4 border-b pb-4">
          <button
            className="w-full text-left text-lg font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
            onClick={() => toggleSection(id)}
          >
            {title}
          </button>
          {expandedSections.includes(id) && (
            <p className="mt-2 text-gray-700">{content}</p>
          )}
        </div>
      ))}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
        >
          Accept Terms
        </button>
      </div>
      <p className="text-center mt-8 text-sm text-gray-500">
        For support, contact us at{' '}
        <a href="mailto:support@asset-api.info" className="text-blue-600 underline">
          support@asset-api.info
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;
