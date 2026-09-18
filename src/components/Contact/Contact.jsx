import React from 'react';

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
    value: '+256 762 449 076',
    href: 'tel:+256762449076',
  },
  //   {
  //     label: 'Base of Operations',
  //     value: 'Kampala, Uganda — Available for global deployment',
  //     href: null,
  //   },
];

const FieldLabel = ({ children }) => (
  <label className="block font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#181614] mb-2">
    {children}
  </label>
);

const inputClasses =
  'w-full bg-[#F5F2EB] border border-[#181614] px-4 py-3.5 font-[JetBrains_Mono] text-[14px] text-[#181614] placeholder:text-[#706D66]/60 outline-none focus:ring-2 focus:ring-[#D97746] transition-shadow duration-200';

const Contact = ({ sectionRef, onSubmit, isSubmitting = false }) => {
  const handleSubmit = (e) => {
    if (onSubmit) onSubmit(e);
    else e.preventDefault();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F5F2EB]"
    >
      <div className="max-w-[1280px] mx-auto border border-[#181614] bg-white grid grid-cols-1 lg:grid-cols-2">
        {/* Left: correspondence details */}
        <div className="bg-[#F5F2EB] p-8 sm:p-12 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-[Newsreader] text-[32px] sm:text-[36px] text-[#181614]">
              Get In Touch
            </h2>
            <p className="font-[Plus_Jakarta_Sans] text-[14px] leading-[1.6] text-[#706D66] max-w-[420px]">
              Whether you represent an academic institution seeking resilient
              software infrastructure, a civic body exploring cryptographic
              voting systems, or an engineering leadership engagement.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="bg-white border border-[#DDD8CC] p-4"
              >
                <p className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66] mb-1">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={
                      detail.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel="noopener noreferrer"
                    className="font-[JetBrains_Mono] text-[14px] font-medium text-[#181614] hover:text-[#D97746] transition-colors duration-200"
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
        <div className="p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-[#181614]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <FieldLabel>Name</FieldLabel>
              <input
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                placeholder="Your name"
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                placeholder="you@organisation.com"
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel>Subject</FieldLabel>
              <select
                name="subject"
                disabled={isSubmitting}
                defaultValue=""
                className={`${inputClasses} appearance-none`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="institutional">Institutional Partnership</option>
                <option value="civic">Civic / Electoral System</option>
                <option value="engineering">Engineering Leadership</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <FieldLabel>Message</FieldLabel>
              <textarea
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
              className={`bg-[#181614] text-[#F5F2EB] py-4 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
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
