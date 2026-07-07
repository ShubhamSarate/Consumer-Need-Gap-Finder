import { reviews } from './data.js';

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================
const state = {
    activeTab: 'overview',
    selectedCategory: 'Skin Care',
    selectedNeed: 'ingredient_transparency',
    selectedBlueprintId: 'supplements_protein_vegan',
    weights: {
        freq: 1.0,
        severity: 1.0,
        val: 1.0
    },
    vocFilters: {
        search: '',
        brand: '',
        rating: ''
    }
};

// ==========================================================================
// CONSTANTS & MAPPINGS
// ==========================================================================
const UNMET_NEEDS_INFO = {
    ingredient_transparency: {
        name: "Ingredient Transparency",
        desc: "Customers complain that full ingredient lists are missing, vague, or hidden behind marketing claims. They demand detailed ingredient sourcing and chemical disclosure.",
        rdConcept: "CleanLabel Pure Formulation",
        rdSolution: "A product with a 100% transparent ingredient panel, detailing the purpose and source of every chemical. Includes a QR code leading to third-party lab safety certificate reports."
    },
    vegan_certification: {
        name: "Vegan Certification",
        desc: "Shoppers raise doubts about vegan claims and demand official, verified certifications to trust that no animal-derived ingredients or testing were involved.",
        rdConcept: "V-Pure Certified Formula",
        rdSolution: "A line carrying dual certification (e.g., Vegan Society and Leaping Bunny cruelty-free). The formulation uses strictly bio-based plant materials with zero animal derivatives."
    },
    subscription_flexibility: {
        name: "Subscription Flexibility",
        desc: "Customers feel locked into rigid subscription plans. They want easy pausing, customization of shipment intervals, and seamless cancellation.",
        rdConcept: "FlexShip Eco-Refills",
        rdSolution: "A durable glass-container starter kit paired with letterbox-friendly refill pouches, coupled with an 'SMS-to-Pause' or one-click cancel recurring delivery ecosystem."
    },
    result_tracking: {
        name: "Result Tracking",
        desc: "Users complain about not knowing if a product is actually working over time. They want guidance on how to track progress and measure efficacy.",
        rdConcept: "ChronoSkin Active System",
        rdSolution: "A skincare system sold with a physical progress journal, a color-matching skin indicator strip, and access to a companion app to photograph and track changes weekly."
    },
    personalization_demand: {
        name: "Personalization Demand",
        desc: "Buyers are frustrated by generic products. They demand formulations tailored to their specific hair porosity, skin concerns, or personal dietary needs.",
        rdConcept: "CustomFit Adaptive Line",
        rdSolution: "An online-diagnostic-driven product where customers complete a quiz, and we custom-blend the active ingredients (e.g., adjusting retinol strength or hair oil viscosity) for their precise profile."
    },
    efficacy_timeline: {
        name: "Efficacy Timeline Guidance",
        desc: "Users express disappointment with slow results. They want clear, honest guidelines on when to expect visible changes and what factors influence speed.",
        rdConcept: "Clinical Timeline Series",
        rdSolution: "Packaging that prominently displays a 'Days-to-Efficacy' curve backed by clinical trial data (e.g., 'Hydration in 3 days, texture improvement in 14 days, fine lines in 28 days')."
    },
    allergen_labeling: {
        name: "Allergen Labeling",
        desc: "Shoppers with sensitive skin or food allergies complain that potential allergens, gluten, or common irritants are not clearly flagged on the labels.",
        rdConcept: "HypoSafe Sensitive Blend",
        rdSolution: "A certified hypoallergenic, dermatologist-tested formula free from the top 26 cosmetic allergens, with an explicit 'Allergen Profile' box on the outer packaging."
    },
    price_value_mismatch: {
        name: "Price-Value Mismatch",
        desc: "Customers feel that the quantity of the product is too small or the product is too diluted for the premium price charged by competitor brands.",
        rdConcept: "MaxConcentrate Eco-Pack",
        rdSolution: "A high-concentration formula (requiring half the typical dosage) sold in an oversized value pack with minimal secondary cardboard packaging to optimize cost-per-ml."
    },
    side_effect_concern: {
        name: "Side Effect Safety Concerns",
        desc: "Users report experiencing breakouts, hair fall, skin burning, or digestive discomfort and accuse brands of using harsh chemicals without warnings.",
        rdConcept: "PhytoShield Bio-Buffer Line",
        rdSolution: "Formulations that pair high-strength actives (like salicylic acid or vitamins) with soothing bio-buffers (like centella asiatica or chamomile) to minimize irritation risks."
    },
    skin_type_mismatch: {
        name: "Skin Type Mismatch",
        desc: "Customers with combination, highly oily, or sensitive skin types report that products labeled 'for all skin types' made their conditions worse.",
        rdConcept: "Dual-Action Climate Adaptor",
        rdSolution: "A sebum-regulating moisturizer designed specifically for combination skin that adjusts to high humidity, maintaining a matte T-zone while hydrating dry cheeks."
    },
    combination_guidance: {
        name: "Combination Guidance",
        desc: "Buyers are confused about how to layer products or combine different active ingredients (e.g. Vitamin C and Retinol) without causing skin reactions.",
        rdConcept: "DuoRoutine Layering Kit",
        rdSolution: "A day-and-night paired kit with numbered bottles (1 for morning, 2 for evening) and a visual routine schedule showing exactly when and how to apply each."
    },
    dosage_confusion: {
        name: "Dosage Confusion",
        desc: "Users of supplements and hair oils find instructions vague (e.g., 'apply a few drops' or 'take as needed') and worry about under- or over-dosing.",
        rdConcept: "PreDose Auto-Meter Pump",
        rdSolution: "Custom packaging featuring a dropper that auto-loads exactly 1ml when twisted open, or supplement jars containing pre-packaged, daily-dose blister sheets."
    },
    packaging_sustainability: {
        name: "Packaging Sustainability",
        desc: "Buyers express guilt and anger over excessive single-use plastic, multiple cardboard boxes, and pump dispensers that cannot be recycled.",
        rdConcept: "ZeroWaste Refill Vial",
        rdSolution: "Products shipped in aluminum tubes or infinitely recyclable glass jars, with refills sold in 100% compostable, plant-starch pouches."
    },
    fragrance_sensitivity: {
        name: "Fragrance Sensitivity",
        desc: "Users complain about strong, synthetic, or chemical smells that trigger headaches, nausea, or localized skin rashes.",
        rdConcept: "PureScent Odorless Base",
        rdSolution: "A line of 100% fragrance-free and essential-oil-free formulations, utilizing deodorized raw materials so that the product is completely neutral in smell."
    },
    travel_size_demand: {
        name: "Travel Size Demand",
        desc: "Shoppers want compact, leak-proof, TSA-friendly packaging for gym bags or flights, complaining that competitor containers are too bulky or spill easily.",
        rdConcept: "TSA-Ready Concentrate Kit",
        rdSolution: "Solid-state bars (e.g., solid shampoo, solid serum stick) or 30ml double-sealed travel concentrates sold in a reusable silicone pouch."
    }
};

