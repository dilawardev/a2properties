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
    body: "Review the terms that apply when using A2 Properties services and digital experiences. Contact us for current legal documentation.",
  }),
  "/privacy-policy": withStaticPage({
    eyebrow: "Legal",
    title: "Privacy Policy",
    body: "Learn how A2 Properties handles inquiries and customer information. Contact us for the latest privacy documentation.",
  }),
};

export default guest_routes;
