//fill up your own apiKey and accessToken here
const credentials = {
    apiKey: '',
    accessToken: ''
}

let requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${credentials.accessToken}`,
        'Accept': 'application/json'
    }
};

//url generating function for every nextPageToken
const makeUrlWithPageToken = (nextPageToken = '') => {
    return `https://www.googleapis.com/drive/v3/files?pageSize=1000&fields=nextPageToken%2Cfiles%2Fid%2C%20files%2Fname%2C%20files%2FiconLink%2C%20files%2FwebViewLink&pageToken=${nextPageToken}&key=${credentials.apiKey} HTTP/1.1`;
}

//recursively fetching all files from Google Drive
const fetchData = async (data = [], token = '') => {
    const response = await (await fetch(makeUrlWithPageToken(token), requestOptions)).json();
    const newData = [...data, ...response.files];
    if (response.hasOwnProperty('nextPageToken')) {
        return fetchData(newData, token = response.nextPageToken)
    }
    return newData;
}

export default fetchData;