// Hardcoded Blueprint Ideas based on the actual top opportunities in the data
const BLUEPRINT_IDEAS = [
    {
        id: "supplements_protein_vegan",
        title: "CleanLabel Plant Protein",
        category: "Supplements",
        unmetNeed: "vegan_certification",
        competitor: "Oziva",
        conceptName: "V-Pure Certified Plant Protein",
        painPoint: "Consumers complain about questionable vegan claims, chalky textures, and a lack of clear allergen labeling on Oziva's Plant Protein Shakes.",
        objective: "Develop a premium, dual-certified vegan plant protein powder that prioritizes ingredient transparency, allergen disclosure, and a smooth, non-gritty texture.",
        specs: [
            "Dual-certified: Certified Vegan by Vegan Society & Gluten-Free Certified.",
            "Complete transparency: QR code on tub linked directly to batch-specific heavy metal and purity lab analyses.",
            "Formula: Fermented pea and organic brown rice protein blend, buffered with coconut milk powder for natural creaminess without synthetic thickeners.",
            "Allergen control: Produced in a dedicated nut-free, soy-free facility with full allergen statements on front of pack."
        ],
        timeline: [
            "Months 1-2: Formula blending, taste testing, and texture smoothing trials.",
            "Months 3-4: Dermatological/safety studies, shelf-stability testing, and vegan certification submission.",
            "Month 5: Final packaging run (using post-consumer recycled HDPE tubs).",
            "Month 6: Direct-to-Consumer launch with transparent R&D story."
        ]
    },
    {
        id: "skincare_collagen_sub",
        title: "FlexShip Marine Collagen",
        category: "Skin Care",
        unmetNeed: "subscription_flexibility",
        competitor: "Minimalist",
        conceptName: "FlexShip Marine Collagen Peptides",
        painPoint: "Minimalist's Collagen Powder reviews highlight user frustration over rigid subscriptions, difficulties pausing deliveries, and packaging waste.",
        objective: "Launch a high-absorption collagen supplement utilizing a flexible, zero-friction subscription system and eco-friendly refill pouches.",
        specs: [
            "Flexible Subscription Portal: One-click pause, dynamic shipment intervals (30, 45, 60 days), and SMS-based delivery reminders with instant cancellation option.",
            "Sustainable Packing: First purchase includes a premium, airtight amber glass jar. Subsequent deliveries arrive in 100% compostable refill pouches.",
            "Formula: Hydrolyzed Marine Collagen Peptides (5000mg) with Vitamin C for absorption, completely unflavored.",
            "Dosage: Pre-measured biodegradable wooden scoop included in the starter kit."
        ],
        timeline: [
            "Months 1-2: Sourcing sustainable marine collagen, stability tests in paper pouches.",
            "Month 3: API integration of custom Shopify/Recharge customer subscription portal.",
            "Month 4: Pilot batch run and subscription flow user testing.",
            "Month 5: Beta launch to 500 waitlisted subscribers."
        ]
    },
    {
        id: "haircare_probiotics_transparency",
        title: "CleanLabel Probiotic Hair Drops",
        category: "Hair Care",
        unmetNeed: "ingredient_transparency",
        competitor: "WOW Skin Science",
        conceptName: "PureDose Scalp Probiotic Serum",
        painPoint: "WOW Skin Science's Hair Growth and Probiotics Capsules reviews show severe anxiety regarding chemical ingredients and safety warnings.",
        objective: "Introduce a clean-label scalp probiotic serum focused on ingredient origin disclosures and auto-dosing packaging.",
        specs: [
            "Clean Label Commitment: A literal 100% list of raw ingredient origins printed directly on the front of the box.",
            "Auto-Meter Dropper: A custom bottle cap that automatically draws precisely 1ml of serum when twisted open, preventing overdose.",
            "Formula: Lactobacillus ferment filtrate, rosemary extract, and hyaluronic acid in a lightweight, non-greasy water base.",
            "Clinical Validation: Dermatologist-tested, hypoallergenic, and certified free of parabens, silicones, and synthetic fragrance."
        ],
        timeline: [
            "Months 1-3: Microbiome safety testing, formula stability, and packaging compatibility tests.",
            "Month 4: Dermatologist panel validation and hypoallergenic certification.",
            "Month 5: Outer box design finalized, printing full ingredient stories.",
            "Month 6: Launch on Brand Website with interactive ingredient education pages."
        ]
    },
    {
        id: "grooming_vitc_guidance",
        title: "DuoRoutine Vitamin C Serum",
        category: "Men's Grooming",
        unmetNeed: "combination_guidance",
        competitor: "Beardo",
        conceptName: "DuoRoutine Day & Night Vitamin C Kit",
        painPoint: "Men's grooming reviews for serums show high confusion about how to apply products, what steps to follow, and reactions when mixed incorrectly.",
        objective: "Formulate a tailored men's skin serum kit with simplified instructions and a clear day/night usage guide.",
        specs: [
            "Dual-Serum Kit: Contains Bottle 1 (Day: Vitamin C + SPF Booster) and Bottle 2 (Night: Gentle Retinol + Niacinamide Buffer).",
            "Visual Guidelines: Front labels indicate '1 - MORNING' and '2 - EVENING' with large numeric icons.",
            "Instructional Design: High-contrast infographic card inside the box detailing a 3-step routine (Cleanse, Treat, Moisturize).",
            "Formula: Formulated with soothing Centella to buffer active ingredients, minimizing potential skin reactions."
        ],
        timeline: [
            "Months 1-2: Co-formulating the day and night synergy blends to avoid compatibility conflicts.",
            "Month 3: UI design of the routine onboarding quiz and box insert infographics.",
            "Months 4-5: Clinical safety screening on oily/sensitive male skin profiles.",
            "Month 6: Launch with video-guided skincare tutorials."
        ]
    },
    {
        id: "bodycare_lotion_allergen",
        title: "HypoSafe SPF Body Lotion",
        category: "Body Care",
        unmetNeed: "allergen_labeling",
        competitor: "Mamaearth",
        conceptName: "HypoSafe Daily SPF30 Lotion",
        painPoint: "Mamaearth's body lotions receive negative feedback from users with reactive skin complaining about chemical filters, synthetic fragrances, and hidden allergens.",
        objective: "Formulate an everyday body lotion with SPF 30 that is officially certified hypoallergenic and free of synthetic fragrance.",
        specs: [
            "Certified Allergen-Free: Labeled free of the EU-standard 26 cosmetic allergens, gluten-free, and nut-free.",
            "Physical Sunscreen: Uses non-nano zinc oxide as the sole UV filter, suspended in a lightweight moisturizer base.",
            "Scent: Completely fragrance-free (no maskers, no essential oils).",
            "Testing: Patch tested on 100 subjects with self-assessed sensitive skin under dermatological control."
        ],
        timeline: [
            "Months 1-3: Formulation trials to eliminate white cast while maintaining zinc suspension stability.",
            "Month 4: SPF laboratory testing (SPF 30 and PA+++ verification) and hypoallergenic patch trials.",
            "Month 5: FDA label filing and final eco-friendly tube packaging production.",
            "Month 6: Launch on Nykaa and Brand Website."
        ]
    }
];

