export const handleErrors = async (e) => {
  if(!e.ok) {
    let message = await e.text();
    if(!message)
      throw Error(e.statusText);
    throw Error(message);
  }
  return e;
}