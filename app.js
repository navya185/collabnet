/**
 * CollabNet Startup Application Core Logic
 * Fully Interactive client-side SPA with LocalStorage persistence.
 * Features: Auth state navigation, campaign management, messaging engine with bot auto-replies, and dynamic matching.
 */

// ==========================================
// 1. Initial Sample Database & Models
// ==========================================

const INITIAL_CREATORS = [
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    email: "aisha@collabnet.com",
    niche: "fashion",
    nicheLabel: "Fashion & Lifestyle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
    followers: 482000,
    followersText: "482K",
    platforms: { instagram: "482K", youtube: null, twitter: null },
    engagement: 6.2,
    basePrice: 45000,
    location: "Delhi NCR",
    aiScore: 94,
    verified: true,
    demographics: [
      { label: "Female (18-25)", percentage: 64 },
      { label: "Female (26-35)", percentage: 20 },
      { label: "Male (18-25)", percentage: 12 },
      { label: "Male (26-35)", percentage: 4 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["Zara India Summer Wear", "H&M Festive Edit", "Nykaa Cosmetics Launch"]
  },
  {
    id: "rohit-dev",
    name: "Rohit Dev",
    email: "rohit@collabnet.com",
    niche: "tech",
    nicheLabel: "Technology & Gadgets",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    followers: 320000,
    followersText: "320K",
    platforms: { instagram: null, youtube: "240K", twitter: "80K" },
    engagement: 5.8,
    basePrice: 60000,
    location: "Bangalore",
    aiScore: 91,
    verified: true,
    demographics: [
      { label: "Male (18-25)", percentage: 55 },
      { label: "Male (26-35)", percentage: 30 },
      { label: "Female (18-25)", percentage: 10 },
      { label: "Female (26-35)", percentage: 5 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606229365785-f311f67f37f1?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["OnePlus Nord Review", "ASUS ROG Unboxing", "Intel Core i9 Launch Campaign"]
  },
  {
    id: "tanya-goel",
    name: "Tanya Goel",
    email: "tanya@collabnet.com",
    niche: "beauty",
    nicheLabel: "Beauty & Wellness",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60",
    followers: 1200000,
    followersText: "1.2M",
    platforms: { instagram: "1.2M", youtube: "850K", twitter: null },
    engagement: 4.2,
    basePrice: 120000,
    location: "Mumbai",
    aiScore: 95,
    verified: true,
    demographics: [
      { label: "Female (18-25)", percentage: 70 },
      { label: "Female (26-35)", percentage: 22 },
      { label: "Male (18-25)", percentage: 5 },
      { label: "Male (26-35)", percentage: 3 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["L'Oreal Paris Glow Campaign", "Lakme Fashion Week Prep", "Sugar Cosmetics Matte Kit"]
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    email: "vikram@collabnet.com",
    niche: "travel",
    nicheLabel: "Travel & Photography",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60",
    followers: 310000,
    followersText: "310K",
    platforms: { instagram: "310K", youtube: "150K", twitter: "45K" },
    engagement: 7.8,
    basePrice: 55000,
    location: "Goa",
    aiScore: 93,
    verified: true,
    demographics: [
      { label: "Male (18-25)", percentage: 40 },
      { label: "Female (18-25)", percentage: 38 },
      { label: "Male (26-35)", percentage: 12 },
      { label: "Female (26-35)", percentage: 10 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["GoPro Hero 11 Launch", "Taj Hotels Visual Series", "Airbnb Heritage Stay Campaign"]
  },
  {
    id: "rohan-joshi",
    name: "Rohan Joshi",
    email: "rohan@collabnet.com",
    niche: "gaming",
    nicheLabel: "Gaming & Esports",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60",
    followers: 850000,
    followersText: "850K",
    platforms: { instagram: "250K", youtube: "850K", twitter: "95K" },
    engagement: 8.5,
    basePrice: 95000,
    location: "Pune",
    aiScore: 92,
    verified: true,
    demographics: [
      { label: "Male (18-25)", percentage: 75 },
      { label: "Male (13-17)", percentage: 15 },
      { label: "Female (18-25)", percentage: 8 },
      { label: "Male (26-35)", percentage: 2 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["PlayStation 5 Console Launch", "RedBull Arena Stream Match", "MSI Gaming Laptop Review"]
  },
  {
    id: "simran-kaur",
    name: "Simran Kaur",
    email: "simran@collabnet.com",
    niche: "fashion",
    nicheLabel: "Fashion & Lifestyle",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    followers: 120000,
    followersText: "120K",
    platforms: { instagram: "120K", youtube: null, twitter: null },
    engagement: 9.2,
    basePrice: 25000,
    location: "Chandigarh",
    aiScore: 89,
    verified: true,
    demographics: [
      { label: "Female (18-25)", percentage: 72 },
      { label: "Female (26-35)", percentage: 15 },
      { label: "Male (18-25)", percentage: 8 },
      { label: "Female (13-17)", percentage: 5 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["Myntra Creator Pass Campaign", "Westside Summer Edit", "Ajio Streetwear Feature"]
  }
];

const INITIAL_BRANDS = [
  {
    id: "nike-india",
    name: "Nike India",
    email: "nike@collabnet.com",
    role: "brand",
    website: "https://nike.com",
    avatar: "https://logo.clearbit.com/nike.com"
  },
  {
    id: "zora-cosmetics",
    name: "Zora Cosmetics",
    email: "zora@collabnet.com",
    role: "brand",
    website: "https://zora.com",
    avatar: "https://logo.clearbit.com/sephora.com"
  }
];

const INITIAL_CAMPAIGNS = [
  {
    id: "camp-1",
    title: "Summer Swimwear Launch",
    brandId: "zora-cosmetics",
    brandName: "Zora Cosmetics",
    niche: "fashion",
    budget: 45000,
    targetAudience: "Female (18-25)",
    location: "Mumbai",
    description: "Launch campaign for our premium eco-swimwear range. Deliverables: 1 Instagram Reel and 2 Stories demonstrating product durability and style.",
    applicants: [
      {
        creatorId: "aisha-patel",
        bidAmount: 45000,
        pitchText: "I'd love to showcase this on my feed! My fashion audience is 64% female between 18-25, which perfectly matches your target.",
        status: "pending"
      }
    ]
  },
  {
    id: "camp-2",
    title: "Xtreme Gaming Mouse Review",
    brandId: "nike-india", // Fictional assignment
    brandName: "Nike India",
    niche: "gaming",
    budget: 80000,
    targetAudience: "Unisex (18-35)",
    location: "Bangalore",
    description: "Honest hardware review campaign targeting casual gamers. Deliverables: 1 YouTube video unboxing + features rundown.",
    applicants: []
  }
];

const INITIAL_MESSAGES = [
  {
    id: "msg-1",
    senderId: "zora-cosmetics",
    receiverId: "aisha-patel",
    message: "Hi Aisha! We loved your profile and would love to collaborate on the Zara Summer edit.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "msg-2",
    senderId: "aisha-patel",
    receiverId: "zora-cosmetics",
    message: "Hi! Thanks for reaching out. Yes, I'd love to discuss details. Here are my standard slots.",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

// ==========================================
// 2. LocalStorage Helpers
// ==========================================
function getLocalStorage(key, defaultVal) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultVal;
}

function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Initialize LocalStorage DB
if (!localStorage.getItem("collabnet_users")) {
  // Creators are role: 'creator', Brands are role: 'brand'
  const initialUsers = [
    ...INITIAL_BRANDS,
    ...INITIAL_CREATORS.map(c => ({
      ...c,
      role: "creator",
      password: "password" // Default password for testing
    }))
  ];
  setLocalStorage("collabnet_users", initialUsers);
}

if (!localStorage.getItem("collabnet_campaigns")) {
  setLocalStorage("collabnet_campaigns", INITIAL_CAMPAIGNS);
}

if (!localStorage.getItem("collabnet_messages")) {
  setLocalStorage("collabnet_messages", INITIAL_MESSAGES);
}

// Local Database State References
const UsersDB = () => getLocalStorage("collabnet_users", []);
const CampaignsDB = () => getLocalStorage("collabnet_campaigns", []);
const MessagesDB = () => getLocalStorage("collabnet_messages", []);

let CurrentUserSession = getLocalStorage("collabnet_current_user", null);

// ==========================================
// 3. Dynamic Toast Notification System
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-solid fa-circle-check";
  if (type === 'error') iconClass = "fa-solid fa-circle-exclamation";
  if (type === 'info') iconClass = "fa-solid fa-bell";

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  
  // Slide in
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // Slide out and remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ==========================================
// 4. Header Actions & Navigation Controller
// ==========================================
function renderHeader() {
  const navMenu = document.getElementById("nav-menu");
  const navActions = document.getElementById("nav-actions");
  if (!navMenu || !navActions) return;

  const user = CurrentUserSession;

  if (!user) {
    // Guest Links
    navMenu.innerHTML = `
      <li><a class="nav-link active" href="#/">Home</a></li>
      <li><a class="nav-link" href="#/creators">Creators</a></li>
      <li><a class="nav-link" href="#/campaigns">Campaigns</a></li>
      <li><a class="nav-link" data-scroll="ai-match" href="#/ai-match">AI Match</a></li>
      <li><a class="nav-link" data-scroll="pricing" href="#/pricing">Pricing</a></li>
    `;

    navActions.innerHTML = `
      <button class="btn btn-secondary" id="btn-login-open">Login</button>
      <button class="btn btn-primary" id="btn-signup-open">Sign Up</button>
      <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle Navigation">
        <i class="fa-solid fa-bars"></i>
      </button>
    `;
    
    // Bind triggers for dynamic buttons
    document.getElementById("btn-login-open").addEventListener("click", () => {
      ModalController.open("modal-auth");
    });
    document.getElementById("btn-signup-open").addEventListener("click", () => {
      // Default to creator wizard
      initWizard();
      ModalController.open("modal-wizard");
    });
  } else if (user.role === 'brand') {
    // Brand Navigation
    navMenu.innerHTML = `
      <li><a class="nav-link" href="#/brand/dashboard">Dashboard</a></li>
      <li><a class="nav-link" href="#/creators">Browse Creators</a></li>
      <li><a class="nav-link" href="#/post-campaign">Post Campaign</a></li>
      <li><a class="nav-link" href="#/campaigns">Campaigns</a></li>
      <li><a class="nav-link" href="#/messages">Messages</a></li>
    `;

    navActions.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:13px; font-weight:600; color:#fff;">${user.name}</span>
        <button class="btn btn-secondary btn-sm" id="btn-logout">Logout</button>
      </div>
    `;

    document.getElementById("btn-logout").addEventListener("click", handleLogout);
  } else if (user.role === 'creator') {
    // Creator Navigation
    navMenu.innerHTML = `
      <li><a class="nav-link" href="#/creator/dashboard">Dashboard</a></li>
      <li><a class="nav-link" href="#/campaigns">Browse Campaigns</a></li>
      <li><a class="nav-link" href="#/creators">Creators</a></li>
      <li><a class="nav-link" href="#/creator/${user.id}">My Profile</a></li>
      <li><a class="nav-link" href="#/messages">Messages</a></li>
    `;

    navActions.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:13px; font-weight:600; color:#fff;">${user.name}</span>
        <button class="btn btn-secondary btn-sm" id="btn-logout">Logout</button>
      </div>
    `;

    document.getElementById("btn-logout").addEventListener("click", handleLogout);
  }

  // Update active links highlighting based on active path
  const hash = window.location.hash || "#/";
  navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    const targetHash = link.getAttribute("href");
    if (hash === targetHash) {
      link.classList.add("active");
    }
  });

  // Re-bind mobile toggler logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });
  }
}

function handleLogout() {
  localStorage.removeItem("collabnet_current_user");
  CurrentUserSession = null;
  showToast("Logged out successfully");
  renderHeader();
  appRouter.navigate("/");
}

// ==========================================
// 5. Hash Routing Controller
// ==========================================
class Router {
  constructor() {
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  navigate(hash) {
    window.location.hash = hash;
  }

  handleRoute() {
    const hash = window.location.hash || "#/";
    let matchedRoute = "landing";
    let params = {};

    if (hash === "#/") {
      matchedRoute = "landing";
    } else if (hash === "#/creators") {
      matchedRoute = "creators";
    } else if (hash === "#/campaigns") {
      matchedRoute = "campaigns";
    } else if (hash === "#/post-campaign") {
      matchedRoute = "post-campaign";
    } else if (hash === "#/brand/dashboard") {
      matchedRoute = "brand-dashboard";
    } else if (hash === "#/creator/dashboard") {
      matchedRoute = "creator-dashboard";
    } else if (hash === "#/messages") {
      matchedRoute = "messages";
    } else if (hash.startsWith("#/campaign/")) {
      matchedRoute = "campaign-details";
      params.id = hash.replace("#/campaign/", "");
    } else if (hash.startsWith("#/creator/")) {
      matchedRoute = "profile";
      params.id = hash.replace("#/creator/", "");
    }

    this.switchView(matchedRoute, params);
    renderHeader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  switchView(routeId, params) {
    // Guards
    if ((routeId === "brand-dashboard" || routeId === "post-campaign") && (!CurrentUserSession || CurrentUserSession.role !== "brand")) {
      showToast("Access restricted. Please log in as a Brand.", "error");
      this.navigate("/");
      return;
    }
    if (routeId === "creator-dashboard" && (!CurrentUserSession || CurrentUserSession.role !== "creator")) {
      showToast("Access restricted. Please log in as a Creator.", "error");
      this.navigate("/");
      return;
    }
    if (routeId === "messages" && !CurrentUserSession) {
      showToast("Please log in to access your messaging inbox.", "error");
      this.navigate("/");
      return;
    }

    document.querySelectorAll(".view-container").forEach(view => {
      view.classList.remove("active");
    });

    const activeView = document.getElementById(`view-${routeId}`);
    if (activeView) {
      activeView.classList.add("active");
    }

    // Trigger initializations
    if (routeId === "landing") {
      initLanding();
    } else if (routeId === "creators") {
      initCreatorsDirectory();
    } else if (routeId === "campaigns") {
      initCampaignsDirectory();
    } else if (routeId === "campaign-details") {
      initCampaignDetails(params.id);
    } else if (routeId === "brand-dashboard") {
      initBrandDashboard();
    } else if (routeId === "creator-dashboard") {
      initCreatorDashboard();
    } else if (routeId === "messages") {
      initMessagesInbox();
    } else if (routeId === "profile") {
      initProfile(params.id);
    }
  }
}

const appRouter = new Router();

// ==========================================
// 6. Modals Setup & Authentication Operations
// ==========================================
const ModalController = {
  activeModal: null,

  open(modalId) {
    this.closeAll();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      this.activeModal = modal;
      document.body.style.overflow = "hidden";
    }
  },

  closeAll() {
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.classList.remove("active");
    });
    this.activeModal = null;
    document.body.style.overflow = "";
  }
};

// Wizard Registration Logic (Creator Wizard)
let wizardStep = 1;
function initWizard() {
  wizardStep = 1;
  document.getElementById("wiz-name").value = "";
  document.getElementById("wiz-email").value = "";
  document.getElementById("wiz-password").value = "";
  document.getElementById("wiz-followers").value = "";
  document.getElementById("wiz-baseprice").value = "";
  document.getElementById("wiz-location").value = "";
  document.getElementById("wiz-agree").checked = false;
  
  // Clear error classes
  document.querySelectorAll(".form-input").forEach(i => i.classList.remove("invalid"));
  updateWizardUI();
}

function updateWizardUI() {
  document.querySelectorAll(".wizard-step-node").forEach(node => {
    node.classList.remove("active");
    if (parseInt(node.getAttribute("data-step")) <= wizardStep) {
      node.classList.add("active");
    }
  });

  document.querySelectorAll(".wizard-step-content").forEach(content => {
    content.classList.remove("active");
    if (parseInt(content.getAttribute("data-step")) === wizardStep) {
      content.classList.add("active");
    }
  });

  const prevBtn = document.getElementById("wiz-btn-prev");
  prevBtn.style.visibility = wizardStep > 1 ? "visible" : "hidden";

  const nextBtn = document.getElementById("wiz-btn-next");
  nextBtn.innerText = wizardStep === 3 ? "Complete Registration" : "Next Step";
}

function handleWizardSubmit() {
  const name = document.getElementById("wiz-name").value;
  const email = document.getElementById("wiz-email").value;
  const password = document.getElementById("wiz-password").value;
  const niche = document.getElementById("wiz-niche").value;
  const followersVal = parseInt(document.getElementById("wiz-followers").value) || 75000;
  const basePriceVal = parseInt(document.getElementById("wiz-baseprice").value) || 20000;
  const location = document.getElementById("wiz-location").value || "Delhi NCR";
  
  const creatorId = name.toLowerCase().replace(/\s+/g, '-');
  
  const newCreator = {
    id: creatorId,
    name,
    email,
    password,
    role: "creator",
    niche,
    nicheLabel: document.getElementById("wiz-niche").options[document.getElementById("wiz-niche").selectedIndex].text,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60", // placeholder
    followers: followersVal,
    followersText: followersVal >= 1000000 ? `${(followersVal / 1000000).toFixed(1)}M` : `${Math.floor(followersVal / 1000)}K`,
    platforms: { instagram: followersVal >= 1000000 ? `${(followersVal / 1000000).toFixed(1)}M` : `${Math.floor(followersVal / 100)}K`, youtube: null, twitter: null },
    engagement: 5.5,
    basePrice: basePriceVal,
    location,
    aiScore: 88,
    verified: true,
    demographics: [
      { label: "Female (18-25)", percentage: 55 },
      { label: "Female (26-35)", percentage: 25 },
      { label: "Male (18-25)", percentage: 15 },
      { label: "Male (26-35)", percentage: 5 }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=300&auto=format&fit=crop&q=60"
    ],
    collaborations: ["Custom Promo Campaign", "Brand Launch Partner"]
  };

  const users = UsersDB();
  // Check duplication
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    showToast("Email address already registered!", "error");
    wizardStep = 1;
    updateWizardUI();
    return;
  }

  users.push(newCreator);
  setLocalStorage("collabnet_users", users);
  
  // Set Active session
  setLocalStorage("collabnet_current_user", newCreator);
  CurrentUserSession = newCreator;

  showToast(`Congratulations ${name}! Profile verified at score 88/100.`);
  ModalController.closeAll();
  
  // Render and redirect
  renderHeader();
  appRouter.navigate("/creator/dashboard");
}

// Bind auth modal toggles & validations
document.addEventListener("DOMContentLoaded", () => {
  // Nav triggers
  document.getElementById("logo-home").addEventListener("click", (e) => {
    e.preventDefault();
    appRouter.navigate("/");
  });

  // Modal Closures
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => ModalController.closeAll());
  });

  // Landing CTA buttons
  document.getElementById("btn-hero-creator").addEventListener("click", () => {
    initWizard();
    ModalController.open("modal-wizard");
  });

  document.getElementById("btn-hero-brand").addEventListener("click", () => {
    ModalController.open("modal-brand-signup");
  });

  // Creator registration wizard step validation
  document.getElementById("wiz-btn-next").addEventListener("click", () => {
    if (wizardStep === 1) {
      const name = document.getElementById("wiz-name");
      const email = document.getElementById("wiz-email");
      const password = document.getElementById("wiz-password");
      let valid = true;
      
      [name, email, password].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add("invalid");
          valid = false;
        } else {
          input.classList.remove("invalid");
        }
      });
      
      if (!valid) {
        showToast("Please fill out all credentials", "error");
        return;
      }
      
      wizardStep++;
      updateWizardUI();
    } else if (wizardStep === 2) {
      // Dynamic sync step
      wizardStep++;
      updateWizardUI();
    } else if (wizardStep === 3) {
      const followers = document.getElementById("wiz-followers");
      const baseprice = document.getElementById("wiz-baseprice");
      const location = document.getElementById("wiz-location");
      const agree = document.getElementById("wiz-agree");
      let valid = true;

      [followers, baseprice, location].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add("invalid");
          valid = false;
        } else {
          input.classList.remove("invalid");
        }
      });

      if (!agree.checked) {
        showToast("You must consent to audit scoring", "error");
        return;
      }

      if (!valid) {
        showToast("Please fill out parameters", "error");
        return;
      }

      handleWizardSubmit();
    }
  });

  document.getElementById("wiz-btn-prev").addEventListener("click", () => {
    if (wizardStep > 1) {
      wizardStep--;
      updateWizardUI();
    }
  });

  // Social sync visual feedback triggers
  document.querySelectorAll(".wiz-sync-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const platform = btn.getAttribute("data-platform");
      btn.style.borderColor = "var(--emerald)";
      btn.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Synced ${platform} API <i class="fa-solid fa-link" style="margin-left:auto;"></i>`;
      showToast(`${platform} accounts audited successfully`);
    });
  });

  // Brand Signup Submission
  document.getElementById("brand-signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("brand-name").value;
    const email = document.getElementById("brand-email").value;
    const password = document.getElementById("brand-password").value;
    const website = document.getElementById("brand-website").value;

    const brandId = name.toLowerCase().replace(/\s+/g, '-');
    const newBrand = {
      id: brandId,
      name,
      email,
      password,
      role: "brand",
      website,
      avatar: `https://logo.clearbit.com/${website.replace("https://", "").replace("http://", "")}`
    };

    const users = UsersDB();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      showToast("Email address already registered!", "error");
      return;
    }

    users.push(newBrand);
    setLocalStorage("collabnet_users", users);
    
    // Set Session
    setLocalStorage("collabnet_current_user", newBrand);
    CurrentUserSession = newBrand;

    showToast(`Brand Profile Created! Welcome ${name}`);
    ModalController.closeAll();
    
    renderHeader();
    appRouter.navigate("/brand/dashboard");
  });

  // General Auth Form Login Submission
  document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim().toLowerCase();
    const password = document.getElementById("auth-password").value;

    const users = UsersDB();
    const foundUser = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (foundUser) {
      setLocalStorage("collabnet_current_user", foundUser);
      CurrentUserSession = foundUser;
      showToast(`Welcome back, ${foundUser.name}!`);
      ModalController.closeAll();
      renderHeader();
      
      if (foundUser.role === 'brand') {
        appRouter.navigate("/brand/dashboard");
      } else {
        appRouter.navigate("/creator/dashboard");
      }
    } else {
      showToast("Invalid email or password combination.", "error");
    }
  });

  // Login toggle message actions
  document.getElementById("auth-toggle-link").addEventListener("click", () => {
    ModalController.closeAll();
    initWizard();
    ModalController.open("modal-wizard");
  });
});

