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
import staticPages from "../data/staticPages.js";

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
  "/terms-of-use": withStaticPage(staticPages.termsOfUse),
  "/affiliate-program": withStaticPage(staticPages.affiliateProgram),
  "/terms-and-conditions": withStaticPage(staticPages.termsAndConditions),
  "/privacy-policy": withStaticPage(staticPages.privacyPolicy),
};

export default guest_routes;
