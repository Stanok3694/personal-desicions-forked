const MakeStringField = (postionArray) => {
    if (!postionArray) {
        return;
    }

    const strFromArr = postionArray.toString();
    const commaIdx = strFromArr.indexOf(',');
    const withComma = strFromArr.slice(0, commaIdx + 1);
    const afterComma = strFromArr.slice(commaIdx + 1);

    return `${withComma} ${afterComma}`;
}

export default MakeStringField;