// ==========================================================================
// DATA COMPUTATION & ANALYSIS LOGIC
// ==========================================================================

/**
 * Parses the raw detected_unmet_needs field.
 * Handles both stringified arrays and native arrays.
 */
function parseNeeds(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    try {
        return JSON.parse(raw);
    } catch (e) {
        // Fallback for custom string splits if any
        return [];
    }
}

/**
 * Calculates metrics and ranks unmet needs based on slider weights.
 */
function getRankedNeeds() {
    const unmetNeedsStats = {};

    reviews.forEach(r => {
        const needs = parseNeeds(r.detected_unmet_needs);
        needs.forEach(need => {
            if (!UNMET_NEEDS_INFO[need]) return; // Skip unknown needs
            
            if (!unmetNeedsStats[need]) {
                unmetNeedsStats[need] = {
                    need: need,
                    count: 0,
                    ratings: [],
                    helpfulVotes: [],
                    brands: {},
                    categories: {}
                };
            }

            unmetNeedsStats[need].count++;
            unmetNeedsStats[need].ratings.push(r.rating);
            unmetNeedsStats[need].helpfulVotes.push(r.helpful_votes);
            
            unmetNeedsStats[need].brands[r.competitor_brand] = (unmetNeedsStats[need].brands[r.competitor_brand] || 0) + 1;
            unmetNeedsStats[need].categories[r.competitor_category] = (unmetNeedsStats[need].categories[r.competitor_category] || 0) + 1;
        });
    });

    const wFreq = state.weights.freq;
    const wSev = state.weights.severity;
    const wVal = state.weights.val;

    // Map stats to array with opportunity scores
    const ranked = Object.keys(unmetNeedsStats).map(need => {
        const stats = unmetNeedsStats[need];
        const count = stats.count;
        const avgRating = stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length;
        const avgHelpful = stats.helpfulVotes.reduce((a, b) => a + b, 0) / stats.helpfulVotes.length;
        const totalHelpful = stats.helpfulVotes.reduce((a, b) => a + b, 0);

        // Frustration is 6 - average rating (so lower rating = higher frustration, max 5)
        const frustration = 6 - avgRating;

        // Opportunity Score formula utilizing exponential weight parameters
        // Math.pow ensures that if a weight is 0, factor^0 = 1 (ignoring it), while weight=1 is linear, and >1 is amplified
        const score = Math.pow(count, wFreq) * Math.pow(frustration, wSev) * Math.pow(1 + avgHelpful, wVal);

        return {
            need: need,
            name: UNMET_NEEDS_INFO[need].name,
            desc: UNMET_NEEDS_INFO[need].desc,
            count: count,
            avgRating: parseFloat(avgRating.toFixed(2)),
            avgHelpful: parseFloat(avgHelpful.toFixed(1)),
            totalHelpful: totalHelpful,
            frustration: parseFloat(frustration.toFixed(2)),
            rawScore: score,
            brands: stats.brands,
            categories: stats.categories
        };
    });

    // Find max score to normalize opportunity index (0-100 scale)
    const maxRawScore = Math.max(...ranked.map(r => r.rawScore), 1);
    
    ranked.forEach(r => {
        r.opportunityIndex = Math.round((r.rawScore / maxRawScore) * 100);
    });

    // Sort descending by raw opportunity score
    return ranked.sort((a, b) => b.rawScore - a.rawScore);
}

