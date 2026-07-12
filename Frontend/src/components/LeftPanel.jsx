import React, { useState, useEffect } from 'react';
import favicon from '../assets/favicon.png';
import loginImg from '../assets/login.png';

const SLIDES = [
    {
        title: "Smart Resource Booking",
        highlight: "Smart",
        description: "Reserve shared offices, conference rooms, and physical assets instantly with real-time availability calendar tracking."
    },
    {
        title: "Structured Asset Lifecycles",
        highlight: "Lifecycles",
        description: "From acquisition to maintenance, monitor company equipment conditions, custodian history, and depreciation logs."
    },
    {
        title: "Role-Based ERP Workflows",
        highlight: "Workflows",
        description: "Empower admins, asset managers, department heads, and employees with customized dashboard actions and approvals."
    }
];

export default function LeftPanel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const renderTitle = (slide) => {
        const parts = slide.title.split(slide.highlight);
        return (
            <h2>
                {parts[0]}
                <span className="hero-highlight">{slide.highlight}</span>
                {parts[1]}
            </h2>
        );
    };

    return (
        <div className="brand-hero-pane">
            {/* Top Brand Logo: Render only the favicon image since it contains the full text logo */}
            <div className="brand-logo-row">
                <img src={favicon} alt="AssetFlow Logo" className="brand-logo-img" />
            </div>

            {/* Auto-sliding Text Carousel */}
            <div className="carousel-container">
                <div className="carousel-slides-wrapper">
                    {SLIDES.map((slide, index) => (
                        <div 
                            key={index} 
                            className={`carousel-slide-content ${index === currentSlide ? 'active' : ''}`}
                        >
                            {renderTitle(slide)}
                            
                            <div className="underline-deco">
                                <div className="deco-line cyan"></div>
                                <div className="deco-line blue"></div>
                            </div>
                            
                            <p>{slide.description}</p>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                <div className="slide-indicators">
                    {SLIDES.map((_, index) => (
                        <div 
                            key={index} 
                            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            title={`Go to slide ${index + 1}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Illustration rendering */}
            <div className="illustration-wrapper">
                <img src={loginImg} alt="AssetFlow Login Showcase" className="left-pane-illustration" />
            </div>

            {/* Bottom blank footer placeholder */}
            <div className="brand-hero-footer">
                <span className="brand-footer-text">© 2026 AssetFlow Corp. All rights reserved.</span>
            </div>
        </div>
    );
}
