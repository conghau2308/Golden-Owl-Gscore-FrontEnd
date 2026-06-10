export interface StudentScore {
    registrationNumber: string;
    math: number | null;
    literature: number | null;
    english: number | null;
    physics: number | null;
    chemistry: number | null;
    biology: number | null;
    history: number | null;
    geography: number | null;
    civicEdu: number | null;
    referenceLanguageCode: string | null;
}

export interface SubjectStatistics {
    subjectName: string;
    statistics: {
        excellent: number;
        good: number;
        average: number;
        weak: number;
    };
}

export interface TopStudent {
    rank: number;
    studentRankDto: {
        registrationNumber: string;
        math: number;
        physics: number;
        chemistry: number;
        totalScore: number;
    };
}