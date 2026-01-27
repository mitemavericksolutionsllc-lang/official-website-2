import React, { useState, useEffect } from "react";
import "./ServicesSection.css";
import { useLanguage } from "../../context/LanguageContext";

import Application from '../../assets/images/services/application.png';
import InternalSystems from '../../assets/images/services/internal-systems.png';
import CustomSoftware from '../../assets/images/services/custom-software.png';
import CustomAPIs from '../../assets/images/services/custom-api.png';
import GraphicDesign from '../../assets/images/services/graphic-design.png';
import FinTech from '../../assets/images/services/fin-teck.png';

export default function OrbitServices() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("Our Services");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const serviceImages = {
    1: Application,
    2: InternalSystems,
    3: CustomSoftware,
    4: CustomAPIs,
    5: GraphicDesign,
    6: FinTech
  };

  const englishServices = [
    { 
      id: 1, 
      title: "Applications", 
      description: "We build seamless, high-performance software that reaches your users wherever they are.", 
      image: Application 
    },
    { 
      id: 2, 
      title: "Internal systems for businesses", 
      description: "We transform fragmented workflows into streamlined digital ecosystems.", 
      image: InternalSystems 
    },
    { 
      id: 3, 
      title: "Custom software solutions", 
      description: "When 'off-the-shelf' software fails to meet your unique business requirements, we build the exact tool you need from the ground up.", 
      image: CustomSoftware 
    },
    { 
      id: 4, 
      title: "Custom APIs", 
      description: "We build the 'connectors' that allow different software systems to communicate.", 
      image: CustomAPIs 
    },
    { 
      id: 5, 
      title: "Graphic Design", 
      description: "We ensure your technology is as beautiful as it is functional. Our design team focuses on visual storytelling and user-centric interfaces.", 
      image: GraphicDesign 
    },
    { 
      id: 6, 
      title: "Fin-Tech", 
      description: "We bridge the gap between complex finance and modern technology, focusing on security, compliance, and speed.", 
      image: FinTech 
    }
  ];

  const arabicServices = [
    { 
      id: 1, 
      title: "التطبيقات", 
      description: "نحن نبني برمجيات سلسة وعالية الأداء تصل إلى المستخدمين أينما كانوا.", 
      image: Application 
    },
    { 
      id: 2, 
      title: "الأنظمة الداخلية للشركات", 
      description: "نحن نحول سير العمل المجزأ إلى أنظمة بيئية رقمية مبسطة.", 
      image: InternalSystems 
    },
    { 
      id: 3, 
      title: "حلول البرمجيات المخصصة", 
      description: "عندما تفشل البرامج الجاهزة في تلبية متطلبات عملك الفريدة، نقوم ببناء الأداة التي تحتاجها بالضبط من الصفر.", 
      image: CustomSoftware 
    },
    { 
      id: 4, 
      title: "واجهات برمجة التطبيقات المخصصة", 
      description: "نحن نقوم ببناء 'الموصلات' التي تسمح لأنظمة البرمجيات المختلفة بالتواصل فيما بينها.", 
      image: CustomAPIs 
    },
    { 
      id: 5, 
      title: "التصميم الجرافيكي", 
      description: " نحن نضمن أن تكون تقنياتنا جميلة بقدر ما هي عملية. يركز فريق التصميم لدينا على السرد البصري والواجهات سهلة الاستخدام. ", 
      image: GraphicDesign 
    },
    { 
      id: 6, 
      title: "التكنولوجيا المالية", 
      description: " نحن نسد الفجوة بين التمويل المعقد والتكنولوجيا الحديثة، مع التركيز على الأمان والامتثال والسرعة. ", 
      image: FinTech 
    }
  ];

  useEffect(() => {
    if (language === 'ar') {
      setServices(arabicServices);
      setTitle("خدماتنا");
    } else {
      setServices(englishServices);
      setTitle("Our Services");
    }
  }, [language]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getServiceImage = (id) => {
    return serviceImages[id] || Application;
  };

  // Calculate dimensions based on window width
  let cardWidth, gap;
  
  if (windowWidth <= 340) {
    cardWidth = 260;
    gap = 25;
  } else if (windowWidth <= 480) {
    cardWidth = 280;
    gap = 30;
  } else if (windowWidth <= 768) {
    cardWidth = 320;
    gap = 80;
  } else {
    cardWidth = 420;
    gap = 80;
  }

  const step = cardWidth + gap;
  const currentTranslation = -(activeIndex * step);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const containerClass = language === 'ar' ? 'orbit-container rtl' : 'orbit-container';

  if (services.length === 0) {
    return (
      <section className="orbit-main-wrapper" id="services">
        <div className={containerClass}>
          <div className="orbit-content">
            <div className="orbit-header">
              <h1 className="orbit-main-title">{language === 'ar' ? "خدماتنا" : "Our Services"}</h1>
            </div>
            <div className="loading-placeholder">
              {language === 'ar' ? "جاري التحميل..." : "Loading..."}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="orbit-main-wrapper" id="services" dir="ltr">
      <div className={containerClass}>
        <div className="orbit-content">
          <div className="orbit-header">
            <h1 className="orbit-main-title">{title}</h1>
          </div>

          <div className="orbit-slider-area">
            <button 
              className="orbit-nav-btn prev" 
              onClick={prevSlide} 
              aria-label={language === 'ar' ? "الشريحة السابقة" : "Previous slide"}
            >
              &#10094;
            </button>
            
            <button 
              className="orbit-nav-btn next" 
              onClick={nextSlide} 
              aria-label={language === 'ar' ? "الشريحة التالية" : "Next slide"}
            >
              &#10095;
            </button>

            <div
              className="orbit-horizontal-track"
              style={{
                transform: `translate3d(calc(50vw - ${cardWidth / 2}px + ${currentTranslation}px), 0, 0)`,
              }}
            >
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const distance = Math.abs(index - activeIndex);
                const scale = 1 - Math.min(distance * 0.15, 0.3);
                const opacity = 1 - Math.min(distance * 0.5, 0.8);

                return (
                  <div
                    key={service.id}
                    onClick={() => handleCardClick(index)}
                    className={`orbit-card-wrapper ${isActive ? "is-active" : ""}`}
                    style={{
                      width: `${cardWidth}px`,
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      zIndex: isActive ? 10 : 1,
                      cursor: 'pointer',
                    }}
                  >
                    <div className={`orbit-card ${isActive ? "active" : ""}`}>
                      <div className="bottom-left-horizontal"></div>
                      <div className="bottom-left-vertical"></div>
                      <div className="orbit-card-content">
                        <div className="orbit-image-wrapper">
                          <img 
                            src={getServiceImage(service.id)} 
                            alt={service.title} 
                            className="orbit-service-img" 
                          />
                        </div>
                        <h3 
                          className="orbit-title" 
                          style={{ 
                           textAlign: 'center',
                            direction: language === 'ar' ? 'rtl' : 'ltr'
                          }}
                        >
                          {service.title}
                        </h3>
                        <p 
                          className="orbit-desc" 
                          style={{ 
                            textAlign: language === 'ar' ? 'right' : 'left',
                            direction: language === 'ar' ? 'rtl' : 'ltr'
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="orbit-nav-footer">
            <div className="orbit-dots">
              {services.map((_, i) => (
                <div 
                  key={i} 
                  className={`orbit-dot ${i === activeIndex ? "active" : ""}`} 
                  onClick={() => handleDotClick(i)} 
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDotClick(i);
                    }
                  }}
                  aria-label={language === 'ar' ? `انتقل إلى الشريحة ${i + 1}` : `Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}