// ==========================================
// 7. Landing Page Analytics, Timeline, Counters
// ==========================================
let statsCountersObserved = false;

function initLanding() {
  renderPricingGrid("creator");
  setupRoadmapTimeline();
  setupAICompatibilityTrigger();
  setupStatsIntersectionObserver();
  setupAntiFraudAuditor();
}

// AI Match calculation matching logic
function setupAICompatibilityTrigger() {
  const btn = document.getElementById("btn-run-match");
  const meterFill = document.getElementById("compatibility-fill");
  const meterText = document.getElementById("compatibility-text");
  const matchedInfo = document.getElementById("matched-creator-info");
  const statusPlaceholder = document.getElementById("match-status-placeholder");

  if (!btn) return;

  btn.addEventListener("click", () => {
    // Reset state
    meterFill.style.strokeDashoffset = 565;
    meterText.innerText = "0%";
    matchedInfo.style.opacity = 0;
    matchedInfo.style.transform = "translateY(10px)";
    statusPlaceholder.style.display = "block";
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Audit Calculations Running...`;

    // Retrieve input values
    const selNiche = document.getElementById("match-niche").value;
    const selLocation = document.getElementById("match-location").value;

    const steps = [
      "Gathering local criteria...",
      "Syncing audience geography parameters...",
      "Evaluating creator pricing tolerances...",
      "Comparing matching alignments..."
    ];

    let stepIdx = 0;
    statusPlaceholder.innerText = steps[0];

    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        statusPlaceholder.innerText = steps[stepIdx];
      }
    }, 600);

    setTimeout(() => {
      clearInterval(stepInterval);

      // Algorithmic calculation matching
      const creators = INITIAL_CREATORS;
      let matchedCreator = creators[0];
      let bestScore = 0;

      creators.forEach(c => {
        let score = 30; // base compatibility
        if (c.niche === selNiche) score += 40;
        if (c.location.toLowerCase() === selLocation.toLowerCase()) score += 30;
        
        if (score > bestScore) {
          bestScore = score;
          matchedCreator = c;
        }
      });

      // Clamp score
      if (bestScore > 100) bestScore = 100;
      if (bestScore < 30) bestScore = 30;

      const targetOffset = 565 - (565 * bestScore) / 100;
      meterFill.style.strokeDashoffset = targetOffset;
      
      let currentVal = 0;
      const counterInt = setInterval(() => {
        currentVal++;
        meterText.innerText = `${currentVal}%`;
        if (currentVal >= bestScore) {
          clearInterval(counterInt);
        }
      }, 15);

      // Render details card
      matchedInfo.innerHTML = `
        <h4 style="font-size: 18px; font-weight:700; margin-bottom: 4px;">
          ${matchedCreator.name} 
          <i class="fa-solid fa-circle-check" style="color:var(--cyan); font-size:14px;"></i>
        </h4>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Aligned location: ${matchedCreator.location} • Category: ${matchedCreator.nicheLabel}
        </p>
        
        <div style="display:flex; flex-direction:column; gap:10px; text-align:left; background:rgba(255,255,255,0.02); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
          <div style="display:flex; justify-content:space-between; font-size:12px;">
            <span>Category Niche Focus</span>
            <span style="font-weight:600; color:${matchedCreator.niche === selNiche ? 'var(--emerald)' : 'var(--yellow)'};">
              ${matchedCreator.niche === selNiche ? '100% Match' : 'Partial Match'}
            </span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12px;">
            <span>Follower organic rating</span>
            <span style="font-weight:600; color:var(--emerald);">${matchedCreator.aiScore}/100</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12px;">
            <span>Base price alignment</span>
            <span style="font-weight:600; color:var(--emerald);">₹${matchedCreator.basePrice.toLocaleString()}</span>
          </div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px; width:100%;" onclick="window.location.hash = '#/creator/${matchedCreator.id}'">
          Open Verified Profile
        </button>
      `;

      statusPlaceholder.style.display = "none";
      matchedInfo.style.opacity = 1;
      matchedInfo.style.transform = "translateY(0)";

      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Run AI Match Algorithm`;
    }, 2500);
  });
}

