import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, Boxes, Check, ChevronDown, CircleGauge, Cloud, Code2, Database, Globe2, HardDrive, Layers3, LockKeyhole, Mail, MessageCircle, Network, Package, Rocket, Server, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useCategories, usePlans, type Category, type DbPlan } from "@/lib/catalog";
import { useSite } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { DISCORD } from "@/data/plans";
import panelConsole from "@/assets/legacy-panel-console.png.asset.json";

import "@/styles/legacy-template.css";

const FALLBACK_CATEGORIES: Category[] = [
  { id: "vps", slug: "vps-budget", name: "VPS Hosting", kind: "Compute", tagline: "Private compute with root access", description: "High-performance virtual servers for apps, panels and production workloads.", icon: "Server", tone: "tone-cyan", image_url: "/template-assets/vps.jpg", rate_label: "From ₹40/mo", sort_order: 1, is_active: true },
  { id: "web", slug: "web-hosting", name: "Web Hosting", kind: "Web", tagline: "Fast sites. Zero busywork.", description: "Managed hosting with SSL, backups and a simple control panel.", icon: "Globe", tone: "tone-mint", image_url: "/template-assets/infrastructure.png", rate_label: "From ₹99/mo", sort_order: 2, is_active: true },
  { id: "bot", slug: "bot-hosting", name: "Bot Hosting", kind: "Apps", tagline: "Keep automations online", description: "Reliable runtime for Discord bots, APIs, workers and scheduled jobs.", icon: "Bot", tone: "tone-violet", image_url: "/template-assets/infrastructure.png", rate_label: "From ₹49/mo", sort_order: 3, is_active: true },
  { id: "mail", slug: "email-hosting", name: "Business Email", kind: "Communication", tagline: "Professional inboxes for your team", description: "Branded email with storage, spam protection and dependable delivery.", icon: "Mail", tone: "tone-amber", image_url: "/template-assets/infrastructure.png", rate_label: "From ₹79/mo", sort_order: 4, is_active: true },
];

const ICONS = [Server, Globe2, Bot, Mail];
const FEATURES = [
  [CircleGauge, "24/7 Infrastructure", "Designed for consistent availability and predictable performance."],
  [HardDrive, "NVMe Storage", "Fast storage for websites, applications and production workloads."],
  [Network, "Premium Network", "Reliable connectivity with infrastructure distributed across dedicated nodes."],
  [Layers3, "Modern Control", "Simple interfaces for deploying and managing all your services."],
  [ShieldCheck, "DDoS Ready", "Protection and resilience built into the platform from day one."],
  [Code2, "Developer Friendly", "VPS, web, bots, email, databases and more under one platform."],
] as const;
const EVERYTHING = [
  [Rocket, "Launch from anywhere.", "Create and manage services from any browser or device."],
  [UsersIcon, "Collaborate with your team.", "Invite staff with role-based permissions and shared visibility."],
  [Package, "Ship without friction.", "Sensible defaults, transparent pricing and quick deployment."],
  [Globe2, "Global-ready regions.", "Choose the location that keeps your users close."],
  [Database, "Managed databases.", "Production-ready data infrastructure for growing products."],
  [LockKeyhole, "Secure by default.", "Isolated workloads, backups and access controls."],
  [Cloud, "Scale on demand.", "Move from a small experiment to serious workloads with ease."],
  [Sparkles, "AI-ready platform.", "Build modern products with infrastructure prepared for what is next."],
] as const;
const FAQS = [
  ["Where are your servers located?", "Legacy Cloud provides region options based on the services available in your account. Current availability is shown during plan selection."],
  ["Do you offer free migrations?", "Yes. Contact support before ordering and our team will confirm the migration scope and requirements."],
  ["Is support available 24/7?", "Our infrastructure is monitored continuously. Support response times depend on the request and plan."],
  ["How does DDoS protection work?", "Traffic is filtered at the network edge to reduce malicious traffic before it reaches your service."],
  ["What can I run on a VPS?", "Websites, APIs, bots, databases, control panels and other workloads that fit your selected resources."],
  ["Can I request a custom plan?", "Yes. Send us your resource requirements through Discord and we will prepare a suitable option."],
];

