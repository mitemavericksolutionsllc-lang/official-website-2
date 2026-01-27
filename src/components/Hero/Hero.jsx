import React, { useEffect, useRef, memo, useState, useMemo } from "react";
import "./Hero.css";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import LogoImg from "../../assets/images/Asset 2@4x.png";
import { useLanguage } from "../../context/LanguageContext";

// Social Icon Imports
import Facebook from '../../assets/images/Hero/iconoir_facebook.png';  
import Instagram from '../../assets/images/Hero/line-md_instagram.png';     
import Whatsapp from '../../assets/images/Hero/mdi_whatsapp.png';    
import Linkedin from '../../assets/images/Hero/basil_linkedin-outline.png';
import Telegram from '../../assets/images/Hero/Telegram.png';    

const ZenithTypewriter = memo(({ texts }) => {
  const dynamicText = useTypewriter(texts, 80, 2000);
  return (
    <span className="zenith-highlight zenith-typewriter-container">
      <span className="zenith-typewriter-text">{dynamicText}</span>
      <span className="zenith-typewriter-cursor"></span>
    </span>
  );
}, (prevProps, nextProps) => JSON.stringify(prevProps.texts) === JSON.stringify(nextProps.texts));

const Hero = ({
  heroImage = LogoImg,
  heroVideo = null,
  mediaType = "image",
  altText = "Hero visual",
  autoPlayVideo = true,
  loopVideo = true,
  mutedVideo = true,
}) => {
  const { language } = useLanguage();
  const videoRef = useRef(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [heroTranslations, setHeroTranslations] = useState(null);
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'WhatsApp' or 'Telegram' or null
  const [copySuccess, setCopySuccess] = useState(false);

  const contactDetails = {
    WhatsApp: { number: "+963 988 077 039", flag: "🇸🇾" }, // Change to your actual number/flag
    Telegram: { number: "+963 988 077 039", flag: "🇸🇾" }
  };

  useEffect(() => {
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
  }, [language]);

  const handleSocialClick = (e, platform, url) => {
    if (platform === "WhatsApp" || platform === "Telegram") {
      e.preventDefault();
      setActiveModal(platform);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const typewriterTexts = useMemo(() => {
    if (!heroTranslations) return ["", "", ""];
    return [heroTranslations.title_part2, heroTranslations.title_part3, heroTranslations.title_part4];
  }, [heroTranslations]);

  const socialLinks = useMemo(() => [
    { platform: "Facebook", img: Facebook, url: "https://www.facebook.com/share/17EGMcm3xy/" },
    { platform: "Instagram", img: Instagram, url: "https://www.instagram.com/mitemaverick.sy?igsh=dDZ3cm12OHVscTJ3" },
    { platform: "WhatsApp", img: Whatsapp, url: "#" },
    // { platform: "LinkedIn", img: Linkedin, url: "#" },
    { platform: "Telegram", img: Telegram, url: "#" },
  ], []);

  if (!heroTranslations) return <div className="zenith-hero-section">Loading...</div>;

  return (
    <section id="home" className="zenith-hero-section" ref={sectionRef}>
      <div className="zenith-main-layout">
        <div className="zenith-text-block">
          <h1 className="zenith-main-title">
            {heroTranslations.title_part1} <br /> 
            <ZenithTypewriter key={language} texts={typewriterTexts} />
          </h1>
          <p className="zenith-sub-text">{heroTranslations.subtitle}</p>

          <div className="zenith-action-area">
            <a href="#contact" className="zenith-cta-btn">
              <span>{heroTranslations.cta_button}</span>
              <span className="zenith-btn-arrow">→</span>
            </a>
          </div>

          <div className={`zenith-social-wrapper ${isSectionVisible ? "zenith-visible" : ""}`}>
            <h4 className="zenith-social-label">{heroTranslations.social_label}</h4>
            <div className="zenith-social-grid">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className="zenith-social-item" 
                  aria-label={social.platform}
                  onClick={(e) => handleSocialClick(e, social.platform, social.url)}
                >
                  <img src={social.img} alt={social.platform} className="zenith-icon-asset" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="zenith-media-block">
          <div className="zenith-asset-holder">
            {mediaType === "image" ? (
              <img src={heroImage} alt={altText} className="zenith-img-fluid" />
            ) : (
              <video ref={videoRef} className="zenith-video-fluid" autoPlay loop muted playsInline>
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>

      {/* --- Contact Modal Window --- */}
      {activeModal && (
        <div className="zenith-modal-overlay" onClick={() => setActiveModal(null)} dir="ltr">
          <div className="zenith-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{activeModal} Contact</h3>
            <div className="zenith-contact-row">
              <span className="zenith-flag">{contactDetails[activeModal].flag}</span>
              <span className="zenith-number">{contactDetails[activeModal].number}</span>
              <button 
                className="zenith-copy-btn" 
                onClick={() => copyToClipboard(contactDetails[activeModal].number)}
              >
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
            <button className="zenith-close-modal" onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Hero);