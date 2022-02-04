function additionalInfo (userName){
  return fetch(`https://api.github.com/users/${userName}`).then(response=>{
      if (response.ok) {
          return response.json();
      }
  })
      
      
     
  };
  export default {additionalInfo};



