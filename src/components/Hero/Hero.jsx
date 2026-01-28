import React, { useEffect, useRef, memo, useState, useMemo } from "react";
import "./Hero.css";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useLanguage } from "../../context/LanguageContext";

// Social Icon Imports
import Facebook from "../../assets/images/Hero/iconoir_facebook.png";
import Instagram from "../../assets/images/Hero/line-md_instagram.png";
import Whatsapp from "../../assets/images/Hero/mdi_whatsapp.png";
import Linkedin from "../../assets/images/Hero/basil_linkedin-outline.png";
import Telegram from "../../assets/images/Hero/Telegram.png";

import SyrianFlag from "../../assets/images/Hero/syrian_flag.png";

// Video Imports
import Godhands from "../../assets/videos/Hero/GodHands.mp4";
import GodhandsMobile from "../../assets/videos/Hero/godshandsmobile.mp4";

const ZenithTypewriter = memo(({ texts }) => {
  const dynamicText = useTypewriter(texts, 80, 2000);
  return (
    <div className="zenith-typewriter-fixed-height">
      <span className="zenith-typewriter-text-clean">{dynamicText}</span>
      <span className="zenith-typewriter-cursor-clean">|</span>
    </div>
  );
});

const Hero = ({ autoPlayVideo = true, mutedVideo = true }) => {
  const { language } = useLanguage();
  const videoRef = useRef(null);
  const [sectionRef] = useScrollAnimation(0.1);
  const [heroTranslations, setHeroTranslations] = useState(null);
  const [startReveal, setStartReveal] = useState(false);
  const [videoSrc, setVideoSrc] = useState(Godhands);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    number: "",
    flag: "",
  });

  // Contact Information
  const contactDetails = {
    WhatsApp: {
      number: "+963 988 077 039",
      flag: SyrianFlag,
      url: "https://wa.me/963988077039"
    },
    Telegram: {
      number: "+963 988 077 039",
      flag: SyrianFlag,
      url: "https://t.me/+963988077039"
    },
  };

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const applyVideoSource = (e) => {
      setVideoSrc(e.matches ? GodhandsMobile : Godhands);
    };
    mql.addEventListener("change", applyVideoSource);
    applyVideoSource(mql);

    const timer = setTimeout(() => setStartReveal(true), 3000);

    const loadTranslations = async () => {
      try {
        const response = await import(`../../locales/${language}/hero.json`);
        setHeroTranslations(response.default);
      } catch (error) {
        const fallback = await import(`../../locales/en/hero.json`);
        setHeroTranslations(fallback.default);
      }
    };
    loadTranslations();

    return () => {
      mql.removeEventListener("change", applyVideoSource);
      clearTimeout(timer);
    };
  }, [language]);

  // const handleSocialClick = (e, platform, url) => {
  //   if (platform === "WhatsApp" || platform === "Telegram") {
  //     e.preventDefault();

  //     const chatUrl = contactDetails[platform].url;
  //     window.open(chatUrl, "_blank", "noopener,noreferrer");

  //     setActiveModal(platform);
  //   }
  // };

  const [copied, setCopied] = useState(false);

  // 2. Define the handleCopy function
  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    // Reset the icon back to "copy" after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const typewriterTexts = useMemo(() => {
    if (!heroTranslations) return ["", "", ""];
    return [
      heroTranslations.title_part2,
      heroTranslations.title_part3,
      heroTranslations.title_part4,
    ];
  }, [heroTranslations]);

  const socialLinks = useMemo(
    () => [
      {
        platform: "Facebook",
        img: Facebook,
        url: "https://www.facebook.com/share/17EGMcm3xy/",
      },
      {
        platform: "Instagram",
        img: Instagram,
        url: "https://www.instagram.com/mitemaverick.sy?igsh=dDZ3cm12OHVscTJ3",
      },
      { platform: "WhatsApp", img: Whatsapp, url: "https://wa.me/963988077039" },
      // { platform: "LinkedIn", img: Linkedin, url: "#" },
      { platform: "Telegram", img: Telegram, url: "https://t.me/+963988077039" },
    ],
    [],
  );

  if (!heroTranslations) return null;

  return (
    <section id="home" className="zenith-hero-section" ref={sectionRef}>
      <div className="zenith-shade-top"></div>
      <div className="zenith-shade-bottom"></div>

      <div className="zenith-video-wrapper-full">
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay={autoPlayVideo}
          muted={mutedVideo}
          playsInline
          className="zenith-video-element-full"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="zenith-video-overlay-dark"></div>
      </div>

      <div className="zenith-content-center">
        <h1 className={`zenith-expand-reveal ${startReveal ? "active" : ""}`}>
          <div className="title-static">{heroTranslations.title_part1}</div>
          <ZenithTypewriter key={language} texts={typewriterTexts} />
        </h1>

        <div className="subtitle-static-zenith">
          <p
            className={`zenith-expand-reveal delay-1 ${startReveal ? "active" : ""}`}
          >
            {heroTranslations.subtitle}
          </p>
        </div>

        <div
          className={`zenith-expand-reveal delay-2 ${startReveal ? "active" : ""}`}
        >
          <a href="#contact_container" className="zenith-cta-btn">
            <span>{heroTranslations.cta_button}</span>
            <span className="zenith-btn-arrow">
              {heroTranslations.Cta_btn_arow}
            </span>
          </a>
        </div>
      </div>

      <div
        className={`zenith-social-sidebar-reveal ${startReveal ? "active" : ""}`}
      >
        <div className="zenith-social-grid-vertical">
          {socialLinks.map((social, index) => (
            <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zenith-social-item"
                  aria-label={social.platform}
                  // onClick={(e) => handleSocialClick(e, social.platform, social.url)}
            >
              <img
                src={social.img}
                alt={social.platform}
                className="zenith-icon-asset"
              />
            </a>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="mm-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="mm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Redesigned Close Button */}
            <button className="mm-close-x" onClick={() => setShowModal(false)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3>Contact via {modalData.name}</h3>

            <div className="mm-horizontal-container">
              <div className="mm-number-text">
                <span>{modalData.flag}</span>
                <span>{modalData.number}</span>
              </div>

              {/* Vertical Line */}
              <div className="mm-separator"></div>

              <button
                className={`mm-copy-btn-small ${copied ? "copied" : ""}`}
                onClick={() => handleCopy(modalData.number)}
              >
                {copied ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animation: "fadeIn 0.2s" }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Hero);
