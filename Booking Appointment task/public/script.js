async function fetchUsers(params) {
    //so firstly fetch all users from the backend
    const response =await fetch('http://localhost:3000/users');
    //got them convert into json
    const json = await response.json();
     //now get the unordered list create list and push it
        userList = document.getElementById('user-list');
        //got all the list so whenever we modify or add just make it empty since all will be going to add
        userList.innerHTML = '';
    //now traverse each data
    json.data.forEach((users)=>{
       
        //now create new lis
        const li = document.createElement('li');
        li.innerHTML = `
        ${users.name} - ${users.email} 
        <button class="delete-btn" onclick = "deleteUser(${users.id})">Delete</button>
        <button class = "edit-btn">Edit</button>
        `
        userList.appendChild(li);
    });

}
// now delete function
 async function deleteUser(userId){
        await fetch(`http://localhost:3000/users/${userId}` ,{
            method:'DELETE'
        });
       fetchUsers();
 }

 //NOW FORM SUBMISSION SINCE WE DON'T HAVE THIS ON FORM HTML 
 document.getElementById('booking-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    // now we need to get those data's to post
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    // now got all values use fetch to post them
    await fetch(`http://localhost:3000/users`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,phoneNumber,email})
    });
    fetchUsers();
 });

 fetchUsers();
