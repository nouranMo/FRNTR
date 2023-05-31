     const allData = [
        //   // Add your data here
          'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
          'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20',
          'Item 21', 'Item 22', 'Item 23', 'Item 24', 'Item 25', 'Item 26', 'Item 27', 'Item 28', 'Item 29', 'Item 30',
          'Item 31', 'Item 32', 'Item 33', 'Item 34', 'Item 35', 'Item 36', 'Item 37', 'Item 38', 'Item 39', 'Item 40',
          'Item 41', 'Item 42', 'Item 43', 'Item 44', 'Item 45', 'Item 46', 'Item 47', 'Item 48', 'Item 49', 'Item 50',
          'Item 51', 'Item 52', 'Item 53', 'Item 54', 'Item 55', 'Item 56', 'Item 57', 'Item 58', 'Item 59', 'Item 60',
        ];



    


        let link = document.getElementsByClassName("page_link");
        let currentValue = 1;

        function getDataForPage(page) {
          const itemsPerPage = 10;
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          return allData.slice(startIndex, endIndex);
        }

        function displayData(data) {
          const dataContainer = document.querySelector('.data-container');
          let html = '<ul>';
          data.forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += '</ul>';
          dataContainer.innerHTML = html;
        }

        function updateURL(page) {
          const url = new URL(window.location.href);
          url.searchParams.set('page', page);
          history.replaceState({ page: currentValue }, `Page ${currentValue}`, url.toString());
        }

        function fetchDataAndDisplay() {
          const url = new URL(window.location.href);
          currentValue = parseInt(url.searchParams.get('page')) || 1;
          const data = getDataForPage(currentValue);
          displayData(data);
          setActiveLink(currentValue);
        }

        function setActiveLink(page) {
          for (const l of link) {
            l.classList.remove("active");
          }
          link[page - 1].classList.add("active");
        }

        window.addEventListener('popstate', (event) => {
          fetchDataAndDisplay();
        });

        function activeLink(event) {
            for(l of link){
                l.classList.remove("active");
            }
            event.target.classList.add("active");
            currentValue = event.target.value;
          
          updateURL(currentValue);
          fetchDataAndDisplay();
        }

        function backBtn() {
            if(currentValue > 1){
                for(l of link){
                    l.classList.remove("active");
                }
                currentValue--;
                link[currentValue-1].classList.add("active");
                updateURL(currentValue);
                fetchDataAndDisplay();
            }
        }

        function nextBtn() {
            if(currentValue < 6){
                for(l of link){
                    l.classList.remove("active");
                }
                currentValue++;
                link[currentValue-1].classList.add("active");
                updateURL(currentValue);
                fetchDataAndDisplay();
            }
        }

        // Call fetchDataAndDisplay() when the page loads
        fetchDataAndDisplay();