// Anti fraud creator audit switcher
function setupAntiFraudAuditor() {
  const select = document.getElementById("auditor-creator-select");
  if (!select) return;

  const creators = INITIAL_CREATORS;
  select.innerHTML = creators.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  const updateAuditorUI = (id) => {
    const creator = creators.find(c => c.id === id);
    if (!creator) return;

    document.getElementById("audit-followers").innerText = creator.followers.toLocaleString();
    document.getElementById("audit-engagement").innerText = `${creator.engagement}%`;
    
    let commentQual = "Excellent";
    if (creator.engagement < 5.0) commentQual = "Optimal";
    else if (creator.engagement > 8.0) commentQual = "Outstanding";
    document.getElementById("audit-comment-quality").innerText = commentQual;
    document.getElementById("audit-authenticity-pct").innerText = `${creator.aiScore}%`;
    
    // Bot risk metrics calculation
    const botRisk = (100 - creator.aiScore - 2).toFixed(1);
    document.getElementById("audit-bot-risk").innerText = `Low (${botRisk}%)`;
    document.getElementById("audit-comment-cred").innerText = `High (${(creator.aiScore - 3).toFixed(1)}% organic)`;
    
    const ratioVal = Math.floor(creator.followers / 1500);
    document.getElementById("audit-ratio").innerText = `Optimal (${ratioVal}:1)`;

    // Vertic/organic graph line drawing based on scoring profile
    const organicPath = document.getElementById("audit-organic-path");
    const fillPath = document.getElementById("audit-fill-path");
    
    if (creator.aiScore >= 93) {
      organicPath.setAttribute("d", "M 0 190 L 100 160 L 200 130 L 300 90 L 400 60 L 500 35");
      fillPath.setAttribute("d", "M 0 190 L 100 160 L 200 130 L 300 90 L 400 60 L 500 35 L 500 200 L 0 200 Z");
    } else {
      organicPath.setAttribute("d", "M 0 190 L 100 175 L 200 155 L 300 130 L 400 98 L 500 60");
      fillPath.setAttribute("d", "M 0 190 L 100 175 L 200 155 L 300 130 L 400 98 L 500 60 L 500 200 L 0 200 Z");
    }
  };

  select.addEventListener("change", (e) => {
    updateAuditorUI(e.target.value);
    showToast(`Audit reports loaded for ${select.options[select.selectedIndex].text}`);
  });

  // Initial load
  updateAuditorUI(creators[0].id);
}

function setupRoadmapTimeline() {
  const nodes = document.querySelectorAll(".roadmap-node");
  const progressLine = document.getElementById("roadmap-line-progress");
  
  if (nodes.length === 0 || !progressLine) return;

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const phaseNum = parseInt(node.getAttribute("data-phase"));
      
      let progressWidth = 0;
      if (phaseNum === 1) progressWidth = 12.5;
      else if (phaseNum === 2) progressWidth = 37.5;
      else if (phaseNum === 3) progressWidth = 62.5;
      else if (phaseNum === 4) progressWidth = 100;

      progressLine.style.width = `${progressWidth}%`;

      nodes.forEach(n => {
        const p = parseInt(n.getAttribute("data-phase"));
        if (p <= phaseNum) {
          n.classList.add("active");
        } else {
          n.classList.remove("active");
        }
      });
    });
  });
}

function setupStatsIntersectionObserver() {
  const statsSection = document.getElementById("stats");
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCountersObserved) {
        statsCountersObserved = true;
        animateCounters();
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsSection);
}

function animateCounters() {
  const numbers = document.querySelectorAll(".stat-number");
  numbers.forEach(num => {
    const target = parseInt(num.getAttribute("data-target"));
    let start = 0;
    const duration = 2000; 
    const increment = target / (duration / 30);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        formatStatValue(num, target);
      } else {
        formatStatValue(num, Math.floor(start));
      }
    }, 30);
  });
}

// ==========================================
// 8. Creators Directory (Browse View)
// ==========================================
function initCreatorsDirectory() {
  // Reload fresh profiles DB
  const creators = UsersDB().filter(u => u.role === 'creator');
  renderCreators(creators);
  setupDirectoryFilters(creators);
}

function renderCreators(list) {
  const grid = document.getElementById("creators-grid");
  const display = document.getElementById("creators-count-display");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding: 48px; text-align:center; color:var(--text-muted);">
        <i class="fa-solid fa-users-slash" style="font-size:32px; margin-bottom:12px;"></i>
        <p>No verified creators match your filters.</p>
      </div>
    `;
    display.innerText = "Showing 0 creators";
    return;
  }

  display.innerText = `Showing ${list.length} verified creators`;

  grid.innerHTML = list.map(c => `
    <div class="creator-card glass-card" onclick="window.location.hash = '#/creator/${c.id}'">
      <div class="creator-card-header">
        <img class="creator-avatar" src="${c.avatar}" alt="${c.name}">
        <div class="creator-info-meta">
          <h4 style="display:flex; align-items:center; gap:6px;">
            ${c.name}
            ${c.verified ? '<i class="fa-solid fa-circle-check verified-badge" title="Verified Profile"></i>' : ''}
          </h4>
          <p>${c.nicheLabel}</p>
        </div>
      </div>
      
      <div class="creator-stats-grid">
        <div class="creator-stat-col">
          <span>Followers</span>
          <p>${c.followersText}</p>
        </div>
        <div class="creator-stat-col">
          <span>Engagement</span>
          <p>${c.engagement}%</p>
        </div>
        <div class="creator-stat-col">
          <span>Location</span>
          <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:65px;">${c.location}</p>
        </div>
      </div>

      <div class="creator-card-footer">
        <span class="score-badge">AI Score: ${c.aiScore}</span>
        <span class="creator-price">₹${c.basePrice.toLocaleString()}+</span>
      </div>
    </div>
  `).join('');
}

function setupDirectoryFilters(creatorsList) {
  const searchInput = document.getElementById("filter-search");
  const nicheSelect = document.getElementById("filter-niche");
  const followersInput = document.getElementById("filter-followers");
  const engagementInput = document.getElementById("filter-engagement");
  const budgetInput = document.getElementById("filter-budget");
  const sortSelect = document.getElementById("filter-sort");
  const resetBtn = document.getElementById("btn-reset-filters");

  const cbInsta = document.getElementById("platform-insta");
  const cbYt = document.getElementById("platform-yt");
  const cbX = document.getElementById("platform-x");

  if (!searchInput) return;

  const runFilters = () => {
    const query = searchInput.value.toLowerCase().trim();
    const nicheVal = nicheSelect.value;
    const maxBudget = parseInt(budgetInput.value);
    const minEngagement = parseFloat(engagementInput.value);
    const minFollowers = parseInt(followersInput.value) * 1000;

    let filtered = creatorsList.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(query) || c.location.toLowerCase().includes(query);
      const matchNiche = nicheVal === "all" || c.niche === nicheVal;
      const matchBudget = c.basePrice <= maxBudget;
      const matchEngagement = c.engagement >= minEngagement;
      
      // Followers calculation check
      const matchFollowers = c.followers >= minFollowers;
      
      // Platform check
      let matchPlatform = false;
      if (cbInsta.checked && c.platforms.instagram) matchPlatform = true;
      if (cbYt.checked && c.platforms.youtube) matchPlatform = true;
      if (cbX.checked && c.platforms.twitter) matchPlatform = true;
      if (!cbInsta.checked && !cbYt.checked && !cbX.checked) matchPlatform = true; // default ignore

      return matchSearch && matchNiche && matchBudget && matchEngagement && matchFollowers && matchPlatform;
    });

    // Sorting logic
    const sortBy = sortSelect.value;
    if (sortBy === "score-desc") {
      filtered.sort((a, b) => b.aiScore - a.aiScore);
    } else if (sortBy === "followers-desc") {
      filtered.sort((a, b) => b.followers - a.followers);
    } else if (sortBy === "engagement-desc") {
      filtered.sort((a, b) => b.engagement - a.engagement);
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    }

    renderCreators(filtered);
  };

  // Bind inputs
  searchInput.addEventListener("input", runFilters);
  nicheSelect.addEventListener("change", runFilters);
  sortSelect.addEventListener("change", runFilters);
  cbInsta.addEventListener("change", runFilters);
  cbYt.addEventListener("change", runFilters);
  cbX.addEventListener("change", runFilters);

  followersInput.addEventListener("input", (e) => {
    document.getElementById("val-followers-display").innerText = `${e.target.value}K`;
    runFilters();
  });
  engagementInput.addEventListener("input", (e) => {
    document.getElementById("val-engagement-display").innerText = `${parseFloat(e.target.value).toFixed(1)}%`;
    runFilters();
  });
  budgetInput.addEventListener("input", (e) => {
    document.getElementById("val-budget-display").innerText = `₹${parseInt(e.target.value).toLocaleString()}`;
    runFilters();
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    nicheSelect.value = "all";
    followersInput.value = 50;
    engagementInput.value = 2.0;
    budgetInput.value = 100000;
    sortSelect.value = "score-desc";
    cbInsta.checked = true;
    cbYt.checked = true;
    cbX.checked = true;

    document.getElementById("val-followers-display").innerText = "50K";
    document.getElementById("val-engagement-display").innerText = "2.0%";
    document.getElementById("val-budget-display").innerText = "₹100,000";

    renderCreators(creatorsList);
  });
}

// ==========================================
// 9. Campaigns Directory (Browse & Detail View)
// ==========================================
function initCampaignsDirectory() {
  const campaigns = CampaignsDB();
  renderCampaigns(campaigns);
  setupCampaignFilters(campaigns);
}

function renderCampaigns(list) {
  const container = document.getElementById("campaigns-list-grid");
  const countDisplay = document.getElementById("campaigns-count-display");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="padding: 48px; text-align:center; color:var(--text-muted);" class="glass-card">
        <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:12px;"></i>
        <p>No active campaigns match your criteria.</p>
      </div>
    `;
    countDisplay.innerText = "Showing 0 active campaigns";
    return;
  }

  countDisplay.innerText = `Showing ${list.length} active campaign opportunities`;

  container.innerHTML = list.map(camp => `
    <div class="glass-card campaign-card-interactive" onclick="window.location.hash = '#/campaign/${camp.id}'">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span style="font-size:11px; text-transform:uppercase; color:var(--indigo); font-weight:700;">${camp.niche.toUpperCase()} OPPORTUNITY</span>
          <h3 style="font-size:18px; font-weight:700; margin-top:4px;">${camp.title}</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Posted by ${camp.brandName}</p>
        </div>
        <span style="font-size:16px; font-weight:800; color:var(--emerald);">₹${camp.budget.toLocaleString()}</span>
      </div>
      
      <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-top:8px;">
        ${camp.description.substring(0, 180)}...
      </p>

      <div style="display:flex; gap:16px; font-size:12px; color:var(--text-muted); margin-top:12px; border-top:1px solid rgba(255,255,255,0.03); padding-top:12px;">
        <span><i class="fa-solid fa-users" style="margin-right:4px;"></i> target: ${camp.targetAudience}</span>
        <span><i class="fa-solid fa-location-dot" style="margin-right:4px;"></i> Location: ${camp.location}</span>
        <span style="margin-left:auto; color:var(--indigo); font-weight:600;">Details & Apply <i class="fa-solid fa-chevron-right"></i></span>
      </div>
    </div>
  `).join('');
}

