const submitBtn = document.getElementById('submitBtn');
const suggestionText = document.getElementById('suggestionText');

// Wardrobe door opening animation
const wardrobeDoor = document.getElementById('wardrobeDoor');
wardrobeDoor.addEventListener('click', () => {
    wardrobeDoor.classList.toggle('open');
    if (wardrobeDoor.classList.contains('open')) {
        setTimeout(() => {
            document.querySelector('.wardrobe-content').style.display = 'block';
        }, 600); // Wait for the door opening animation to finish
    } else {
        document.querySelector('.wardrobe-content').style.display = 'none';
    }
});

// Predefined outfit suggestions
const outfitSuggestions = {
    male: {
        formal: [
            'A navy suit with a white dress shirt and a black tie.',
            'A charcoal suit with a light blue dress shirt.',
            'A three-piece suit with a classic white shirt and a pocket square.'
        ],
        casual: [
            'A casual white shirt with dark jeans.',
            'A plaid shirt with chinos and sneakers.',
            'A stylish t-shirt with shorts and sandals.'
        ],
        wedding: [
            'A light-colored linen suit with a floral shirt.',
            'A black tuxedo with a bow tie.',
            'A beige suit with a white dress shirt and brown shoes.'
        ]
    },
    female: {
        formal: [
            'A fitted blazer with a pencil skirt and a silk blouse.',
            'A classic little black dress with elegant heels.',
            'A tailored suit with a blouse and loafers.'
        ],
        casual: [
            'A flowy sundress with flats.',
            'A graphic tee with distressed jeans.',
            'A cozy sweater with leggings and ankle boots.'
        ],
        wedding: [
            'An elegant gown with intricate lace detailing.',
            'A cocktail dress with sparkling accessories.',
            'A chic jumpsuit with statement jewelry.'
        ]
    }
};

submitBtn.addEventListener('click', () => {
    const gender = document.getElementById('gender').value;
    const occasion = document.getElementById('occasion').value;
    const adviceType = document.getElementById('advice').value;

    let suggestion = '';

    // Randomly select an outfit from the predefined list
    if (adviceType === '3') { // Suggest Whole Outfit
        const genderKey = gender === '1' ? 'male' : 'female';
        const occasionKey = occasion === '1' ? 'formal' : occasion === '2' ? 'casual' : 'wedding';
        const suggestionsArray = outfitSuggestions[genderKey][occasionKey];

        // Select a random suggestion
        suggestion = suggestionsArray[Math.floor(Math.random() * suggestionsArray.length)];
    } else {
        // Fallback to existing logic for selecting individual items
        if (adviceType === '1') { // Choose Shirt by Lower
            suggestion = (occasion === '1') ? 'A white formal shirt with dark trousers.' :
                        (occasion === '2') ? 'A casual blue shirt with beige chinos.' :
                        'A light-colored shirt for a wedding.';
        } else if (adviceType === '2') { // Choose Lower by Shirt
            suggestion = (occasion === '1') ? 'Dark trousers to match a white formal shirt.' :
                        (occasion === '2') ? 'Jeans for a casual blue shirt.' :
                        'Light trousers for a wedding outfit.';
        }
    }

    suggestionText.textContent = suggestion;
});
