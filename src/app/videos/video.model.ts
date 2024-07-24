export class Video {
  public _id?: string;
  public id?: string;

  constructor(
    public title: string,
    public length: number,
    public uploadDate: Date,
    public genre: string,
    public creator: string,
    public url: string,
    public description?: string,
    public tags?: string[],
  ) {}
}