function UsersIcon(props: React.ComponentProps<typeof UsersIcon>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }

function revealProps(index: number) {
  return { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .45, delay: index * .04 } };
}

function Terminal() {
  return <motion.div {...revealProps(2)} className="bn-terminal-wrap">
    <div className="bn-terminal">
      <div className="bn-terminal-top"><i /><i /><i /><span className="bn-terminal-label">legacy-cloud / overview</span></div>
      <div className="bn-terminal-body">
        <div className="bn-terminal-status"><div><div className="bn-terminal-title">production-api</div><span className="bn-muted text-xs">Mumbai · Ubuntu 24.04</span></div><span className="bn-status">Operational</span></div>
        <div className="bn-terminal-metrics">
          <div className="bn-metric"><div className="bn-metric-head"><span>CPU</span><strong>42%</strong></div><div className="bn-meter"><span /></div></div>
          <div className="bn-metric"><div className="bn-metric-head"><span>Memory</span><strong>68%</strong></div><div className="bn-meter ram"><span /></div></div>
        </div>
        <div className="bn-terminal-log"><p><b>●</b> node health check passed</p><p><b>●</b> snapshot completed <em>2m ago</em></p><p><b>●</b> network latency stable <em>24ms</em></p><p><b>›</b> deploy --service production-api</p></div>
        <div className="bn-terminal-foot"><span>uptime 99.99%</span><span>1 Gbps network</span></div>
      </div>
    </div>
  </motion.div>;
}

function ServiceGrid({ categories }: { categories: Category[] }) {
  const items = categories.length ? categories.slice(0, 4) : FALLBACK_CATEGORIES;
  return <div className="bn-service-grid">{items.map((category, index) => { const Icon = ICONS[index] ?? Server; return <motion.div {...revealProps(index)} key={category.id}>
    <Link to={`/hosting/${category.slug}`} className="bn-service"><span className="bn-service-art" style={{ backgroundImage: `url(${category.image_url ?? "/template-assets/infrastructure.png"})` }} /><span className="bn-service-content"><span className="bn-service-icon"><Icon size={18} /></span><h3>{category.name}</h3><p>{category.tagline ?? category.description}</p></span><span className="bn-service-bottom"><span>{category.rate_label ?? "Ready to deploy"}</span><ArrowRight size={15} /></span></Link>
  </motion.div>; })}</div>;
}

function PopularPlans({ plans, categories }: { plans: DbPlan[]; categories: Category[] }) {
  const list = plans.slice(0, 3);
  const fallback = [{ id: "starter", name: "Starter Compute", price: 499, ram: "4 GB", cpu: "2 vCPU", storage: "50 GB NVMe", features: ["DDoS protection", "Instant deployment"] }, { id: "growth", name: "Growth Compute", price: 999, ram: "8 GB", cpu: "4 vCPU", storage: "100 GB NVMe", features: ["Daily backups", "Priority support"] }, { id: "scale", name: "Scale Compute", price: 1999, ram: "16 GB", cpu: "8 vCPU", storage: "200 GB NVMe", features: ["Advanced monitoring", "Team access"] }];
  const cards = list.length ? list : fallback;
  return <div className="bn-price-grid">{cards.map((plan: any, index) => { const cat = categories.find((c) => c.id === plan.category_id); return <motion.div {...revealProps(index)} key={plan.id} className={`bn-price-card ${index === 1 ? "is-popular" : ""}`}>
    {index === 1 && <span className="bn-popular">Popular</span>}<div className="bn-price-card-art" style={{ backgroundImage: `url(${cat?.image_url ?? "/template-assets/vps.jpg"})` }} /><small>{cat?.name ?? "Cloud infrastructure"}</small><h2>{plan.name}</h2><div className="bn-price">{formatPrice(plan.price)}<span> / month</span></div><ul className="bn-price-specs">{[plan.ram, plan.cpu, plan.storage, ...(plan.features ?? [])].filter(Boolean).slice(0, 5).map((item: string) => <li key={item}><Check size={14} />{item}</li>)}</ul><AddPlanButton plan={plan} group={cat?.name ?? "Cloud Hosting"} /></motion.div>; })}</div>;
}

