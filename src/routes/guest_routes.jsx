import About from "../pages/guest/About/About.jsx";
import GuestLayout from "../Layout/GuestLayout.jsx";
import Home from "../pages/guest/Home/Home.jsx";
import AIMap from "../pages/guest/AIMap/AIMap.jsx";
import BlogDetail from "../pages/guest/Blog/BlogDetail.jsx";
import BlogListings from "../pages/guest/Blog/BlogListings.jsx";
import Contact from "../pages/guest/Contact/Contact.jsx";
import PropertyDetail from "../pages/guest/Property/PropertyDetail.jsx";
import PropertyListings from "../pages/guest/Property/PropertyListings.jsx";
import StaticPage from "../pages/guest/StaticPage/StaticPage.jsx";

const withGuestLayout = (Component) => () => (
  <GuestLayout>
    <Component />
  </GuestLayout>
);

const withStaticPage = (props) => () => (
  <GuestLayout>
    <StaticPage {...props} />
  </GuestLayout>
);

const guest_routes = {
  "/": withGuestLayout(Home),
  "/home": withGuestLayout(Home),
  "/ai-map": withGuestLayout(AIMap),
  "/about": withGuestLayout(About),
  "/blog": withGuestLayout(BlogListings),
  "/blog/:slug": withGuestLayout(BlogDetail),
  "/contact-us": withGuestLayout(Contact),
  "/properties": withGuestLayout(PropertyListings),
  "/properties/:slug": withGuestLayout(PropertyDetail),
  "/property/:slug": withGuestLayout(PropertyDetail),
  "/terms-of-use": withStaticPage({
    eyebrow: "Company",
    title: "Term of Use",
    body: "This page contains the usage information for A2 Properties. For the latest policy details, contact our team.",
  }),
  "/affiliate-program": withStaticPage({
    eyebrow: "Company",
    title: "Affiliate Program",
    body: "Partner with A2 Properties and connect qualified buyers and investors with our Dubai real estate advisors.",
  }),
  "/terms-and-conditions": withStaticPage({
    eyebrow: "Legal",
    title: "Terms & Conditions",
    body: "These terms and conditions explain the rules for using the A2 Properties website, forms, property information, and digital services.",
    sections: [
      {
        title: "Acceptance of terms",
        paragraphs: [
          "By accessing or using this website, submitting an inquiry, subscribing to updates, requesting property information, or using any feature on the site, you agree to these terms and conditions.",
          "If you do not agree with these terms, you should stop using the website and contact us directly for assistance.",
        ],
      },
      {
        title: "Website information",
        paragraphs: [
          "A2 Properties provides real estate brokerage, advisory, and property marketing information for users interested in buying, selling, renting, or investing in property in Dubai and the UAE.",
          "Property listings, prices, availability, payment plans, floor plans, images, maps, descriptions, and market information are provided for general guidance only and may change without prior notice.",
        ],
      },
      {
        title: "User information",
        paragraphs: [
          "When registering on our site, subscribing to a newsletter, filling out a form, requesting AI Map access, using live chat, or entering information on our site, you may be asked to enter your name, email address, phone number, property preferences, or other details to help us serve you.",
        ],
      },
      {
        title: "How we may use submitted information",
        paragraphs: [
          "We may use information submitted through the website to respond to inquiries, follow up after correspondence, provide requested property information, send relevant updates, and improve our customer experience.",
        ],
        items: [
          "To follow up after live chat, email, phone, WhatsApp, or website inquiries.",
          "To share property listings, project details, market updates, and service information.",
          "To manage newsletter subscriptions and other requested communications.",
        ],
      },
      {
        title: "No guarantee of availability or pricing",
        paragraphs: [
          "Any property availability, price, incentive, payment plan, estimated return, or promotion displayed on the website is subject to confirmation by the relevant developer, seller, landlord, or third-party provider.",
          "A2 Properties does not guarantee that every listing or offer displayed on the website will remain available, accurate, or unchanged at the time you make an inquiry.",
        ],
      },
      {
        title: "No financial or legal advice",
        paragraphs: [
          "The content on this website is provided for informational purposes only and should not be treated as legal, tax, mortgage, financial, or investment advice.",
          "You should obtain independent professional advice and conduct your own due diligence before entering into any real estate transaction.",
        ],
      },
      {
        title: "Third-party content and services",
        paragraphs: [
          "This website may include information, links, tools, maps, media, or offers supplied by developers, sellers, landlords, agents, portals, service providers, or other third parties.",
          "A2 Properties is not responsible for the content, policies, availability, or accuracy of third-party websites or services.",
        ],
      },
      {
        title: "Email and marketing communication",
        paragraphs: [
          "By submitting your contact details, you agree that A2 Properties may contact you about your inquiry, related properties, real estate services, or requested updates.",
          "If at any time you would like to unsubscribe from receiving future marketing emails, you can email us at info@a2properties.ae and we will remove you from marketing correspondence.",
        ],
      },
      {
        title: "Children's use",
        paragraphs: [
          "We do not specifically market to children under the age of 13 years old. Users who submit information through the website should be legally able to do so or have appropriate consent.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "A2 Properties may update these terms and conditions from time to time. Continued use of the website after updates means you accept the revised terms.",
        ],
      },
      {
        title: "Contacting us",
        paragraphs: [
          "If there are any questions regarding these terms and conditions, you may contact us using the information below.",
          "A2 Properties, Office No. 401, Building No. 2, Bay Square, Business Bay, Dubai, UAE.",
          "Email: info@a2properties.ae",
        ],
      },
    ],
  }),
  "/privacy-policy": withStaticPage({
    eyebrow: "Legal",
    title: "Privacy Policy",
    body: "This privacy policy explains how A2 Properties collects, uses, protects, and handles personal information submitted through our website.",
    sections: [
      {
        title: "Personally Identifiable Information",
        paragraphs: [
          "This privacy policy has been compiled to better serve those who are concerned with how their Personally Identifiable Information, or PII, is being used online.",
          "PII, as described in UAE privacy law and information security practices, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read this policy carefully to understand how we collect, use, protect, or otherwise handle your Personally Identifiable Information in accordance with our website.",
        ],
      },
      {
        title: "What personal information do we collect?",
        paragraphs: [
          "When registering on our site, subscribing to updates, requesting property information, unlocking map access, or filling out a form, you may be asked to enter your name, email address, phone number, property preferences, or other details to help us serve you.",
        ],
      },
      {
        title: "When do we collect information?",
        paragraphs: [
          "We collect information from you when you register on our site, subscribe to a newsletter, fill out a form, use live chat, request a callback, unlock a feature, or enter information on our site.",
        ],
      },
      {
        title: "How do we use your information?",
        paragraphs: [
          "We may use the information we collect from you when you register, sign up for our newsletter, respond to a survey or marketing communication, browse the website, or use certain other site features.",
        ],
        items: [
          "To follow up after correspondence, including live chat, email, phone, WhatsApp, or website inquiries.",
          "To respond to property requests and share relevant listings, projects, market updates, or service information.",
          "To improve our website, customer service, marketing communication, and user experience.",
        ],
      },
      {
        title: "Children's privacy",
        paragraphs: [
          "We do not specifically market to children under the age of 13 years old. If we become aware that personal information has been submitted by a child without appropriate consent, we will take reasonable steps to delete that information.",
        ],
      },
      {
        title: "Fair Information Practices",
        paragraphs: [
          "The Fair Information Practices principles have played a significant role in the development of data protection laws around the world. We aim to handle personal information responsibly, transparently, and only for legitimate business purposes connected to our real estate services.",
        ],
      },
      {
        title: "Email communication",
        paragraphs: [
          "We may send emails related to inquiries, property updates, newsletters, market insights, or service communication. If at any time you would like to unsubscribe from receiving future emails, you can email us at info@a2properties.ae and we will promptly remove you from marketing correspondence.",
        ],
      },
      {
        title: "Contacting us",
        paragraphs: [
          "If there are any questions regarding this privacy policy, you may contact us using the information below.",
          "A2 Properties, Office No. 401, Building No. 2, Bay Square, Business Bay, Dubai, UAE.",
          "Email: info@a2properties.ae",
        ],
      },
    ],
  }),
};

export default guest_routes;
