export const returnObjectAsArray = (snapshot) => {
  const toReturn = [];

  Object.keys(snapshot).map((key, index) => {
  	toReturn.push({value: snapshot[key], id: key });
  })
  return toReturn
}