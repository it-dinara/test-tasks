export const spaceDigits = number =>
  number && number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

export const cardSpaceDigits = number => 
    number && number.toString().replace(/(.{4})/g, '$1 ').trim()
