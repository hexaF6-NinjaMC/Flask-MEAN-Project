export class Schematic {
  public _id?: string;
  public id?: string;

  constructor(
    public title: string,
    public name: string,
    public releaseVersion: string,
    public version: string,
    public creator: string,
    public url: string,
    public img: string,
    public description?: string,
    public tags?: string[],
  ) {}
}
