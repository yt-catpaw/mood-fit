interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

async function fetchExercises(
  level: string,
  limit: number = 100
): Promise<void> {
  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          "X-RapidAPI-Key":
            "57561bba3amsh03c93992df702dbp1aa8e9jsn35d0213a5b06",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("ネットワークエラー");
    }

    const data: Exercise[] = await response.json();

    const exerciseDiv = document.getElementById("exercise") as HTMLElement;
    const exerciseTitle = exerciseDiv.querySelector("h2");
    const exerciseImg = exerciseDiv.querySelector("img") as HTMLImageElement;

    const exercise = data[Math.floor(Math.random() * data.length)];

    exerciseTitle!.innerText = exercise.name;
    exerciseImg.src = exercise.gifUrl;
    exerciseImg.style.display = "block";
  } catch (error) {
    console.error("データ取得に失敗しました:", error);
  }
}

document.getElementById("easy-btn")?.addEventListener("click", () => {
  console.log("軽めのボタンがクリックされました");
  fetchExercises("軽め");
});
document.getElementById("normal-btn")?.addEventListener("click", () => {
  console.log("普通のボタンがクリックされました");
  fetchExercises("普通");
});
document.getElementById("hard-btn")?.addEventListener("click", () => {
  console.log("きつめのボタンがクリックされました");
  fetchExercises("きつめ");
});
