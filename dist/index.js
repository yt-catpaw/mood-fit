"use strict";
const exercisesByIntensity = {
    軽め: ["waist", "neck", "lower legs"], // 腰、首、下腿
    普通: ["back", "chest", "shoulders", "upper arms", "cardio"], // 背中、胸、肩、上腕、有酸素運動
    きつめ: ["upper legs", "lower arms"], // 大腿、下腕
};
async function fetchExercises(level, limit = 1000) {
    try {
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?limit=${limit}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                "X-RapidAPI-Key": "57561bba3amsh03c93992df702dbp1aa8e9jsn35d0213a5b06",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("ネットワークエラー");
        }
        const data = await response.json();
        const filteredExercises = data.filter((exercise) => exercisesByIntensity[level].includes(exercise.bodyPart));
        const exerciseDiv = document.getElementById("exercise");
        const exerciseTitle = exerciseDiv.querySelector("h2");
        const exerciseBodyPart = exerciseDiv.querySelector("#exercise-bodyPart");
        const exerciseImg = exerciseDiv.querySelector("img");
        const randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
        exerciseTitle.innerText = randomExercise.name;
        exerciseBodyPart.innerText = `部位: ${randomExercise.bodyPart}`;
        exerciseImg.src = randomExercise.gifUrl;
        exerciseImg.style.display = "block";
    }
    catch (error) {
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
