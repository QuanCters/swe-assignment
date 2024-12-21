
export async function getCurrentStudentPageBalance() {
  let userID = localStorage.getItem("userID");
  console.log(userID);

  let response = await fetch('https://json-server-s4l1.onrender.com/students');
  if (!response) {
    console.error('error');
  }

  let data = await response.json();
  let pageBalance = data.find((item: any) => item.id === userID).pageBalance;
  return pageBalance;
}
