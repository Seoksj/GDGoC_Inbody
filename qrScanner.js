
// const video = document.getElementById("camera");
// // const fileInput = document.getElementById("file-input");
// const startScanButton = document.getElementById("start-scan");

// // Pocketbase API 설정
// const pocketbaseURL = "https://creature-some.pockethost.io"; // Pocketbase URL을 입력
// const collectionName = "student"; // Pocketbase 컬렉션 이름

// // API 요청 함수: 고유 ID로 사용자 데이터 가져오기
// async function fetchStudentDataById(userId) {
//   try {
//     const response = await fetch(`${pocketbaseURL}/api/collections/${collectionName}/records/${userId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from Pocketbase.");
//     }
//     const data = await response.json();

//     console.log("API Response:", data); // 응답 데이터 확인

//     if (data) {
//       const { name, reward_points } = data;
//       return { name, reward_points };
//     } else {
//       throw new Error("No matching user found.");
//     }
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//     return null;
//   }
// }


// function displayAuthCompletePage(name, rewardPoints) {
//   const newPageContent = `
//     <div style="
//       font-family: 'Roboto', Arial, sans-serif; 
//       background-color: #f4f4f9; 
//       color: #333; 
//       margin: 0; 
//       padding: 0;
//       display: flex; 
//       align-items: center; 
//       justify-content: center; 
//       width: 1200px;
//       height: 100vh;">
      
//       <div style="
//         width: 80%; 
//         height: 80%; 
//         background: #ffffff; 
//         padding: 40px; 
//         border-radius: 16px; 
//         box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
//         display: flex; 
//         flex-direction: column; 
//         align-items: center; 
//         justify-content: space-between; 
//         text-align: center;">

//         <div style="
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 200px;
//           width: 100%;
//           text-align: center;
//           font-size: 80px;
//           color: #4CAF50;
//           margin-bottom: 20px;
//           background: #f9f9f9;
//           padding: 20px;
//           border-radius: 12px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           font-family: 'Pretendard', Arial, sans-serif;">
//           ✅ 인증 완료
//         </div>

//         <!-- 나머지 내용 -->
//         <p style="
//           font-size: 50px; 
//           margin: 20px 0; 
//           line-height: 1.8;">
//           <strong style="font-size: 50px; color: #4CAF50;">${name}</strong>님 안녕하세요! 🎉<br>
//           현재까지 넣으신 페트병은 <span style="color: #333; font-weight: bold;">${rewardPoints}개</span>입니다.
//         </p>

//         <button style="
//           background-color: #4CAF50; 
//           color: white; 
//           padding: 15px 30px; 
//           font-size: 18px; 
//           border: none; 
//           border-radius: 8px; 
//           cursor: pointer; 
//           transition: background-color 0.3s;" 
//           onclick="location.reload()">
//           다시 스캔하기
//         </button>
//       </div>
//     </div>
//   `;

//   document.body.innerHTML = newPageContent;
// }




// async function startCamera() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//     video.srcObject = stream;

//     video.addEventListener("play", () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       const scan = async () => {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height);

//         if (code) {
//           stopCamera(stream);
//           const userId = code.data.trim(); 

//           const studentData = await fetchStudentDataById(userId);

//           if (studentData) {
//             const { name, reward_points } = studentData;
//             displayAuthCompletePage(name, reward_points); 
//           } else {
//             alert("사용자 정보를 찾을 수 없습니다.");
//           }
//         } else {
//           requestAnimationFrame(scan);
//         }
//       };

//       scan();
//     });
//   } catch (err) {
//     console.error("Camera error:", err);
//     alert("카메라 접근이 불가능합니다. 권한을 확인해주세요.");
//   }
// }

// function stopCamera(stream) {
//   const tracks = stream.getTracks();
//   tracks.forEach((track) => track.stop());
// }

// startScanButton.addEventListener("click", startCamera);







const video = document.getElementById("camera");
const startScanButton = document.getElementById("start-scan");

// Pocketbase API 설정
const pocketbaseURL = "https://creature-some.pockethost.io"; // Pocketbase URL
const collectionName = "student"; // Pocketbase 컬렉션 이름

