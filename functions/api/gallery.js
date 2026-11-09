export async function onRequestGet(context) {
  // Curated catalog of all authentic VisionTech EPC project images
  const images = [
    { name: "Bhulta 400kV Substation (Main Yard)", path: "assets/images/project-bhulta-400kv.jpg" },
    { name: "Bheramara 360MW Combined Cycle Power Plant", path: "assets/images/project-bheramara-360mw.jpg" },
    { name: "Feni GIS Substation 230/132kV", path: "assets/images/project-feni-gis.jpg" },
    { name: "Madunaghat 400kV Substation Bay", path: "assets/images/project-madunaghat.jpg" },
    { name: "Maijdee GIS Substation", path: "assets/images/project-maijdee-gis.jpg" },
    { name: "Purbasadipur Substation Switchyard", path: "assets/images/project-purbasadipur.jpg" },
    { name: "Underground Cable Precast Protection Slab", path: "assets/images/project-cable-slab.jpg" },
    { name: "Substation Control Room Building", path: "assets/images/project-control-room.jpg" },
    { name: "SF6 GIS Switchgear Erection Site", path: "assets/images/project-switchgear-site.jpg" },
    { name: "Transformer Yard Heavy Rigging", path: "assets/images/project-transformer-yard.jpg" },
    { name: "Heavy Haulage Multi-Axle Move", path: "assets/images/project-heavy-lift.jpg" },
    { name: "Substation Landmark Aerial View", path: "assets/images/substation-hero.jpg" },
    { name: "Kanchpur 2nd Bridge Auxiliary Civil", path: "assets/images/project-bridge-kanchpur.jpg" },
    { name: "Industrial Electrical MEP Installation", path: "assets/images/project-electrical-mep.jpg" },
    { name: "BREB Substation Turnkey Project", path: "assets/images/project-substation-breb.jpg" },
    { name: "Civil Foundation & Deep Excavation Work", path: "assets/images/project-site-work.jpg" },
    { name: "Corporate Interior & Fit-Out", path: "assets/images/project-office-interior.jpg" },
    { name: "Industrial Steel PEB Warehouse", path: "assets/images/project-building-renovation.jpg" },
    { name: "Crane Rigging GIS Busbar Erection", path: "assets/extracted_media/image88.jpeg" },
    { name: "Substation Engineers & Cable Trench Slabs", path: "assets/extracted_media/image51.jpeg" },
    { name: "Multi-Story GIS Control Building & Gantry", path: "assets/extracted_media/image102.jpeg" },
    { name: "Toolbox Safety Briefing at 230kV Yard", path: "assets/extracted_media/image98.jpeg" },
    { name: "Underground Cable Trench Shuttering", path: "assets/extracted_media/image94.jpeg" },
    { name: "Transformer Yard Gantry Structure", path: "assets/extracted_media/image37.jpeg" }
  ];

  return new Response(JSON.stringify(images), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
