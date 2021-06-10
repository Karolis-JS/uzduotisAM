
fetch('https://random-data-api.com/api/address/random_address?size=100')
    .then(res => res.json())
    .then(data => {

let state = {
    'querySet': data,
    'page': 1,
    'rows': 5,
    'window': 5,
}

buildTable()

function pagination(querySet, page, rows) {

    let trimStart = (page - 1) * rows
    let trimEnd = trimStart + rows

    let trimmedData = querySet.slice(trimStart, trimEnd)

    let pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    let wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``

    let maxLeft = (state.page - Math.floor(state.window / 2))
    let maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)

        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }

    for (let page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()
        state.page = Number($(this).val())
        buildTable()
    })
}


function buildTable() {
    let table = $('#table-body')

    let data = pagination(state.querySet, state.page, state.rows)
    let list = data.querySet

    for (let i = 0; i < list.length; i++) {
        let row = `<tr>
                  <td>${list[i].city}</td>
                  <td>${list[i].country}</td>
                  <td>${list[i].country_code}</td>
                  <td>${list[i].state}</td>
                  <td>${list[i].postcode}</td>
                  <td>${list[i].time_zone}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
}
    })
