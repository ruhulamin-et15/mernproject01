import React from 'react'

const Logout = () => {

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: 'POST',
        // body: JSON.stringify(data),
        headers: {
            // "Content-Type": "application/json",
        }       
      });
      const result = await response.json();
      console.log(result)
      };

  return (
    <div className='col-sm-6 offset-sm-3'>
        <form onSubmit={(handleSubmit)}>
            <button type='submit'>Logout</button>
        </form>
    </div>
  )
}

export default Logout