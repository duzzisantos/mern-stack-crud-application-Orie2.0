function sortedStrings(arr, resource) {
  if (typeof arr === "object" && arr.length > 1) {
    return arr.sort((a, b) => a.localeCompare(b));
  } else if (typeof arr === "object" && arr.length > 1 && resource) {
    return arr.sort((x, y) => x[resource].localeCompare(y[resource]));
  } else {
    return arr;
  }
}

function encodeImageAsURL(elementID, setState) {
  const selectedFile = document.getElementById(elementID).files;

  if (selectedFile.length > 0) {
    const fileToLoad = selectedFile[0];

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const srcData = event.target.result;
      setState(srcData);
      return srcData;
    };

    fileReader.readAsDataURL(fileToLoad);
  }
}

export { sortedStrings, encodeImageAsURL };
