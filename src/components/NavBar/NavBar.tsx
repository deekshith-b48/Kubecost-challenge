'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  background: rgba(10, 15, 30, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.3s;
`;

const Logo = styled.a`
  display: flex; align-items: center; gap: 10px;
  text-decoration: none;

  svg { width: 28px; height: 28px; color: var(--color-accent-primary); }
`;

const LogoText = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);

  span { color: var(--color-accent-primary); }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 640px) { display: none; }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ $active }) => $active ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)'};
  transition: color 0.2s;
  letter-spacing: 0.02em;

  &:hover { color: var(--color-text-primary); }
`;

const CTABtn = styled.a`
  padding: 8px 18px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 18px var(--color-accent-primary-glow);
  }
`;

const LINKS = [
    { label: 'Platform', href: '#hero' },
    { label: 'Visibility', href: '#granular' },
    { label: 'Resources', href: '#resources' },
    { label: 'Multi-Cloud', href: '#cloud' },
    { label: 'Savings', href: '#savings' },
    { label: 'FinOps', href: '#finops' },
];

export const NavBar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <Nav style={{ background: scrolled ? 'rgba(10,15,30,0.92)' : 'rgba(10,15,30,0.5)' }}>
            <Logo href="#hero">
                {/* K logo */}
                <svg viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="var(--color-accent-primary)" opacity="0.15" />
                    <path d="M10 8 L10 24 M10 16 L20 8 M10 16 L22 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <LogoText>Kube<span>cost</span></LogoText>
            </Logo>

            <Links>
                {LINKS.map(l => (
                    <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
                ))}
            </Links>

            <CTABtn href="#savings">Get Started</CTABtn>
        </Nav>
    );
};
