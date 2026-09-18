import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const contactDetails = [
  {
    label: 'Email',
    value: 'kiryowajoshua22@gmail.com',
    href: 'mailto:kiryowajoshua22@gmail.com',
  },
  {
    label: 'WhatsApp',
    value: '+1 254 400 9785',
    href: 'https://wa.me/12544009785',
  },
  {
    label: 'Phone',
    value: '+256 762 449076',
    href: 'tel:+12544009785',
  },
  //   {
  //     label: 'Base of Operations',
  //     value: 'Kampala, Uganda — Available for global deployment',
  //     href: null,
  //   },
];

const FieldLabel = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#181614]"
  >
    {children}
  </label>
);

const inputClasses =
  'w-full bg-[#F5F2EB] border border-[#181614] px-4 py-3.5 font-[JetBrains_Mono] text-[14px] text-[#181614] placeholder:text-[#706D66]/60 outline-none focus:ring-2 focus:ring-[#D97746] transition-shadow duration-200';

/**
 * Contact
 *
 * The last thing on the page, so the reveal is deliberately quiet: the
 * two panels rise together and the fields follow. No entrance animation
 * on the submit button — a control that moves as you reach for it is
 * a control you miss.
 */
const Contact = ({ sectionRef, onSubmit, isSubmitting = false }) => {
  const scope = useScrollReveal({ y: 26, stagger: 0.07, start: 'top 90%' });

  const handleSubmit = (e) => {
    if (onSubmit) onSubmit(e);
    else e.preventDefault();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="box-border w-full overflow-x-clip bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,9vh,7rem)]"
    >
      <div
        ref={scope}
        className="mx-auto grid w-full max-w-[1280px] grid-cols-1 border border-[#181614] bg-white lg:grid-cols-2"
      >
        {/* Left: correspondence details */}
        <div className="flex flex-col gap-8 bg-[#F5F2EB] p-[clamp(2rem,4vw,3rem)]">
          <div className="flex flex-col gap-3">
            <h2
              data-reveal
              className="font-[Newsreader] text-[clamp(2rem,3.2vw,2.25rem)] text-[#181614]"
            >
              Get In Touch
            </h2>
            {/* <p
              data-reveal
              className="max-w-[420px] font-[Plus_Jakarta_Sans] text-[14px] leading-[1.6] text-[#706D66]"
            ></p> */}
          </div>

          <div className="flex flex-col gap-4">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                data-reveal
                className="border border-[#DDD8CC] bg-white p-4"
              >
                <p className="mb-1 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={
                      detail.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel="noopener noreferrer"
                    className="font-[JetBrains_Mono] text-[14px] font-medium text-[#181614] transition-colors duration-200 hover:text-[#D97746]"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="font-[JetBrains_Mono] text-[14px] font-medium text-[#181614]">
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="border-t border-[#181614] p-[clamp(2rem,4vw,3rem)] lg:border-l lg:border-t-0">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div data-reveal>
              <FieldLabel htmlFor="contact-name">Name</FieldLabel>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                placeholder="Your name"
                className={inputClasses}
              />
            </div>

            <div data-reveal>
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                placeholder="you@organisation.com"
                className={inputClasses}
              />
            </div>

            <div data-reveal>
              <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                disabled={isSubmitting}
                placeholder="What's this about?"
                className={inputClasses}
              />
            </div>

            <div data-reveal>
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={isSubmitting}
                placeholder="Tell me about the engagement…"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#181614] py-4 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.1em] text-[#F5F2EB] transition-colors duration-200 ${
                isSubmitting
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:bg-[#302D2A]'
              }`}
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
