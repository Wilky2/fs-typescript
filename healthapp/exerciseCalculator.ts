interface ExerciseCalculatorValues {
    target: number;
    values: number[];
}

const parseArgumentsExerciseCalculator = (args: string[]): ExerciseCalculatorValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const values: number[] = [];
    let target = 0;

    if (!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    } else {
        throw new Error('Provided values were not numbers!');
    }

    for (let i: number = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            values.push(Number(args[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return { target, values };
}

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

try {
    const { target, values } = parseArgumentsExerciseCalculator(process.argv);
    console.log(calculateExercises(values, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}