function setupCampaignFilters(list) {
  const searchInput = document.getElementById("campaign-search");
  const nicheSelect = document.getElementById("campaign-filter-niche");
  const budgetInput = document.getElementById("campaign-filter-budget");
  const resetBtn = document.getElementById("btn-reset-campaign-filters");

  if (!searchInput) return;

  const runFilters = () => {
    const query = searchInput.value.toLowerCase().trim();
    const nicheVal = nicheSelect.value;
    const minBudget = parseInt(budgetInput.value);

    const filtered = list.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query) || c.brandName.toLowerCase().includes(query);
      const matchNiche = nicheVal === "all" || c.niche === nicheVal;
      const matchBudget = c.budget >= minBudget;

      return matchSearch && matchNiche && matchBudget;
    });

    renderCampaigns(filtered);
  };

  searchInput.addEventListener("input", runFilters);
  nicheSelect.addEventListener("change", runFilters);
  budgetInput.addEventListener("input", (e) => {
    document.getElementById("val-campaign-budget-display").innerText = `₹${parseInt(e.target.value).toLocaleString()}`;
    runFilters();
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    nicheSelect.value = "all";
    budgetInput.value = 10000;
    document.getElementById("val-campaign-budget-display").innerText = "₹10,000";
    renderCampaigns(list);
  });
}

function initCampaignDetails(id) {
  const container = document.getElementById("campaign-details-content");
  if (!container) return;

  const campaign = CampaignsDB().find(c => c.id === id);
  if (!campaign) {
    container.innerHTML = `<p style="text-align:center; padding: 48px;">Campaign details not found.</p>`;
    return;
  }

  // Check if current user is creator and has applied
  const hasApplied = CurrentUserSession && CurrentUserSession.role === 'creator' && 
                     campaign.applicants.find(a => a.creatorId === CurrentUserSession.id);
  const applicantRecord = hasApplied ? campaign.applicants.find(a => a.creatorId === CurrentUserSession.id) : null;

  container.innerHTML = `
    <a href="#/campaigns" class="btn btn-secondary" style="margin-bottom:20px;">
      <i class="fa-solid fa-arrow-left"></i> Back to Campaigns
    </a>

    <div class="glass-card" style="padding:40px; display:flex; flex-direction:column; gap:24px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--border-color); padding-bottom:20px;">
        <div>
          <span style="font-size:11px; text-transform:uppercase; color:var(--indigo); font-weight:700;">Active Sponsorship Brief</span>
          <h2 style="font-family:var(--font-heading); font-size:28px; font-weight:800; margin-top:4px;">${campaign.title}</h2>
          <p style="font-size:13px; color:var(--text-muted); margin-top:4px;">Posted by <strong>${campaign.brandName}</strong></p>
        </div>
        <div style="text-align:right;">
          <span style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">Deliverable Budget</span>
          <h3 style="font-size:24px; font-weight:800; color:var(--emerald); margin-top:4px;">₹${campaign.budget.toLocaleString()}</h3>
        </div>
      </div>

      <div>
        <h4 style="font-size:15px; font-weight:700; margin-bottom:8px;">Campaign Overview</h4>
        <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">${campaign.description}</p>
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; background:rgba(255,255,255,0.02); padding:20px; border-radius:12px; border:1px solid var(--border-color);">
        <div>
          <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Niche Target</span>
          <p style="font-size:14px; font-weight:700; margin-top:4px; text-transform:capitalize;">${campaign.niche}</p>
        </div>
        <div>
          <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Location Match</span>
          <p style="font-size:14px; font-weight:700; margin-top:4px;">${campaign.location}</p>
        </div>
        <div>
          <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Audience Demographics</span>
          <p style="font-size:14px; font-weight:700; margin-top:4px;">${campaign.targetAudience}</p>
        </div>
      </div>

      <!-- Creator Actions (Only if logged in as Creator) -->
      <div style="margin-top:12px; border-top:1px solid var(--border-color); padding-top:24px;">
        ${!CurrentUserSession ? `
          <div style="text-align:center; padding:16px; background:rgba(99,102,241,0.05); border-radius:8px; border:1px solid rgba(99,102,241,0.2);">
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">You must be logged in as a verified Creator to apply.</p>
            <button class="btn btn-primary btn-sm" onclick="ModalController.open('modal-auth')">Log In to Apply</button>
          </div>
        ` : CurrentUserSession.role === 'brand' ? `
          <p style="font-size:13px; color:var(--text-muted); text-align:center;">Brands cannot submit sponsorship proposals.</p>
        ` : hasApplied ? `
          <div style="padding:20px; background:rgba(16,185,129,0.05); border-radius:12px; border:1px solid rgba(16,185,129,0.2);">
            <h4 style="font-size:15px; font-weight:700; color:var(--emerald); margin-bottom:8px; display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-circle-check"></i> Application Submitted!
            </h4>
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">You applied with a bid of <strong>₹${applicantRecord.bidAmount.toLocaleString()}</strong>.</p>
            <div style="background:rgba(0,0,0,0.2); padding:12px; border-radius:8px; font-size:12px;">
              <strong>Your Pitch:</strong> ${applicantRecord.pitchText}
            </div>
            <p style="font-size:11px; color:var(--text-muted); margin-top:12px; text-transform:uppercase; font-weight:700;">
              STATUS: <span class="proposal-status-badge prop-${applicantRecord.status}">${applicantRecord.status}</span>
            </p>
          </div>
        ` : `
          <!-- Apply Form -->
          <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">Apply to Sponsorship Brief</h3>
          <form id="form-campaign-apply" style="display:flex; flex-direction:column; gap:14px;">
            <div class="form-group">
              <label for="apply-bid">Bid Proposal Amount (₹)</label>
              <input type="number" id="apply-bid" class="form-input" value="${campaign.budget}" required>
            </div>
            <div class="form-group">
              <label for="apply-pitch">Pitch Pitch & Details</label>
              <textarea id="apply-pitch" class="form-input" style="min-height:100px; resize:vertical; font-family:var(--font-body);" placeholder="Explain why you are the perfect fit for this campaign, describe your style concepts, and reference previous engagement highlights..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="align-self:flex-start;">Submit Proposal Application</button>
          </form>
        `}
      </div>
    </div>
  `;

  // Bind Proposal Submission
  const applyForm = document.getElementById("form-campaign-apply");
  if (applyForm) {
    applyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const bid = parseInt(document.getElementById("apply-bid").value);
      const pitch = document.getElementById("apply-pitch").value;

      const campaigns = CampaignsDB();
      const targetCampIdx = campaigns.findIndex(c => c.id === id);

      if (targetCampIdx !== -1) {
        campaigns[targetCampIdx].applicants.push({
          creatorId: CurrentUserSession.id,
          bidAmount: bid,
          pitchText: pitch,
          status: "pending"
        });
        setLocalStorage("collabnet_campaigns", campaigns);
        showToast("Proposal application submitted successfully!");
        initCampaignDetails(id); // Reload view
      }
    });
  }
}

// ==========================================
// 10. Brand Operations Dashboard Console
// ==========================================
function initBrandDashboard() {
  const brand = CurrentUserSession;
  if (!brand) return;

  const campaigns = CampaignsDB().filter(c => c.brandId === brand.id);
  
  // Calculate analytics
  let totalProposals = 0;
  let totalSpent = 0;
  campaigns.forEach(c => {
    totalProposals += c.applicants.length;
    c.applicants.forEach(a => {
      if (a.status === 'accepted') {
        totalSpent += a.bidAmount;
      }
    });
  });

  document.getElementById("brand-stat-campaigns").innerText = `${campaigns.length} campaigns`;
  document.getElementById("brand-stat-proposals").innerText = `${totalProposals} applicants`;
  document.getElementById("brand-stat-budget").innerText = `₹${totalSpent.toLocaleString()}`;

  renderBrandCampaigns(campaigns);
  renderBrandIncomingApplications(campaigns);
  renderBrandAlerts(campaigns);

  // Bind Post Campaign buttons
  document.getElementById("btn-brand-dash-new-campaign").addEventListener("click", () => {
    appRouter.navigate("/post-campaign");
  });
}

function renderBrandCampaigns(campaigns) {
  const container = document.getElementById("brand-campaigns-list");
  if (!container) return;

  if (campaigns.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align:center; color:var(--text-muted);" class="glass-card">
        <p>You haven't posted any campaigns yet. Click "Post Campaign" to begin.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = campaigns.map(c => `
    <div class="glass-card" style="padding:16px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h4 style="font-size:15px; font-weight:700;">${c.title}</h4>
        <span style="font-size:11px; text-transform:uppercase; color:var(--text-muted);">${c.niche} • target: ${c.targetAudience}</span>
      </div>
      <div style="display:flex; align-items:center; gap:20px;">
        <div style="text-align:right;">
          <span style="font-size:10px; color:var(--text-muted);">BUDGET</span>
          <p style="font-size:14px; font-weight:700; color:var(--emerald);">₹${c.budget.toLocaleString()}</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="window.location.hash = '#/campaign/${c.id}'">View details</button>
      </div>
    </div>
  `).join('');
}

function renderBrandIncomingApplications(campaigns) {
  const container = document.getElementById("brand-applications-list");
  if (!container) return;

  // Flatten applications list
  let apps = [];
  campaigns.forEach(c => {
    c.applicants.forEach(a => {
      apps.push({
        campaignId: c.id,
        campaignTitle: c.title,
        ...a
      });
    });
  });

  const creators = UsersDB();

  if (apps.length === 0) {
    container.innerHTML = `
      <div style="padding:24px; text-align:center; color:var(--text-muted);" class="glass-card">
        <p>No proposals received yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = apps.map(app => {
    const creator = creators.find(cr => cr.id === app.creatorId) || {};
    return `
      <div class="glass-card proposal-card-item" id="prop-item-${app.campaignId}-${app.creatorId}">
        <div style="display:flex; gap:16px; align-items:flex-start;">
          <img src="${creator.avatar}" alt="${creator.name}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid rgba(255,255,255,0.05);">
          <div>
            <h4 style="font-size:15px; font-weight:700; display:flex; align-items:center; gap:8px;">
              ${creator.name} 
              <span class="score-badge" style="font-size:10px;">AI Score: ${creator.aiScore}</span>
            </h4>
            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Applied to: <strong>${app.campaignTitle}</strong></p>
            <p style="font-size:13px; color:var(--text-secondary); margin-top:8px; background:rgba(0,0,0,0.15); padding:10px; border-radius:6px; max-width:500px;">
              "${app.pitchText}"
            </p>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:12px; flex-shrink:0;">
          <div style="text-align:right;">
            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">CREATOR BID</span>
            <h5 style="font-size:16px; font-weight:800; color:var(--emerald);">₹${app.bidAmount.toLocaleString()}</h5>
          </div>

          <div style="display:flex; gap:8px;">
            ${app.status === 'pending' ? `
              <button class="btn btn-secondary btn-sm" onclick="handleProposalDecision('${app.campaignId}', '${app.creatorId}', 'declined')" style="border-color:var(--rose); color:var(--rose);">Decline</button>
              <button class="btn btn-primary btn-sm" onclick="handleProposalDecision('${app.campaignId}', '${app.creatorId}', 'accepted')">Accept</button>
            ` : `
              <span class="proposal-status-badge prop-${app.status}">${app.status}</span>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Global scope bindings for inline calls
window.handleProposalDecision = function(campaignId, creatorId, decision) {
  const campaigns = CampaignsDB();
  const campIdx = campaigns.findIndex(c => c.id === campaignId);

  if (campIdx !== -1) {
    const appIdx = campaigns[campIdx].applicants.findIndex(a => a.creatorId === creatorId);
    if (appIdx !== -1) {
      campaigns[campIdx].applicants[appIdx].status = decision;
      setLocalStorage("collabnet_campaigns", campaigns);

      const creator = UsersDB().find(u => u.id === creatorId);

      if (decision === "accepted") {
        showToast(`Proposal accepted! Message thread opened with ${creator.name}.`);
        
        // Auto create active messenger thread with welcome message
        const messages = MessagesDB();
        messages.push({
          id: `msg-auto-${Date.now()}`,
          senderId: creatorId,
          receiverId: CurrentUserSession.id,
          message: `Hi! Thanks for accepting my proposal for "${campaigns[campIdx].title}". I'm excited to collaborate. Let me know the timelines!`,
          timestamp: new Date().toISOString()
        });
        setLocalStorage("collabnet_messages", messages);
      } else {
        showToast("Proposal declined.", "error");
      }

      initBrandDashboard(); // Reload Brand console
    }
  }
};

function renderBrandAlerts(campaigns) {
  const container = document.getElementById("brand-alert-notifications");
  if (!container) return;

  let alerts = [];
  campaigns.forEach(c => {
    c.applicants.forEach(a => {
      alerts.push(`<strong>${a.creatorId.replace("-", " ")}</strong> applied to your campaign <strong>${c.title}</strong>`);
      if (a.status === 'accepted') {
        alerts.push(`Sponsorship with <strong>${a.creatorId.replace("-", " ")}</strong> was approved!`);
      }
    });
  });

  if (alerts.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">No new activity logs.</p>`;
    return;
  }

  container.innerHTML = alerts.slice(-3).reverse().map(al => `
    <div style="background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:6px; border-left:2px solid var(--indigo);">
      ${al}
    </div>
  `).join('');
}

// Bind Post campaign page form
document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("form-post-campaign");
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("camp-title").value;
      const niche = document.getElementById("camp-niche").value;
      const budget = parseInt(document.getElementById("camp-budget").value);
      const targetAudience = document.getElementById("camp-audience").value;
      const location = document.getElementById("camp-location").value;
      const description = document.getElementById("camp-desc").value;

      const newCamp = {
        id: `camp-${Date.now()}`,
        title,
        brandId: CurrentUserSession.id,
        brandName: CurrentUserSession.name,
        niche,
        budget,
        targetAudience,
        location,
        description,
        applicants: []
      };

      const campaigns = CampaignsDB();
      campaigns.push(newCamp);
      setLocalStorage("collabnet_campaigns", campaigns);

      showToast(`Campaign "${title}" posted successfully!`);
      postForm.reset();
      appRouter.navigate("/brand/dashboard");
    });
  }
});

