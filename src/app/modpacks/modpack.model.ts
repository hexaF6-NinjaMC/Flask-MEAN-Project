export class Modpack {
  public _id?: string;
  public id?: string;

  constructor(
    public title: string,
    public name: string,
    public version: string,
    public releaseDate: Date,
    public genre: string,
    public creator: string,
    public url: string,
    public description?: string,
    public tags?: string[],
  ) {}
}