// API 요청 함수: 고유 ID로 사용자 데이터 가져오기
async function fetchStudentDataById(userId) {
  try {
    const response = await fetch(`${pocketbaseURL}/api/collections/${collectionName}/records/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Pocketbase.");
    }
    const data = await response.json();

    console.log("API Response:", data); // 응답 데이터 확인

    if (data) {
      const { name, reward_points } = data;
      return { name, reward_points };
    } else {
      throw new Error("No matching user found.");
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}

function displayAuthCompletePage(name, rewardPoints) {
  const newPageContent = `
    <div style="
      font-family: 'Roboto', Arial, sans-serif; 
      background-color: #f4f4f9; 
      color: #333; 
      margin: 0; 
      padding: 0;
      display: flex; 
      align-items: center; 
      justify-content: center; 
      width: 1200px;
      height: 100vh;">
      
      <div style="
        width: 80%; 
        height: 80%; 
        background: #ffffff; 
        padding: 40px; 
        border-radius: 16px; 
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: space-between; 
        text-align: center;">

        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          width: 100%;
          text-align: center;
          font-size: 80px;
          color: #4CAF50;
          margin-bottom: 20px;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: 'Pretendard', Arial, sans-serif;">
          ✅ 인증 완료
        </div>

        <p style="
          font-size: 50px; 
          margin: 20px 0; 
          line-height: 1.8;">
          <strong style="font-size: 50px; color: #4CAF50;">${name}</strong>님 안녕하세요! 🎉<br>
          현재까지 넣으신 페트병은 <span style="color: #333; font-weight: bold;">${rewardPoints}개</span>입니다.
        </p>


          <button style="
            background-color: #2196F3; 
            color: white; 
            padding: 15px 30px; 
            font-size: 18px; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer;" 
            onclick="window.location.href='collecting.html'">
            투입하기
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.innerHTML = newPageContent;
}

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;

    video.addEventListener("play", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scan = async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          stopCamera(stream);
          const userId = code.data.trim();

          const studentData = await fetchStudentDataById(userId);

          if (studentData) {
            const { name, reward_points } = studentData;
            displayAuthCompletePage(name, reward_points);
          } else {
            alert("사용자 정보를 찾을 수 없습니다.");
          }
        } else {
          requestAnimationFrame(scan);
        }
      };

      scan();
    });
  } catch (err) {
    console.error("Camera error:", err);
    alert("카메라 접근이 불가능합니다. 권한을 확인해주세요.");
  }
}

function stopCamera(stream) {
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
}

startScanButton.addEventListener("click", startCamera);







// const video = document.getElementById("camera");
// const startScanButton = document.getElementById("start-scan");

// // Pocketbase API 설정
// const pocketbaseURL = "https://creature-some.pockethost.io"; // Pocketbase URL
// const collectionName = "student"; // Pocketbase 컬렉션 이름

// // API 요청 함수: 고유 ID로 사용자 데이터 가져오기
// async function fetchStudentDataById(userId) {
//   try {
//     const response = await fetch(`${pocketbaseURL}/api/collections/${collectionName}/records/${userId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from Pocketbase.");
//     }
//     const data = await response.json();

//     console.log("API Response:", data); // 응답 데이터 확인

//     if (data) {
//       const { name, reward_points } = data;
//       return { name, reward_points };
//     } else {
//       throw new Error("No matching user found.");
//     }
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//     return null;
//   }
// }

// function displayAuthCompletePage(name, rewardPoints) {
//   const newPageContent = `
//     <div style="
//       font-family: 'Pretendard', Arial, sans-serif; 
//       background-color: #f9f9f9; 
//       color: #333; 
//       margin: 0; 
//       padding: 0;
//       display: flex; 
//       align-items: center; 
//       justify-content: center; 
//       width: 100vw;
//       height: 100vh;">
      
//       <div style="
//         width: 80%; 
//         max-width: 600px;
//         background: #ffffff; 
//         padding: 40px; 
//         border-radius: 12px; 
//         box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
//         text-align: center;">

//         <div style="
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 20px;">
//           <div style="
//             background-color: #4CAF50;
//             border-radius: 50%;
//             width: 60px;
//             height: 60px;
//             display: flex;
//             align-items: center;
//             justify-content: center;">
//             <span style="
//               font-size: 32px; 
//               color: #ffffff;">✔</span>
//           </div>
//         </div>

//         <h1 style="
//           font-size: 24px; 
//           color: #4CAF50; 
//           margin-bottom: 20px;">인증 완료</h1>

//         <p style="
//           font-size: 20px; 
//           margin-bottom: 20px; 
//           line-height: 1.6;">
//           <strong style="font-size: 22px; color: #4CAF50;">${name}</strong>님 안녕하세요! 🎉<br>
//           현재까지 넣으신 페트병은 <span style="font-weight: bold; color: #333;">${rewardPoints}개</span>입니다.
//         </p>

//         <button style="
//           width: 100%; 
//           padding: 15px 0; 
//           font-size: 16px; 
//           color: #ffffff; 
//           background-color: #2196F3; 
//           border: none; 
//           border-radius: 8px; 
//           cursor: pointer;" 
//           onclick="window.location.href='collecting.html'">
//           투입하기
//         </button>
//       </div>
//     </div>
//   `;

//   document.body.innerHTML = newPageContent;
// }

// async function startCamera() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//     video.srcObject = stream;

//     video.addEventListener("play", () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       const scan = async () => {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height);

//         if (code) {
//           stopCamera(stream);
//           const userId = code.data.trim();

//           const studentData = await fetchStudentDataById(userId);

//           if (studentData) {
//             const { name, reward_points } = studentData;
//             displayAuthCompletePage(name, reward_points);
//           } else {
//             alert("사용자 정보를 찾을 수 없습니다.");
//           }
//         } else {
//           requestAnimationFrame(scan);
//         }
//       };

//       scan();
//     });
//   } catch (err) {
//     console.error("Camera error:", err);
//     alert("카메라 접근이 불가능합니다. 권한을 확인해주세요.");
//   }
// }

// function stopCamera(stream) {
//   const tracks = stream.getTracks();
//   tracks.forEach((track) => track.stop());
// }

// startScanButton.addEventListener("click", startCamera);