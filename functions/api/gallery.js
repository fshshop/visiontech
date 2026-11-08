import fs from 'fs';
import path from 'path';

export async function onRequestGet(context) {
  // Return pre-indexed list of existing assets/images
  const images = [
    { name: "Bhulta 400kV Substation", path: "assets/images/project-bhulta-400kv.jpg" },
    { name: "Bheramara 360MW Power Plant", path: "assets/images/project-bheramara-360mw.jpg" },
    { name: "Feni GIS Substation", path: "assets/images/project-feni-gis.jpg" },
    { name: "Madunaghat Substation", path: "assets/images/project-madunaghat.jpg" },
    { name: "Maijdee GIS Substation", path: "assets/images/project-maijdee-gis.jpg" },
    { name: "Purbasadipur Substation", path: "assets/images/project-purbasadipur.jpg" },
    { name: "Cable Protection Slab", path: "assets/images/project-cable-slab.jpg" },
    { name: "Control Room Building", path: "assets/images/project-control-room.jpg" },
    { name: "Switchgear Erection Site", path: "assets/images/project-switchgear-site.jpg" },
    { name: "Transformer Yard Heavy Rigging", path: "assets/images/project-transformer-yard.jpg" },
    { name: "Heavy Lift & Haulage Move", path: "assets/images/project-heavy-lift.jpg" },
    { name: "Substation Landmark Hero", path: "assets/images/substation-hero.jpg" },
    { name: "Kanchpur Bridge Auxiliary Civil", path: "assets/images/project-bridge-kanchpur.jpg" },
    { name: "Electrical MEP Installation", path: "assets/images/project-electrical-mep.jpg" },
    { name: "BREB Substation Turnkey", path: "assets/images/project-substation-breb.jpg" },
    { name: "Industrial Site Heavy Work", path: "assets/images/project-site-work.jpg" },
    { name: "Corporate Interior & Fit-Out", path: "assets/images/project-office-interior.jpg" },
    { name: "Industrial Facility Renovation", path: "assets/images/project-building-renovation.jpg" }
  ];

  return new Response(JSON.stringify(images), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
