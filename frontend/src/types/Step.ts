export default class Step{

    name: string;
    stepNumber: number;
    image: string;
    sets: number;
    reps: number;
    description: string;
    recommandedTime: number

    constructor( name: string, stepNumber: number, image: string, sets: number, reps: number, description: string, recommandedTime: number) {
        this.name = name;
        this.stepNumber = stepNumber;
        this.image = image;
        this.sets = sets;
        this.reps = reps;
        this.description = description;
        this.recommandedTime = recommandedTime;
    }
}
