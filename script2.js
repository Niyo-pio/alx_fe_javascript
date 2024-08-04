document.addEventListener('DOMContentLoaded', () => {
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "violence is the last refuge of the incompetent", category: "Change" },
        { text: "a heart break is blessing from God it's just letting you know that he is saving you from the wrong one", category: "Life" },
          { text: "The have to win every time, We only have to win only once for all", category: "Inspiration" }
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  
    if (lastViewedQuote) {
      quoteDisplay.innerHTML = lastViewedQuote;
    }
  
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      const quoteHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
      quoteDisplay.innerHTML = quoteHTML;
      sessionStorage.setItem('lastViewedQuote', quoteHTML);
    }
  
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        localStorage.setItem('quotes', JSON.stringify(quotes));
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    function exportToJsonFile() {
      const dataStr = JSON.stringify(quotes);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'quotes.json';
  
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
    window.addQuote = addQuote;
    window.exportToJsonFile = exportToJsonFile;
    window.importFromJsonFile = importFromJsonFile;
  });
  