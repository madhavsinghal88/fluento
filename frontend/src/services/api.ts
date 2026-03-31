const BASE_URL = "http://localhost:8080/api";

export interface WordDTO {
  word: string;
  meaning: string;
  example: string;
}

export interface CorrectionResponse {
  corrected: string;
  explanation: string;
  improved: string;
}

export interface QuizDTO {
  question: string;
  options: string[];
  answer: string;
}

export interface SubmissionRequest {
    sentence: string;
    word: string;
    level: number;
    xp: number;
}

export interface SubmissionResponse {
    correct: boolean;
    xpEarned: number;
    level: number;
    xp: number;
    feedback: string;
    corrected: string;
    improved: string;
}

export interface HintResponse {
    hint: string;
}

export interface Child {
    id?: number;
    name: string;
    age: number;
    totalXp: number;
    currentLevel: number;
    totalQuestions?: number;
    correctAnswers?: number;
    accuracy?: number;
}

export const loginChild = async (name: string, age: number): Promise<Child> => {
    const response = await fetch(`${BASE_URL}/child/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });
    if (!response.ok) throw new Error("Onboarding failed");
    return response.json();
};

export const fetchWordsByLevel = async (level: number = 1): Promise<WordDTO[]> => {
  const response = await fetch(`${BASE_URL}/words?level=${level}`);
  if (!response.ok) throw new Error("Failed to fetch words");
  const data = await response.json();
  return data.words;
};

export const fetchCountryQuiz = async (mode: string = "world", level: number = 1, age: number = 8): Promise<QuizDTO[]> => {
  const response = await fetch(`${BASE_URL}/quiz/countries?mode=${mode}&level=${level}&age=${age}`);
  if (!response.ok) throw new Error("Failed to fetch quiz");
  const data = await response.json();
  return data.questions;
};

export interface LogoQuizDTO {
    image: string;
    options: string[];
    answer: string;
}

export const fetchLogoQuiz = async (type: string = "companies", level: number = 1, age: number = 8): Promise<LogoQuizDTO[]> => {
    const response = await fetch(`${BASE_URL}/quiz/logos?type=${type}&level=${level}&age=${age}`);
    if (!response.ok) throw new Error("Logo fetch failed");
    const data = await response.json();
    return data.questions;
};

export const updateChildProgress = async (id: number, xp: number, level: number, totalQuestions?: number, correctAnswers?: number): Promise<Child> => {
    const response = await fetch(`${BASE_URL}/child/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, totalXp: xp, currentLevel: level, totalQuestions, correctAnswers }),
    });
    if (!response.ok) throw new Error("Progress sync failed");
    return response.json();
};

export const fetchLeaderboard = async (): Promise<Child[]> => {
    const response = await fetch(`${BASE_URL}/child/leaderboard`);
    if (!response.ok) throw new Error("Leaderboard fetch failed");
    return response.json();
};

export const createRoom = async (teacherId: string): Promise<{ roomCode: string }> => {
    const response = await fetch(`${BASE_URL}/room/create?teacherId=${teacherId}`, { method: "POST" });
    if (!response.ok) throw new Error("Room creation failed");
    return response.json();
};

export const joinRoom = async (roomCode: string, name: string, avatar: string): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/room/join?roomCode=${roomCode}&name=${name}&avatar=${avatar}`, { method: "POST" });
    if (!response.ok) throw new Error("Room join failed");
    return response.json();
};

export const submitSentence = async (request: SubmissionRequest): Promise<SubmissionResponse> => {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error("Submission failed");
    return response.json();
};

export const fetchHint = async (word: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}/hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word }),
    });
    if (!response.ok) throw new Error("Hint failed");
    const data = await response.json();
    return data.hint;
};

export const correctSentence = async (sentence: string): Promise<CorrectionResponse> => {
  const response = await fetch(`${BASE_URL}/correct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sentence }),
  });
  if (!response.ok) throw new Error("Failed to get correction");
  return response.json();
};