/**
 * Aggregates statistics for the active Category deep-dive tab.
 */
function getCategoryMetrics(categoryName) {
    const categoryReviews = reviews.filter(r => r.competitor_category === categoryName);
    
    let totalReviews = categoryReviews.length;
    let avgRating = 0;
    let reviewsWithNeedsCount = 0;
    const needsStats = {};
    const productStats = {};

    categoryReviews.forEach(r => {
        avgRating += r.rating;
        const needs = parseNeeds(r.detected_unmet_needs);
        
        if (needs.length > 0) {
            reviewsWithNeedsCount++;
            needs.forEach(need => {
                if (UNMET_NEEDS_INFO[need]) {
                    if (!needsStats[need]) {
                        needsStats[need] = { count: 0, ratings: [], helpfulVotes: [] };
                    }
                    needsStats[need].count++;
                    needsStats[need].ratings.push(r.rating);
                    needsStats[need].helpfulVotes.push(r.helpful_votes);
                }
            });
        }

        // Product level aggregation
        const prod = r.product_reviewed;
        if (!productStats[prod]) {
            productStats[prod] = {
                product: prod,
                reviewsCount: 0,
                ratings: [],
                helpfulVotes: [],
                needsCount: {}
            };
        }
        productStats[prod].reviewsCount++;
        productStats[prod].ratings.push(r.rating);
        productStats[prod].helpfulVotes.push(r.helpful_votes);
        needs.forEach(need => {
            if (UNMET_NEEDS_INFO[need]) {
                productStats[prod].needsCount[need] = (productStats[prod].needsCount[need] || 0) + 1;
            }
        });
    });

    avgRating = totalReviews > 0 ? (avgRating / totalReviews) : 0;
    const unmetRatio = totalReviews > 0 ? Math.round((reviewsWithNeedsCount / totalReviews) * 100) : 0;

    const wFreq = state.weights.freq;
    const wSev = state.weights.severity;
    const wVal = state.weights.val;

    // Sorted category-specific unmet needs using weights
    const sortedNeeds = Object.keys(needsStats).map(need => {
        const stats = needsStats[need];
        const count = stats.count;
        const avgNeedRating = stats.ratings.reduce((a,b)=>a+b, 0) / stats.ratings.length;
        const avgNeedHelpful = stats.helpfulVotes.reduce((a,b)=>a+b, 0) / stats.helpfulVotes.length;
        
        // Frustration factor
        const frustration = 6 - avgNeedRating;
        const rawScore = Math.pow(count, wFreq) * Math.pow(frustration, wSev) * Math.pow(1 + avgNeedHelpful, wVal);

        return {
            need: need,
            name: UNMET_NEEDS_INFO[need].name,
            count: count,
            rawScore: rawScore
        };
    }).sort((a, b) => b.rawScore - a.rawScore);

    // Calculate raw vulnerability scores
    const productsRaw = Object.keys(productStats).map(prodName => {
        const stats = productStats[prodName];
        const prodAvgRating = stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length;
        const avgProductHelpful = stats.helpfulVotes.reduce((a, b) => a + b, 0) / stats.helpfulVotes.length;
        
        // Find top complaint
        let primaryNeed = 'None';
        let primaryCount = 0;
        Object.keys(stats.needsCount).forEach(need => {
            if (stats.needsCount[need] > primaryCount) {
                primaryNeed = need;
                primaryCount = stats.needsCount[need];
            }
        });

        // Frustration factor (using 5.5 as limit for products)
        const frustration = Math.max(0.1, 5.5 - prodAvgRating);
        const rawVulnScore = Math.pow(stats.reviewsCount, wFreq) * Math.pow(frustration, wSev) * Math.pow(1 + avgProductHelpful, wVal);

        return {
            product: prodName,
            reviewsCount: stats.reviewsCount,
            avgRating: parseFloat(prodAvgRating.toFixed(2)),
            primaryNeed: primaryNeed,
            rawVulnScore: rawVulnScore
        };
    });

    // Normalize vulnerability scores to 0-100 scale
    const maxRawVuln = Math.max(...productsRaw.map(p => p.rawVulnScore), 1);
    const productBenchmarks = productsRaw.map(p => {
        const vulnerabilityScore = Math.round((p.rawVulnScore / maxRawVuln) * 100);
        return {
            product: p.product,
            reviewsCount: p.reviewsCount,
            avgRating: p.avgRating,
            primaryNeed: p.primaryNeed,
            vulnerabilityScore: vulnerabilityScore
        };
    }).sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

    return {
        totalReviews,
        avgRating: parseFloat(avgRating.toFixed(2)),
        unmetRatio,
        topNeeds: sortedNeeds,
        products: productBenchmarks
    };
}

