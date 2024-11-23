
const QUOTES = [
    {
        "quote": "Life's like an onion, Donkey. You have to peel away the layers to get to the heart.",
        "character": "Shrek"
    },
    {
        "quote": "Embrace who you are, not who others want you to be.",
        "character": "Shrek"
    },
    {
        "quote": "Sometimes you have to be the hero of your own story.",
        "character": "Shrek"
    },
    {
        "quote": "Even the smallest creatures can make the biggest difference.",
        "character": "Donkey"
    },
    {
        "quote": "It’s okay to be different. It’s okay to be yourself.",
        "character": "Shrek"
    },
    {
        "quote": "True beauty comes from within. Don’t let anyone tell you otherwise.",
        "character": "Princess Fiona"
    },
    {
        "quote": "Life is an adventure, and the journey is what makes it worthwhile.",
        "character": "Shrek"
    },
    {
        "quote": "Believe in yourself, because that's the first step to achieving greatness.",
        "character": "Donkey"
    },
    {
        "quote": "Don't judge people by their appearances; everyone has a story.",
        "character": "Shrek"
    },
    {
        "quote": "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "character": "Princess Fiona"
    },
    {
        "quote": "Great things never come from comfort zones.",
        "character": "Shrek"
    },
    {
        "quote": "Keep moving forward, even when the path is uncertain.",
        "character": "Shrek"
    },
    {
        "quote": "Kindness is free. Sprinkle it everywhere.",
        "character": "Donkey"
    },
    {
        "quote": "Find your inner strength and let it guide you through life's challenges.",
        "character": "Shrek"
    },
    {
        "quote": "A good heart is all that truly matters.",
        "character": "Princess Fiona"
    },
    {
        "quote": "Happiness is not something ready-made. It comes from your own actions.",
        "character": "Shrek"
    },
    {
        "quote": "Every day is a new beginning. Take a deep breath and start again.",
        "character": "Shrek"
    },
    {
        "quote": "Be fearless in the pursuit of what sets your soul on fire.",
        "character": "Donkey"
    },
    {
        "quote": "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
        "character": "Shrek"
    },
    {
        "quote": "Remember, you are the only one who can limit your greatness.",
        "character": "Shrek"
    }
];

//A simple and Very nicely nested function that picks random quotes from the array above.
const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

const quoteElement = document.getElementById('quote');
const quoteCharacter = document.getElementById('character');

quoteElement.textContent = randomQuote.quote;
quoteCharacter.textContent = randomQuote.character;