import { useState, type FormEvent } from 'react';

interface ContentSectionsProps {
  onOpenModal: (topic: string) => void;
}

export default function ContentSections({ onOpenModal }: ContentSectionsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('hello@mainframe.co').catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInlineContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', window.location.pathname);
    } catch {}
  };

  return (
    <div className="relative z-10 w-full text-white">
      {/* Subtle backdrop overlay so content remains readable over background video */}
      <div className="w-full bg-gradient-to-b from-transparent via-black/80 to-black pt-24 pb-16">
        
        {/* ================= LABS SECTION ================= */}
        <section id="labs" className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Experimentation // 01
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Mainframe Labs&reg;
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Our research outpost exploring synthetic media, adaptive agency models, and tactile human-AI choreography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lab Card 1 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <span className="text-xs font-mono text-white/40 tracking-wider">EXP_01 // AGENTIC</span>
                <h3 className="text-xl font-medium mt-3 mb-2 text-white">A.R.I.A Engine</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Adaptive Response Interface Agent combining 24fps keyframe interpolation with spatial mouse-scrub tracking and deterministic facial poses.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">STATUS: ACTIVE V2.4</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('A.R.I.A Engine Inquiry')}
                  className="action-pill text-xs px-3.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>

            {/* Lab Card 2 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <span className="text-xs font-mono text-white/40 tracking-wider">EXP_02 // KINEMATICS</span>
                <h3 className="text-xl font-medium mt-3 mb-2 text-white">Neuro-Spatial Canvas</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Fluid timeline physics engine that translates cursor trajectory into smooth exponential inertia without frame skips or abrupt seeking.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">STATUS: COMPILED</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Neuro-Spatial Inquiry')}
                  className="action-pill text-xs px-3.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>

            {/* Lab Card 3 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <span className="text-xs font-mono text-white/40 tracking-wider">EXP_03 // GRAPHICS</span>
                <h3 className="text-xl font-medium mt-3 mb-2 text-white">Vector Synthesis Rig</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Procedural SVG character rig with parametric lighting, subtle shadows, and mathematically calculated hair and garment physics.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">STATUS: DEPLOYED</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Vector Synthesis Rig')}
                  className="action-pill text-xs px-3.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STUDIO SECTION ================= */}
        <section id="studio" className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Practice // 02
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Studio
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              We design and construct digital instruments, flagship web systems, and brand platforms for visionary ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-8 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">CAPABILITY 01</span>
              <h3 className="text-2xl font-medium mt-2 mb-3">Brand &amp; Interaction Systems</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                From typographic scale architectures to micro-interaction physics, we create bespoke visual languages that define categories and endure trends.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                <span className="px-3 py-1 rounded-full border border-white/15">Typographic Hierarchy</span>
                <span className="px-3 py-1 rounded-full border border-white/15">Art Direction</span>
                <span className="px-3 py-1 rounded-full border border-white/15">Motion Systems</span>
              </div>
            </div>

            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-8 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">CAPABILITY 02</span>
              <h3 className="text-2xl font-medium mt-2 mb-3">Creative Engineering &amp; AI</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Direct synthesis of engineering rigor and design obsession. Real-time rendering, low-latency agent streaming, and edge-native web frameworks.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                <span className="px-3 py-1 rounded-full border border-white/15">WebGL &amp; Canvas</span>
                <span className="px-3 py-1 rounded-full border border-white/15">Multimodal LLM UX</span>
                <span className="px-3 py-1 rounded-full border border-white/15">High-Precision Rigs</span>
              </div>
            </div>
          </div>

          {/* Collaborator Ticker */}
          <div className="p-6 bg-[#121212]/40 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/50">
            <span>SELECTED CLIENTS &amp; ALLIANCES:</span>
            <span className="text-white/80">ALPHABET</span>
            <span className="text-white/80">VERCEL</span>
            <span className="text-white/80">TEENAGE ENGINEERING</span>
            <span className="text-white/80">STRIPE</span>
            <span className="text-white/80">DEEPMIND</span>
          </div>
        </section>

        {/* ================= OPENINGS SECTION ================= */}
        <section id="openings" className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Careers // 03
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Openings
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              We are a compact, multidisciplinary unit of designers, engineers, and researchers. Join our core circle.
            </p>
          </div>

          <div className="space-y-4">
            {/* Role 1 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/40 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-medium text-white">Design Technologist</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">FULL-TIME</span>
                </div>
                <p className="text-sm text-white/60">San Francisco / Tokyo / Remote &bull; UI Shaders, Interaction Primitives, TypeScript</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal('Apply: Design Technologist')}
                className="action-pill self-start sm:self-auto inline-flex items-center justify-center bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                Apply for Role
              </button>
            </div>

            {/* Role 2 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/40 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-medium text-white">AI Interaction Systems Engineer</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">FULL-TIME</span>
                </div>
                <p className="text-sm text-white/60">San Francisco / Remote &bull; Multimodal Agents, Real-Time Audio/Video, Latency Optimization</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal('Apply: AI Interaction Systems Engineer')}
                className="action-pill self-start sm:self-auto inline-flex items-center justify-center bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                Apply for Role
              </button>
            </div>

            {/* Role 3 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/40 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-medium text-white">Creative Director, Digital Artifacts</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">DIRECTORATE</span>
                </div>
                <p className="text-sm text-white/60">London / New York / Remote &bull; Editorial Direction, Graphic Identity, Spatial Computing</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal('Apply: Creative Director')}
                className="action-pill self-start sm:self-auto inline-flex items-center justify-center bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                Apply for Role
              </button>
            </div>
          </div>
        </section>

        {/* ================= SHOP SECTION ================= */}
        <section id="shop" className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Editions // 04
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Shop
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Tangible instruments and typographic releases issued in strictly numbered runs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors">
              <div>
                <div className="w-full h-40 bg-gradient-to-tr from-stone-900 to-stone-800 rounded-xl mb-5 flex items-center justify-center border border-white/10">
                  <span className="text-xs font-mono text-white/40 tracking-widest">MONOLITH_CONSOLE_V1</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-medium text-white">Monolith Desk Console</h3>
                  <span className="text-sm font-mono text-white/80">$420</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  CNC-machined black anodized 6061 aluminum control terminal with magnetic rotary dial and haptic stepper.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">EDITION OF 100</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Inquire: Monolith Desk Console')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Order
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors">
              <div>
                <div className="w-full h-40 bg-gradient-to-tr from-zinc-900 to-zinc-800 rounded-xl mb-5 flex items-center justify-center border border-white/10">
                  <span className="text-xs font-mono text-white/40 tracking-widest">ARIA_MANUAL_VOL_1</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-medium text-white">A.R.I.A Field Manual</h3>
                  <span className="text-sm font-mono text-white/80">$65</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  164-page dual-tone risograph monograph examining adaptive agent ergonomics, spatial choreography, and design ethics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">EDITION OF 350</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Inquire: A.R.I.A Field Manual')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Order
                </button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-[#121212]/70 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors">
              <div>
                <div className="w-full h-40 bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-xl mb-5 flex items-center justify-center border border-white/10">
                  <span className="text-xs font-mono text-white/40 tracking-widest">MF_SPECIMEN_SUITE</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-medium text-white">Specimen Typeface Suite</h3>
                  <span className="text-sm font-mono text-white/80">$180</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Agency display and micro typeface family across 12 weights, full variable axes, and tabular OpenType glyph sets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">COMMERCIAL LIC.</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Inquire: Specimen Typeface Suite')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  License
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  Dispatch // 05
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  Get in touch
                </h2>
                <p className="text-white/60 text-base sm:text-lg mt-3 leading-relaxed">
                  Whether commission inquiries, laboratory fellowships, or architectural advisory, our transmission frequency is open.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">DIRECT INBOX</div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="outline-pill inline-flex items-center gap-3 text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <span>hello@mainframe.co</span>
                    <span className="text-xs">
                      {copiedEmail ? '✓ Copied' : 'Copy'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-white/60">
                  <div>
                    <div className="text-white font-medium mb-1">SAN FRANCISCO</div>
                    <p>440 Brannan Street<br />SOMA, CA 94107</p>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">TOKYO</div>
                    <p>Shibuya Stream 14F<br />Shibuya-ku, Tokyo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Transmission Form */}
            <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-md border border-white/20 rounded-2xl p-7 sm:p-9 shadow-2xl">
              <h3 className="text-xl font-medium mb-1">Transmit a Message</h3>
              <p className="text-xs text-white/50 mb-6">A.R.I.A directly routes notes to the studio partners within 24 hours.</p>

              {contactSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto text-xl mb-2">
                    &#10003;
                  </div>
                  <p className="text-lg font-medium">Transmission Confirmed</p>
                  <p className="text-sm text-white/60 max-w-sm mx-auto">
                    Your brief has been ingested into our dispatch queue. We will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineContactSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Your Identity / Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alexander@domain.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-brief" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Project Brief or Inquiries
                    </label>
                    <textarea
                      id="contact-brief"
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Provide context regarding the project, timeline, or venture requirements..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-white/40">
                      Encrypted transmission &bull; UTC-7
                    </span>
                    <button
                      type="submit"
                      className="action-pill w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-medium text-sm px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/30"
                    >
                      Send Transmission
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-3 text-white/70">
            <span className="text-sm font-medium">Mainframe&reg;</span>
            <span>&lowast;</span>
            <span>&copy; {new Date().getFullYear()} Studio Inc.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>SFO 08:30</span>
            <span>TYO 00:30</span>
            <span>LDN 16:30</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </footer>

      </div>
    </div>
  );
}
