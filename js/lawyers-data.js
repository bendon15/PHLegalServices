/**
 * lawyers-data.js
 * Inline copy of data/lawyers.json, used only as a last-resort fallback
 * when the page is opened directly from disk (file://) and fetch()
 * cannot reach local files. See js/main.js -> PHLegalData.getLawyers().
 */
window.LAWYERS_FALLBACK = [
  {
    "id": "atty-001",
    "name": "Atty. Maria Corazon Villanueva",
    "initials": "MV",
    "title": "Senior Partner",
    "firm": "Villanueva & Reyes Law Offices",
    "specialties": [
      "Family Law",
      "Annulment & Legal Separation",
      "Child Custody"
    ],
    "location": "Makati City, Metro Manila",
    "mode": [
      "In-person",
      "Video call"
    ],
    "experienceYears": 14,
    "ibp": "IBP No. 214-8827",
    "languages": [
      "English",
      "Filipino"
    ],
    "rate": "\u20b13,500 / consultation",
    "rating": 4.9,
    "reviews": 128,
    "bio": "Maria Corazon focuses her practice on family and domestic relations matters, guiding clients through annulment, custody, and support proceedings with a calm, methodical approach.",
    "availability": {
      "days": [
        "Mon",
        "Tue",
        "Wed",
        "Fri"
      ],
      "hours": "9:00 AM \u2013 5:00 PM"
    }
  },
  {
    "id": "atty-002",
    "name": "Atty. Jericho P. Santos",
    "initials": "JS",
    "title": "Managing Partner",
    "firm": "Santos De Guzman Law Group",
    "specialties": [
      "Corporate Law",
      "Business Registration",
      "Contract Drafting"
    ],
    "location": "Bonifacio Global City, Taguig",
    "mode": [
      "In-person",
      "Video call",
      "Phone call"
    ],
    "experienceYears": 11,
    "ibp": "IBP No. 198-4471",
    "languages": [
      "English",
      "Filipino"
    ],
    "rate": "\u20b14,000 / consultation",
    "rating": 4.8,
    "reviews": 96,
    "bio": "Jericho advises startups and SMEs on incorporation, SEC and DTI compliance, and commercial contracts, translating corporate law into practical steps for founders.",
    "availability": {
      "days": [
        "Mon",
        "Wed",
        "Thu"
      ],
      "hours": "10:00 AM \u2013 6:00 PM"
    }
  },
  {
    "id": "atty-003",
    "name": "Atty. Liza Marie Fernandez",
    "initials": "LF",
    "title": "Founding Attorney",
    "firm": "Fernandez Immigration Law Office",
    "specialties": [
      "Immigration Law",
      "Visa Petitions",
      "Dual Citizenship"
    ],
    "location": "Cebu City, Cebu",
    "mode": [
      "Video call",
      "Phone call"
    ],
    "experienceYears": 9,
    "ibp": "IBP No. 230-1092",
    "languages": [
      "English",
      "Filipino",
      "Cebuano"
    ],
    "rate": "\u20b13,000 / consultation",
    "rating": 4.9,
    "reviews": 84,
    "bio": "Liza Marie handles visa petitions, dual citizenship, and travel document concerns for overseas Filipinos and their families, with a focus on clear, step-by-step guidance.",
    "availability": {
      "days": [
        "Tue",
        "Thu",
        "Sat"
      ],
      "hours": "1:00 PM \u2013 7:00 PM"
    }
  },
  {
    "id": "atty-004",
    "name": "Atty. Ramon Antonio Bautista",
    "initials": "RB",
    "title": "Senior Associate",
    "firm": "Bautista Labor Law Chambers",
    "specialties": [
      "Labor Law",
      "Illegal Dismissal",
      "NLRC Representation"
    ],
    "location": "Quezon City, Metro Manila",
    "mode": [
      "In-person",
      "Video call"
    ],
    "experienceYears": 8,
    "ibp": "IBP No. 241-7756",
    "languages": [
      "English",
      "Filipino"
    ],
    "rate": "\u20b12,800 / consultation",
    "rating": 4.7,
    "reviews": 61,
    "bio": "Ramon represents both employees and employers in labor disputes, illegal dismissal claims, and NLRC proceedings, with an emphasis on early, practical resolution.",
    "availability": {
      "days": [
        "Mon",
        "Tue",
        "Thu",
        "Fri"
      ],
      "hours": "8:00 AM \u2013 4:00 PM"
    }
  },
  {
    "id": "atty-005",
    "name": "Atty. Kristine Joy Aquino",
    "initials": "KA",
    "title": "Partner",
    "firm": "Aquino Criminal Defense Group",
    "specialties": [
      "Criminal Defense",
      "Bail Petitions",
      "Cybercrime Law"
    ],
    "location": "Pasig City, Metro Manila",
    "mode": [
      "In-person",
      "Video call"
    ],
    "experienceYears": 13,
    "ibp": "IBP No. 176-3390",
    "languages": [
      "English",
      "Filipino"
    ],
    "rate": "\u20b14,500 / consultation",
    "rating": 4.8,
    "reviews": 103,
    "bio": "Kristine Joy defends clients across criminal proceedings, from inquest to trial, and has a growing practice in cybercrime and online fraud cases under RA 10175.",
    "availability": {
      "days": [
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],
      "hours": "9:00 AM \u2013 5:00 PM"
    }
  },
  {
    "id": "atty-006",
    "name": "Atty. Paolo Miguel Reyes",
    "initials": "PR",
    "title": "Founding Attorney",
    "firm": "Reyes Real Estate & Property Law",
    "specialties": [
      "Real Estate Law",
      "Land Titling",
      "Property Disputes"
    ],
    "location": "Davao City, Davao del Sur",
    "mode": [
      "In-person",
      "Video call",
      "Phone call"
    ],
    "experienceYears": 16,
    "ibp": "IBP No. 142-9915",
    "languages": [
      "English",
      "Filipino",
      "Bisaya"
    ],
    "rate": "\u20b13,200 / consultation",
    "rating": 4.9,
    "reviews": 140,
    "bio": "Paolo Miguel has spent over a decade resolving land titling issues, boundary disputes, and property transactions for families and small developers in Mindanao.",
    "availability": {
      "days": [
        "Mon",
        "Tue",
        "Wed",
        "Sat"
      ],
      "hours": "9:00 AM \u2013 5:00 PM"
    }
  },
  {
    "id": "atty-007",
    "name": "Atty. Andrea Nicole Lim",
    "initials": "AL",
    "title": "Associate Partner",
    "firm": "Lim Intellectual Property Law Office",
    "specialties": [
      "Intellectual Property",
      "Trademark Registration",
      "Copyright"
    ],
    "location": "Makati City, Metro Manila",
    "mode": [
      "Video call",
      "In-person"
    ],
    "experienceYears": 10,
    "ibp": "IBP No. 205-6634",
    "languages": [
      "English",
      "Filipino"
    ],
    "rate": "\u20b13,800 / consultation",
    "rating": 4.7,
    "reviews": 58,
    "bio": "Andrea Nicole helps creators, brands, and small businesses register and protect trademarks, copyrights, and trade secrets before the IPOPHL.",
    "availability": {
      "days": [
        "Tue",
        "Wed",
        "Fri"
      ],
      "hours": "10:00 AM \u2013 6:00 PM"
    }
  },
  {
    "id": "atty-008",
    "name": "Atty. Emmanuel G. Torres",
    "initials": "ET",
    "title": "Senior Partner",
    "firm": "Torres Litigation & Civil Law Office",
    "specialties": [
      "Civil Litigation",
      "Contract Disputes",
      "Small Claims"
    ],
    "location": "Iloilo City, Iloilo",
    "mode": [
      "In-person",
      "Video call"
    ],
    "experienceYears": 19,
    "ibp": "IBP No. 098-2214",
    "languages": [
      "English",
      "Filipino",
      "Hiligaynon"
    ],
    "rate": "\u20b13,000 / consultation",
    "rating": 4.8,
    "reviews": 172,
    "bio": "Emmanuel has tried civil cases across the Visayas for nearly two decades, from small claims to complex contract disputes, and mentors newer litigators in his firm.",
    "availability": {
      "days": [
        "Mon",
        "Wed",
        "Thu",
        "Fri"
      ],
      "hours": "8:00 AM \u2013 4:00 PM"
    }
  }
];
