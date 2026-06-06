import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'Nextora Studio',
    },
    logoText: {
      type: String,
      default: 'NEXTORA',
    },
    faviconSvg: {
      type: String,
      default: 'N Logo',
    },
    footerText: {
      type: String,
      default: 'Where Ideas Take Shape. All rights reserved.',
    },
    socialTwitter: {
      type: String,
      default: 'https://twitter.com/nextorastudio',
    },
    socialLinkedin: {
      type: String,
      default: 'https://linkedin.com/company/nextorastudio',
    },
    socialGithub: {
      type: String,
      default: 'https://github.com/nextorastudio',
    },
    globalSeoTitle: {
      type: String,
      default: 'Nextora Studio | Where Ideas Take Shape',
    },
    globalSeoDesc: {
      type: String,
      default: 'Nextora Studio builds premium websites, mobile applications, software, POS systems, and CRM/ERP solutions.',
    },
    globalSchema: {
      type: String,
      default: '{"@context": "https://schema.org", "@type": "Organization", "name": "Nextora Studio"}',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
