/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BackgroundVideo from './components/BackgroundVideo';
import ContentSections from './components/ContentSections';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePillClick = (label: string) => {
    if (label === 'Come work here') {
      const el = document.getElementById('openings');
      if (el) {
        const offset = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - 80);
        window.scrollTo({ top: offset, behavior: 'smooth' });
        return;
      }
    } else if (label === 'See how we operate') {
      const el = document.getElementById('labs');
      if (el) {
        const offset = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - 80);
        window.scrollTo({ top: offset, behavior: 'smooth' });
        return;
      }
    } else if (label === 'Pitch us an idea' || label === 'Send a brief hello') {
      const el = document.getElementById('contact');
      if (el) {
        const offset = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - 80);
        window.scrollTo({ top: offset, behavior: 'smooth' });
        return;
      }
    }

    setActiveModal(label);
    setIsSubmitted(false);
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - 80);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    } else {
      setActiveModal('Get in touch');
      setIsSubmitted(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSubmitted(false);
  };

  const handleSubmitModal = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      closeModal();
      setModalEmail('');
      setModalMessage('');
    }, 1800);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white">
      {/* Artistic Flair Radial Backdrop */}
      <div className="mainframe-bg pointer-events-none" />

      {/* Fixed Full-screen Background Video (smooth mouse-scrub and scroll interpolated) */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-index: 20) with smooth anchor scrolling */}
      <Navbar onContactClick={handleContactClick} />

      {/* Main Hero Section (z-index: 10) */}
      <main className="relative z-10 w-full flex flex-col justify-center">
        <HeroSection onPillClick={handlePillClick} />
        <ContentSections onOpenModal={(topic) => {
          setActiveModal(topic);
          setIsSubmitted(false);
        }} />
      </main>

      {/* Interactive Modal / Dialog for Pills & CTA */}
      {activeModal && (
        <div
          id="interaction-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            id="interaction-modal-card"
            className="w-full max-w-lg bg-[#121212]/95 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-white relative transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              id="modal-close-button"
              onClick={closeModal}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                A.R.I.A Dispatch
              </span>
              <h3 className="text-2xl font-normal mt-1 tracking-tight">
                {activeModal}
              </h3>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto text-xl mb-3">
                  &#10003;
                </div>
                <p className="text-lg font-medium">Transmission Received</p>
                <p className="text-sm text-white/60">
                  A.R.I.A has routed your note to the Mainframe core team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitModal} className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-email-input"
                    className="block text-xs uppercase tracking-wider text-white/60 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="modal-email-input"
                    type="email"
                    required
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-message-input"
                    className="block text-xs uppercase tracking-wider text-white/60 mb-1.5"
                  >
                    Message or Brief
                  </label>
                  <textarea
                    id="modal-message-input"
                    rows={3}
                    required
                    value={modalMessage}
                    onChange={(e) => setModalMessage(e.target.value)}
                    placeholder={
                      activeModal === 'Pitch us an idea'
                        ? 'Tell us what you want to build...'
                        : activeModal === 'Come work here'
                        ? 'Link to your portfolio or github...'
                        : activeModal === 'See how we operate'
                        ? 'What would you like to explore regarding our workflows?'
                        : 'Say hello...'
                    }
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Direct: hello@mainframe.co
                  </span>
                  <button
                    type="submit"
                    id="modal-submit-button"
                    className="inline-flex items-center justify-center bg-white text-black font-medium text-sm px-5 py-2 rounded-full hover:bg-black hover:text-white border border-white/20 transition-colors duration-200 cursor-pointer"
                  >
                    Transmit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
