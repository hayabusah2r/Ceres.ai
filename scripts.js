const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const suggestionsContainer = document.getElementById('suggestions-container');

const responses = {
    greetings: ["Hello!", "Hi there!", "Have a Good day!"],
    thanks: ["You're welcome!", "No problem!", "Anytime!"],
    about: ["I am a friendly bot who can respond to your questions like a human. My development is still on experimental stage, soon I will be able to talk just like a human!"],
    mood: ["I am a bot, I don't have feelings. But I can make you happy :)"],
    jokes: ["Why don't scientists trust atoms? Because they make up everything!", "Why did the scarecrow win an award? Because he was outstanding in his field!", "How do you measure a snake? In inches, because they don't have feet!", "Why should you never trust stairs? Because they're always up to something!", "Why did the bullet end up losing his job? Because he got fired!", "Why did the math book look sad? Because it had too many problems!", "Why don't mathematicians like playing hide and seek? Because they can never find a solution!", "What's the most positive thing about Switzerland? Their flag has a big plus!", "Why don't oysters donate to charity? Because they are shellfish!", "What gets wetter the more it dries? A towel!", "Where should you go in the room if you're feeling cold? You should go in the corner, because they're usually 90 degrees!"],
    quotes: ["The best way to predict the future is to invent it. - Alan Kay", "The love of money is the root of all evil. - the Bible", "Genius is one percent inspiration and ninety-nine percent perspiration. - Thomas Edison", "That's one small step for a man, a giant leap for mankind. - Neil Armstrong", "Ask not what your country can do for you; ask what you can do for your country. - John Kennedy", "The only thing we have to fear is fear itself. - Franklin D. Roosevelt", "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll"],
    facts: ["Honey never spoils.", "Bananas are berries but strawberries aren't.", "The world's oldest known recipe is for beer.", "There is a species of jellyfish called Turritopsis dohrnii, also known as the IMMORTAL JELLYFISH. It has the ability to revert back to its juvenile polyp stage after reaching adulthood, effectively cheating death and potentially living indefinitely.", "The driest place on Earth is the Atacama Desert in Chile. Some areas of the desert have received no rainfall in recorded history.", "The first use of the Hashtag Symbol (#) as a social media tool was on Twitter in 2007.", "Octopuses have three hearts. Two hearts pump blood to the gills, while the third heart circulates blood to the rest of the body.", "The shortest war in history was between Britain and Zanzibar in 1896. It lasted only 38 minutes, with Zanzibar surrendering to British forces.", "There are more trees on Earth than stars in the Milky Way galaxy. Estimates suggest there are over three trillion trees on our planet.",],
    afterjoke: ["Thanks!"]
};

const links = {
    game: ["https://seaam-snake-xenzia.netlify.app/", "https://tictactoebyseaam.netlify.app/", "https://rockpaperscissor-by-seaam.netlify.app/"],
    document: ["https://typewriterai.netlify.app/"],
    weather: ["https://windy.com/"],
    calculator: ["https://nerdai.netlify.app/calc.html"]
};

const lastUsedLinks = {};
const lastUsedResponses = {
    jokes: null,
    quotes: null,
    facts: null
};

function getRandomResponse(category) {
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

function getRandomLink(keyword) {
    const keywordLinks = links[keyword];
    if (!keywordLinks || keywordLinks.length === 0) return null;

    let randomLink;
    do {
        randomLink = keywordLinks[Math.floor(Math.random() * keywordLinks.length)];
    } while (randomLink === lastUsedLinks[keyword] && keywordLinks.length > 1);

    lastUsedLinks[keyword] = randomLink;
    return randomLink;
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `Today is ${date} and the current time is ${time}.`;
}

function sendMessage() {
    const message = userInput.value;
    if (!message.trim()) return;

    addMessageToChat('You', message);
    userInput.value = '';

    // Hide suggestions container after the first message
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }

    setTimeout(() => {
        const botResponse = getBotResponse(message.toLowerCase());
        addMessageToChat('Ceres', botResponse);
    }, 1000);
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (sender === 'You' ? 'user' : 'bot');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    // Check for hyperlinks first
    for (let keyword in links) {
        if (message.includes(keyword)) {
            const randomLink = getRandomLink(keyword);
            if (randomLink) {
                window.open(randomLink, '_blank');
                return `Redirected to ${keyword}`;
            }
        }
    }

        // Check for date and time requests
        if (message.includes('date') || message.includes('time')) {
            return getCurrentDateTime();
        }

    // Check for other responses
    if (message.includes('thank')) {
        return getRandomResponse('thanks');
    } else if (message.includes('haha') || message.includes('lol') || message.includes('nice') || message.includes('fine') || message.includes('hehe')) {
        return getRandomResponse('afterjoke');
    } else if (message.includes('interesting')) {
        return getRandomResponse('afterjoke');
    }
     else if (message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening') || message.includes('hello') || message.includes('hi')) {
        return getRandomResponse('greetings');
    } else if (message.includes('tell me about yourself') || message.includes('about') || message.includes('who created you') || message.includes('who are you')) {
        return getRandomResponse('about');
    }
    else if (message.includes('how are you')) {
        return getRandomResponse('mood');
    }
    
    else if (message.includes('joke')) {
        return getRandomResponse('jokes');
    } else if (message.includes('quote')) {
        return getRandomResponse('quotes');
    } else if (message.includes('fact')) {
        return getRandomResponse('facts');
    } else {
        return "I'm not sure how to respond to that.";
    }
}

userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