// ==========================================
// 11. Creator Dashboard Studio
// ==========================================
function initCreatorDashboard() {
  const creator = CurrentUserSession;
  if (!creator) return;

  // Retrieve metrics
  const campaigns = CampaignsDB();
  let submittedCount = 0;
  let revenue = 0;
  let proposalsList = [];

  campaigns.forEach(c => {
    const app = c.applicants.find(a => a.creatorId === creator.id);
    if (app) {
      submittedCount++;
      proposalsList.push({
        campaignTitle: c.title,
        budget: c.budget,
        ...app
      });

      if (app.status === 'accepted') {
        revenue += app.bidAmount;
      }
    }
  });

  document.getElementById("creator-dash-score").innerText = `${creator.aiScore}/100`;
  document.getElementById("creator-dash-proposals-count").innerText = `${submittedCount} proposals`;
  document.getElementById("creator-dash-revenue").innerText = `₹${revenue.toLocaleString()}`;

  // Rates editor fields
  document.getElementById("creator-input-price").value = creator.basePrice;
  document.getElementById("creator-input-location").value = creator.location;

  renderCreatorProposals(proposalsList);
  renderCreatorOffers(creator.id);

  // Bind settings save button
  const saveBtn = document.getElementById("btn-save-creator-settings");
  // Remove existing listener if any to avoid duplication
  const newSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

  newSaveBtn.addEventListener("click", () => {
    const updatedPrice = parseInt(document.getElementById("creator-input-price").value);
    const updatedLocation = document.getElementById("creator-input-location").value;

    const users = UsersDB();
    const userIdx = users.findIndex(u => u.id === creator.id);

    if (userIdx !== -1) {
      users[userIdx].basePrice = updatedPrice;
      users[userIdx].location = updatedLocation;
      setLocalStorage("collabnet_users", users);
      
      // Update session
      CurrentUserSession = users[userIdx];
      setLocalStorage("collabnet_current_user", users[userIdx]);
      showToast("Collaboration settings updated successfully!");
      initCreatorDashboard(); // reload statistics
    }
  });
}

function renderCreatorProposals(proposals) {
  const container = document.getElementById("creator-proposals-list");
  if (!container) return;

  if (proposals.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align:center; color:var(--text-muted);" class="glass-card">
        <p>You haven't submitted any proposals yet. Check available Campaigns.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = proposals.map(p => `
    <div class="glass-card" style="padding:16px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h4 style="font-size:15px; font-weight:700;">${p.campaignTitle}</h4>
        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Bid Amount: <strong>₹${p.bidAmount.toLocaleString()}</strong></p>
      </div>
      <div style="display:flex; align-items:center; gap:20px;">
        <span class="proposal-status-badge prop-${p.status}">${p.status}</span>
      </div>
    </div>
  `).join('');
}

function renderCreatorOffers(creatorId) {
  const container = document.getElementById("creator-offers-list");
  if (!container) return;

  // Retrieve inbox threads where a direct message was initialized by a brand but no proposal is active
  const messages = MessagesDB().filter(m => m.receiverId === creatorId);
  const brands = UsersDB().filter(u => u.role === 'brand');

  // Filter unique senders
  const uniqueSenderIds = [...new Set(messages.map(m => m.senderId))];
  const offerThreads = brands.filter(b => uniqueSenderIds.includes(b.id));

  if (offerThreads.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">No direct brand sponsorship invitations.</p>`;
    return;
  }

  container.innerHTML = offerThreads.map(b => `
    <div style="background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${b.avatar}" alt="${b.name}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
        <div>
          <h5 style="font-size:12px; font-weight:600;">${b.name}</h5>
          <p style="font-size:10px; color:var(--text-muted);">Sent a collaboration message</p>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="window.location.hash = '#/messages'" style="font-size:10px; padding:4px 10px;">Discuss</button>
    </div>
  `).join('');
}

// ==========================================
// 12. Secure Messenger & Chat Engine
// ==========================================
let activeChatReceiverId = null;

