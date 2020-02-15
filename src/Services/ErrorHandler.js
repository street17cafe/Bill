export default function ExtractErrorMessage(err) {
  //track down error message
  let message = "Error occured"
  try {
    console.log(err.response.data)
    message = err.response.data.message || err.message
  }catch(err){
    message = "Some error has occured. Try again in sometime"
  }
  
  if(typeof(message) === "object")
    message = "Unknow error occured"

  return message
}