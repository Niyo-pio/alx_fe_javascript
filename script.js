document.addEventListener('DOMContentLoaded', () => {
    // Initial array of quotes
    let quotes = [
      
      { text: "If you want things to remain as they are, things have to change", category: "Change" },
      { text: `The gods maid wine to compensate those who can't afford revenge.
        So stay calm and let the gods fight for you`, category: "Life" },
        { text: "The have to win every time, We only have to win only once for all", category: "Inspiration" },
    ];
  
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
  
    
    const showRandomQuote = () => {
      if (quotes.length === 0) {
        quoteDisplay.innerText = "No quotes available.";
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const { text, category } = quotes[randomIndex];
      quoteDisplay.innerText = `"${text}" - ${category}`;
    };
  
   
    window.addQuote = () => {
      const text = newQuoteText.value.trim();
      const category = newQuoteCategory.value.trim();
      
      if (text === "" || category === "") {
        alert("Please enter both a quote and a category.");
        return;
      }
  
      quotes.push({ text, category });
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added!");
    };
  
    
    newQuoteButton.addEventListener('click', showRandomQuote);
  
    
    showRandomQuote();
  });

  