function initMessagesInbox() {
  renderChatThreads();
  
  const sendBtn = document.getElementById("btn-chat-send");
  const inputMsg = document.getElementById("chat-input-message");

  // Re-bind send triggers
  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

  newSendBtn.addEventListener("click", sendMessage);
  inputMsg.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

function renderChatThreads() {
  const container = document.getElementById("chat-threads-list");
  if (!container) return;

  const messages = MessagesDB();
  const userId = CurrentUserSession.id;

  // Filter messages relating to current user
  const relatedMessages = messages.filter(m => m.senderId === userId || m.receiverId === userId);

  // Group unique conversations partners
  const partnerIds = [...new Set(relatedMessages.map(m => m.senderId === userId ? m.receiverId : m.senderId))];
  
  const users = UsersDB();

  if (partnerIds.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:12px; padding:20px;">No message history. Accept a proposal or send an offer to open threads.</p>`;
    return;
  }

  container.innerHTML = partnerIds.map(pId => {
    const partner = users.find(u => u.id === pId) || {};
    
    // Find last message
    const threadMsgs = relatedMessages.filter(m => m.senderId === pId || m.receiverId === pId);
    threadMsgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const lastMsg = threadMsgs[0] || {};

    const activeClass = pId === activeChatReceiverId ? "active" : "";

    return `
      <div class="chat-thread-item ${activeClass}" onclick="selectChatThread('${pId}')">
        <img src="${partner.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60'}" 
             alt="${partner.name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
        <div style="flex-grow:1; overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:12px; font-weight:600;">${partner.name}</h4>
            <span style="font-size:9px; color:var(--text-muted);">${formatMsgTime(lastMsg.timestamp)}</span>
          </div>
          <p style="font-size:10px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">
            ${lastMsg.message || ""}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

window.selectChatThread = function(partnerId) {
  activeChatReceiverId = partnerId;
  renderChatThreads(); // refresh active highlights

  const partner = UsersDB().find(u => u.id === partnerId) || {};

  // Update header info
  document.getElementById("chat-active-header").innerHTML = `
    <img src="${partner.avatar}" alt="${partner.name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
    <div>
      <h4 style="font-size:14px; font-weight:700;">${partner.name}</h4>
      <p style="font-size:11px; color:var(--emerald);"><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--emerald); margin-right:4px;"></span> Online</p>
    </div>
  `;

  // Enable Inputs
  document.getElementById("chat-input-message").disabled = false;
  document.getElementById("btn-chat-send").disabled = false;

  renderChatLogs();
};

function renderChatLogs() {
  const container = document.getElementById("chat-messages-log");
  if (!container || !activeChatReceiverId) return;

  const myId = CurrentUserSession.id;
  const messages = MessagesDB();

  const conversation = messages.filter(m => 
    (m.senderId === myId && m.receiverId === activeChatReceiverId) ||
    (m.senderId === activeChatReceiverId && m.receiverId === myId)
  );

  // Sort chronological order
  conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  container.innerHTML = conversation.map(m => {
    const isMe = m.senderId === myId;
    return `
      <div class="chat-bubble ${isMe ? 'sent' : 'received'}">
        <span>${m.message}</span>
        <span class="chat-time-lbl">${formatMsgTime(m.timestamp)}</span>
      </div>
    `;
  }).join('');

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input-message");
  const text = input.value.trim();
  if (!text || !activeChatReceiverId) return;

  const messages = MessagesDB();
  const newMsg = {
    id: `msg-${Date.now()}`,
    senderId: CurrentUserSession.id,
    receiverId: activeChatReceiverId,
    message: text,
    timestamp: new Date().toISOString()
  };

  messages.push(newMsg);
  setLocalStorage("collabnet_messages", messages);

  input.value = "";
  renderChatLogs();
  renderChatThreads(); // refresh last message previews

  // Mock auto reply bot logic
  triggerBotResponse(activeChatReceiverId);
}

function triggerBotResponse(partnerId) {
  setTimeout(() => {
    const messages = MessagesDB();
    const partner = UsersDB().find(u => u.id === partnerId) || {};

    let responseText = "Thanks for the details. I will review this and get back to you shortly!";

    // Tailored response bot copy based on mock users
    if (partnerId === "aisha-patel") {
      responseText = "Sounds perfect! I am already styling the swimwear look. Will send raw drafts by Monday.";
    } else if (partnerId === "rohit-dev") {
      responseText = "Hey there! I checked the tech deliverables. Could we add one YouTube short alongside the main review video? Let me know your thoughts.";
    } else if (partnerId === "tanya-goel") {
      responseText = "Hi! The cosmetic samples arrived. The texture looks amazing. Excited for this brand alignment!";
    } else if (partnerId === "zora-cosmetics" || partnerId === "nike-india") {
      responseText = `We have reviewed the draft files. Please ensure our campaign hashtags are visible in the first 3 seconds of the reel. Excellent pacing otherwise!`;
    }

    const botMsg = {
      id: `msg-bot-${Date.now()}`,
      senderId: partnerId,
      receiverId: CurrentUserSession.id,
      message: responseText,
      timestamp: new Date().toISOString()
    };

    messages.push(botMsg);
    setLocalStorage("collabnet_messages", messages);

    // Refresh if user is still looking at same active chat
    if (activeChatReceiverId === partnerId) {
      renderChatLogs();
    }
    renderChatThreads();
    showToast(`New message from ${partner.name}`, "info");
  }, 2000);
}

function formatMsgTime(isoStr) {
  if (!isoStr) return "";
  const date = new Date(isoStr);
  const hrs = date.getHours().toString().padStart(2, '0');
  const mins = date.getMinutes().toString().padStart(2, '0');
  return `${hrs}:${mins}`;
}

// ==========================================
// 13. Dynamic Creator Profile Pages Rendering
// ==========================================
function initProfile(id) {
  const container = document.getElementById("profile-container-content");
  if (!container) return;

  const creators = UsersDB().filter(u => u.role === 'creator');
  const creator = creators.find(c => c.id === id);

  if (!creator) {
    container.innerHTML = `<p style="grid-column: span 2; text-align:center; padding: 48px;">Creator not found.</p>`;
    return;
  }

  container.innerHTML = `
    <!-- Main Column -->
    <div class="profile-main">
      <button class="btn btn-secondary" onclick="window.history.back()" style="align-self: flex-start; margin-bottom: 8px;">
        <i class="fa-solid fa-arrow-left"></i> Back
      </button>

      <!-- Profile Header Card -->
      <div class="profile-hero glass-card">
        <img class="profile-hero-avatar" src="${creator.avatar}" alt="${creator.name}">
        <div class="profile-hero-info">
          <h2>
            ${creator.name}
            ${creator.verified ? '<i class="fa-solid fa-circle-check verified-badge" style="font-size:20px;" title="Verified Profile"></i>' : ''}
          </h2>
          <span class="profile-niche-pill">${creator.nicheLabel}</span>
          <p style="margin-top: 12px; font-size:14px; color:var(--text-secondary); display:flex; gap:16px;">
            <span><i class="fa-solid fa-location-dot" style="color:var(--indigo);"></i> ${creator.location}</span>
            <span><i class="fa-solid fa-star" style="color:var(--yellow);"></i> Verified Partnerships</span>
          </p>
        </div>
      </div>

      <!-- Social platform breakdown -->
      <div class="profile-stats-grid">
        <div class="profile-stat-card glass-card">
          <i class="fa-brands fa-instagram instagram"></i>
          <p>${creator.platforms.instagram || 'Not Synced'}</p>
          <span>Instagram</span>
        </div>

        <div class="profile-stat-card glass-card">
          <i class="fa-brands fa-youtube youtube"></i>
          <p>${creator.platforms.youtube || 'Not Synced'}</p>
          <span>YouTube</span>
        </div>

        <div class="profile-stat-card glass-card">
          <i class="fa-brands fa-twitter twitter"></i>
          <p>${creator.platforms.twitter || 'Not Synced'}</p>
          <span>Twitter / X</span>
        </div>

        <div class="profile-stat-card glass-card">
          <i class="fa-solid fa-chart-simple engagement"></i>
          <p>${creator.engagement}%</p>
          <span>Engagement</span>
        </div>
      </div>

      <!-- Demographics Analysis -->
      <div class="demographics-card glass-card">
        <h3 class="profile-section-title">Audience Demographics Distribution</h3>
        <div class="demographics-bars">
          ${creator.demographics.map(demo => `
            <div class="demo-bar-item">
              <span class="demo-bar-lbl">${demo.label}</span>
              <div class="demo-bar-track">
                <div class="demo-bar-fill" style="width: ${demo.percentage}%;"></div>
              </div>
              <span class="demo-bar-val">${demo.percentage}%</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Portfolio Gallery -->
      <div>
        <h3 class="profile-section-title">Recent Campaigns & Content Portfolio</h3>
        <div class="portfolio-gallery">
          ${creator.portfolio.map((imgUrl, index) => `
            <div class="portfolio-item">
              <img src="${imgUrl}" alt="Portfolio Content ${index+1}">
              <div class="portfolio-overlay">
                <h5>${creator.collaborations[index] || "Brand Partnership"}</h5>
                <p>Audience Conversion: Outstanding</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>

    <!-- Sidebar Column: Score & Active Actions -->
    <div class="profile-sidebar">
      
      <!-- AI Creator Score -->
      <div class="profile-score-card glass-card">
        <h3 style="font-size:16px; font-weight:700;">AI Creator Score</h3>
        
        <div class="circular-score-wrapper">
          <svg width="120" height="120" viewBox="0 0 120 120" style="transform: rotate(-90deg);">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="url(#profileScoreGrad)" stroke-width="8" 
                    stroke-dasharray="314" 
                    stroke-dashoffset="314" 
                    id="profile-score-fill"
                    stroke-linecap="round"
                    style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);" />
            <defs>
              <linearGradient id="profileScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--indigo)" />
                <stop offset="100%" stop-color="var(--purple)" />
              </linearGradient>
            </defs>
          </svg>
          <div class="score-text-inner" id="profile-score-txt">0</div>
        </div>

        <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
          Calculated from metric credibility, brand alignment history, and content quality.
        </p>
      </div>

      <!-- Partnership Details -->
      <div class="profile-details-card glass-card">
        <h3 style="font-size:16px; font-weight:700; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px;">Collaboration Info</h3>
        
        <p><span class="lbl">Starting Budget</span> <span class="val" style="color:#fff;">₹${creator.basePrice.toLocaleString()} / post</span></p>
        <p><span class="lbl">Primary Location</span> <span class="val">${creator.location}</span></p>
        <p><span class="lbl">Avg Response Time</span> <span class="val" style="color:var(--emerald);">4.5 hours</span></p>
        <p><span class="lbl">Content formats</span> <span class="val">Reels, Videos, Stories</span></p>
        
        <button class="btn btn-primary" style="margin-top:12px; width:100%;" id="btn-collab-offer-send">
          <i class="fa-solid fa-paper-plane"></i> Send Sponsorship Offer
        </button>
      </div>

    </div>
  `;

  // Animate Circular Gauge
  setTimeout(() => {
    const fillCircle = document.getElementById("profile-score-fill");
    const txtScore = document.getElementById("profile-score-txt");
    if (fillCircle && txtScore) {
      const targetScore = creator.aiScore;
      const circumference = 314;
      const offset = circumference - (circumference * targetScore) / 100;
      fillCircle.style.strokeDashoffset = offset;

      let currentVal = 0;
      const timer = setInterval(() => {
        currentVal++;
        txtScore.innerText = currentVal;
        if (currentVal >= targetScore) {
          clearInterval(timer);
        }
      }, 12);
    }
  }, 100);

  // Direct Offer sending trigger
  document.getElementById("btn-collab-offer-send").addEventListener("click", () => {
    if (!CurrentUserSession) {
      showToast("Please log in to contact this creator", "error");
      ModalController.open("modal-auth");
      return;
    }

    if (CurrentUserSession.role === 'creator') {
      showToast("Creators cannot send offers to other creators", "error");
      return;
    }

    // Initialize direct chat thread
    const messages = MessagesDB();
    messages.push({
      id: `msg-direct-${Date.now()}`,
      senderId: CurrentUserSession.id,
      receiverId: creator.id,
      message: `Hi ${creator.name}! We saw your profile on CollabNet and would love to negotiate a custom sponsorship deal. Let us know if you are free to discuss!`,
      timestamp: new Date().toISOString()
    });
    setLocalStorage("collabnet_messages", messages);
    
    showToast(`Collaboration invitation sent to ${creator.name}! Opening chat...`);
    activeChatReceiverId = creator.id;
    appRouter.navigate("/messages");
  });
}

// ==========================================
// 14. Static Helpers & General Core Setup
// ==========================================
function formatStatValue(element, val) {
  const target = element.getAttribute("data-target");
  if (target === "50") {
    element.innerText = `${val}M+`;
  } else if (target === "2400") {
    element.innerText = `₹${val} Cr`;
  } else if (target === "10") {
    element.innerText = `${val}K+`;
  } else if (target === "95") {
    element.innerText = `${val}%`;
  }
}

// Pricing Selector Dynamic Loading
const PRICING_MOCK_PLANS = {
  creator: [
    {
      name: "Creator Free",
      price: "₹0",
      period: "/forever",
      desc: "For micro-creators building their digital reputation.",
      features: [
        "1 Social Integration (Insta or YT)",
        "Verified profile tag",
        "Basic Media Kit link",
        "1 Active sponsorship proposal/mo",
        "Standard analytics reports"
      ],
      popular: false,
      btnText: "Start Free"
    },
    {
      name: "Creator Pro",
      price: "₹1,499",
      period: "/month",
      desc: "Perfect for full-time creators looking to scale brands deals.",
      features: [
        "All social channel integrations",
        "Dynamic AI Creator Score",
        "Priority Search Placement",
        "Unlimited sponsorship proposals",
        "Contract builder & escrow access",
        "Audience demographics analytics"
      ],
      popular: true,
      btnText: "Upgrade to Pro"
    },
    {
      name: "Creator Premium",
      price: "₹3,999",
      period: "/month",
      desc: "Comprehensive tools for creators and digital talent collectives.",
      features: [
        "Multi-profile manager (up to 3)",
        "Advanced fraud audit logs",
        "Dedicated account manager",
        "Custom media kit domains",
        "Instant payouts sync",
        "Quarterly brand reports"
      ],
      popular: false,
      btnText: "Go Premium"
    }
  ],
  brand: [
    {
      name: "Brand Starter",
      price: "₹9,999",
      period: "/month",
      desc: "For local startups looking to test influencer marketing.",
      features: [
        "Run 2 active campaigns",
        "View up to 50 verified profiles",
        "Standard search filter set",
        "Direct chat messaging",
        "AI match recommendations (basic)"
      ],
      popular: false,
      btnText: "Select Starter"
    },
    {
      name: "Brand Pro",
      price: "₹24,999",
      period: "/month",
      desc: "Essential parameters for established growing brands.",
      features: [
        "Run 8 active campaigns",
        "Unlimited verified profile lookups",
        "Advanced filtering (demographics, location)",
        "Deep Fake follower safety scan",
        "Automatic contract wizard",
        "AI Compatibility Meter sync"
      ],
      popular: true,
      btnText: "Upgrade to Pro"
    },
    {
      name: "Brand Enterprise",
      price: "Custom",
      period: "",
      desc: "Tailor-made tooling for agencies and global conglomerates.",
      features: [
        "Unlimited active campaigns",
        "Dedicated Campaign Manager",
        "API access & webhooks",
        "Custom creator scoring indexes",
        "Multi-brand dashboard access",
        "Global taxation & payout gateways"
      ],
      popular: false,
      btnText: "Contact Sales"
    }
  ]
};

function renderPricingGrid(type) {
  const container = document.getElementById("pricing-grid-container");
  if (!container) return;

  const plans = PRICING_MOCK_PLANS[type];
  container.innerHTML = plans.map(plan => `
    <div class="pricing-card glass-card ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<span class="popular-badge">RECOMMENDED</span>' : ''}
      <h4 class="plan-name">${plan.name}</h4>
      <div class="plan-price-wrap">
        <span class="plan-price">${plan.price}</span>
        <span class="plan-period">${plan.period}</span>
      </div>
      <p class="plan-desc">${plan.desc}</p>
      
      <ul class="plan-features-list">
        ${plan.features.map(feat => `
          <li><i class="fa-solid fa-circle-check"></i> ${feat}</li>
        `).join('')}
      </ul>

      <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-pricing-select">${plan.btnText}</button>
    </div>
  `).join('');

  container.querySelectorAll(".btn-pricing-select").forEach(btn => {
    btn.addEventListener("click", () => {
      showToast("Subscribed! Payment Gateway redirection mock complete.");
    });
  });
}

// Global page actions
document.addEventListener("DOMContentLoaded", () => {
  const btnCreator = document.getElementById("btn-toggle-creator-plans");
  const btnBrand = document.getElementById("btn-toggle-brand-plans");

  if (btnCreator && btnBrand) {
    btnCreator.addEventListener("click", () => {
      btnCreator.classList.add("active");
      btnBrand.classList.remove("active");
      renderPricingGrid("creator");
    });
    btnBrand.addEventListener("click", () => {
      btnBrand.classList.add("active");
      btnCreator.classList.remove("active");
      renderPricingGrid("brand");
    });
  }
});


// ==========================================
// 15. Production Functional Repair Layer
// ==========================================
(function () {
  const STORE = { users: "collabnet_users", campaigns: "collabnet_campaigns", messages: "collabnet_messages", session: "collabnet_current_user" };

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function emailOk(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function urlOk(value) {
    try {
      const parsed = new URL(value);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch (_) {
      return false;
    }
  }

  function slug(value) {
    return String(value || "item").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item-" + Date.now();
  }

  function uniqueId(name, records) {
    const base = slug(name);
    let id = base;
    let index = 2;
    while (records.some(record => record.id === id)) {
      id = base + "-" + index;
      index += 1;
    }
    return id;
  }

  function followerLabel(value) {
    const count = Number(value) || 0;
    if (count >= 1000000) return (count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 1) + "M";
    if (count >= 1000) return Math.round(count / 1000) + "K";
    return String(count);
  }

  function nicheLabel(niche) {
    return {
      fashion: "Fashion & Lifestyle",
      tech: "Technology & Gadgets",
      gaming: "Gaming & Esports",
      travel: "Travel & Photography",
      beauty: "Beauty & Wellness"
    }[niche] || "Creator";
  }

  function normalizeCreator(user) {
    const followers = Number(user.followers) || 0;
    const niche = user.niche || "fashion";
    const basePrice = Number(user.basePrice || (user.pricing && user.pricing.post)) || 20000;
    const platformFollowers = followerLabel(followers);
    return {
      ...user,
      role: "creator",
      niche,
      nicheLabel: user.nicheLabel || nicheLabel(niche),
      followers,
      followersText: user.followersText || platformFollowers,
      platforms: user.platforms || { instagram: platformFollowers, youtube: null, twitter: null },
      engagement: Number(user.engagement) || 5,
      basePrice,
      pricing: user.pricing || { post: basePrice, reel: Math.round(basePrice * 1.5), story: Math.round(basePrice * 0.45) },
      location: user.location || "India",
      audienceLocation: user.audienceLocation || user.location || "India",
      bio: user.bio || (user.name + " creates " + nicheLabel(niche).toLowerCase() + " content for brand-safe audiences."),
      socialLinks: user.socialLinks || {
        instagram: user.platforms && user.platforms.instagram ? "https://instagram.com/" + slug(user.name).replace(/-/g, "") : "",
        youtube: user.platforms && user.platforms.youtube ? "https://youtube.com/@" + slug(user.name).replace(/-/g, "") : "",
        twitter: user.platforms && user.platforms.twitter ? "https://x.com/" + slug(user.name).replace(/-/g, "") : ""
      },
      contact: user.contact || { email: user.email || "", phone: "", manager: "" },
      demographics: Array.isArray(user.demographics) && user.demographics.length ? user.demographics : [
        { label: "Female (18-25)", percentage: 45 },
        { label: "Female (26-35)", percentage: 25 },
        { label: "Male (18-25)", percentage: 20 },
        { label: "Male (26-35)", percentage: 10 }
      ],
      portfolio: Array.isArray(user.portfolio) && user.portfolio.length ? user.portfolio : [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=300&auto=format&fit=crop&q=60"
      ],
      collaborations: Array.isArray(user.collaborations) ? user.collaborations : [],
      aiScore: Number(user.aiScore) || 86,
      verified: user.verified !== false
    };
  }

  function normalizeBrand(user) {
    return {
      ...user,
      role: "brand",
      companyDetails: user.companyDetails || {
        name: user.name || "",
        website: user.website || "",
        industry: user.industry || "Consumer Brand",
        contactEmail: user.email || ""
      },
      budget: Number(user.budget) || 0,
      targetAudience: user.targetAudience || "Unisex (18-35)",
      preferences: user.preferences || { preferredNiches: [], preferredLocations: [], minEngagement: 3, maxCreatorPrice: 100000 }
    };
  }

  function normalizeUser(user) {
    if (user.role === "creator") return normalizeCreator(user);
    if (user.role === "brand") return normalizeBrand(user);
    return user;
  }

  function allUsers() {
    return readStore(STORE.users, []).map(normalizeUser);
  }

  function saveUsers(users) {
    writeStore(STORE.users, users.map(normalizeUser));
  }

  function creators() {
    return allUsers().filter(user => user.role === "creator").map(normalizeCreator);
  }

  function campaigns() {
    return readStore(STORE.campaigns, []).map(campaign => ({
      status: campaign.status || "published",
      category: campaign.category || campaign.niche,
      preferences: campaign.preferences || {},
      createdAt: campaign.createdAt || new Date().toISOString(),
      ...campaign,
      applicants: Array.isArray(campaign.applicants) ? campaign.applicants : []
    }));
  }

  function saveCampaigns(list) {
    writeStore(STORE.campaigns, list);
  }

  function persistSession(user) {
    const normalized = normalizeUser(user);
    CurrentUserSession = normalized;
    writeStore(STORE.session, normalized);
    renderHeader();
    return normalized;
  }

  function markInvalid(input, invalid) {
    if (input) input.classList.toggle("invalid", Boolean(invalid));
  }

  function saveUser(updated) {
    const users = allUsers();
    const normalized = normalizeUser(updated);
    const index = users.findIndex(user => user.id === normalized.id);
    if (index === -1) users.push(normalized); else users[index] = normalized;
    saveUsers(users);
    if (CurrentUserSession && CurrentUserSession.id === normalized.id) persistSession(normalized);
    return normalized;
  }

  function migrateSavedData() {
    const users = allUsers().map(user => normalizeUser({ ...user, password: user.password || "password" }));
    saveUsers(users);
    saveCampaigns(campaigns());
    const session = readStore(STORE.session, null);
    if (session) {
      const fresh = users.find(user => user.id === session.id);
      if (fresh) persistSession(fresh);
    }
  }

  function field(id) {
    return document.getElementById(id);
  }

  function scoreCreatorForCampaign(creator, campaignInput) {
    const reasons = [];
    let score = 0;

    if (creator.niche === campaignInput.niche) {
      score += 24;
      reasons.push("Niche match: " + creator.nicheLabel + " fits the campaign category.");
    } else {
      score += 7;
      reasons.push("Related category: " + creator.nicheLabel + " can still be considered outside the primary niche.");
    }

    const demoText = creator.demographics.map(d => d.label.toLowerCase()).join(" ");
    const target = String(campaignInput.targetAudience || "").toLowerCase();
    if ((target.includes("female") && demoText.includes("female")) || (target.includes("male") && demoText.includes("male")) || target.includes("unisex") || target.includes("balanced")) {
      score += 16;
      reasons.push("Audience fit: demographics align with " + campaignInput.targetAudience + ".");
    } else {
      score += 5;
      reasons.push("Audience gap: demographics are useful but not the strongest target fit.");
    }

    const location = String(campaignInput.location || "").toLowerCase();
    if (!location || creator.location.toLowerCase().includes(location) || location.includes(creator.location.toLowerCase())) {
      score += 14;
      reasons.push("Location fit: primary audience/location includes " + creator.location + ".");
    } else {
      score += 5;
      reasons.push("Location difference: creator is strongest in " + creator.location + ".");
    }

    if (creator.engagement >= Number(campaignInput.minEngagement || 4)) {
      score += 14;
      reasons.push("Engagement strength: " + creator.engagement + "% meets the campaign threshold.");
    } else {
      score += Math.max(2, creator.engagement);
      reasons.push("Engagement watch: " + creator.engagement + "% is below the preferred threshold.");
    }

    if (creator.followers >= Number(campaignInput.minFollowers || 50000)) {
      score += 12;
      reasons.push("Reach fit: " + creator.followersText + " followers clears the required reach.");
    } else {
      score += 4;
      reasons.push("Reach gap: " + creator.followersText + " followers is below the selected reach.");
    }

    if (creator.basePrice <= Number(campaignInput.budget || 0)) {
      score += 14;
      reasons.push("Budget fit: base price of Rs " + creator.basePrice.toLocaleString() + " is within budget.");
    } else {
      const ratio = Number(campaignInput.budget || 0) / Math.max(creator.basePrice, 1);
      score += Math.max(0, Math.round(8 * ratio));
      reasons.push("Budget stretch: creator pricing starts at Rs " + creator.basePrice.toLocaleString() + ".");
    }

    score += Math.min(6, Math.round((creator.aiScore || 80) / 20));
    reasons.push("Trust score: AI authenticity score is " + creator.aiScore + "/100.");

    return { creator, score: Math.max(1, Math.min(100, Math.round(score))), reasons };
  }

  function currentMatchInput() {
    const demoMap = { "female-young": "Female (18-25)", "male-young": "Male (18-25)", "unisex-mid": "Unisex (18-35)" };
    return {
      niche: (field("match-niche") && field("match-niche").value) || "fashion",
      targetAudience: demoMap[field("match-demographics") && field("match-demographics").value] || "Unisex (18-35)",
      budget: Number((field("match-budget") && field("match-budget").value) || 60000),
      location: (field("match-location") && field("match-location").value) || "",
      minEngagement: 4,
      minFollowers: 50000
    };
  }

  window.runCollabNetMatch = function runCollabNetMatch(animate) {
    const available = creators();
    const meterFill = field("compatibility-fill");
    const meterText = field("compatibility-text");
    const matchedInfo = field("matched-creator-info");
    const status = field("match-status-placeholder");
    if (!meterFill || !meterText || !matchedInfo || !available.length) return;

    const input = currentMatchInput();
    const ranked = available.map(creator => scoreCreatorForCampaign(creator, input)).sort((a, b) => b.score - a.score);
    const best = ranked[0];
    const offset = 565 - (565 * best.score) / 100;
    meterFill.style.strokeDashoffset = offset;
    meterText.innerText = best.score + "%";
    status.style.display = "none";
    matchedInfo.style.opacity = 1;
    matchedInfo.style.transform = "translateY(0)";
    matchedInfo.innerHTML = "\n      <h4 style=\"font-size: 18px; font-weight:700; margin-bottom: 4px;\">" +
      best.creator.name + " <i class=\"fa-solid fa-circle-check\" style=\"color:var(--cyan); font-size:14px;\"></i></h4>" +
      "<p style=\"font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;\">" + best.score + "% match &bull; " + best.creator.nicheLabel + " &bull; " + best.creator.location + "</p>" +
      "<div style=\"display:flex; flex-direction:column; gap:10px; text-align:left; background:rgba(255,255,255,0.02); padding:16px; border-radius:12px; border:1px solid var(--border-color);\">" +
      best.reasons.map(reason => "<div style=\"display:flex; gap:8px; font-size:12px; line-height:1.45;\"><i class=\"fa-solid fa-check\" style=\"color:var(--emerald); margin-top:2px;\"></i><span>" + reason + "</span></div>").join("") +
      "</div><button class=\"btn btn-primary\" style=\"margin-top:16px; width:100%;\" onclick=\"window.location.hash = '#/creator/" + best.creator.id + "'\">Open Verified Profile</button>";

    if (animate) {
      let value = 0;
      meterText.innerText = "0%";
      const timer = setInterval(() => {
        value += 2;
        if (value >= best.score) {
          value = best.score;
          clearInterval(timer);
        }
        meterText.innerText = value + "%";
      }, 12);
    }
  };

  window.setupAICompatibilityTrigger = function setupAICompatibilityTrigger() {
    const btn = field("btn-run-match");
    if (!btn) return;
    const update = () => window.runCollabNetMatch(false);
    ["match-niche", "match-demographics", "match-budget", "match-location"].forEach(id => field(id) && field(id).addEventListener("change", update));
    btn.onclick = () => {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating Matches...';
      setTimeout(() => {
        window.runCollabNetMatch(true);
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Run AI Match Algorithm';
      }, 350);
    };
    update();
  };

  window.handleWizardSubmit = function handleWizardSubmit() {
    const nameInput = field("wiz-name");
    const emailInput = field("wiz-email");
    const passInput = field("wiz-password");
    const followersInput = field("wiz-followers");
    const priceInput = field("wiz-baseprice");
    const locationInput = field("wiz-location");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    const followers = Number(followersInput.value);
    const basePrice = Number(priceInput.value);
    const location = locationInput.value.trim();
    let valid = true;

    [[nameInput, !name], [emailInput, !emailOk(email)], [passInput, password.length < 6], [followersInput, !followers || followers < 1000], [priceInput, !basePrice || basePrice < 1000], [locationInput, !location]].forEach(pair => { markInvalid(pair[0], pair[1]); if (pair[1]) valid = false; });
    if (!field("wiz-agree") || !field("wiz-agree").checked) valid = false;
    if (!valid) {
      showToast("Please enter valid creator details. Passwords need at least 6 characters.", "error");
      return;
    }

    const users = allUsers();
    if (users.some(user => user.email.toLowerCase() === email)) {
      showToast("Email address already registered.", "error");
      wizardStep = 1;
      updateWizardUI();
      return;
    }

    const niche = field("wiz-niche").value;
    const creator = normalizeCreator({
      id: uniqueId(name, users),
      name,
      email,
      password,
      role: "creator",
      niche,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
      followers,
      basePrice,
      engagement: 5.5,
      location,
      aiScore: 88,
      verified: true,
      platforms: { instagram: followerLabel(followers), youtube: null, twitter: null },
      contact: { email, phone: "", manager: "" },
      socialLinks: { instagram: "https://instagram.com/" + slug(name).replace(/-/g, ""), youtube: "", twitter: "" },
      collaborations: ["Registered CollabNet Creator"]
    });

    users.push(creator);
    saveUsers(users);
    persistSession(creator);
    showToast("Congratulations " + name + "! Your creator profile was saved.");
    ModalController.closeAll();
    appRouter.navigate("/creator/dashboard");
  };

  function handleBrandSignup(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const nameInput = field("brand-name");
    const emailInput = field("brand-email");
    const passInput = field("brand-password");
    const websiteInput = field("brand-website");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    const website = websiteInput.value.trim();
    let valid = true;
    [[nameInput, !name], [emailInput, !emailOk(email)], [passInput, password.length < 6], [websiteInput, !urlOk(website)]].forEach(pair => { markInvalid(pair[0], pair[1]); if (pair[1]) valid = false; });
    if (!valid) {
      showToast("Please enter valid brand details. Passwords need at least 6 characters.", "error");
      return;
    }
    const users = allUsers();
    if (users.some(user => user.email.toLowerCase() === email)) {
      showToast("Email address already registered.", "error");
      return;
    }
    const domain = website.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const brand = normalizeBrand({
      id: uniqueId(name, users),
      name,
      email,
      password,
      website,
      avatar: "https://logo.clearbit.com/" + domain,
      budget: 0,
      targetAudience: "Unisex (18-35)",
      companyDetails: { name, website, industry: "Consumer Brand", contactEmail: email },
      preferences: { preferredNiches: [], preferredLocations: [], minEngagement: 3, maxCreatorPrice: 100000 }
    });
    users.push(brand);
    saveUsers(users);
    persistSession(brand);
    showToast("Brand profile created. Welcome " + name + ".");
    ModalController.closeAll();
    appRouter.navigate("/brand/dashboard");
  }

  function handleLogin(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const emailInput = field("auth-email");
    const passInput = field("auth-password");
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    markInvalid(emailInput, !emailOk(email));
    markInvalid(passInput, !password);
    if (!emailOk(email) || !password) {
      showToast("Please enter your email and password.", "error");
      return;
    }
    const found = allUsers().find(user => user.email.toLowerCase() === email && user.password === password);
    if (!found) {
      showToast("Invalid email or password combination.", "error");
      return;
    }
    persistSession(found);
    showToast("Welcome back, " + found.name + "!");
    ModalController.closeAll();
    appRouter.navigate(found.role === "brand" ? "/brand/dashboard" : "/creator/dashboard");
  }

  window.initCreatorsDirectory = function initCreatorsDirectory() {
    const list = creators();
    renderCreators(list);
    setupDirectoryFilters(list);
  };

  window.setupDirectoryFilters = function setupDirectoryFilters(creatorsList) {
    const searchInput = field("filter-search");
    const nicheSelect = field("filter-niche");
    const followersInput = field("filter-followers");
    const engagementInput = field("filter-engagement");
    const budgetInput = field("filter-budget");
    const sortSelect = field("filter-sort");
    const resetBtn = field("btn-reset-filters");
    const cbInsta = field("platform-insta");
    const cbYt = field("platform-yt");
    const cbX = field("platform-x");
    if (!searchInput) return;

    const runFilters = () => {
      const query = searchInput.value.toLowerCase().trim();
      const minFollowers = Number(followersInput.value) * 1000;
      const minEngagement = Number(engagementInput.value);
      const maxBudget = Number(budgetInput.value);
      let filtered = creatorsList.filter(creator => {
        const haystack = [creator.name, creator.location, creator.niche, creator.nicheLabel, creator.bio, creator.audienceLocation].join(" ").toLowerCase();
        const platformMatch = (!cbInsta.checked && !cbYt.checked && !cbX.checked) ||
          (cbInsta.checked && creator.platforms.instagram) ||
          (cbYt.checked && creator.platforms.youtube) ||
          (cbX.checked && creator.platforms.twitter);
        return (!query || haystack.includes(query)) &&
          (nicheSelect.value === "all" || creator.niche === nicheSelect.value) &&
          creator.followers >= minFollowers &&
          creator.engagement >= minEngagement &&
          creator.basePrice <= maxBudget &&
          platformMatch;
      });
      const sortBy = sortSelect.value;
      if (sortBy === "followers-desc") filtered.sort((a, b) => b.followers - a.followers);
      else if (sortBy === "engagement-desc") filtered.sort((a, b) => b.engagement - a.engagement);
      else if (sortBy === "price-asc") filtered.sort((a, b) => a.basePrice - b.basePrice);
      else filtered.sort((a, b) => b.aiScore - a.aiScore);
      renderCreators(filtered);
    };

    [searchInput, nicheSelect, sortSelect, cbInsta, cbYt, cbX].forEach(el => { if (el) el.oninput = el.onchange = runFilters; });
    followersInput.oninput = e => { field("val-followers-display").innerText = e.target.value + "K"; runFilters(); };
    engagementInput.oninput = e => { field("val-engagement-display").innerText = Number(e.target.value).toFixed(1) + "%"; runFilters(); };
    budgetInput.oninput = e => { field("val-budget-display").innerText = "Rs " + Number(e.target.value).toLocaleString(); runFilters(); };
    resetBtn.onclick = () => {
      searchInput.value = ""; nicheSelect.value = "all"; followersInput.value = 50; engagementInput.value = 2; budgetInput.value = 100000; sortSelect.value = "score-desc";
      cbInsta.checked = cbYt.checked = cbX.checked = true;
      field("val-followers-display").innerText = "50K"; field("val-engagement-display").innerText = "2.0%"; field("val-budget-display").innerText = "Rs 100,000";
      runFilters();
    };
    runFilters();
  };

  window.initCampaignsDirectory = function initCampaignsDirectory() {
    const visible = campaigns().filter(campaign => campaign.status === "published");
    renderCampaigns(visible);
    setupCampaignFilters(visible);
  };

  window.initBrandDashboard = function initBrandDashboard() {
    const brand = CurrentUserSession ? normalizeBrand(CurrentUserSession) : null;
    if (!brand) return;
    const mine = campaigns().filter(campaign => campaign.brandId === brand.id);
    const proposals = mine.reduce((sum, campaign) => sum + campaign.applicants.length, 0);
    const spent = mine.flatMap(c => c.applicants).filter(a => a.status === "accepted").reduce((sum, app) => sum + Number(app.bidAmount || 0), 0);
    field("brand-stat-campaigns").innerText = mine.length + " campaigns";
    field("brand-stat-proposals").innerText = proposals + " applicants";
    field("brand-stat-budget").innerText = "Rs " + spent.toLocaleString();
    renderBrandCampaigns(mine);
    renderBrandIncomingApplications(mine);
    renderBrandAlerts(mine);
    const btn = field("btn-brand-dash-new-campaign");
    if (btn) btn.onclick = () => appRouter.navigate("/post-campaign");
  };

  window.renderBrandCampaigns = function renderBrandCampaigns(list) {
    const container = field("brand-campaigns-list");
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<div style="padding: 24px; text-align:center; color:var(--text-muted);" class="glass-card"><p>You have not posted any campaigns yet. Click "Post Campaign" to begin.</p></div>';
      return;
    }
    container.innerHTML = list.map(campaign => "\n      <div class=\"glass-card\" style=\"padding:16px; display:flex; justify-content:space-between; align-items:center; gap:16px;\">\n        <div>\n          <h4 style=\"font-size:15px; font-weight:700;\">" + campaign.title + "</h4>\n          <span style=\"font-size:11px; text-transform:uppercase; color:var(--text-muted);\">" + campaign.niche + " &bull; " + campaign.targetAudience + " &bull; " + campaign.status + "</span>\n        </div>\n        <div style=\"display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end;\">\n          <p style=\"font-size:14px; font-weight:700; color:var(--emerald);\">Rs " + Number(campaign.budget).toLocaleString() + "</p>\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"editCampaign('" + campaign.id + "')\">Edit</button>\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"toggleCampaignStatus('" + campaign.id + "')\">" + (campaign.status === "published" ? "Unpublish" : "Publish") + "</button>\n          <button class=\"btn btn-secondary btn-sm\" style=\"border-color:var(--rose); color:var(--rose);\" onclick=\"deleteCampaign('" + campaign.id + "')\">Delete</button>\n          <button class=\"btn btn-primary btn-sm\" onclick=\"window.location.hash = '#/campaign/" + campaign.id + "'\">View</button>\n        </div>\n      </div>\n    ").join("");
  };

  window.editCampaign = function editCampaign(id) {
    const campaign = campaigns().find(item => item.id === id);
    if (!campaign) return;
    appRouter.navigate("/post-campaign");
    setTimeout(() => {
      field("form-post-campaign").dataset.editId = id;
      field("camp-title").value = campaign.title;
      field("camp-niche").value = campaign.niche;
      field("camp-budget").value = campaign.budget;
      field("camp-audience").value = campaign.targetAudience;
      field("camp-location").value = campaign.location;
      field("camp-desc").value = campaign.description;
      field("form-post-campaign").querySelector('button[type="submit"]').innerText = "Update Campaign";
    }, 50);
  };

  window.toggleCampaignStatus = function toggleCampaignStatus(id) {
    const list = campaigns();
    const campaign = list.find(item => item.id === id);
    if (!campaign) return;
    campaign.status = campaign.status === "published" ? "draft" : "published";
    saveCampaigns(list);
    showToast("Campaign " + (campaign.status === "published" ? "published" : "unpublished") + ".");
    initBrandDashboard();
  };

  window.deleteCampaign = function deleteCampaign(id) {
    const campaign = campaigns().find(item => item.id === id);
    if (!campaign || !confirm('Delete campaign "' + campaign.title + '"?')) return;
    saveCampaigns(campaigns().filter(item => item.id !== id));
    showToast("Campaign deleted.");
    initBrandDashboard();
  };

  function handlePostCampaign(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!CurrentUserSession || CurrentUserSession.role !== "brand") {
      showToast("Please log in as a brand to manage campaigns.", "error");
      return;
    }
    const title = field("camp-title").value.trim();
    const niche = field("camp-niche").value;
    const budget = Number(field("camp-budget").value);
    const targetAudience = field("camp-audience").value;
    const location = field("camp-location").value.trim();
    const description = field("camp-desc").value.trim();
    if (!title || !budget || budget < 1000 || !location || description.length < 20) {
      showToast("Please complete campaign details with a valid budget and description.", "error");
      return;
    }
    const form = field("form-post-campaign");
    const list = campaigns();
    const editId = form.dataset.editId;
    const existing = list.find(c => c.id === editId);
    const payload = {
      id: editId || "camp-" + Date.now(),
      title, brandId: CurrentUserSession.id, brandName: CurrentUserSession.name, niche, category: niche, budget, targetAudience, location, description,
      status: "published", applicants: existing ? existing.applicants : [], createdAt: new Date().toISOString()
    };
    const index = list.findIndex(c => c.id === editId);
    if (index === -1) list.push(payload); else list[index] = { ...list[index], ...payload };
    saveCampaigns(list);
    delete form.dataset.editId;
    form.reset();
    form.querySelector('button[type="submit"]').innerText = "Submit Campaign";
    showToast(editId ? "Campaign updated and published." : 'Campaign "' + title + '" posted successfully!');
    appRouter.navigate("/brand/dashboard");
  }

  window.initCreatorDashboard = function initCreatorDashboard() {
    const creator = CurrentUserSession ? normalizeCreator(CurrentUserSession) : null;
    if (!creator) return;
    const list = campaigns();
    const proposals = [];
    let revenue = 0;
    list.forEach(campaign => {
      const application = campaign.applicants.find(app => app.creatorId === creator.id);
      if (application) {
        proposals.push({ campaignTitle: campaign.title, budget: campaign.budget, ...application });
        if (application.status === "accepted") revenue += Number(application.bidAmount || 0);
      }
    });
    field("creator-dash-score").innerText = creator.aiScore + "/100";
    field("creator-dash-proposals-count").innerText = proposals.length + " proposals";
    field("creator-dash-revenue").innerText = "Rs " + revenue.toLocaleString();
    field("creator-input-price").value = creator.basePrice;
    field("creator-input-location").value = creator.location;
    renderCreatorProposals(proposals);
    renderCreatorOffers(creator.id);
    const saveBtn = field("btn-save-creator-settings");
    if (saveBtn) saveBtn.onclick = () => {
      const updatedPrice = Number(field("creator-input-price").value);
      const updatedLocation = field("creator-input-location").value.trim();
      if (!updatedPrice || updatedPrice < 1000 || !updatedLocation) {
        showToast("Please enter valid pricing and location.", "error");
        return;
      }
      const updated = saveUser({ ...creator, basePrice: updatedPrice, location: updatedLocation, audienceLocation: updatedLocation, pricing: { ...creator.pricing, post: updatedPrice } });
      persistSession(updated);
      showToast("Creator profile updated and saved.");
      initCreatorDashboard();
    };
  };

  const originalInitProfile = window.initProfile || initProfile;
  window.initProfile = function initProfileWithEditing(id) {
    originalInitProfile(id);
    const creator = creators().find(item => item.id === id);
    if (!creator) return;
    const details = document.querySelector(".profile-details-card");
    if (details) {
      details.insertAdjacentHTML("afterbegin", '<p><span class="lbl">Contact</span> <span class="val">' + (creator.contact && creator.contact.email || creator.email) + '</span></p><p><span class="lbl">Bio</span> <span class="val">' + creator.bio + '</span></p>');
      if (CurrentUserSession && CurrentUserSession.id === creator.id) {
        details.insertAdjacentHTML("beforeend", '<button class="btn btn-secondary" style="margin-top:12px; width:100%;" id="btn-edit-profile-inline"><i class="fa-solid fa-pen"></i> Edit Profile</button>');
        field("btn-edit-profile-inline").onclick = () => {
          appRouter.navigate("/creator/dashboard");
          showToast("Edit pricing and location in Creator Studio. Your full registration data is saved in your profile.", "info");
        };
      }
    }
  };

  const originalSwitchView = appRouter.switchView.bind(appRouter);
  appRouter.switchView = function repairedSwitchView(routeId, params) {
    if (["ai-match", "pricing", "anti-fraud"].includes(routeId)) routeId = "landing";
    originalSwitchView(routeId, params || {});
    const hash = window.location.hash || "#/";
    if (hash === "#/ai-match") document.getElementById("ai-match")?.scrollIntoView({ behavior: "smooth" });
    if (hash === "#/pricing") document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    if (hash === "#/anti-fraud") document.getElementById("anti-fraud")?.scrollIntoView({ behavior: "smooth" });
  };

  const originalHandleRoute = appRouter.handleRoute.bind(appRouter);
  appRouter.handleRoute = function repairedHandleRoute() {
    const hash = window.location.hash || "#/";
    if (["#/ai-match", "#/pricing", "#/anti-fraud"].includes(hash)) {
      this.switchView("landing", {});
      renderHeader();
      return;
    }
    originalHandleRoute();
  };

  document.addEventListener("DOMContentLoaded", () => {
    migrateSavedData();
    field("brand-signup-form")?.addEventListener("submit", handleBrandSignup, true);
    field("auth-form")?.addEventListener("submit", handleLogin, true);
    field("form-post-campaign")?.addEventListener("submit", handlePostCampaign, true);
    document.querySelectorAll('a[href="#"]').forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        showToast("This section is coming soon.", "info");
      });
    });
    renderHeader();
    appRouter.handleRoute();
  });
})();
