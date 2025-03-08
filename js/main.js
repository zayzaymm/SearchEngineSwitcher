fetch("json/searchEngines.json").then(response => response.json()).then(
    data => {
        var template = "";
        data.forEach(engine => {
          template += `
          <input id="${engine.name.toLowerCase()}" class="btn-check" type="radio" name="searchEngine" value="${engine.url}"> 
          <label class="btn btn-sm btn-outline-info rounded-pill btn-radio" for="${engine.name.toLowerCase()}">${engine.name}</label>
          `;
        });
        document.querySelector(".radio").innerHTML = template;
        chrome.storage.local.get(["searchEngine"], (result) => {
            document.querySelectorAll("input[name='searchEngine']").forEach((radio) => {
               if (radio.value === result.searchEngine) {
                  radio.checked = true;
               }
            });    
        });
        document.querySelectorAll("input[name='searchEngine']").forEach((radio) => {
            radio.addEventListener("change",() => {
                chrome.storage.local.set({"searchEngine": radio.value});
            });
        });
        document.querySelector("#donation").addEventListener("click",() => {
            chrome.tabs.create({url: "https://buymeacoffee.com/zayzaymm"});
        });
    }
);
