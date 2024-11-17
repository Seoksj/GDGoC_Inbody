const video = document.getElementById("camera");
// const fileInput = document.getElementById("file-input");
const startScanButton = document.getElementById("start-scan");

// Pocketbase API 설정
const pocketbaseURL = "https://creature-some.pockethost.io"; // Pocketbase URL을 입력
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
      const { name, reward_points } = data; // Pocketbase 필드 이름에 맞게 수정
      return { name, reward_points };
    } else {
      throw new Error("No matching user found.");
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}

// 인증 완료 페이지 생성 함수
function displayAuthCompletePage(name, rewardPoints) {
  // 새 페이지 내용을 작성
  const newPageContent = `
    <div style="text-align: center; padding: 20px;">
      <h1>인증 완료</h1>
      <p style="font-size: 20px; margin-top: 20px;">
        ${name}님 안녕하세요! 현재까지 넣으신 페트병은 ${rewardPoints}개입니다.
      </p>
    </div>
  `;

  // 새 페이지로 내용 교체
  document.body.innerHTML = newPageContent;
}

// 카메라 스캔 기능
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
          const userId = code.data.trim(); // QR 코드 데이터가 사용자 고유 ID라고 가정 (공백 제거)

          // Pocketbase에서 데이터 가져오기
          const studentData = await fetchStudentDataById(userId);

          if (studentData) {
            const { name, reward_points } = studentData;
            displayAuthCompletePage(name, reward_points); // 인증 완료 페이지 표시
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

// 카메라 정지
function stopCamera(stream) {
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
}

// 버튼 클릭 시 카메라 시작
startScanButton.addEventListener("click", startCamera);