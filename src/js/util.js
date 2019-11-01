export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isInArr = (arr, find) => {
  for (let value of arr) {
    if(value == find){
      return true;
    }
  }
  return false;
};


export const sortNumber = (arr) => {
  function sortNumber(a, b) {
    return a - b;
  }
  return arr.sort(sortNumber);
};

export const allPass4Obj = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) return false;
  }
  return true;
}

export const sweet = (title, type = 'success', position = 'top-end', timer = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timer
  })
  Toast.fire({
    type: type,
    title: title
  })
}