function formatPrice(price: number) { return `₹${Number(price).toLocaleString("en-IN")}`; }
function AddPlanButton({ plan, group }: { plan: any; group: string }) { const { add } = useCart(); return <button className="bn-button bn-button-primary" onClick={() => add({ id: plan.id, name: plan.name, group, ram: plan.ram ?? "", cpu: plan.cpu ?? "", storage: plan.storage ?? "", price: Number(plan.price) })}>Add to cart <ArrowRight size={15} /></button>; }

function PanelFeatures() {
  const features = [["CONSOLE", "Service control", "Start, stop, restart and inspect logs from one clear workspace."], ["VERSIONS", "Change versions safely", "Keep environments current without losing control of your configuration."], ["DEPLOYMENTS", "Repeatable releases", "Use practical workflows for apps, bots and production services."], ["ACCESS", "Team permissions", "Invite collaborators while keeping sensitive billing controls private."], ["MONITORING", "Know what is happening", "Watch resource usage and service health as your workloads grow."]];
  const [active, setActive] = useState(0);
  return <div className="bn-panel-grid"><motion.div {...revealProps(0)} className="bn-panel-window"><div className="bn-panel-window-top"><span /><span /><span /></div><img className="bn-panel-image" src={panelConsole.url} alt="Legacy Cloud control panel console" /><div className="bn-panel-caption"><div><small>{features[active][0]}</small><strong>{features[active][1]}</strong></div><span className="bn-muted text-xs">01 / 05</span></div></motion.div><div className="bn-panel-list">{features.map(([label, title, text], index) => <button key={label} onClick={() => setActive(index)} className={`bn-panel-item ${active === index ? "is-active" : ""}`}><span className="bn-panel-number">0{index + 1}</span><span className="bn-panel-copy"><strong>{title}</strong><span>{text}</span></span><span className="bn-panel-dot" /></button>)}</div></div>;
}

function Faq() { const [open, setOpen] = useState<number | null>(null); return <div className="bn-faq">{FAQS.map(([question, answer], index) => <div className="bn-faq-item" key={question}><button className="bn-faq-button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><ChevronDown size={17} /></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bn-faq-answer">{answer}</motion.div>}</AnimatePresence></div>)}</div>; }

