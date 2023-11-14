export class ResumeResponseDto {
    label: string;
    percent: number;

    constructor(label: string, percent: number){
        this.label = label;
        this.percent = percent;
    }
}