export class LocationV1 {

    public constructor(name: string, pos?: any) {
        this.name = name;
        this.pos = pos;
    }

    public name: string;
    public pos?: any;
}