// ==========================================================================
// RENDER & UI DYNAMICS
// ==========================================================================

/**
 * Setup navigation tab toggles
 */
function initTabs() {
    const tabOverviewBtn = document.getElementById('tab-overview');
    const tabCategoryBtn = document.getElementById('tab-category');
    const tabBlueprintBtn = document.getElementById('tab-blueprint');

    const panelOverview = document.getElementById('panel-overview');
    const panelCategory = document.getElementById('panel-category');
    const panelBlueprint = document.getElementById('panel-blueprint');

    function switchTab(targetTab) {
        state.activeTab = targetTab;
        
        // Toggle wide-layout class on app container for more spacious view in category deep-dive
        const container = document.querySelector('.app-container');
        if (container) {
            if (targetTab === 'category') {
                container.classList.add('wide-layout');
            } else {
                container.classList.remove('wide-layout');
            }
        }
        
        // Update buttons styling
        [tabOverviewBtn, tabCategoryBtn, tabBlueprintBtn].forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Hide all panels
        [panelOverview, panelCategory, panelBlueprint].forEach(panel => {
            panel.style.display = 'none';
        });

        if (targetTab === 'overview') {
            tabOverviewBtn.classList.add('active');
            tabOverviewBtn.setAttribute('aria-selected', 'true');
            panelOverview.style.display = 'block';
            renderOverview();
        } else if (targetTab === 'category') {
            tabCategoryBtn.classList.add('active');
            tabCategoryBtn.setAttribute('aria-selected', 'true');
            panelCategory.style.display = 'block';
            renderCategoryDeepDive();
        } else if (targetTab === 'blueprint') {
            tabBlueprintBtn.classList.add('active');
            tabBlueprintBtn.setAttribute('aria-selected', 'true');
            panelBlueprint.style.display = 'block';
            renderRDBlueprint();
        }
    }

    tabOverviewBtn.addEventListener('click', () => switchTab('overview'));
    tabCategoryBtn.addEventListener('click', () => switchTab('category'));
    tabBlueprintBtn.addEventListener('click', () => switchTab('blueprint'));
}

/**
 * Setup weights sliders tuning and reset
 */
function initSliders() {
    const slideFreq = document.getElementById('weight-freq');
    const slideSev = document.getElementById('weight-severity');
    const slideVal = document.getElementById('weight-val');

    const lblFreq = document.getElementById('val-weight-freq');
    const lblSev = document.getElementById('val-weight-severity');
    const lblVal = document.getElementById('val-weight-val');

    const resetBtn = document.getElementById('reset-weights-btn');

    function updateWeights() {
        state.weights.freq = parseFloat(slideFreq.value);
        state.weights.severity = parseFloat(slideSev.value);
        state.weights.val = parseFloat(slideVal.value);

        lblFreq.innerText = state.weights.freq.toFixed(1);
        lblSev.innerText = state.weights.severity.toFixed(1);
        lblVal.innerText = state.weights.val.toFixed(1);

        // Re-render active tab content
        if (state.activeTab === 'overview') {
            renderOverview();
        } else if (state.activeTab === 'category') {
            renderCategoryDeepDive();
        } else if (state.activeTab === 'blueprint') {
            renderRDBlueprint();
        }
    }

    [slideFreq, slideSev, slideVal].forEach(slider => {
        slider.addEventListener('input', updateWeights);
    });

    resetBtn.addEventListener('click', () => {
        slideFreq.value = 1.0;
        slideSev.value = 1.0;
        slideVal.value = 1.0;
        updateWeights();
    });
}

/**
 * Setup Voice of Customer Filters
 */
function initVoCFilters() {
    const searchInput = document.getElementById('voc-search');
    const selectBrand = document.getElementById('filter-brand');
    const selectRating = document.getElementById('filter-rating');

    // Populate Brand select once
    const brands = Array.from(new Set(reviews.map(r => r.competitor_brand))).sort();
    brands.forEach(brand => {
        const opt = document.createElement('option');
        opt.value = brand;
        opt.innerText = brand;
        selectBrand.appendChild(opt);
    });

    function applyFilters() {
        state.vocFilters.search = searchInput.value.toLowerCase().trim();
        state.vocFilters.brand = selectBrand.value;
        state.vocFilters.rating = selectRating.value;
        renderVoCReviews();
    }

    searchInput.addEventListener('input', applyFilters);
    selectBrand.addEventListener('change', applyFilters);
    selectRating.addEventListener('change', applyFilters);
}

// ==========================================================================
// VIEW RENDERING: TAB 1 (OVERVIEW)
// ==========================================================================

function renderOverview() {
    const rankedNeeds = getRankedNeeds();
    const needsListContainer = document.getElementById('unmet-needs-list');
    
    // Clear list
    needsListContainer.innerHTML = '';

    if (rankedNeeds.length === 0) {
        needsListContainer.innerHTML = `<div class="no-selection-state">No unmet needs found</div>`;
        return;
    }

    // Render need gap cards
    rankedNeeds.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `need-card ${state.selectedNeed === item.need ? 'active' : ''}`;
        card.setAttribute('data-need', item.need);
        
        card.innerHTML = `
            <div class="need-header">
                <span class="need-rank-tag">RANK ${idx + 1}</span>
                <span class="need-score-value">Index: ${item.opportunityIndex}</span>
            </div>
            <div class="need-name" title="${item.name}">${item.name}</div>
            <div class="need-meta">
                <div class="need-meta-stat">Reviews: <span>${item.count}</span></div>
                <div class="need-meta-stat">Avg Rating: <span>${item.avgRating}★</span></div>
            </div>
        `;

        card.addEventListener('click', () => {
            state.selectedNeed = item.need;
            // Clear VoC search filter when switching needs
            document.getElementById('voc-search').value = '';
            state.vocFilters.search = '';
            
            // Re-render
            renderOverview();
        });

        needsListContainer.appendChild(card);
    });

    // Render Selected Need Detail & Charts
    renderNeedDetails(rankedNeeds.find(r => r.need === state.selectedNeed));
}

