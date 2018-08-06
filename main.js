document.querySelector('.search-book').addEventListener('click', getBook);
var titleHolder = document.querySelector('.title');
var columns = document.querySelector('.is-parent');
var total = '';
var noCoverImg =
  'http://res.cloudinary.com/nzmai/image/upload/v1533563471/disco-single-nocover_fyfkix.jpg';
const apiKey = 'AIzaSyCu0GO52L8knIMQ7P_gmazBf_7wlngXqyc';

function getBook() {
  var search = document.querySelector('#input').value;
  console.log(search);
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&key=${apiKey}`
  )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      //console.log(data.items);
      let items = data.items;
      for (var i = 0; i < items.length; i++) {
        // Volume info
        let item = items[i].volumeInfo;

        // Author
        let author = item.authors;

        // Image link
        var imgLink = item.imageLinks;

        if (imgLink && imgLink.thumbnail != undefined) {
          imgLink = item.imageLinks.thumbnail;
        } else {
          console.log(noCoverImg);
          imgLink = noCoverImg;
        }

        // Title
        let title = item.title;

        // Description
        let desc = item.description;

        if (typeof desc === 'undefined') {
          desc = 'No description available';
        }

        if (typeof author === 'undefined') {
          author = 'No author';
        }

        total += `
        <div class=" card tile is-child is-3 box">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="${imgLink}" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-6 has-text-primary has-text-centered is-capitalized">${title}</p>
            <p class="title is-6 has-text-primary has-text-centered is-capitalized">${author}</p>
            <p class="has-text-black-ter has-text-weight-normal">${desc.slice(
              0,
              150
            ) + '...'}</p>
          </div>
        </div>
        `;

        console.log(item);
      }
      columns.innerHTML = total;
    });
}
