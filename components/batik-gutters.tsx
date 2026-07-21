'use client';

import React from 'react';

export function BatikGutters() {
  // SVG Batik Kembang (Flower Pattern) encoded with high detail:
  // - 8-petaled central flower with inner filigree and dots (isen-isen)
  // - Corner flowers replicated using <use> tags to ensure a 100% seamless repeat
  // - Traditional organic vine and leaf motifs connecting the flowers
  const svgPattern = `data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cg id='flower'%3E%3Ccircle cx='0' cy='0' r='10' fill='%238b7355'/%3E%3Ccircle cx='0' cy='0' r='5' fill='%23ffffff'/%3E%3C!-- Petals --%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(45)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(90)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(135)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(180)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(225)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(270)'/%3E%3Cellipse cx='0' cy='-34' rx='12' ry='24' transform='rotate(315)'/%3E%3C!-- Inner dash lines --%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(45)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(90)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(135)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(180)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(225)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(270)'/%3E%3Cellipse cx='0' cy='-34' rx='8' ry='16' stroke-dasharray='2 2' transform='rotate(315)'/%3E%3C!-- Isen-isen (dots at tip) --%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(45)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(90)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(135)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(180)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(225)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(270)'/%3E%3Ccircle cx='0' cy='-38' r='2' fill='%238b7355' transform='rotate(315)'/%3E%3C/g%3E%3C/defs%3E%3Cg fill='none' stroke='%238b7355' stroke-width='1.2' opacity='0.75'%3E%3C!-- Vines / lung-lungan waves --%3E%3Cpath d='M 80,0 Q 60,40 80,80 Q 100,120 80,160'/%3E%3Cpath d='M 0,80 Q 40,60 80,80 Q 120,100 160,80'/%3E%3Cpath d='M 0,0 Q 40,40 80,80 Q 120,120 160,160'/%3E%3Cpath d='M 160,0 Q 120,40 80,80 Q 40,120 0,160'/%3E%3C!-- Leaves --%3E%3Cpath d='M 40,40 Q 30,20 40,10 Q 50,20 40,40' fill='%238b7355' opacity='0.25'/%3E%3Cpath d='M 120,40 Q 110,20 120,10 Q 130,20 120,40' fill='%238b7355' opacity='0.25'/%3E%3Cpath d='M 40,120 Q 30,140 40,150 Q 50,140 40,120' fill='%238b7355' opacity='0.25'/%3E%3Cpath d='M 120,120 Q 110,140 120,150 Q 130,140 120,120' fill='%238b7355' opacity='0.25'/%3E%3C!-- Flowers --%3E%3Cuse href='%23flower' x='80' y='80'/%3E%3Cuse href='%23flower' x='0' y='0'/%3E%3Cuse href='%23flower' x='160' y='0'/%3E%3Cuse href='%23flower' x='0' y='160'/%3E%3Cuse href='%23flower' x='160' y='160'/%3E%3C/g%3E%3C/svg%3E"`;

  return (
    <>
      {/* Left Batik Gutter */}
      <div
        className="fixed left-0 top-0 bottom-0 z-40 hidden w-[15vw] max-w-[220px] pointer-events-none lg:block opacity-[0.28]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'left top',
          backgroundSize: '130px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(139, 90, 43, 0.4))',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Right Batik Gutter */}
      <div
        className="fixed right-0 top-0 bottom-0 z-40 hidden w-[15vw] max-w-[220px] pointer-events-none lg:block opacity-[0.28]"
        style={{
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right top',
          backgroundSize: '130px auto',
          filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.95)) drop-shadow(-1px -1px 0px rgba(139, 90, 43, 0.4))',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
        }}
      />
    </>
  );
}
