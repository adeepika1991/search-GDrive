//function to sort data in the desired order according to the assignment specification
const sortData = (searchString, driveData) => {
    if (searchString && driveData.length > 0) {
        const startingMatch = driveData.filter(item => item.name.toLowerCase().startsWith(searchString.toLowerCase()))
        const partialMatch = driveData.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()));
        const vagueMatch = driveData.filter(item =>
            searchString
                .toLowerCase()
                .split(' ')
                .every(word => item.name.toLowerCase().includes(word)));

        return [...new Set([...startingMatch, ...partialMatch, ...vagueMatch])]
    } else return driveData;
}


export default sortData;