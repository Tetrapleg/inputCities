'use strict';

const listDefault = () => {

  const selectCities = document.getElementById('select-cities'),
        listDefault = document.querySelector('.dropdown-lists__list--default');

  const createDataList = () => {
    if (listDefault.children[0]){
      listDefault.children[0].remove();
    }

    const dropdownListsCol = document.createElement('div');
    dropdownListsCol.className = 'dropdown-lists__col';
    listDefault.append(dropdownListsCol);

    data.RU.forEach(item => {
  
      const dropdownListsCountryBlock = document.createElement('div');
      dropdownListsCountryBlock.className = 'dropdown-lists__countryBlock';
      dropdownListsCountryBlock.innerHTML = `
        <div class="dropdown-lists__total-line">
          <div class="dropdown-lists__country">${item.country}</div>
          <div class="dropdown-lists__count">${item.count}</div>
        </div>
        `;
      dropdownListsCol.append(dropdownListsCountryBlock);

      for (let i = 0; i < 3; i++){
        const dropdownListsLine = document.createElement('div');
        dropdownListsLine.className = 'dropdown-lists__line';
        dropdownListsLine.innerHTML = `
          <div class="dropdown-lists__city">${item.cities[i].name}</div>
          <div class="dropdown-lists__count">${item.cities[i].count}</div>
        `;
        dropdownListsCol.append(dropdownListsLine);
      }
    });
  };
  selectCities.addEventListener('click', createDataList);
};

listDefault();

const listSelect = () => {
  
  const dropdownLists = document.querySelector('.dropdown-lists__list--default');

  const createDataListSelect = (event) => {
    const target = event.target,
          clickOnTotalLine = target.closest('.dropdown-lists__total-line');
    if (!clickOnTotalLine){
      return;
    }

    const country = [...clickOnTotalLine.children][0].textContent,
          listDefaultSelect = document.querySelector('.dropdown-lists__list--select');

    if (listDefaultSelect.children[0]){
      listDefaultSelect.children[0].remove();
    }

    const dropdownListsColSelect = document.createElement('div');
    dropdownListsColSelect.className = 'dropdown-lists__col';
    listDefaultSelect.append(dropdownListsColSelect);

    const countryArr = data.RU.filter(elem => elem.country === country);

    const dropdownListsCountryBlockSelect = document.createElement('div');
    dropdownListsCountryBlockSelect.className = 'dropdown-lists__countryBlock';
    dropdownListsCountryBlockSelect.innerHTML = `
      <div class="dropdown-lists__total-line">
        <div class="dropdown-lists__country">${countryArr[0].country}</div>
        <div class="dropdown-lists__count">${countryArr[0].count}</div>
      </div>
      `;
    dropdownListsColSelect.append(dropdownListsCountryBlockSelect);
    countryArr[0].cities.forEach(item => {
      const dropdownListsLineSelect = document.createElement('div');
      dropdownListsLineSelect.className = 'dropdown-lists__line';
      dropdownListsLineSelect.innerHTML = `
        <div class="dropdown-lists__city">${item.name}</div>
        <div class="dropdown-lists__count">${item.count}</div>
      `;
      dropdownListsColSelect.append(dropdownListsLineSelect);
    });
    listDefaultSelect.style.display = 'block';
  };

  dropdownLists.addEventListener('click', createDataListSelect);
};
  
listSelect();

const dropdownListsListSelectClose = () => {

  const dropdownListsListSelect = document.querySelector('.dropdown-lists__list--select');

  dropdownListsListSelect.addEventListener('click', event => {
    const target = event.target,
          clickOnTotalLineSelect = target.closest('.dropdown-lists__total-line');

    if (clickOnTotalLineSelect){
      dropdownListsListSelect.style.display = 'none';
    }
    
  });
};

dropdownListsListSelectClose();

