'use client';

import React from 'react';

export function BatikGutters() {
  // SVG Batik Kawung & Biji Kopi (Batik Coffee Pattern) encoded with high detail:
  // - Traditional Indonesian Batik Kawung Ceplok motif integrated with roasted coffee beans inside every petal
  // - S-curve center creases on coffee beans & Batik isen-isen dots
  // - 100% seamless repeat pattern
  const svgPattern = `data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cg id='coffee-petal'%3E%3Cpath d='M 0,-40 C 15,-40 15,0 0,0 C -15,0 -15,-40 0,-40 Z' fill='none' stroke='%236f4e37' stroke-width='1.3'/%3E%3Cellipse cx='0' cy='-20' rx='7' ry='11.5' fill='none' stroke='%236f4e37' stroke-width='1.2'/%3E%3Cpath d='M 0,-29 C 2.5,-24 -2.5,-16 0,-11' fill='none' stroke='%236f4e37' stroke-width='1.2' stroke-linecap='round'/%3E%3Ccircle cx='-10.5' cy='-20' r='1.1' fill='%236f4e37'/%3E%3Ccircle cx='10.5' cy='-20' r='1.1' fill='%236f4e37'/%3E%3Ccircle cx='0' cy='-35.5' r='1.1' fill='%236f4e37'/%3E%3C/g%3E%3Cg id='kawung-cluster'%3E%3Cuse href='%23coffee-petal'/%3E%3Cuse href='%23coffee-petal' transform='rotate(90)'/%3E%3Cuse href='%23coffee-petal' transform='rotate(180)'/%3E%3Cuse href='%23coffee-petal' transform='rotate(270)'/%3E%3Ccircle cx='0' cy='0' r='5.5' fill='none' stroke='%236f4e37' stroke-width='1.2'/%3E%3Ccircle cx='0' cy='0' r='2.2' fill='%236f4e37'/%3E%3C/g%3E%3Cg id='star-rosette'%3E%3Ccircle cx='0' cy='0' r='3.5' stroke='%236f4e37' stroke-width='1' fill='none'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='%236f4e37'/%3E%3Cpath d='M 0,-7 L 0,7 M -7,0 L 7,0' stroke='%236f4e37' stroke-width='0.9' opacity='0.8'/%3E%3C/g%3E%3C/defs%3E%3Cg fill='none' stroke='%236f4e37' opacity='0.85'%3E%3Cuse href='%23kawung-cluster' x='0' y='0'/%3E%3Cuse href='%23kawung-cluster' x='80' y='0'/%3E%3Cuse href='%23kawung-cluster' x='160' y='0'/%3E%3Cuse href='%23kawung-cluster' x='0' y='80'/%3E%3Cuse href='%23kawung-cluster' x='80' y='80'/%3E%3Cuse href='%23kawung-cluster' x='160' y='80'/%3E%3Cuse href='%23kawung-cluster' x='0' y='160'/%3E%3Cuse href='%23kawung-cluster' x='80' y='160'/%3E%3Cuse href='%23kawung-cluster' x='160' y='160'/%3E%3Cuse href='%23star-rosette' x='40' y='40'/%3E%3Cuse href='%23star-rosette' x='120' y='40'/%3E%3Cuse href='%23star-rosette' x='40' y='120'/%3E%3Cuse href='%23star-rosette' x='120' y='120'/%3E%3C/g%3E%3C/svg%3E`;

  return (
    <>
      {/* Left Batik Gutter */}
      <div
        className="fixed left-0 top-0 bottom-0 z-40 hidden w-[15vw] max-w-[220px] pointer-events-none lg:block opacity-[0.60]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'left top',
          backgroundSize: '130px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(111, 78, 55, 0.4))',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Right Batik Gutter */}
      <div
        className="fixed right-0 top-0 bottom-0 z-40 hidden w-[15vw] max-w-[220px] pointer-events-none lg:block opacity-[0.60]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right top',
          backgroundSize: '130px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(111, 78, 55, 0.4))',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
        }}
      />
    </>
  );
}