function renderNeedDetails(needObj) {
    const detailPanel = document.getElementById('detail-card-panel');
    
    if (!needObj) {
        detailPanel.innerHTML = `
            <div class="no-selection-state">
                <h3>Select an unmet need to load analysis</h3>
                <p>Click on any cards in the left column to inspect brand exposure, category mapping, and reviews.</p>
            </div>
        `;
        return;
    }

    // Detail Summary Section
    detailPanel.innerHTML = `
        <div class="detail-card-layout">
            <div class="detail-main">
                <div class="detail-header-row">
                    <h2 class="detail-title">${needObj.name}</h2>
                    <span class="opp-badge">Opportunity Index: ${needObj.opportunityIndex}/100</span>
                </div>
                <p class="detail-description">${needObj.desc}</p>
                <div class="detail-stats-grid">
                    <div class="detail-stat-box">
                        <span class="num">${needObj.count}</span>
                        <span class="label">Total Complaints</span>
                    </div>
                    <div class="detail-stat-box">
                        <span class="num" style="color: var(--status-warning)">${needObj.avgRating}★</span>
                        <span class="label">Average Rating</span>
                    </div>
                    <div class="detail-stat-box">
                        <span class="num">${needObj.totalHelpful}</span>
                        <span class="label">Helpful Votes</span>
                    </div>
                </div>
            </div>
            <div class="rd-quick-proposal">
                <div class="proposal-headline">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    R&D Concept
                </div>
                <div class="proposal-pitch">
                    <strong>${UNMET_NEEDS_INFO[needObj.need].rdConcept}</strong>:
                    ${UNMET_NEEDS_INFO[needObj.need].rdSolution.substring(0, 115)}...
                </div>
                <button class="btn-primary" id="btn-view-blueprint-proposal">
                    Go to R&D Blueprint
                </button>
            </div>
        </div>
    `;

    // Hook quick proposal button to Tab switch
    document.getElementById('btn-view-blueprint-proposal').addEventListener('click', () => {
        // Find corresponding blueprint id
        const matchedBp = BLUEPRINT_IDEAS.find(bp => bp.unmetNeed === needObj.need);
        if (matchedBp) {
            state.selectedBlueprintId = matchedBp.id;
        }
        document.getElementById('tab-blueprint').click();
    });

    // Render Charts
    renderBrandImpactChart(needObj.brands);
    renderCategoryDistributionChart(needObj.categories);

    // Render VoC Reviews
    renderVoCReviews();
}

function renderBrandImpactChart(brandData) {
    const chartBox = document.getElementById('brand-exposure-chart');
    chartBox.innerHTML = '';

    const sortedBrands = Object.keys(brandData).map(brand => ({
        name: brand,
        count: brandData[brand]
    })).sort((a, b) => b.count - a.count).slice(0, 5); // top 5 brands

    if (sortedBrands.length === 0) {
        chartBox.innerHTML = '<div class="no-selection-state">No brand exposure data</div>';
        return;
    }

    const maxCount = Math.max(...sortedBrands.map(s => s.count), 1);

    const listContainer = document.createElement('div');
    listContainer.className = 'custom-bar-list';

    sortedBrands.forEach(item => {
        const pct = Math.round((item.count / maxCount) * 100);
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <div class="bar-label" title="${item.name}">${item.name}</div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${pct}%"></div>
            </div>
            <div class="bar-value">${item.count}</div>
        `;
        listContainer.appendChild(row);
    });

    chartBox.appendChild(listContainer);
}

function renderCategoryDistributionChart(catData) {
    const chartBox = document.getElementById('category-distribution-chart');
    chartBox.innerHTML = '';

    const sortedCats = Object.keys(catData).map(cat => ({
        name: cat,
        count: catData[cat]
    })).sort((a, b) => b.count - a.count).slice(0, 5); // top 5 categories

    if (sortedCats.length === 0) {
        chartBox.innerHTML = '<div class="no-selection-state">No category data</div>';
        return;
    }

    const maxCount = Math.max(...sortedCats.map(s => s.count), 1);

    const listContainer = document.createElement('div');
    listContainer.className = 'custom-bar-list';

    sortedCats.forEach(item => {
        const pct = Math.round((item.count / maxCount) * 100);
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <div class="bar-label" title="${item.name}">${item.name}</div>
            <div class="bar-track">
                <div class="bar-fill accent" style="width: ${pct}%"></div>
            </div>
            <div class="bar-value">${item.count}</div>
        `;
        listContainer.appendChild(row);
    });

    chartBox.appendChild(listContainer);
}

