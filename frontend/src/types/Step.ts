export default class Step{

    programRef: number;
    name: string;
    stepNumber: number;
    image: string;
    sets: number;
    reps: number;
    description: string;
    recommandedTime: number

    constructor(programRef: number, name: string, stepNumber: number, image: string, sets: number, reps: number, description: string, recommandedTime: number) {
        this.programRef = programRef;
        this.name = name;
        this.stepNumber = stepNumber;
        this.image = image;
        this.sets = sets;
        this.reps = reps;
        this.description = description;
        this.recommandedTime = recommandedTime;
    }
}
