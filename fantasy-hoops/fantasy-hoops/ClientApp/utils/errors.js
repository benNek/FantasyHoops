export const handleErrors = async (e) => {
  if(!e.ok) {
    let message = await e.text();
    if(!message)
      throw Error(e.status + " " + e.statusText);
    throw Error(e.status + " " + message);
  }
  return e;
}