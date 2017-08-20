
const searchBtn = '.js-btn-search';
const nextBtn = '.js-btn-next';
const searchInputField = '.js-search-query';
const apiKey = "AIzaSyCEyNr2k3guOCfAsS2WS0Ct8YNjUtWarec";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";


function getDataFromApi(searchTerm, callback) {

  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm}`,
      maxResults: 6
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function renderItemHtml(item) {
   console.log('renderItemHtml');

   return `
      <div class="item">
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
          <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
        </a>
        <div class="video-info">
        <div class="title">
          <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
          ${item.snippet.title}
          </a>
        </div>
          <div class="channel">${item.snippet.channelTitle}</div>
          <div class="description">${item.snippet.description}</div>
        </div>
      </div>
   `;
}

function showQueryData(data) {
  console.log('showQueryData');
  console.log(data);
  const dataWithoutChannel = data.items;

  // the first result is always a channel, so remove it
  dataWithoutChannel.splice(0,1);


  console.log('dataWithoutChannel', dataWithoutChannel);

  // array of items to append to the html
  const results = dataWithoutChannel.map((item, index) => renderItemHtml(item));
  $('.js-search-results').html(results);
  $('.js-search-count').html(`${data.pageInfo.totalResults} total results`);
}

function handleSearchBtnClicked(event) {
  console.log('handleSearchBtnClicked');
  event.preventDefault();

  // get input field text
  const searchQuery = $(searchInputField).val();
  searchText = searchQuery;

  // clear input field after submit
  $(searchInputField).val("");
  console.log(searchQuery);

  // pass input field text to get function to get the data from the api
  // data is automatically passed to the callback function, showQueryData
  getDataFromApi(searchQuery, showQueryData);
}


function assignEventHandlers() {
  console.log('assignEventHandlers');
  $(searchBtn).on('click', handleSearchBtnClicked);
}

function runApp() {
  console.log('runApp');
  assignEventHandlers();  
}

$(runApp());