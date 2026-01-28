import React, { useState } from "react";
import "./Contact.css";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en/contact.json";
import ar from "../../locales/ar/contact.json";

import emailjs from "@emailjs/browser";

const Contact = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;

  const [formData, setFormData] = useState({
    name: "",
    email2: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = t.validation.name;
    if (!formData.email2.trim()) {
      tempErrors.email2 = t.validation.emailReq;
    } else if (!/\S+@\S+\.\S+/.test(formData.email2)) {
      tempErrors.email2 = t.validation.emailInvalid;
    }
    if (!formData.subject.trim()) tempErrors.subject = t.validation.subject;
    if (!formData.message.trim()) tempErrors.message = t.validation.message;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ... inside the Contact component ...

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    // Reference your .env variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_CONTACT_US_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email2,
          subject: formData.subject,
          message: formData.message,
          to_name: "Mite Maverick Admin",
        },
        publicKey
      );

      setIsSubmitted(true);
      setFormData({ name: "", email2: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact Form Error:", error);
      alert(language === "ar" ? "فشل الإرسال" : "Submission failed");
    } finally {
      setIsSending(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="submission-success-overlay">
        <div className="submission-success-card">
          <div className="success-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2>{language === "ar" ? "شكراً لك!" : "Thank You!"}</h2>
          <p>
            {language === "ar"
              ? "لقد تم استلام طلبك بنجاح. سيتواصل معك فريقنا قريباً."
              : "Your request has been received successfully. Our team will contact you shortly."}
          </p>
          <button onClick={() => setIsSubmitted(false)} className="success-back-btn">
            {language === "ar" ? "إرسال طلب جديد" : "Submit New Request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className={`contact-section ${language === "ar" ? "rtl" : ""}`}
    >
      <div className="orbit-header">
        <h1 className="orbit-main-title">
          {" "}
          {t.title} <span>{t.titleSpan}</span>{" "}
        </h1>
      </div>

      <div id="contact_container" className="contact-container">
        <div className="contact-info">
          <h1 className="hero-text">
            {t.heroTextTop} <br />
            {t.heroTextMid} <br />
            <span className="say-hi">{t.heroTextBottom}</span>
          </h1>
        </div>

        <div className="contact-form-card">
          <form className="modern-form" onSubmit={handleSubmit} noValidate>
            <div className="form-header">
              <h3>{t.formTitle}</h3>
              <p>{t.formSubtitle}</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t.placeholders.name}
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email2"
                  placeholder={t.placeholders.email}
                  value={formData.email2}
                  onChange={handleChange}
                  className={errors.email2 ? "input-error" : ""}
                />
                {errors.email2 && (
                  <span className="error-text">{errors.email2}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder={t.placeholders.subject}
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "input-error" : ""}
              />
              {errors.subject && (
                <span className="error-text">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder={t.placeholders.message}
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "input-error" : ""}
              ></textarea>
              {errors.message && (
                <span className="error-text">{errors.message}</span>
              )}
            </div>

            <div className="form-footer">
              <button
                type="submit"
                className="submit-btn-contact"
                disabled={isSending}
              >
                {isSending ? t.buttonSending : t.button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