export default function Home() {
  const { brand } = useSite();
  const { data: categories = [] } = useCategories();
  const { data: plans = [] } = usePlans();
  useEffect(() => { document.title = `${brand.name ?? "Legacy Cloud"} — Cloud Hosting for serious workloads`; }, [brand.name]);
  const services = categories.length ? categories : FALLBACK_CATEGORIES;
  return <div className="bn-page">
    <section className="bn-container bn-hero"><div className="bn-hero-grid"><motion.div {...revealProps(0)} className="bn-hero-copy"><span className="bn-kicker">Cloud infrastructure / 01</span><h1 className="bn-heading">Infrastructure for what comes <span className="bn-blue">next.</span></h1><p>Powerful, reliable hosting for your websites, apps, bots and businesses. Deploy fast, scale cleanly and manage everything from one platform.</p><div className="bn-actions"><Link to="/pricing" className="bn-button bn-button-primary">Explore hosting <ArrowRight size={15} /></Link><a href={DISCORD} target="_blank" rel="noreferrer" className="bn-button"><MessageCircle size={15} /> Talk to us</a></div><div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-xs bn-muted"><span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-success" /> DDoS protected</span><span className="inline-flex items-center gap-2"><Zap size={14} className="text-primary" /> Fast deployment</span><span className="inline-flex items-center gap-2"><Check size={14} className="text-success" /> No hidden limits</span></div></motion.div><Terminal /></div></section>
    <section className="bn-container"><div className="bn-trust"><div className="bn-trust-item"><strong>99.99%</strong><span>Target uptime</span></div><div className="bn-trust-item"><strong>1 Gbps</strong><span>Network connectivity</span></div><div className="bn-trust-item"><strong>&lt; 60 sec</strong><span>Typical deployment</span></div><div className="bn-trust-item"><strong>24 / 7</strong><span>Infrastructure monitoring</span></div></div></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">02 / services</span><h2 className="bn-section-heading">One platform.<br /><span className="bn-blue">Every workload.</span></h2></div><p>From your first website to production infrastructure, choose the service that fits the work in front of you.</p></div><ServiceGrid categories={services} /></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">03 / why Legacy Cloud</span><h2 className="bn-section-heading">Built for serious<br /><span className="bn-blue">workloads.</span></h2></div><p>Premium infrastructure designed around performance, reliability and simplicity.</p></div><div className="bn-feature-grid">{FEATURES.map(([Icon, title, text], index) => <motion.article {...revealProps(index)} className="bn-feature" key={title}><span className="bn-feature-icon"><Icon size={17} /></span><h3>{title}</h3><p>{text}</p></motion.article>)}</div></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">04 / control plane</span><h2 className="bn-section-heading">Everything you need.<br /><span className="bn-blue">One powerful panel.</span></h2></div><p>Manage your cloud services from a clean workspace that keeps the important details close.</p></div><PanelFeatures /></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">05 / platform</span><h2 className="bn-section-heading">Everything you need,<br /><span className="bn-blue">one platform.</span></h2></div><p>Launch from anywhere. Create and manage services from any browser or device.</p></div><div className="bn-everything">{EVERYTHING.map(([Icon, title, text], index) => <motion.article {...revealProps(index)} className={`bn-every-card ${index === 0 ? "wide" : ""}`} key={title}><div className="bn-feature-icon"><Icon size={16} /></div><h3>{title}</h3><p>{text}</p></motion.article>)}</div></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">06 / community</span><h2 className="bn-section-heading">Trusted by<br /><span className="bn-blue">builders.</span></h2></div><p>Real infrastructure, direct support and a platform that grows with the people using it.</p></div><div className="bn-quotes">{[["We moved our apps and bots to one place. The setup is clear and the team actually responds.", "Rohan K.", "SaaS founder"], ["Transparent pricing, fast nodes and no mystery limits. Exactly what a growing project needs.", "Aditi M.", "Product builder"], ["The control panel makes it easy to see what is happening without getting in the way.", "Kabir S.", "Developer"]].map(([quote, name, role], index) => <motion.article {...revealProps(index)} className="bn-quote" key={name}><p>“{quote}”</p><strong>{name}</strong><span>{role}</span></motion.article>)}</div></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">07 / popular plans</span><h2 className="bn-section-heading">Start small.<br /><span className="bn-blue">Scale without friction.</span></h2></div><Link to="/pricing" className="bn-inline-link">View all hosting <ArrowRight size={15} /></Link></div><PopularPlans plans={plans} categories={categories} /></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">08 / deploy</span><h2 className="bn-section-heading">Ship in<br /><span className="bn-blue">seconds.</span></h2></div><p>Latest-generation infrastructure, practical protection and an interface designed for every project you have in mind.</p></div><div className="bn-actions"><Link to="/pricing" className="bn-button bn-button-primary">Start now <ArrowRight size={15} /></Link><Link to="/status" className="bn-button">View network status</Link></div></section>
    <section className="bn-container bn-section"><div className="bn-section-head"><div><span className="bn-kicker">09 / faq</span><h2 className="bn-section-heading">Got questions?<br /><span className="bn-blue">We have answers.</span></h2></div><p>Can’t find your answer? Reach us on Discord and we will help you choose the right service.</p></div><Faq /></section>
    <section className="bn-container bn-final-cta"><span className="bn-kicker">10 / ready</span><h2 className="bn-section-heading mt-4">Ready for<br /><span className="bn-blue">liftoff?</span></h2><p>Everything you need—from web hosting to full-stack cloud infrastructure—in one platform.</p><div className="bn-actions justify-center"><Link to="/pricing" className="bn-button bn-button-primary">Explore hosting <ArrowRight size={15} /></Link><a href={DISCORD} target="_blank" rel="noreferrer" className="bn-button"><MessageCircle size={15} /> Join Discord</a></div></section>
  </div>;
}