export const getOneMonthAgoReleaseDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toJSON().slice(0,10);

    return formattedDate;
}

export const dateToYearOnly = date => date.slice(0,4);

export const capitalizeFirstLetter = text => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

export const randomize = data => (
    Math.floor((Math.random() * data.length))
    );

export const truncate = (text, n) => (
    text?.length > n ? text.substr(0, n - 1) + "..." : text
);



export const randomColor = () => {
    let hexString = "0123456789abcdef";
    let hexCode = "#";
    for( var i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}


export const  generateGrad = () => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
}


export const generateRGBGrad = () =>{
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},0.6)`;
}