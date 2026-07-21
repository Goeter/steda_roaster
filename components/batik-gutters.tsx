'use client';

import React from 'react';

export function BatikGutters() {
  // SVG Batik Kawung pattern encoded with high detail: outer petals, inner details, dots, and centers.
  // The color of the lines is #8b7355 (warm bronze/coffee tone) which matches the brand colors.
  const svgPattern = `data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b7355' stroke-width='1.2' opacity='0.75'%3E%3C!-- Central Kawung Group (centered at 80, 80) --%3E%3Cg%3E%3C!-- Outer Petals --%3E%3Cellipse cx='80' cy='40' rx='24' ry='36'/%3E%3Cellipse cx='80' cy='120' rx='24' ry='36'/%3E%3Cellipse cx='40' cy='80' rx='36' ry='24'/%3E%3Cellipse cx='120' cy='80' rx='36' ry='24'/%3E%3C!-- Inner Petals (Double Line) --%3E%3Cellipse cx='80' cy='40' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='80' cy='120' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='40' cy='80' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3Cellipse cx='120' cy='80' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3C!-- Central Core --%3E%3Ccircle cx='80' cy='80' r='9' fill='%238b7355'/%3E%3Ccircle cx='80' cy='80' r='4' fill='%23ffffff'/%3E%3C!-- Petal Seeds (Isen-isen / Dots) --%3E%3Ccircle cx='80' cy='30' r='2' fill='%238b7355'/%3E%3Ccircle cx='80' cy='50' r='2' fill='%238b7355'/%3E%3Ccircle cx='80' cy='110' r='2' fill='%238b7355'/%3E%3Ccircle cx='80' cy='130' r='2' fill='%238b7355'/%3E%3Ccircle cx='30' cy='80' r='2' fill='%238b7355'/%3E%3Ccircle cx='50' cy='80' r='2' fill='%238b7355'/%3E%3Ccircle cx='110' cy='80' r='2' fill='%238b7355'/%3E%3Ccircle cx='130' cy='80' r='2' fill='%238b7355'/%3E%3C/g%3E%3C!-- Corner Kawung Groups (centered at 0,0, 160,0, 0,160, 160,160 to make it repeat seamlessly) --%3E%3C!-- Group at (0,0) --%3E%3Ccircle cx='0' cy='0' r='9' fill='%238b7355'/%3E%3Cellipse cx='0' cy='40' rx='24' ry='36'/%3E%3Cellipse cx='40' cy='0' rx='36' ry='24'/%3E%3Cellipse cx='0' cy='40' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='40' cy='0' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='30' r='2' fill='%238b7355'/%3E%3Ccircle cx='30' cy='0' r='2' fill='%238b7355'/%3E%3C!-- Group at (160,0) --%3E%3Ccircle cx='160' cy='0' r='9' fill='%238b7355'/%3E%3Cellipse cx='160' cy='40' rx='24' ry='36'/%3E%3Cellipse cx='120' cy='0' rx='36' ry='24'/%3E%3Cellipse cx='160' cy='40' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='120' cy='0' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3Ccircle cx='160' cy='30' r='2' fill='%238b7355'/%3E%3Ccircle cx='130' cy='0' r='2' fill='%238b7355'/%3E%3C!-- Group at (0,160) --%3E%3Ccircle cx='0' cy='160' r='9' fill='%238b7355'/%3E%3Cellipse cx='0' cy='120' rx='24' ry='36'/%3E%3Cellipse cx='40' cy='160' rx='36' ry='24'/%3E%3Cellipse cx='0' cy='120' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='40' cy='160' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='130' r='2' fill='%238b7355'/%3E%3Ccircle cx='30' cy='160' r='2' fill='%238b7355'/%3E%3C!-- Group at (160,160) --%3E%3Ccircle cx='160' cy='160' r='9' fill='%238b7355'/%3E%3Cellipse cx='160' cy='120' rx='24' ry='36'/%3E%3Cellipse cx='120' cy='160' rx='36' ry='24'/%3E%3Cellipse cx='160' cy='120' rx='14' ry='22' stroke-dasharray='2 2'/%3E%3Cellipse cx='120' cy='160' rx='22' ry='14' stroke-dasharray='2 2'/%3E%3Ccircle cx='160' cy='130' r='2' fill='%238b7355'/%3E%3Ccircle cx='130' cy='160' r='2' fill='%238b7355'/%3E%3C/g%3E%3C/svg%3E"`;

  return (
    <>
      {/* Left Batik Gutter */}
      <div
        className="fixed left-0 top-0 bottom-0 z-40 hidden w-[14vw] max-w-[200px] pointer-events-none lg:block opacity-[0.15]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'left top',
          backgroundSize: '120px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(139, 90, 43, 0.35))',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Right Batik Gutter */}
      <div
        className="fixed right-0 top-0 bottom-0 z-40 hidden w-[14vw] max-w-[200px] pointer-events-none lg:block opacity-[0.15]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right top',
          backgroundSize: '120px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(139, 90, 43, 0.35))',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
    </>
  );
}
