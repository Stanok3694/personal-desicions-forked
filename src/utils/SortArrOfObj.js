const SortArrOfObj = (arrOfObj) => {
    const sortedArr = arrOfObj.sort((prev, next) => {
        return prev.order - next.order;
    });
    
    return sortedArr;
};

export default SortArrOfObj;