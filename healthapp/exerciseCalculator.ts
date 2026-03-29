interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function calculateExercises(dailyExerciseHours: number[], targetValue: number): result {

    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(value => value !== 0).length;
    const target = targetValue;
    const average = dailyExerciseHours.reduce((previous, current) => previous + current, 0) / periodLength;
    const success = average >= target;
    const rating = average < target / 2 ? 1 : average > target / 2 && average < target ? 2 : 3;
    const ratingDescription = rating === 1 ? "not your best—capable of more." : rating === 2 ? "not too bad but could be better" : "excellent—keep up this rhythm";
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));