function renderVoCReviews() {
    const listContainer = document.getElementById('voc-reviews-list');
    listContainer.innerHTML = '';

    if (!state.selectedNeed) {
        listContainer.innerHTML = '<div class="no-selection-state">No unmet need selected</div>';
        return;
    }

    // Filter reviews
    let filteredReviews = reviews.filter(r => {
        const needs = parseNeeds(r.detected_unmet_needs);
        return needs.includes(state.selectedNeed);
    });

    // Apply Brand filter
    if (state.vocFilters.brand) {
        filteredReviews = filteredReviews.filter(r => r.competitor_brand === state.vocFilters.brand);
    }

    // Apply Rating filter
    if (state.vocFilters.rating) {
        filteredReviews = filteredReviews.filter(r => r.rating === parseInt(state.vocFilters.rating));
    }

    // Apply Search keyword filter
    if (state.vocFilters.search) {
        filteredReviews = filteredReviews.filter(r => r.review_text.toLowerCase().includes(state.vocFilters.search));
    }

    if (filteredReviews.length === 0) {
        listContainer.innerHTML = '<div class="no-selection-state">No customer reviews match your filters</div>';
        return;
    }

    // Sort by helpful votes descending to show most validated complaints first
    filteredReviews.sort((a, b) => b.helpful_votes - a.helpful_votes);

    filteredReviews.forEach(r => {
        const item = document.createElement('div');
        item.className = 'review-item';

        // Star builder
        let starsStr = '';
        for (let i = 1; i <= 5; i++) {
            starsStr += i <= r.rating ? '★' : '☆';
        }

        // Parse list of needs for tags list
        const needsList = parseNeeds(r.detected_unmet_needs);
        const tagsHTML = needsList.map(n => {
            if (UNMET_NEEDS_INFO[n]) {
                return `<span class="tag-badge">${UNMET_NEEDS_INFO[n].name}</span>`;
            }
            return '';
        }).join('');

        // Highlight matching search term or current selected need name/description keyword
        let text = r.review_text;
        
        // Highlight keyword
        const currentNeedKeyword = state.selectedNeed.replace('_', ' ');
        // We will highlight any occurrences of the current need name or search term in yellow
        const searchTermsToHighlight = [];
        if (state.vocFilters.search) {
            searchTermsToHighlight.push(state.vocFilters.search);
        } else {
            // Push individual words of need tag to highlight
            currentNeedKeyword.split(' ').forEach(w => {
                if (w.length > 3) searchTermsToHighlight.push(w);
            });
        }

        searchTermsToHighlight.forEach(term => {
            try {
                const regex = new RegExp(`(${term})`, 'gi');
                text = text.replace(regex, '<mark>$1</mark>');
            } catch (e) {
                // Ignore regex errors for special characters
            }
        });

        item.innerHTML = `
            <div class="review-item-header">
                <div class="review-brand-product">
                    ${r.competitor_brand} <span class="review-product">(${r.product_reviewed})</span>
                </div>
                <div class="review-rating-date">
                    <span class="review-stars">${starsStr}</span>
                    <span class="review-date">${r.review_date}</span>
                </div>
            </div>
            <div class="review-text">${text}</div>
            <div class="review-footer">
                <div class="review-helpful">
                    <svg class="review-helpful-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    <span>${r.helpful_votes} helpful votes</span>
                </div>
                <div class="review-tag-badges">${tagsHTML}</div>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// ==========================================================================
// VIEW RENDERING: TAB 2 (CATEGORY DEEP DIVE)
// ==========================================================================

function renderCategoryDeepDive() {
    const categoriesList = Array.from(new Set(reviews.map(r => r.competitor_category))).sort();
    const selectorContainer = document.getElementById('category-selector-tabs');
    
    // Clear selector
    selectorContainer.innerHTML = '';

    categoriesList.forEach(catName => {
        const btn = document.createElement('button');
        btn.className = `category-tab-btn ${state.selectedCategory === catName ? 'active' : ''}`;
        btn.innerText = catName;
        btn.addEventListener('click', () => {
            state.selectedCategory = catName;
            renderCategoryDeepDive();
        });
        selectorContainer.appendChild(btn);
    });

    const metrics = getCategoryMetrics(state.selectedCategory);

    // Update Overall Stats
    document.getElementById('current-category-name').innerText = state.selectedCategory;
    document.getElementById('category-overall-rating').innerText = `Avg Rating: ${metrics.avgRating}★`;
    document.getElementById('cat-review-count').innerText = metrics.totalReviews.toLocaleString();
    document.getElementById('cat-unmet-ratio').innerText = `${metrics.unmetRatio}%`;

    // Render Needs List
    const needsListContainer = document.getElementById('category-needs-list');
    needsListContainer.innerHTML = '';

    if (metrics.topNeeds.length === 0) {
        needsListContainer.innerHTML = '<div class="no-selection-state">No unmet needs recorded in this category</div>';
    } else {
        metrics.topNeeds.slice(0, 5).forEach(item => {
            const row = document.createElement('div');
            row.className = 'category-need-item';
            row.innerHTML = `
                <span class="category-need-name">${item.name}</span>
                <span class="category-need-count">${item.count} complaints</span>
            `;
            needsListContainer.appendChild(row);
        });
    }

    // Render Product Benchmark Table
    const tableBody = document.getElementById('category-products-table-body');
    tableBody.innerHTML = '';

    if (metrics.products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-selection-state">No products tracked in this category</td></tr>';
        return;
    }

    metrics.products.forEach(p => {
        const tr = document.createElement('tr');
        
        let vulnClass = 'vuln-low';
        if (p.vulnerabilityScore > 80) vulnClass = 'vuln-high';
        else if (p.vulnerabilityScore > 35) vulnClass = 'vuln-med';

        const needLabel = UNMET_NEEDS_INFO[p.primaryNeed] ? UNMET_NEEDS_INFO[p.primaryNeed].name : p.primaryNeed;

        tr.innerHTML = `
            <td class="benchmark-product-cell">${p.product}</td>
            <td>${p.reviewsCount}</td>
            <td class="benchmark-rating-cell">${p.avgRating}★</td>
            <td><span class="benchmark-need-tag">${needLabel}</span></td>
            <td class="benchmark-vulnerability-cell ${vulnClass}">${p.vulnerabilityScore}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// ==========================================================================
// VIEW RENDERING: TAB 3 (R&D BLUEPRINT)
// ==========================================================================

function renderRDBlueprint() {
    const ideasListContainer = document.getElementById('opportunity-ideas-list');
    ideasListContainer.innerHTML = '';

    // We rank blueprint ideas based on active opportunity scores of their associated unmet needs
    const rankedNeeds = getRankedNeeds();
    
    // Sort blueprints based on active needs opportunity scores
    const sortedBlueprints = [...BLUEPRINT_IDEAS].sort((a, b) => {
        const scoreA = rankedNeeds.find(rn => rn.need === a.unmetNeed)?.rawScore || 0;
        const scoreB = rankedNeeds.find(rn => rn.need === b.unmetNeed)?.rawScore || 0;
        return scoreB - scoreA;
    });

    sortedBlueprints.forEach(bp => {
        const needDetails = rankedNeeds.find(rn => rn.need === bp.unmetNeed);
        const index = needDetails ? needDetails.opportunityIndex : 50;

        const card = document.createElement('div');
        card.className = `opportunity-idea-card ${state.selectedBlueprintId === bp.id ? 'active' : ''}`;
        card.innerHTML = `
            <div class="idea-header">
                <span class="idea-cat">${bp.category}</span>
                <span class="idea-score">Index: ${index}</span>
            </div>
            <div class="idea-title">${bp.title}</div>
            <div class="idea-weakness">Targeting ${bp.competitor}'s weaknesses in <em>${UNMET_NEEDS_INFO[bp.unmetNeed].name}</em>.</div>
        `;

        card.addEventListener('click', () => {
            state.selectedBlueprintId = bp.id;
            renderRDBlueprint();
        });

        ideasListContainer.appendChild(card);
    });

    renderProposalBrief(sortedBlueprints.find(bp => bp.id === state.selectedBlueprintId));
}

function renderProposalBrief(blueprintObj) {
    const proposalPanel = document.getElementById('rd-proposal-panel');
    
    if (!blueprintObj) {
        proposalPanel.innerHTML = `
            <div class="proposal-loading">
                <h3>Select an opportunity blueprint to generate R&D proposal</h3>
            </div>
        `;
        return;
    }

    const rankedNeeds = getRankedNeeds();
    const needDetails = rankedNeeds.find(rn => rn.need === blueprintObj.unmetNeed);
    const index = needDetails ? needDetails.opportunityIndex : 50;
    const totalComplaints = needDetails ? needDetails.count : 0;
    const avgRating = needDetails ? needDetails.avgRating : 2.0;

    // Spec list builder
    const specsHTML = blueprintObj.specs.map(spec => `<li>${spec}</li>`).join('');
    // Timeline list builder
    const timelineHTML = blueprintObj.timeline.map(step => `<li>${step}</li>`).join('');

    proposalPanel.innerHTML = `
        <div class="proposal-header">
            <div class="proposal-title-area">
                <span class="proposal-category-pill">${blueprintObj.category} Opportunity</span>
                <h2>R&D Brief: ${blueprintObj.conceptName}</h2>
                <p class="panel-desc">Launch Strategy focusing on D2C Competitor Need-Gaps</p>
            </div>
            <span class="proposal-opp-badge">Opportunity Index: ${index}/100</span>
        </div>
        
        <div class="proposal-grid">
            <div class="proposal-main-content">
                <div class="proposal-section">
                    <h4>Executive Summary & Objective</h4>
                    <p>${blueprintObj.objective}</p>
                </div>

                <div class="proposal-section">
                    <h4>Competitor Pain Point Analysis</h4>
                    <p><strong>Primary Competitor:</strong> ${blueprintObj.competitor}</p>
                    <p>${blueprintObj.painPoint}</p>
                </div>

                <div class="proposal-section">
                    <h4>R&D Formulation Specifications</h4>
                    <ul class="bullet-list">
                        ${specsHTML}
                    </ul>
                </div>

                <div class="proposal-section">
                    <h4>Product Launch & R&D Timeline</h4>
                    <ul class="bullet-list">
                        ${timelineHTML}
                    </ul>
                </div>
            </div>

            <div class="proposal-sidebar-content">
                <div class="market-justification-card">
                    <h4>Market Validation Metrics</h4>
                    <div class="market-justification-list">
                        <div class="justification-item">
                            <span class="justification-label">Market Target Need:</span>
                            <span class="justification-val" style="text-transform:capitalize">${blueprintObj.unmetNeed.replace(/_/g, ' ')}</span>
                        </div>
                        <div class="justification-item">
                            <span class="justification-label">Competitor Complaints count:</span>
                            <span class="justification-val">${totalComplaints}</span>
                        </div>
                        <div class="justification-item">
                            <span class="justification-label">Average Competitor Rating:</span>
                            <span class="justification-val">${avgRating}★</span>
                        </div>
                        <div class="justification-item">
                            <span class="justification-label">Market Validation Size:</span>
                            <span class="justification-val vuln-high font-bold">CRITICAL NEED</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn-primary" style="width: 100%; justify-content: center; margin-top: 12px;" onclick="window.print()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    Print / Save R&D Brief PDF
                </button>
            </div>
        </div>
    `;
}

// Ensure function is exposed inside tab listener
window.renderRDBlueprint = renderRDBlueprint;

// ==========================================================================
// INITIALIZATION ON DOCUMENT LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSliders();
    initVoCFilters();
    
    // Initial renders
    renderOverview();
});