const dropdownAutocomplete = () => {
  
  const selectCities = document.getElementById('select-cities'),
        listDefault = document.querySelector('.dropdown-lists__list--default'),
        dropdownListsListSelect = document.querySelector('.dropdown-lists__list--select'),
        dropdownListsListAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
        selectCitiesLabel = document.querySelector('.label'),
        closeButton = document.querySelector('.close-button'),
        linkBtn = document.querySelector('.button');

  selectCities.addEventListener('input', () => {

    selectCities.value = selectCities.value.replace(/[^А-Яа-я- ]/, '');

    const patternInput = new RegExp(`^${selectCities.value.trim()}`, 'i'),
          listDefaultAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
          itemArr = [];

    const createDataListAutocomplete = () => {

      if (listDefaultAutocomplete.children[0]){
        listDefaultAutocomplete.children[0].remove();
      }
  
      const dropdownListsColAutocomplete = document.createElement('div');
      dropdownListsColAutocomplete.className = 'dropdown-lists__col';
      dropdownListsColAutocomplete.innerHTML = `
        <div class="dropdown-lists__countryBlock">
        </div>
      `;
      listDefaultAutocomplete.append(dropdownListsColAutocomplete);

      const dropdownListsCountryBlockAutocomplete = dropdownListsColAutocomplete.querySelector('.dropdown-lists__countryBlock');
      if (itemArr.length !== 0){
        itemArr.forEach(item => {
          const dropdownListsLineAutocomplete = document.createElement('div');
          dropdownListsLineAutocomplete.className = 'dropdown-lists__line';
          dropdownListsLineAutocomplete.innerHTML = `
            <div class="dropdown-lists__city">${item.name}</div>
            <div class="dropdown-lists__count">${item.count}</div>
          `;
          dropdownListsCountryBlockAutocomplete.append(dropdownListsLineAutocomplete);
        });
      } else {
        const dropdownListsLineAutocomplete = document.createElement('div');
        dropdownListsLineAutocomplete.className = 'dropdown-lists__line';
        dropdownListsLineAutocomplete.innerHTML = `
          <div class="dropdown-lists__city">Ничего не найдено</div>
        `;
        dropdownListsCountryBlockAutocomplete.append(dropdownListsLineAutocomplete);
      }

    };

    const patternSities = () => {
      data.RU.forEach(elem => {
        elem.cities.forEach(item => {
          if (patternInput.test(item.name) === true) {
            itemArr.push(item);
            if (selectCities.value.toLowerCase().trim() === item.name.toLowerCase()){
              selectCities.value = item.name;
              closeButton.style.display = 'block';
              linkBtn.href = item.link;
            } else {
              linkBtn.href = '#';
            }
          }
        });
      });
      createDataListAutocomplete();
    };

    if (selectCities.value === ''){
      selectCitiesLabel.style.display = 'block';
      listDefault.style.display = 'block';
      dropdownListsListSelect.style.display = 'none';
      dropdownListsListAutocomplete.style.display = 'none';
    } else {
      selectCitiesLabel.style.display = 'none';
      listDefault.style.display = 'none';
      dropdownListsListSelect.style.display = 'none';
      dropdownListsListAutocomplete.style.display = 'block';
      patternSities();
    }

  });
  
};

dropdownAutocomplete();

const changeInputText = () => {
  const dropdownLists = document.querySelector('.dropdown-lists'),
        selectCities = document.getElementById('select-cities'),
        selectCitiesLabel = document.querySelector('.label'),
        listDefault = document.querySelector('.dropdown-lists__list--default'),
        dropdownListsListSelect = document.querySelector('.dropdown-lists__list--select'),
        dropdownListsListAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
        closeButton = document.querySelector('.close-button'),
        linkBtn = document.querySelector('.button');

  let cityLink,
      checkedCityLink;

  closeButton.addEventListener('click', () => {
    closeButton.style.display = 'none';
    selectCities.value = '';
    selectCitiesLabel.style.display = 'block';
    if (listDefault.children[0]){
      listDefault.children[0].remove();
    }
    if (dropdownListsListSelect.children[0]){
      dropdownListsListSelect.children[0].remove();
    }
    if (dropdownListsListAutocomplete.children[0]){
      dropdownListsListAutocomplete.children[0].remove();
    }  
    listDefault.style.display = 'block';
    dropdownListsListSelect.style.display = 'none';
    dropdownListsListAutocomplete.style.display = 'none';
    linkBtn.href = '#';
  });

  linkBtn.addEventListener('click', (event) => {
    checkedCityLink = event.target.href;
    data.RU.forEach(item => {
      item.cities.forEach(elem => {
        if (checkedCityLink === elem.link){
          return checkedCityLink;
        }
      });
    });
    if (event.target.href !== cityLink && event.target.href !== checkedCityLink){
      event.preventDefault();
    }

  });

  dropdownLists.addEventListener('click', event => {
    const target = event.target,
          countryLine = target.closest('.dropdown-lists__total-line'),
          cityLine = target.closest('.dropdown-lists__line');
          

    const takeInput = (dataLocation) => {
      selectCities.value = dataLocation.children[0].textContent;
      selectCitiesLabel.style.display = 'none';
      closeButton.style.display = 'block';
      data.RU.forEach(item => {
        item.cities.forEach(elem => {
          if (elem.name === dataLocation.children[0].textContent){
            linkBtn.href = elem.link;
            cityLink = elem.link;
          }
        });
      });
    };
     
    if (countryLine){
      takeInput(countryLine);
    } else if (cityLine){
      takeInput(cityLine);
    }
  });
};

changeInputText();