const fs = require('fs');
const path = require('path');

const API_URL = 'https://mosaicfellowship.in/api/data/npd/reviews';
const LIMIT = 100;
const OUTPUT_FILE = path.join(__dirname, 'data.js');

async function seedData() {
    let allReviews = [];
    let page = 1;
    let hasNext = true;

    console.log('Seeding reviews data from API...');

    while (hasNext) {
        const url = `${API_URL}?page=${page}&limit=${LIMIT}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            
            if (result.data && result.data.length > 0) {
                // Clean brand names
                const cleanedData = result.data.map(r => {
                    let cleanedBrand = r.competitor_brand;
                    if (cleanedBrand.toLowerCase() === 'mcaffeine') {
                        cleanedBrand = 'mCaffeine'; // Standardize to camelCase
                    }
                    return {
                        ...r,
                        competitor_brand: cleanedBrand
                    };
                });
                allReviews = allReviews.concat(cleanedData);
                console.log(`Fetched page ${page} (${cleanedData.length} reviews, total: ${allReviews.length})`);
            } else {
                console.log('No data returned.');
                break;
            }

            hasNext = result.pagination && result.pagination.has_next;
            page++;
        } catch (error) {
            console.error(`Error on page ${page}:`, error);
            break;
        }
    }

    console.log(`Data fetch completed. Total reviews: ${allReviews.length}`);
    
    // Write as ES6 export
    const content = `// Generated automatically from Mosaic NPD API
export const reviews = ${JSON.stringify(allReviews, null, 2)};
`;
    
    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`Successfully generated local database at ${OUTPUT_FILE}`);
}

seedData();
