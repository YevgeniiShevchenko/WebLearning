const $ul = document.querySelector('#people_list');
const $loader = document.querySelector('.loader');
const $ulPagination = document.querySelector('.pagination');
let currentPage = 1;
let buttons = []

const addPersonItem = (person) => {
    // <li class="list-group-item"> Name </li>
    // const secondFilm = person?.['films']?.[1] ?? 'Unknown';
    const secondFilm = _.get(person, '["films"][1]', 'Unknown');
    const $li = document.createElement('li');
    $li.className = 'list-group-item';
    // name + '(birth year: ' + birthYear + ')';
    $li.innerText = `
        ${person['name']}
        (birth year: ${person['birth_year']})
        - second film: ${secondFilm}
    `;
    $ul.appendChild($li);
};

const pagination = (data) => {
    const pages = Math.ceil(data['count']/10)
    const arrPages = []
    arrPages.push('<li class="page-item"><a class="page-link">Previous</a></li>')
    for(let i = 1; i < pages + 1; i++) {
        const $li = `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
        arrPages.push($li)
    }
    arrPages.push('<li class="page-item"><a class="page-link" href="#">Next</a></li>')
    $ulPagination.innerHTML = arrPages.join('');

    buttons = document.querySelectorAll('.page-item');
    buttons.forEach((btn, index)=> {
        if(index == currentPage) {
            btn.classList.add('active');
        }
        if(data.previous == null) {
            buttons[0].classList.add('disabled');
        }
        if(data.next == null) {
            buttons[pages+1].classList.add('disabled');
        }
        btn.addEventListener('click', (event) => {     
            if(event.target.innerText == 'Previous') {
                if(data.previous == null) {
                    return
                }
                currentPage = data.previous.slice(-1)
                getPeople(currentPage)
            }   else if (event.target.innerText == 'Next') {
                if(data.next == null) {
                    return
                }
                currentPage = data.next.slice(-1)
                getPeople(currentPage)
            } else {
                currentPage = event.target.innerText
                getPeople(currentPage)
            }      
        })
    })
};

function getPeople(page = 1) {
    $loader.style.display = 'flex'
    fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then((response) => response.json()) // get json from response
        .then((data) => {
            $ul.innerHTML = ''
            pagination(data);
            data.results.forEach(person => {
                addPersonItem(person);
            });
            $loader.style.display = 'none'
        });
}

getPeople();
